/**
 * Records an answer with expo-audio (works in Expo Go) and transcribes it when the answer
 * is finished: with the user's cloud speech-to-text if configured, else Whisper on the laptop.
 * No live transcript, but microphone levels drive end-of-answer detection.
 *
 * iOS records 16 kHz mono 16-bit WAV, which every Whisper server reads directly. Android in
 * Expo Go can only record AAC (.m4a); laptop Whisper then needs `--convert` (ffmpeg), while
 * Android APK builds use the native recognizer instead (recorder.ts).
 */
import { AudioModule, type AudioRecorder, type RecordingOptions, setAudioModeAsync } from 'expo-audio';
import { Platform } from 'react-native';

import { LevelGate } from './endpointer';
import { adoptRecording, deleteRecording, recordingUri } from './files';
import type { AnswerCapture, MicState, RecorderError, TranscriptSource } from './recorder';
import { joinText } from './text';

const EXT = Platform.OS === 'ios' ? '.wav' : '.m4a';
const LEVEL_POLL_MS = 150;

/**
 * Platform-specific recorder options, flattened the way expo-audio's own useAudioRecorder hook
 * passes them to the native AudioRecorder. Metering is on for silence detection.
 */
const NATIVE_OPTIONS =
  Platform.OS === 'ios'
    ? {
        extension: '.wav',
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 256000,
        isMeteringEnabled: true,
        outputFormat: 'lpcm',
        audioQuality: 96,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      }
    : {
        extension: '.m4a',
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 64000,
        isMeteringEnabled: true,
        outputFormat: 'mpeg4',
        audioEncoder: 'aac',
      };

/** One speech-to-text engine for finished recordings. */
export type Transcriber = { label: string; source: TranscriptSource; transcribe: (uri: string) => Promise<string> };

/** Speaker playback needs recording mode off on iOS, otherwise the interviewer plays through the earpiece. */
export function setRecordingMode(on: boolean) {
  return setAudioModeAsync({ allowsRecording: on, playsInSilentMode: true }).catch(() => {});
}

export class FileAnswerRecorder implements AnswerCapture {
  readonly live = false;
  private rec: AudioRecorder | null = null;
  private starting: Promise<void> | null = null;
  private segment = 0;
  private segments: string[] = [];
  private poll: ReturnType<typeof setInterval> | null = null;
  private gate = new LevelGate();

  constructor(
    private opts: {
      interviewId: string;
      turnId: string;
      /** Tried in order; empty = keep the audio and transcribe later (during feedback). */
      transcribers: Transcriber[];
      onLevel?: (isVoice: boolean) => void;
      onMic: (state: MicState) => void;
      onError: (e: RecorderError) => void;
    },
  ) {}

  currentText() {
    return '';
  }

  begin() {
    this.resume();
  }

  resume() {
    if (this.rec || this.starting) return;
    this.starting = this.startSegment().finally(() => {
      this.starting = null;
    });
  }

  private async startSegment() {
    try {
      await setRecordingMode(true);
      // AudioModule is the native module object (not an ES namespace); expo-audio's useAudioRecorder does the same.
      // eslint-disable-next-line import/namespace
      const rec = new AudioModule.AudioRecorder(NATIVE_OPTIONS as unknown as Partial<RecordingOptions>);
      await rec.prepareToRecordAsync();
      rec.record();
      this.segment += 1;
      this.rec = rec;
      this.startPolling(rec);
      this.opts.onMic('listening');
    } catch (e) {
      this.opts.onMic('stalled');
      this.opts.onError({ code: 'record-failed', message: e instanceof Error ? e.message : String(e), fatal: true });
    }
  }

  private startPolling(rec: AudioRecorder) {
    this.stopPolling();
    if (!this.opts.onLevel) return;
    this.poll = setInterval(() => {
      try {
        const db = rec.getStatus().metering;
        if (typeof db === 'number') this.opts.onLevel?.(this.gate.isVoice(db));
      } catch {}
    }, LEVEL_POLL_MS);
  }

  private stopPolling() {
    if (this.poll) clearInterval(this.poll);
    this.poll = null;
  }

  async pause() {
    if (this.starting) await this.starting;
    this.stopPolling();
    const rec = this.rec;
    this.rec = null;
    if (rec) {
      try {
        await rec.stop();
      } catch {}
      const uri = rec.uri;
      if (uri) {
        const stored = await adoptRecording(uri, this.opts.interviewId, `${this.opts.turnId}-${this.segment}${EXT}`).catch(() => null);
        if (stored) this.segments.push(stored);
      }
      try {
        rec.release();
      } catch {}
    }
    await setRecordingMode(false);
    this.opts.onMic('idle');
  }

  async finish(o: { transcribe?: boolean } = {}) {
    await this.pause();
    const audio = [...this.segments];
    if (!audio.length) return { text: '', audio, needsTranscript: false, source: 'live' as TranscriptSource };
    if (o.transcribe === false || !this.opts.transcribers.length) return { text: '', audio, needsTranscript: true, source: 'live' as TranscriptSource };
    for (const t of this.opts.transcribers) {
      try {
        const parts: string[] = [];
        for (const name of audio) {
          const uri = recordingUri(this.opts.interviewId, name);
          if (uri) parts.push(await t.transcribe(uri));
        }
        return { text: joinText(parts), audio, needsTranscript: false, source: t.source };
      } catch {
        // Try the next engine.
      }
    }
    return { text: '', audio, needsTranscript: true, source: 'live' as TranscriptSource };
  }

  async discard() {
    await this.pause();
    for (const name of this.segments) deleteRecording(this.opts.interviewId, name);
    this.segments = [];
  }
}
