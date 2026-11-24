import Constants from 'expo-constants';
import { create } from 'zustand';

import type { AiSettings } from '@/lib/interview/aiTargets';
import type { PausePref } from '@/lib/interview/endpointer';
import { DEFAULT_LAPTOP_VOICE } from '@/lib/interview/neuralVoice';
import { type CloudConfig, DEFAULT_CLOUD } from '@/lib/interview/providers';
import type { VoiceConfig } from '@/lib/interview/tts';
import type { InterviewConfig } from '@/lib/interview/types';
import { whisperUrlFromOllama } from '@/lib/interview/whisper';

import { keys, readJSON, writeJSON } from './storage';

export type RecognitionLang = 'en-US' | 'en-IN' | 'en-GB';

type Prefs = {
  /** Ollama on the laptop, e.g. http://192.168.1.7:11434 */
  serverUrl: string;
  /** whisper-server on the laptop (speech-to-text when the phone can't do it, e.g. Expo Go). */
  whisperUrl: string;
  /** Slower, more accurate Whisper used to re-check answers before feedback. */
  whisperAccurateUrl: string;
  /** Re-transcribe fast transcripts with the accurate model before feedback. */
  accurateRecheck: boolean;
  /** Interviewer voice: natural laptop voice (Kokoro) or the phone's own voice. */
  voiceEngine: 'laptop' | 'phone';
  voiceUrl: string;
  laptopVoice: string;
  /** How long a silence ends an answer. */
  pause: PausePref;
  /** Optional own API key provider (the key itself is in secure storage). */
  cloud: CloudConfig;
  /** Asks follow-ups during the interview. */
  liveModel: string;
  /** Writes the detailed feedback afterwards. */
  reviewModel: string;
  /** Text-to-speech voice id; null = automatic. */
  voice: string | null;
  rate: number;
  lang: RecognitionLang;
  /** Last setup, so the next interview starts from the same choices. */
  setup: InterviewConfig;
};

type PrefsState = Prefs & {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  set: (patch: Partial<Prefs>) => void;
  setSetup: (patch: Partial<InterviewConfig>) => void;
};

/** Same laptop host, different port. */
export function withPort(url: string, port: number) {
  const m = /^(https?:\/\/[^/:]+)(:\d+)?/i.exec(url.trim());
  return m ? `${m[1]}:${port}` : '';
}

/**
 * In development the phone reaches Metro on the laptop's LAN address, so the same
 * host is the best first guess for Ollama.
 */
function guessServerUrl() {
  const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? '';
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host === 'localhost') return `http://${host}:11434`;
  return '';
}

export const DEFAULT_SETUP: InterviewConfig = {
  years: 2,
  topics: [],
  difficulty: 'medium',
  minutes: 10,
  mode: 'ai',
  intro: true,
  audioOnly: false,
};

const DEFAULTS: Prefs = {
  serverUrl: guessServerUrl(),
  whisperUrl: whisperUrlFromOllama(guessServerUrl()),
  whisperAccurateUrl: withPort(guessServerUrl(), 11437),
  accurateRecheck: true,
  voiceEngine: 'laptop',
  voiceUrl: withPort(guessServerUrl(), 11436),
  laptopVoice: DEFAULT_LAPTOP_VOICE,
  pause: 'normal',
  cloud: DEFAULT_CLOUD,
  liveModel: 'llama3:8b',
  reviewModel: 'llama3:8b',
  voice: null,
  rate: 1,
  lang: 'en-US',
  setup: DEFAULT_SETUP,
};

const persist = (s: Prefs) =>
  writeJSON(keys.interview, {
    serverUrl: s.serverUrl,
    whisperUrl: s.whisperUrl,
    whisperAccurateUrl: s.whisperAccurateUrl,
    accurateRecheck: s.accurateRecheck,
    voiceEngine: s.voiceEngine,
    voiceUrl: s.voiceUrl,
    laptopVoice: s.laptopVoice,
    pause: s.pause,
    cloud: s.cloud,
    liveModel: s.liveModel,
    reviewModel: s.reviewModel,
    voice: s.voice,
    rate: s.rate,
    lang: s.lang,
    setup: s.setup,
  });

export const useInterviewPrefs = create<PrefsState>((set, get) => ({
  ...DEFAULTS,
  hydrated: false,
  hydrate: async () => {
    if (get().hydrated) return;
    const saved = await readJSON<Partial<Prefs>>(keys.interview, {});
    set({
      ...DEFAULTS,
      ...saved,
      serverUrl: saved.serverUrl || DEFAULTS.serverUrl,
      whisperUrl: saved.whisperUrl || whisperUrlFromOllama(saved.serverUrl || DEFAULTS.serverUrl),
      whisperAccurateUrl: saved.whisperAccurateUrl || withPort(saved.serverUrl || DEFAULTS.serverUrl, 11437),
      voiceUrl: saved.voiceUrl || withPort(saved.serverUrl || DEFAULTS.serverUrl, 11436),
      cloud: { ...DEFAULT_CLOUD, ...saved.cloud },
      setup: { ...DEFAULT_SETUP, ...saved.setup },
      hydrated: true,
    });
  },
  set: (patch) => {
    set(patch);
    persist({ ...get(), ...patch });
  },
  setSetup: (patch) => {
    const setup = { ...get().setup, ...patch };
    set({ setup });
    persist({ ...get(), setup });
  },
}));

/** Voice settings in the shape the speech engine expects. */
export function voiceConfigOf(p: Prefs): VoiceConfig {
  return { engine: p.voiceEngine, laptopUrl: p.voiceUrl, laptopVoice: p.laptopVoice, phoneVoice: p.voice, rate: p.rate, language: p.lang };
}

/** AI and speech-to-text settings for building fallback chains. */
export function aiSettingsOf(p: Prefs): AiSettings {
  return {
    serverUrl: p.serverUrl,
    liveModel: p.liveModel,
    reviewModel: p.reviewModel,
    whisperUrl: p.whisperUrl,
    whisperAccurateUrl: p.whisperAccurateUrl,
    cloud: p.cloud,
  };
}
