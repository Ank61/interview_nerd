import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { LOGOS } from '@/data/catalog';
import { alpha, fonts, readable, usePalette } from '@/theme';

import { AppText, iconName } from './primitives';

type IconSource = { logo?: string; icon?: string; glyph?: string; color: string; title?: string };

/** Rounded tile showing a topic's logo, icon or glyph on a tinted background. */
export function TopicIcon({ item, size = 44, radius }: { item: IconSource; size?: number; radius?: number }) {
  const p = usePalette();
  const tint = readable(item.color, p.scheme);
  const r = radius ?? size * 0.3;
  const logo = item.logo ? LOGOS[item.logo] : undefined;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: r,
        backgroundColor: logo ? (p.scheme === 'dark' ? '#FFFFFF0F' : '#FFFFFF') : alpha(item.color, p.scheme === 'dark' ? 0.16 : 0.14),
        borderWidth: 1,
        borderColor: logo ? p.border : alpha(item.color, 0.22),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      {logo ? (
        <Image source={logo} style={{ width: size * 0.62, height: size * 0.62 }} contentFit="contain" />
      ) : item.glyph ? (
        <AppText style={{ fontFamily: fonts.extrabold, fontSize: size * 0.36, color: tint, letterSpacing: -0.5 }}>{item.glyph}</AppText>
      ) : item.icon ? (
        <Ionicons name={iconName(item.icon)} size={size * 0.48} color={tint} />
      ) : (
        <AppText style={{ fontFamily: fonts.bold, fontSize: size * 0.4, color: tint }}>{(item.title || '?')[0]}</AppText>
      )}
    </View>
  );
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 5,
  color,
  track,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: React.ReactNode;
}) {
  const p = usePalette();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value || 0));
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track ?? p.surface3} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color ?? p.accent}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={c * (1 - pct)}
          strokeLinecap="round"
        />
      </Svg>
      {children}
    </View>
  );
}

/** Small "Interview Nerd" wordmark. */
export function Wordmark({ size = 18 }: { size?: number }) {
  const p = usePalette();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ width: size * 1.5, height: size * 1.5, borderRadius: size * 0.45, backgroundColor: p.accent, alignItems: 'center', justifyContent: 'center' }}>
        <AppText style={{ fontFamily: fonts.extrabold, fontSize: size * 0.82, color: p.onAccent, letterSpacing: -0.5 }}>IN</AppText>
      </View>
      <AppText style={{ fontFamily: fonts.bold, fontSize: size, color: p.text, letterSpacing: -0.4 }}>
        Interview Nerd
      </AppText>
    </View>
  );
}

export function Avatar({ name, size = 48 }: { name: string; size?: number }) {
  const p = usePalette();
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: p.accent, alignItems: 'center', justifyContent: 'center' }}>
      <AppText style={{ fontFamily: fonts.bold, fontSize: size * 0.38, color: p.onAccent }}>{initials || '?'}</AppText>
    </View>
  );
}
