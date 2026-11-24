/**
 * Decides when the candidate has finished answering, from microphone activity alone,
 * so there is no "Done" button: like a real interviewer, it waits for a natural pause.
 *
 * - Before the candidate starts talking they get thinking time. After THINK_MS of silence
 *   the interviewer nudges once; after another AFTER_NUDGE_MS it moves on.
 * - Once they have really spoken, the answer ends after `endSilenceMs` of silence. Short
 *   answers and sentences that trail off ("and...", "so...") get extra time.
 */
export type PausePref = 'short' | 'normal' | 'long';
export const PAUSE_MS: Record<PausePref, number> = { short: 3000, normal: 5000, long: 8000 };

export type EndpointEvent = 'end' | 'nudge' | 'no_answer' | 'max_length';

const TICK_MS = 200;
const THINK_MS = 20_000;
const AFTER_NUDGE_MS = 20_000;
const MAX_ANSWER_MS = 5 * 60_000;
/** Less speech than this is a cough or "um", not an answer yet. */
const MIN_VOICED_MS = 700;
/** Answers shorter than this get extra silence before ending (they may still be thinking). */
const SHORT_ANSWER_MS = 3000;
const SHORT_ANSWER_EXTRA_MS = 3000;
const TRAILING_EXTRA_MS = 2500;
/** Ignore gaps between level samples longer than this when accumulating speech time. */
const MAX_SAMPLE_GAP_MS = 400;

const TRAILING = /\b(and|so|but|because|or|um+|uh+|like|then|which|that|also|basically|the|a|an|to|of|is|we|i)\s*$/i;

/** Did the live transcript stop mid-sentence ("...and so")? */
export function trailsOff(text: string) {
  return TRAILING.test(text.trim());
}

export class AnswerEndpointer {
  private startedAt = 0;
  private thinkStart = 0;
  private lastSample = 0;
  private lastVoiceAt = 0;
  private voicedMs = 0;
  private nudgedAt: number | null = null;
  private paused = false;
  private pausedFor = 0;
  private pauseStart = 0;
  private fired = false;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private opts: {
      endSilenceMs: number;
      onEvent: (e: EndpointEvent) => void;
      /** Live transcript so far (empty when transcription happens after the answer). */
      liveText?: () => string;
      now?: () => number;
    },
  ) {}

  private now() {
    return this.opts.now ? this.opts.now() : Date.now();
  }

  start() {
    const now = this.now();
    this.startedAt = now;
    this.thinkStart = now;
    this.lastSample = now;
    this.timer = setInterval(() => this.tick(), TICK_MS);
  }

  /** Feed one microphone activity sample (true = speech-level sound). */
  sample(isVoice: boolean) {
    const now = this.now();
    const gap = Math.min(MAX_SAMPLE_GAP_MS, now - this.lastSample);
    this.lastSample = now;
    if (this.paused || !isVoice) return;
    this.voicedMs += gap;
    this.lastVoiceAt = now;
  }

  get hasSpoken() {
    return this.voicedMs >= MIN_VOICED_MS;
  }

  /** Freeze while the interviewer talks (repeat, nudge, time warning). */
  pause() {
    if (this.paused) return;
    this.paused = true;
    this.pauseStart = this.now();
  }

  /** Resume listening. Silence restarts from now, and thinking time restarts if they haven't spoken. */
  resume(opts: { afterNudge?: boolean } = {}) {
    if (!this.paused) return;
    const now = this.now();
    this.pausedFor += now - this.pauseStart;
    this.paused = false;
    this.lastSample = now;
    if (this.hasSpoken) this.lastVoiceAt = now;
    else if (opts.afterNudge) this.nudgedAt = now;
    else this.thinkStart = now;
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  private emit(e: EndpointEvent) {
    if (this.fired && e !== 'nudge') return;
    if (e !== 'nudge') {
      this.fired = true;
      this.stop();
    }
    this.opts.onEvent(e);
  }

  /** Exposed for tests. */
  tick() {
    if (this.paused || this.fired) return;
    const now = this.now();
    if (now - this.startedAt - this.pausedFor > MAX_ANSWER_MS) return this.emit('max_length');
    if (!this.hasSpoken) {
      if (this.nudgedAt === null) {
        if (now - this.thinkStart >= THINK_MS) {
          this.nudgedAt = now;
          this.emit('nudge');
        }
      } else if (now - this.nudgedAt >= AFTER_NUDGE_MS) {
        this.emit('no_answer');
      }
      return;
    }
    let needed = this.opts.endSilenceMs;
    if (this.voicedMs < SHORT_ANSWER_MS) needed += SHORT_ANSWER_EXTRA_MS;
    const live = this.opts.liveText?.() ?? '';
    if (live && trailsOff(live)) needed += TRAILING_EXTRA_MS;
    if (now - this.lastVoiceAt >= needed) this.emit('end');
  }
}

/**
 * Turns raw microphone levels (dBFS, roughly -160..0) into speech / no-speech, adapting to
 * the room's background noise: the noise floor falls quickly and rises slowly.
 */
export class LevelGate {
  private floor: number | null = null;

  isVoice(db: number): boolean {
    if (!Number.isFinite(db)) return false;
    const level = Math.max(-90, db);
    if (this.floor === null) this.floor = level;
    else if (level < this.floor) this.floor = this.floor * 0.6 + level * 0.4;
    else this.floor += Math.min(0.25, (level - this.floor) * 0.01);
    return level > Math.max(this.floor + 12, -50);
  }
}
