/**
 * Records one answer: live transcript + audio file(s).
 *
 * Uses the phone's speech recognizer (expo-speech-recognition) with `recordingOptions.persist`,
 * so the same microphone stream is transcribed and saved to a WAV file (Android 13+ / iOS).
 *
 * Recognizer sessions can end on their own (long silence, network hiccup, Android 12 and
 * older have no continuous mode). While the candidate is still answering we restart a new
 * session and keep appending, so one answer may consist of several audio segments.
 */
import type { ExpoSpeechRecognitionOptions } from 'expo-speech-recognition';
import { Platform } from 'react-native';

import { adoptRecording, deleteRecording } from './files';
import { nativeSpeech } from './speech';
import { joinText } from './text';
import type { TranscriptSource } from './types';

export type { TranscriptSource };

type Sub = { remove(): void };
export type MicState = 'idle' | 'listening' | 'stalled';
export type RecorderError = { code: string; message: string; fatal: boolean };

/** One answer's capture: either live recognition on the phone or a recording transcribed on the laptop. */
export interface AnswerCapture {
  /** True when the transcript updates while the candidate speaks. */
  readonly live: boolean;
  /** Transcript so far (always empty when transcription happens after the answer). */
  currentText(): string;
  begin(): void;
  resume(): void;
  pause(): Promise<void>;
  finish(opts?: { transcribe?: boolean }): Promise<{ text: string; audio: string[]; needsTranscript: boolean; source: TranscriptSource }>;
  discard(): Promise<void>;
}

/** The native module; only call when nativeSpeech() returned a module. */
const SR = () => nativeSpeech()!.ExpoSpeechRecognitionModule;

/** Errors that will not fix themselves by restarting. */
const FATAL = new Set(['not-allowed', 'service-not-allowed', 'language-not-supported']);
/** Restarts of sessions that heard nothing, allowed per 30 s before giving up. */
const MAX_EMPTY_RESTARTS = 8;

export function recognitionAvailable() {
  try {
    return SR().isRecognitionAvailable();
  } catch {
    return false;
  }
}

export class AnswerRecorder implements AnswerCapture {
  readonly live = true;
  private finals: string[] = [];
  private interim = '';
  private segments: { n: number; name: string }[] = [];
  private moves: Promise<void>[] = [];
  private subs: Sub[] = [];
  private active = false; // a recognizer session is running (between start() and "end")
  private wanted = false; // the candidate is answering and we should be listening
  private segment = 0;
  private heardInSession = false;
  private emptyRestarts: number[] = [];
  private restartTimer: ReturnType<typeof setTimeout> | null = null;
  private endWaiters: (() => void)[] = [];

  constructor(
    private opts: {
      interviewId: string;
      turnId: string;
      lang: string;
      vocabulary: string[];
      persistAudio: boolean;
      onText: (text: string) => void;
      /** Microphone activity samples for end-of-answer detection. */
      onLevel?: (isVoice: boolean) => void;
      onMic: (state: MicState) => void;
      onError: (e: RecorderError) => void;
    },
  ) {}

  get text() {
    return joinText([...this.finals, this.interim]);
  }

  currentText() {
    return this.text;
  }

  /** Start listening for a fresh answer. */
  begin() {
    this.attach();
    this.resume();
  }

  /** (Re)start listening, keeping what was already said. */
  resume() {
    this.wanted = true;
    this.emptyRestarts = [];
    if (!this.active) this.startSession();
  }

  /** Stop listening but keep the answer so far (e.g. while the question is repeated). */
  async pause() {
    this.wanted = false;
    this.clearRestart();
    await this.stopSession();
    this.opts.onMic('idle');
  }

  /** Stop and return the full answer. Waits until audio files are safely moved. */
  async finish(): Promise<{ text: string; audio: string[]; needsTranscript: boolean; source: TranscriptSource }> {
    await this.pause();
    await Promise.allSettled(this.moves);
    this.detach();
    return { text: this.text, audio: this.segments.sort((a, b) => a.n - b.n).map((s) => s.name), needsTranscript: false, source: 'phone' as const };
  }

  /** Throw the answer away (used if the interview screen is torn down mid-answer without saving). */
  async discard() {
    this.wanted = false;
    this.clearRestart();
    if (this.active) {
      try {
        SR().abort();
      } catch {}
      await this.waitForEnd(2500);
    }
    await Promise.allSettled(this.moves);
    for (const s of this.segments) deleteRecording(this.opts.interviewId, s.name);
    this.detach();
  }

  // -------------------------------------------------------------------------
  private attach() {
    if (this.subs.length) return;
    const M = SR();
    this.subs = [
      M.addListener('start', () => {
        if (this.wanted) this.opts.onMic('listening');
      }),
      M.addListener('result', (ev) => {
        const t = ev.results[0]?.transcript ?? '';
        if (t.trim()) this.heardInSession = true;
        // New words mean the candidate is still talking.
        if (t.trim()) this.opts.onLevel?.(true);
        if (ev.isFinal) {
          if (t.trim()) this.finals.push(t.trim());
          this.interim = '';
        } else {
          this.interim = t;
        }
        this.opts.onText(this.text);
      }),
      M.addListener('audioend', (ev) => {
        if (!ev.uri) return;
        const n = this.segment;
        const name = `${this.opts.turnId}-${n}.wav`;
        this.moves.push(
          adoptRecording(ev.uri, this.opts.interviewId, name)
            .then((stored) => {
              if (stored) this.segments.push({ n, name: stored });
            })
            .catch(() => {}),
        );
      }),
      M.addListener('error', (ev) => {
        if (ev.error === 'aborted') return;
        if (FATAL.has(ev.error)) {
          this.wanted = false;
          this.opts.onError({ code: ev.error, message: ev.message, fatal: true });
        }
        // Anything else (no-speech, network, busy...) is handled by restarting on "end".
      }),
      M.addListener('volumechange', (ev) => this.opts.onLevel?.(ev.value > 2)),
      M.addListener('end', () => this.onEnd()),
    ];
  }

  private detach() {
    for (const s of this.subs) s.remove();
    this.subs = [];
  }

  private startSession() {
    this.segment += 1;
    this.heardInSession = false;
    this.active = true;
    const options: ExpoSpeechRecognitionOptions = {
      lang: this.opts.lang,
      interimResults: true,
      continuous: true,
      maxAlternatives: 1,
      requiresOnDeviceRecognition: false,
      addsPunctuation: Platform.OS === 'ios',
      contextualStrings: this.opts.vocabulary,
      volumeChangeEventOptions: { enabled: !!this.opts.onLevel, intervalMillis: 150 },
      iosCategory: { category: 'playAndRecord', categoryOptions: ['defaultToSpeaker', 'allowBluetooth'], mode: 'default' },
      recordingOptions: this.opts.persistAudio
        ? Platform.OS === 'ios'
          ? { persist: true, outputSampleRate: 16000, outputEncoding: 'pcmFormatInt16' }
          : { persist: true }
        : undefined,
    };
    try {
      SR().start(options);
    } catch (e) {
      this.active = false;
      this.wanted = false;
      this.opts.onError({ code: 'start-failed', message: e instanceof Error ? e.message : String(e), fatal: true });
    }
  }

  private onEnd() {
    this.active = false;
    // A session can end without a final result; keep whatever was heard.
    if (this.interim.trim()) {
      this.finals.push(this.interim.trim());
      this.interim = '';
      this.opts.onText(this.text);
    }
    const waiters = this.endWaiters;
    this.endWaiters = [];
    waiters.forEach((w) => w());
    if (!this.wanted) return;

    // The recognizer stopped by itself while the candidate is still answering: restart.
    const now = Date.now();
    if (!this.heardInSession) this.emptyRestarts = [...this.emptyRestarts.filter((t) => now - t < 30_000), now];
    if (this.emptyRestarts.length > MAX_EMPTY_RESTARTS) {
      this.wanted = false;
      this.opts.onMic('stalled');
      return;
    }
    this.clearRestart();
    this.restartTimer = setTimeout(() => {
      this.restartTimer = null;
      if (this.wanted && !this.active) this.startSession();
    }, 250);
  }

  private async stopSession() {
    if (!this.active) return;
    try {
      SR().stop();
    } catch {}
    const ended = await this.waitForEnd(4000);
    if (!ended && this.active) {
      try {
        SR().abort();
      } catch {}
      await this.waitForEnd(1500);
      this.active = false;
    }
  }

  private waitForEnd(ms: number): Promise<boolean> {
    if (!this.active) return Promise.resolve(true);
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.endWaiters = this.endWaiters.filter((w) => w !== done);
        resolve(false);
      }, ms);
      const done = () => {
        clearTimeout(timer);
        resolve(true);
      };
      this.endWaiters.push(done);
    });
  }

  private clearRestart() {
    if (this.restartTimer) clearTimeout(this.restartTimer);
    this.restartTimer = null;
  }
}
