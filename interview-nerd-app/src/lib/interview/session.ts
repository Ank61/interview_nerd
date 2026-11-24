/**
 * Runs one live mock interview: speaks questions, records answers, decides follow-ups,
 * enforces the time limit and writes everything to the database as it happens.
 *
 * Flow: prepare() -> lobby -> start() -> [speaking -> listening -> thinking]* -> closing -> finished.
 * Every async step captures `flow`; endInterview()/dispose() bump it so stale steps stop.
 */
import { requestRecordingPermissionsAsync } from 'expo-audio';
import * as Crypto from 'expo-crypto';
import { AppState, type NativeEventSubscription, Platform } from 'react-native';

import { getTopic } from '@/data/catalog';

import { type AiSettings, liveTranscribers, type ResolvedAi, resolveAi } from './aiTargets';
import { createInterview, recentSourceKeys, saveTurn, updateInterview } from './db';
import { AnswerEndpointer, type EndpointEvent, PAUSE_MS, type PausePref } from './endpointer';
import { ensureInterviewFolder } from './files';
import { FileAnswerRecorder, setRecordingMode } from './fileRecorder';
import { describeTarget, llmJSON } from './llm';
import { voiceServerStatus } from './neuralVoice';
import { hasModel, OllamaError, ollamaStatus, warmUp } from './ollama';
import { LIVE_SCHEMA, liveTurnPrompt, parseLiveDecision, randomAck, type ThreadLine } from './prompts';
import { type BankQuestion, buildQuestionQueue, levelFor, vocabularyFor } from './questions';
import { type AnswerCapture, AnswerRecorder, type MicState, recognitionAvailable } from './recorder';
import {
  closingLine,
  dontKnowLine,
  firstQuestionLead,
  followUpLimit,
  graceLine,
  greeting,
  INTRO_QUESTION,
  introFollowUp,
  isDontKnow,
  listeningAck,
  noAnswerLine,
  nudgeLine,
  repeatLead,
  scriptedFollowUp,
  skipLine,
  transition,
} from './script';
import { canRecordVoice, nativeSpeech, type SttMode, sttMode } from './speech';
import { prefetchSpeech, speak, stopSpeaking, type VoiceConfig } from './tts';
import type { InterviewConfig, InterviewLevel, InterviewMode, LiveDecision, Turn, TurnKind } from './types';
import { whisperPrompt, whisperReachable } from './whisper';

export type Phase = 'loading' | 'blocked' | 'lobby' | 'speaking' | 'listening' | 'thinking' | 'closing' | 'finished';

export type Blocker = {
  title: string;
  body: string;
  canRetry: boolean;
  canContinueOffline: boolean;
  openSettings: boolean;
  /** Record answers as audio only and transcribe them later. */
  canRecordOnly?: boolean;
};

export type RoomState = {
  phase: Phase;
  loadingText: string;
  blocker: Blocker | null;
  interviewId: string | null;
  level: InterviewLevel;
  topicTitles: string[];
  mode: InterviewMode;
  startedAt: number | null;
  endsAt: number | null;
  timeUp: boolean;
  graceEndsAt: number | null;
  /** The question currently on the table. */
  current: { kind: TurnKind; number: number; followUp: number; topicTitle: string; text: string } | null;
  transcript: string;
  /** When the candidate started answering the current question (kept across "Repeat"). */
  answerStartedAt: number | null;
  endedAt: number | null;
  mic: MicState;
  notice: string | null;
  canRecordAudio: boolean;
  /** Where speech-to-text happens: live on the phone, or Whisper on the laptop after each answer. */
  stt: SttMode;
  /** Laptop speech-to-text is unavailable: keep audio, transcribe during feedback. */
  transcribeLater: boolean;
  /** An answer is being transcribed on the laptop. */
  transcribing: boolean;
  answered: number;
  endedEarly: boolean;
  /** Who asks the follow-ups, e.g. "llama3:8b on your laptop". */
  aiLabel: string;
  /** The voice actually used (the laptop voice may be unavailable). */
  voiceEngine: VoiceConfig['engine'];
};

export type SessionPrefs = AiSettings & {
  voice: VoiceConfig;
  /** Silence that ends an answer. */
  pause: PausePref;
  /** Speech recognition language (phone recognizer). */
  lang: string;
};

type Thread = { main: Turn; isIntro: boolean; topicTitle: string; followUps: number; limit: number };

const LOCAL_TIMEOUT_MS = 35_000;
const CLOUD_TIMEOUT_MS = 20_000;
const GRACE_MS = 30_000;
/** Don't start a new question with less time than this left. */
const MIN_TIME_FOR_QUESTION_MS = 25_000;

export class InterviewSession {
  private state: RoomState;
  private listeners = new Set<() => void>();
  private flow = 0;
  private busy = false;
  private disposed = false;

  private queue: BankQuestion[] = [];
  private qIndex = 0;
  private seq = 0;
  private turns: Turn[] = [];
  private thread: Thread | null = null;
  private currentTurn: Turn | null = null;
  private recorder: AnswerCapture | null = null;
  private answerStartedAt = 0;
  private usedLines = new Set<string>();
  private lastTopicId: string | null = null;
  private aiFailures = 0;
  private sttFailures = 0;
  private aiAbort: AbortController | null = null;
  private vocabulary: string[] = [];
  private ai: ResolvedAi | null = null;
  private voiceCfg: VoiceConfig;
  private endpointer: AnswerEndpointer | null = null;
  /** Chosen in prepare() so the laptop voice can generate it before the interview starts. */
  private hello = '';
  /** Database writes run one after another so a later save can never be overtaken by an earlier one. */
  private writes: Promise<void> = Promise.resolve();

  private endTimer: ReturnType<typeof setTimeout> | null = null;
  private graceTimer: ReturnType<typeof setTimeout> | null = null;
  private appStateSub: NativeEventSubscription | null = null;

  constructor(
    private config: InterviewConfig,
    private prefs: SessionPrefs,
    private userId: string,
  ) {
    const level = levelFor(config.years, config.difficulty);
    this.voiceCfg = prefs.voice;
    this.state = {
      phase: 'loading',
      loadingText: 'Getting ready…',
      blocker: null,
      interviewId: null,
      level,
      topicTitles: config.topics.map((id) => getTopic(id)?.title ?? id),
      mode: config.mode,
      startedAt: null,
      endsAt: null,
      timeUp: false,
      graceEndsAt: null,
      current: null,
      transcript: '',
      answerStartedAt: null,
      endedAt: null,
      mic: 'idle',
      notice: null,
      canRecordAudio: false,
      stt: sttMode(),
      transcribeLater: false,
      transcribing: false,
      answered: 0,
      endedEarly: false,
      aiLabel: '',
      voiceEngine: prefs.voice.engine,
    };
  }

  // ---------------------------------------------------------------------------
  // Store plumbing (used with useSyncExternalStore)
  // ---------------------------------------------------------------------------
  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getState = () => this.state;

  private set(patch: Partial<RoomState>) {
    if (this.disposed) return;
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((l) => l());
  }

  /** Queue a snapshot of the turn for saving. */
  private persist(turn: Turn) {
    const snapshot: Turn = { ...turn, audio: [...turn.audio] };
    this.writes = this.writes.then(() => saveTurn(snapshot)).catch(() => {});
    return this.writes;
  }

  private stale(token: number) {
    return this.disposed || token !== this.flow;
  }

  private remainingMs() {
    return this.state.endsAt ? this.state.endsAt - Date.now() : Infinity;
  }

  // ---------------------------------------------------------------------------
  // Preparation
  // ---------------------------------------------------------------------------
  async prepare() {
    const token = this.flow;
    this.set({ phase: 'loading', blocker: null, loadingText: 'Checking the microphone…' });
    try {
      const sr = nativeSpeech();
      const perm = sr ? await sr.ExpoSpeechRecognitionModule.requestPermissionsAsync() : await requestRecordingPermissionsAsync();
      if (this.stale(token)) return;
      if (!perm.granted) {
        return this.block({
          title: 'Microphone access needed',
          body: sr
            ? 'The interviewer needs to hear you. Allow microphone and speech recognition access, then try again.'
            : 'The interviewer needs to hear you. Allow microphone access, then try again.',
          canRetry: true,
          canContinueOffline: false,
          openSettings: !perm.canAskAgain,
        });
      }
      if (sr && !recognitionAvailable()) {
        return this.block({
          title: 'Speech recognition is unavailable',
          body:
            Platform.OS === 'android'
              ? 'Install or enable "Speech Recognition & Synthesis by Google" (or the Google app) from the Play Store, then try again.'
              : 'Turn on Siri & Dictation in Settings, then try again.',
          canRetry: true,
          canContinueOffline: false,
          openSettings: false,
        });
      }

      this.set({ loadingText: 'Picking your questions…', canRecordAudio: canRecordVoice() });
      if (!this.queue.length) {
        const recent = await recentSourceKeys(this.userId).catch(() => new Set<string>());
        this.queue = await buildQuestionQueue(this.config.topics, this.state.level, recent);
        this.vocabulary = vocabularyFor(this.config.topics);
      }
      if (this.stale(token)) return;
      if (!this.queue.length) {
        return this.block({ title: 'No questions found', body: 'The selected topics have no interview questions. Pick other topics.', canRetry: false, canContinueOffline: false, openSettings: false });
      }

      this.set({ loadingText: 'Checking your AI settings…' });
      this.ai = await resolveAi(this.prefs);
      if (this.stale(token)) return;
      const notices: string[] = [];
      if (this.ai.missingKey) notices.push('No API key is saved for your own AI, so the laptop is used instead.');

      if (this.state.stt === 'laptop' && !this.state.transcribeLater && !this.ai.cloudStt) {
        this.set({ loadingText: 'Connecting to speech-to-text on your laptop…' });
        const ok = await whisperReachable(this.prefs.whisperUrl);
        if (this.stale(token)) return;
        if (!ok) {
          return this.block({
            title: "Can't reach speech-to-text on your laptop",
            body: `On this phone your answers are transcribed by Whisper on the laptop. Start it with start-whisper.cmd and check the address in AI and voice settings (${this.prefs.whisperUrl || 'not set'}). You can also record voice only and transcribe later.`,
            canRetry: true,
            canContinueOffline: false,
            openSettings: false,
            canRecordOnly: true,
          });
        }
      }

      const cloudLive = this.state.mode === 'ai' && this.ai.live.some((t) => t.kind !== 'ollama');
      if (cloudLive) {
        // Own API first; the laptop is only a fallback, so a quick check is enough.
        const status = await ollamaStatus(this.prefs.serverUrl, 2500);
        if (this.stale(token)) return;
        if (!status.ok || !hasModel(status.models, this.prefs.liveModel)) this.ai.live = this.ai.live.filter((t) => t.kind !== 'ollama');
        else warmUp(this.prefs.serverUrl, this.prefs.liveModel).catch(() => {});
      } else if (this.state.mode === 'ai') {
        this.set({ loadingText: 'Connecting to your laptop…' });
        const status = await ollamaStatus(this.prefs.serverUrl);
        if (this.stale(token)) return;
        if (!status.ok) {
          return this.block({
            title: "Can't reach the AI interviewer",
            body: `${status.error} Make sure Ollama is running on the laptop and both devices are on the same Wi-Fi. Address: ${this.prefs.serverUrl || 'not set'}`,
            canRetry: true,
            canContinueOffline: true,
            openSettings: false,
          });
        }
        if (!hasModel(status.models, this.prefs.liveModel)) {
          return this.block({
            title: `${this.prefs.liveModel} is not installed`,
            body: `On the laptop run:  ollama pull ${this.prefs.liveModel}`,
            canRetry: true,
            canContinueOffline: true,
            openSettings: false,
          });
        }
        this.set({ loadingText: `Waking up the interviewer (${this.prefs.liveModel}). The first load can take about 30 seconds…` });
        await warmUp(this.prefs.serverUrl, this.prefs.liveModel);
        if (this.stale(token)) return;
      }

      // Natural voice: fall back to the phone's voice if the laptop voice server is down.
      if (this.prefs.voice.engine === 'laptop') {
        this.set({ loadingText: 'Connecting to the interviewer voice…' });
        const v = await voiceServerStatus(this.prefs.voice.laptopUrl, 3000);
        if (this.stale(token)) return;
        if (!v.ok) {
          this.voiceCfg = { ...this.prefs.voice, engine: 'phone' };
          notices.push("The natural voice isn't running on the laptop (start-voice.cmd), so the phone's voice is used.");
        }
      }
      // Generate the opening lines now, so the interviewer starts speaking instantly.
      this.hello ||= greeting({ minutes: this.config.minutes, topics: this.state.topicTitles, intro: this.config.intro });
      prefetchSpeech(this.hello, this.voiceCfg);
      prefetchSpeech(this.config.intro ? INTRO_QUESTION : this.queue[0].question, this.voiceCfg);

      const aiLabel = this.state.mode === 'ai' && this.ai.live.length ? describeTarget(this.ai.live[0]) : 'Scripted follow-ups';
      this.set({ phase: 'lobby', loadingText: '', aiLabel, voiceEngine: this.voiceCfg.engine, notice: notices.join(' ') || null });
    } catch (e) {
      if (this.stale(token)) return;
      const offlineOk = this.state.mode === 'ai' && e instanceof OllamaError;
      this.block({
        title: offlineOk ? 'The AI interviewer did not respond' : 'Something went wrong',
        body: e instanceof Error ? e.message : String(e),
        canRetry: true,
        canContinueOffline: offlineOk,
        openSettings: false,
      });
    }
  }

  private block(b: Blocker) {
    this.set({ phase: 'blocked', blocker: b });
  }

  retry = () => {
    if (this.state.phase === 'blocked') this.prepare();
  };

  continueOffline = () => {
    if (this.state.phase !== 'blocked') return;
    this.set({ mode: 'offline', notice: null });
    this.prepare();
  };

  /** Laptop speech-to-text is down: record audio only, scripted interviewer, transcribe during feedback. */
  continueRecordOnly = () => {
    if (this.state.phase !== 'blocked') return;
    this.set({ transcribeLater: true, mode: 'offline', notice: null });
    this.prepare();
  };

  // ---------------------------------------------------------------------------
  // Interview flow
  // ---------------------------------------------------------------------------
  start = async () => {
    if (this.state.phase !== 'lobby' || this.busy) return;
    this.busy = true;
    const token = this.flow;
    const id = Crypto.randomUUID();
    const now = Date.now();
    try {
      ensureInterviewFolder(id);
      await createInterview({
        id,
        userId: this.userId,
        createdAt: now,
        startedAt: now,
        endedAt: null,
        config: { ...this.config, mode: this.state.mode },
        level: this.state.level,
        status: 'in_progress',
        elapsedSec: 0,
        reviewStatus: 'none',
        reviewError: null,
        review: null,
      });
    } catch (e) {
      this.busy = false;
      return this.block({ title: 'Could not start', body: e instanceof Error ? e.message : String(e), canRetry: true, canContinueOffline: false, openSettings: false });
    }
    if (this.stale(token)) return;
    const endsAt = now + this.config.minutes * 60_000;
    this.set({ interviewId: id, startedAt: now, endsAt });
    this.endTimer = setTimeout(this.onTimeUp, endsAt - now);
    this.appStateSub = AppState.addEventListener('change', (s) => {
      if (s === 'active' && this.state.phase === 'listening' && this.state.mic === 'stalled') this.resumeMic();
    });
    this.busy = false;
    if (this.state.stt === 'laptop') await setRecordingMode(false);

    const hello = this.hello || greeting({ minutes: this.config.minutes, topics: this.state.topicTitles, intro: this.config.intro });
    if (this.config.intro) {
      this.startThread(this.newTurn({ kind: 'intro', question: INTRO_QUESTION }), true, 'Introduction');
      await this.ask(token, `${hello} ${INTRO_QUESTION}`);
    } else {
      await this.nextQuestion(token, hello);
    }
  };

  private newTurn(p: { kind: TurnKind; question: string; parentSeq?: number; q?: BankQuestion }): Turn {
    this.seq += 1;
    return {
      id: `${this.state.interviewId}-${this.seq}`,
      interviewId: this.state.interviewId as string,
      seq: this.seq,
      kind: p.kind,
      parentSeq: p.parentSeq ?? null,
      topicId: p.q?.topicId ?? this.thread?.main.topicId ?? null,
      question: p.question,
      reference: p.q?.reference ?? null,
      sourceKey: p.q?.sourceKey ?? null,
      answer: '',
      audio: [],
      needsTranscript: false,
      transcriptSource: 'live',
      askedAt: Date.now(),
      answerMs: 0,
      skipped: false,
      liveVerdict: null,
      review: null,
    };
  }

  private startThread(main: Turn, isIntro: boolean, topicTitle: string) {
    this.thread = {
      main,
      isIntro,
      topicTitle,
      followUps: 0,
      limit: followUpLimit(this.config.difficulty, this.state.mode, isIntro),
    };
    this.currentTurn = main;
  }

  private mainNumber() {
    return this.turns.filter((t) => t.kind === 'question').length;
  }

  /** Speak `utterance` for the current turn, then listen for the answer. */
  private async ask(token: number, utterance: string) {
    const turn = this.currentTurn;
    const thread = this.thread;
    if (!turn || !thread) return;
    turn.askedAt = Date.now();
    this.turns.push(turn);
    this.persist(turn);
    this.set({
      current: {
        kind: turn.kind,
        number: this.mainNumber(),
        followUp: turn.kind === 'follow_up' ? thread.followUps : 0,
        topicTitle: thread.topicTitle,
        text: turn.question,
      },
      transcript: '',
    });
    const ok = await this.say(token, utterance);
    if (!ok) return;
    await this.listen(token);
  }

  private async say(token: number, text: string, phase: 'speaking' | 'closing' = 'speaking') {
    if (this.stale(token)) return false;
    this.set({ phase });
    // Never speak while the microphone is recording; on iOS this also routes speech to the loudspeaker.
    if (Platform.OS === 'ios') await setRecordingMode(false);
    if (this.stale(token)) return false;
    const r = await speak(text, this.voiceCfg);
    return !this.stale(token) && r !== 'stopped';
  }

  private async listen(token: number) {
    const turn = this.currentTurn;
    if (!turn || this.stale(token)) return;
    this.answerStartedAt = Date.now();
    this.endpointer?.stop();
    const endpointer = new AnswerEndpointer({
      endSilenceMs: PAUSE_MS[this.prefs.pause],
      liveText: () => this.recorder?.currentText() ?? '',
      onEvent: (e) => this.onEndpoint(token, e),
    });
    this.endpointer = endpointer;
    const onLevel = (isVoice: boolean) => endpointer.sample(isVoice);
    const onMic = (mic: MicState) => this.set({ mic });
    const onError = (e: { code: string; fatal: boolean }) => {
      if (e.fatal) this.set({ mic: 'stalled', notice: `Microphone error (${e.code}). Tap "Resume mic" to try again.` });
    };
    const recorder: AnswerCapture =
      this.state.stt === 'phone'
        ? new AnswerRecorder({
            interviewId: turn.interviewId,
            turnId: turn.id,
            lang: this.prefs.lang,
            vocabulary: this.vocabulary,
            persistAudio: this.state.canRecordAudio,
            onText: (text) => this.set({ transcript: text }),
            onLevel,
            onMic,
            onError,
          })
        : new FileAnswerRecorder({
            interviewId: turn.interviewId,
            turnId: turn.id,
            transcribers:
              this.state.transcribeLater || !this.ai
                ? []
                : liveTranscribers(this.ai, this.prefs.whisperUrl || null, whisperPrompt(this.state.topicTitles, this.vocabulary)),
            onLevel,
            onMic,
            onError,
          });
    this.recorder = recorder;
    this.set({ phase: 'listening', mic: 'idle', transcript: '', answerStartedAt: this.answerStartedAt });
    recorder.begin();
    endpointer.start();
    if (this.state.timeUp) this.startGrace(token, false);
    // While the candidate answers, prepare the next question's audio on the laptop.
    const next = this.queue[this.qIndex];
    if (next) prefetchSpeech(next.question, this.voiceCfg);
  }

  /** The candidate went quiet: finish the answer, or nudge them if they never started. */
  private onEndpoint(token: number, e: EndpointEvent) {
    if (this.stale(token) || this.state.phase === 'closing' || this.state.phase === 'finished') return;
    if (e === 'nudge') {
      this.nudge(token);
      return;
    }
    if (this.state.phase === 'listening' && !this.busy) this.done();
    // Mid-action (e.g. the question is being repeated): try again shortly.
    else setTimeout(() => this.onEndpoint(token, e), 500);
  }

  /** Long silence before answering: a gentle prompt, then keep listening. */
  private async nudge(token: number) {
    const recorder = this.recorder;
    const endpointer = this.endpointer;
    if (this.state.phase !== 'listening' || this.busy || !recorder || !endpointer) return;
    this.busy = true;
    endpointer.pause();
    try {
      await recorder.pause();
      if (this.stale(token)) return;
      const ok = await this.say(token, nudgeLine());
      if (!ok) return;
      this.set({ phase: 'listening' });
      recorder.resume();
      endpointer.resume({ afterNudge: true });
    } finally {
      if (!this.stale(token)) this.busy = false;
    }
  }

  /** Candidate tapped "Done answering" (or the grace period ran out). */
  done = async () => {
    if (this.state.phase !== 'listening' || this.busy || !this.recorder) return;
    this.busy = true;
    const token = this.flow;
    try {
      await this.collectAnswer({ skipped: false });
      if (this.stale(token)) return;
      await this.afterAnswer(token, false);
    } finally {
      if (!this.stale(token)) this.busy = false;
    }
  };

  skip = async () => {
    if (this.state.phase !== 'listening' || this.busy || !this.recorder) return;
    this.busy = true;
    const token = this.flow;
    try {
      await this.collectAnswer({ skipped: true });
      if (this.stale(token)) return;
      await this.afterAnswer(token, true);
    } finally {
      if (!this.stale(token)) this.busy = false;
    }
  };

  repeat = async () => {
    if (this.state.phase !== 'listening' || this.busy || !this.recorder || !this.currentTurn) return;
    this.busy = true;
    const token = this.flow;
    const recorder = this.recorder;
    const endpointer = this.endpointer;
    endpointer?.pause();
    try {
      await recorder.pause();
      if (this.stale(token)) return;
      const ok = await this.say(token, `${repeatLead()} ${this.currentTurn.question}`);
      if (!ok) return;
      this.set({ phase: 'listening' });
      recorder.resume();
      endpointer?.resume();
    } finally {
      if (!this.stale(token)) this.busy = false;
    }
  };

  resumeMic = () => {
    if (this.state.phase !== 'listening' || !this.recorder) return;
    this.set({ notice: null });
    this.recorder.resume();
  };

  private async collectAnswer(opts: { skipped: boolean }) {
    const recorder = this.recorder;
    const turn = this.currentTurn;
    this.recorder = null;
    this.endpointer?.stop();
    this.endpointer = null;
    this.clearGrace();
    const transcribing = !!recorder && !recorder.live && !this.state.transcribeLater;
    this.set({ phase: 'thinking', mic: 'idle', transcribing });
    if (!recorder || !turn) {
      this.set({ transcribing: false });
      return;
    }
    const answerMs = Date.now() - this.answerStartedAt;
    const { text, audio, needsTranscript, source } = await recorder.finish();
    turn.answer = text;
    turn.audio = audio;
    turn.needsTranscript = needsTranscript;
    turn.transcriptSource = source;
    turn.answerMs = answerMs;
    turn.skipped = opts.skipped;
    await this.persist(turn);
    this.set({ transcribing: false, answered: this.turns.filter((t) => t.answer || t.needsTranscript).length, transcript: text });
    if (transcribing && needsTranscript) {
      this.sttFailures += 1;
      if (this.sttFailures >= 2) {
        this.set({
          transcribeLater: true,
          mode: 'offline',
          notice: 'Speech-to-text on your laptop stopped responding. Answers are still recorded and will be transcribed when you get feedback.',
        });
      }
    } else if (transcribing) {
      this.sttFailures = 0;
    }
  }

  private threadLines(): ThreadLine[] {
    const t = this.thread;
    if (!t) return [];
    return this.turns
      .filter((x) => x.seq === t.main.seq || x.parentSeq === t.main.seq)
      .flatMap((x) => [
        { who: 'interviewer' as const, text: x.question },
        { who: 'candidate' as const, text: x.answer },
      ]);
  }

  private async afterAnswer(token: number, skipped: boolean) {
    const turn = this.currentTurn;
    const thread = this.thread;
    if (!turn || !thread) return;
    if (this.state.timeUp || this.remainingMs() < MIN_TIME_FOR_QUESTION_MS) return this.close(token, false);

    const answer = turn.answer;
    if (skipped) return this.nextQuestion(token, skipLine());
    // Recorded but not transcribed yet: nothing to judge, so move on politely.
    if (turn.needsTranscript) return this.nextQuestion(token, randomAck());
    if (!answer.trim()) return this.nextQuestion(token, noAnswerLine());
    if (isDontKnow(answer)) return this.nextQuestion(token, dontKnowLine());
    if (thread.followUps >= thread.limit) return this.nextQuestion(token, randomAck());

    const acked = this.state.mode === 'ai';
    if (acked) {
      // Acknowledge right away (like a person would) while the laptop thinks.
      const ack = this.say(token, listeningAck()).then(() => {
        if (!this.stale(token)) this.set({ phase: 'thinking' });
      });
      const decision = await this.liveDecision(thread);
      await ack;
      if (this.stale(token)) return;
      if (this.state.timeUp || this.remainingMs() < MIN_TIME_FOR_QUESTION_MS) return this.close(token, false);
      if (decision) {
        turn.liveVerdict = decision.verdict;
        this.persist(turn);
        if (decision.action === 'follow_up') return this.followUp(token, decision.say);
        return this.nextQuestion(token, '');
      }
      // Fall through to the scripted interviewer for this turn.
    }

    const line = thread.isIntro ? introFollowUp(this.usedLines) : scriptedFollowUp({ answer, difficulty: this.config.difficulty, used: this.usedLines });
    if (line) return this.followUp(token, acked ? line : `${listeningAck()} ${line}`);
    return this.nextQuestion(token, acked ? '' : randomAck());
  }

  private async liveDecision(thread: Thread): Promise<LiveDecision | null> {
    this.aiAbort = new AbortController();
    try {
      const prompt = liveTurnPrompt({
        level: this.state.level,
        years: this.config.years,
        difficulty: this.config.difficulty,
        topic: thread.topicTitle,
        isIntro: thread.isIntro,
        question: thread.main.question,
        reference: thread.main.reference ?? '',
        thread: this.threadLines(),
        followUpsLeft: thread.limit - thread.followUps,
      });
      // Own API first, then the laptop.
      for (const target of this.ai?.live ?? []) {
        try {
          const local = target.kind === 'ollama';
          const r = await llmJSON({
            target,
            prompt,
            schema: LIVE_SCHEMA,
            timeoutMs: local ? LOCAL_TIMEOUT_MS : CLOUD_TIMEOUT_MS,
            // Reasoning models spend tokens thinking before the short JSON reply.
            maxTokens: local ? 96 : 1500,
            effort: 'low',
            signal: this.aiAbort.signal,
          });
          const d = parseLiveDecision(r.data);
          if (d) {
            this.aiFailures = 0;
            return d;
          }
        } catch {
          if (this.aiAbort?.signal.aborted) return null;
        }
      }
      throw new OllamaError('bad_output', 'No AI target answered');
    } catch {
      if (this.aiAbort?.signal.aborted) return null;
      this.aiFailures += 1;
      if (this.aiFailures >= 2 && this.state.mode === 'ai') {
        this.set({
          mode: 'offline',
          notice: 'The AI stopped responding, so the interviewer switched to scripted follow-ups. Answers are still recorded.',
        });
      }
      return null;
    } finally {
      this.aiAbort = null;
    }
  }

  private async followUp(token: number, text: string) {
    const thread = this.thread;
    if (!thread || this.stale(token)) return;
    thread.followUps += 1;
    this.currentTurn = this.newTurn({ kind: 'follow_up', question: text, parentSeq: thread.main.seq });
    await this.ask(token, text);
  }

  private async nextQuestion(token: number, lead: string) {
    if (this.stale(token)) return;
    const q = this.queue[this.qIndex];
    if (!q) return this.close(token, false, "We've gone through all the questions I had prepared.");
    this.qIndex += 1;
    const first = this.mainNumber() === 0;
    const topicChanged = this.lastTopicId !== null && this.lastTopicId !== q.topicId;
    const lines = [lead];
    if (first) lines.push(firstQuestionLead({ afterIntro: this.config.intro, topic: q.topicTitle }));
    else lines.push(transition({ topicChanged, topic: q.topicTitle }));
    lines.push(q.question);
    this.lastTopicId = q.topicId;
    this.startThread(this.newTurn({ kind: 'question', question: q.question, q }), false, q.topicTitle);
    await this.ask(token, lines.filter(Boolean).join(' '));
  }

  // ---------------------------------------------------------------------------
  // Time limit
  // ---------------------------------------------------------------------------
  private onTimeUp = () => {
    this.endTimer = null;
    if (this.disposed || this.state.phase === 'closing' || this.state.phase === 'finished') return;
    this.set({ timeUp: true });
    if (this.state.phase === 'listening') this.startGrace(this.flow, true);
    // speaking: grace starts when listening begins; thinking: afterAnswer() closes.
  };

  /** Give the candidate a short window to finish, then end automatically. */
  private async startGrace(token: number, announce: boolean) {
    if (this.graceTimer || this.stale(token)) return;
    const graceEndsAt = Date.now() + GRACE_MS;
    this.set({ graceEndsAt });
    // If the candidate is mid-action (e.g. "Repeat"), try again shortly instead of giving up.
    const fire = () => {
      this.graceTimer = null;
      if (this.stale(token) || this.state.phase === 'closing' || this.state.phase === 'finished') return;
      if (this.state.phase === 'listening' && !this.busy) this.done();
      else this.graceTimer = setTimeout(fire, 1000);
    };
    this.graceTimer = setTimeout(fire, GRACE_MS);
    if (!announce || !this.recorder || this.busy) return;
    // Politely interrupt: pause the mic so the interviewer's voice is not transcribed.
    this.busy = true;
    const recorder = this.recorder;
    const endpointer = this.endpointer;
    endpointer?.pause();
    try {
      await recorder.pause();
      const ok = await this.say(token, graceLine);
      if (!ok || this.state.phase !== 'speaking') return;
      this.set({ phase: 'listening' });
      recorder.resume();
      endpointer?.resume();
    } finally {
      if (!this.stale(token)) this.busy = false;
    }
  }

  private clearGrace() {
    if (this.graceTimer) clearTimeout(this.graceTimer);
    this.graceTimer = null;
  }

  // ---------------------------------------------------------------------------
  // Ending
  // ---------------------------------------------------------------------------
  private async close(token: number, early: boolean, reason?: string) {
    if (this.stale(token) || this.state.phase === 'closing' || this.state.phase === 'finished') return;
    this.clearTimers();
    this.set({ phase: 'closing', current: null, endedEarly: early });
    await this.say(token, [reason, closingLine(early)].filter(Boolean).join(' '), 'closing');
    await this.finalize();
    this.set({ phase: 'finished', endedAt: Date.now() });
  }

  private async finalize() {
    const id = this.state.interviewId;
    if (!id) return;
    await this.writes;
    const now = Date.now();
    await updateInterview(id, {
      endedAt: now,
      status: 'completed',
      elapsedSec: this.state.startedAt ? (now - this.state.startedAt) / 1000 : 0,
    }).catch(() => {});
  }

  /** "End interview" button: save the current answer and wrap up. */
  endInterview = async () => {
    const phase = this.state.phase;
    if (phase === 'closing' || phase === 'finished') return;
    if (!this.state.interviewId) return;
    this.flow += 1;
    const token = this.flow;
    this.busy = true;
    this.aiAbort?.abort();
    await stopSpeaking();
    if (this.recorder) await this.collectAnswer({ skipped: false });
    if (this.stale(token)) return;
    this.busy = false;
    await this.close(token, true);
  };

  private clearTimers() {
    if (this.endTimer) clearTimeout(this.endTimer);
    this.endTimer = null;
    this.clearGrace();
  }

  /** Screen unmounted: stop audio, keep what was recorded, and close the record. */
  dispose = async () => {
    if (this.disposed) return;
    const wasRunning = !!this.state.interviewId && this.state.phase !== 'finished';
    this.disposed = true;
    this.flow += 1;
    this.clearTimers();
    this.endpointer?.stop();
    this.appStateSub?.remove();
    this.aiAbort?.abort();
    await stopSpeaking();
    const recorder = this.recorder;
    const turn = this.currentTurn;
    this.recorder = null;
    if (recorder && turn) {
      const { text, audio, needsTranscript, source } = await recorder.finish({ transcribe: false });
      turn.answer = text;
      turn.audio = audio;
      turn.needsTranscript = needsTranscript;
      turn.transcriptSource = source;
      turn.answerMs = Date.now() - this.answerStartedAt;
      await this.persist(turn);
    }
    await this.writes;
    if (wasRunning) await this.finalize();
    this.listeners.clear();
  };
}
