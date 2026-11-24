import { create } from 'zustand';

import { keys, readJSON, writeJSON } from './storage';

export type ThemePref = 'system' | 'dark' | 'light';

type Settings = {
  theme: ThemePref;
  /** Reading text scale for lessons and answers. */
  fontScale: number;
  haptics: boolean;
  /** Hide interview answers until tapped (active-recall mode). */
  hideAnswers: boolean;
  /** Seconds per question in timed quizzes. */
  quizTimer: number;
};

type SettingsState = Settings & {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  set: (patch: Partial<Settings>) => void;
};

const DEFAULTS: Settings = {
  theme: 'system',
  fontScale: 1,
  haptics: true,
  hideAnswers: false,
  quizTimer: 45,
};

export const useSettings = create<SettingsState>((set, get) => ({
  ...DEFAULTS,
  hydrated: false,
  hydrate: async () => {
    const saved = await readJSON<Partial<Settings>>(keys.settings, {});
    set({ ...DEFAULTS, ...saved, hydrated: true });
  },
  set: (patch) => {
    set(patch);
    const { theme, fontScale, haptics, hideAnswers, quizTimer } = { ...get(), ...patch };
    writeJSON(keys.settings, { theme, fontScale, haptics, hideAnswers, quizTimer });
  },
}));
