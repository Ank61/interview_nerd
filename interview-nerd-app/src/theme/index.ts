import { useColorScheme } from 'react-native';

import { useSettings } from '@/store/settings';

import { palettes } from './tokens';

export * from './tokens';

/** Current palette, honouring the user's theme preference. Defaults to dark. */
export function usePalette() {
  const pref = useSettings((s) => s.theme);
  const system = useColorScheme();
  const scheme = pref === 'system' ? (system === 'light' ? 'light' : 'dark') : pref;
  return palettes[scheme];
}
