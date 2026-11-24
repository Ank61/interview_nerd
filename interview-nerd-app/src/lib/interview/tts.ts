/**
 * The interviewer's voice: the natural laptop voice (Kokoro) when available, otherwise the
 * phone's built-in text-to-speech (expo-speech).
 */
import * as Speech from 'expo-speech';

import { NeuralSpeaker } from './neuralVoice';
import { speakable, wordCount } from './text';

export type VoiceOption = { id: string; name: string; language: string; enhanced: boolean };

/** English voices on this device, best quality first. */
export async function englishVoices(): Promise<VoiceOption[]> {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    return voices
      .filter((v) => /^en([-_]|$)/i.test(v.language))
      .map((v) => ({ id: v.identifier, name: v.name, language: v.language, enhanced: v.quality === Speech.VoiceQuality.Enhanced }))
      .sort((a, b) => Number(b.enhanced) - Number(a.enhanced) || a.language.localeCompare(b.language) || a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

/** Default: an enhanced voice in the recognition language's region, else any enhanced English voice. */
export function pickDefaultVoice(voices: VoiceOption[], lang: string): string | undefined {
  const norm = (l: string) => l.replace('_', '-').toLowerCase();
  const region = voices.filter((v) => norm(v.language) === norm(lang));
  // Network voices need internet on Android; prefer on-device ones.
  const local = (list: VoiceOption[]) => list.filter((v) => !/network/i.test(v.id));
  return (
    local(region).find((v) => v.enhanced)?.id ??
    local(region)[0]?.id ??
    local(voices).find((v) => v.enhanced)?.id ??
    region[0]?.id ??
    voices[0]?.id
  );
}

export type SpeakResult = 'done' | 'stopped' | 'error';

/**
 * Phone text-to-speech. Resolves when finished; a generous safety timer resolves the promise
 * if the platform never reports completion, so the interview can never get stuck.
 */
export function speakPhone(text: string, opts: { voice?: string | null; rate: number; language: string }): Promise<SpeakResult> {
  const line = speakable(text);
  if (!line) return Promise.resolve('done');
  return new Promise((resolve) => {
    let settled = false;
    const finish = (r: SpeakResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(safety);
      resolve(r);
    };
    // ~2.5 words per second at rate 1.0; allow double plus slack.
    const expectedMs = (wordCount(line) / (2.5 * Math.max(0.5, opts.rate))) * 1000;
    const safety = setTimeout(() => finish('done'), expectedMs * 2 + 6000);
    try {
      Speech.speak(line, {
        language: opts.language,
        voice: opts.voice ?? undefined,
        rate: opts.rate,
        pitch: 1,
        // Use the app's audio session (set to play in silent mode, speaker output) so the
        // iPhone's silent switch can't mute the interviewer.
        useApplicationAudioSession: true,
        onDone: () => finish('done'),
        onStopped: () => finish('stopped'),
        onError: () => finish('error'),
      });
    } catch {
      finish('error');
    }
  });
}

export type VoiceConfig = {
  engine: 'laptop' | 'phone';
  /** Voice server on the laptop and the Kokoro voice id. */
  laptopUrl: string;
  laptopVoice: string;
  /** Phone voice id (also the fallback when the laptop voice fails); null = automatic. */
  phoneVoice: string | null;
  rate: number;
  language: string;
};

const neural = new NeuralSpeaker();

/** Speak with the configured engine. Resolves when finished (or 'stopped' if interrupted). */
export function speak(text: string, cfg: VoiceConfig): Promise<SpeakResult> {
  const phone = { voice: cfg.phoneVoice, rate: cfg.rate, language: cfg.language };
  if (cfg.engine === 'laptop' && cfg.laptopUrl) {
    return neural.speak(speakable(text), { baseUrl: cfg.laptopUrl, voice: cfg.laptopVoice, speed: cfg.rate }, (rest) => speakPhone(rest, phone));
  }
  return speakPhone(text, phone);
}

/** Generate upcoming speech in the background (laptop voice only). */
export function prefetchSpeech(text: string, cfg: VoiceConfig) {
  if (cfg.engine === 'laptop' && cfg.laptopUrl) neural.prefetch(speakable(text), { baseUrl: cfg.laptopUrl, voice: cfg.laptopVoice, speed: cfg.rate }).catch(() => {});
}

export function stopSpeaking() {
  neural.stop();
  return Speech.stop().catch(() => {});
}
