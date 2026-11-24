import { Platform } from 'react-native';

export type Palette = {
  scheme: 'light' | 'dark';
  bg: string;
  surface: string;
  surface2: string;
  surface3: string;
  border: string;
  borderStrong: string;
  text: string;
  textDim: string;
  textMute: string;
  /** Brand lime, used as a fill. Always pair with `onAccent` text. */
  accent: string;
  onAccent: string;
  /** Accent readable as text/icon on `bg`. */
  accentFg: string;
  accentSoft: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  info: string;
  infoSoft: string;
  overlay: string;
  codeBg: string;
  shadow: string;
};

export const palettes: Record<'light' | 'dark', Palette> = {
  dark: {
    scheme: 'dark',
    bg: '#0B0B0D',
    surface: '#141417',
    surface2: '#1B1B1F',
    surface3: '#24242A',
    border: 'rgba(255,255,255,0.07)',
    borderStrong: 'rgba(255,255,255,0.14)',
    text: '#F4F4F5',
    textDim: '#A1A1AA',
    textMute: '#6B6B75',
    accent: '#D4FF4F',
    onAccent: '#0B0B0D',
    accentFg: '#D4FF4F',
    accentSoft: 'rgba(212,255,79,0.12)',
    success: '#4ADE80',
    successSoft: 'rgba(74,222,128,0.14)',
    danger: '#F87171',
    dangerSoft: 'rgba(248,113,113,0.14)',
    warning: '#FBBF24',
    warningSoft: 'rgba(251,191,36,0.14)',
    info: '#60A5FA',
    infoSoft: 'rgba(96,165,250,0.14)',
    overlay: 'rgba(0,0,0,0.6)',
    codeBg: '#0D1117',
    shadow: '#000000',
  },
  light: {
    scheme: 'light',
    bg: '#F4F4F0',
    surface: '#FFFFFF',
    surface2: '#ECECE6',
    surface3: '#E2E2DA',
    border: 'rgba(17,17,19,0.08)',
    borderStrong: 'rgba(17,17,19,0.16)',
    text: '#111113',
    textDim: '#52525B',
    textMute: '#8A8A93',
    accent: '#D4FF4F',
    onAccent: '#0B0B0D',
    accentFg: '#4D6B00',
    accentSoft: 'rgba(132,170,0,0.14)',
    success: '#16A34A',
    successSoft: 'rgba(22,163,74,0.12)',
    danger: '#DC2626',
    dangerSoft: 'rgba(220,38,38,0.10)',
    warning: '#B45309',
    warningSoft: 'rgba(217,119,6,0.12)',
    info: '#2563EB',
    infoSoft: 'rgba(37,99,235,0.10)',
    overlay: 'rgba(17,17,19,0.45)',
    codeBg: '#0D1117',
    shadow: '#18181B',
  },
};

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 } as const;
export const radius = { sm: 8, md: 12, lg: 16, xl: 22, pill: 999 } as const;

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

export const type = {
  display: { fontFamily: fonts.extrabold, fontSize: 32, lineHeight: 36, letterSpacing: -1 },
  title: { fontFamily: fonts.bold, fontSize: 24, lineHeight: 30, letterSpacing: -0.6 },
  heading: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 23, letterSpacing: -0.2 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 15, lineHeight: 22 },
  label: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18 },
  small: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fonts.medium, fontSize: 11.5, lineHeight: 15, letterSpacing: 0.2 },
  eyebrow: { fontFamily: fonts.monoMedium, fontSize: 11, lineHeight: 14, letterSpacing: 1.4 },
  mono: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 20 },
} as const;

export type TypeVariant = keyof typeof type;

/** Hex color with alpha (0-1). Accepts #RGB or #RRGGBB. */
export function alpha(hex: string, a: number) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = Math.round(Math.max(0, Math.min(1, a)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${h.slice(0, 6)}${n}`;
}

/** Relative luminance 0..1 of a hex color. */
export function luminance(hex: string) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Make a brand color readable as foreground on the current background. */
export function readable(hex: string, scheme: 'light' | 'dark') {
  const l = luminance(hex);
  if (scheme === 'light' && l > 0.55) return mix(hex, '#000000', 0.45);
  if (scheme === 'dark' && l < 0.08) return mix(hex, '#FFFFFF', 0.45);
  return hex;
}

export function mix(a: string, b: string, t: number) {
  const p = (h: string) => {
    let x = h.replace('#', '');
    if (x.length === 3) x = x.split('').map((c) => c + c).join('');
    return [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
  };
  const [ar, ag, ab] = p(a);
  const [br, bg, bb] = p(b);
  const c = (x: number, y: number) =>
    Math.round(x + (y - x) * t)
      .toString(16)
      .padStart(2, '0');
  return `#${c(ar, br)}${c(ag, bg)}${c(ab, bb)}`;
}

export const shadow = (p: Palette, level: 1 | 2 = 1) =>
  Platform.select({
    ios: {
      shadowColor: p.shadow,
      shadowOpacity: p.scheme === 'dark' ? 0.5 : level === 1 ? 0.06 : 0.12,
      shadowRadius: level === 1 ? 10 : 24,
      shadowOffset: { width: 0, height: level === 1 ? 4 : 12 },
    },
    default: { elevation: p.scheme === 'dark' ? 0 : level === 1 ? 1 : 6 },
  });
