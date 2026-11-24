import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps, ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { haptic } from '@/lib/haptics';
import { alpha, fonts, radius, space, type TypeVariant, usePalette } from '@/theme';
import { type as typeScale } from '@/theme/tokens';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export function iconName(name?: string, fallback: IconName = 'book-outline'): IconName {
  if (!name) return fallback;
  const glyphs = Ionicons.glyphMap as Record<string, number>;
  if (glyphs[`${name}-outline`]) return `${name}-outline` as IconName;
  if (glyphs[name]) return name as IconName;
  return fallback;
}

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------
type AppTextProps = TextProps & {
  variant?: TypeVariant;
  color?: 'text' | 'dim' | 'mute' | 'accent' | 'danger' | 'success' | 'onAccent' | string;
  weight?: keyof typeof fonts;
  center?: boolean;
};

export function AppText({ variant = 'body', color = 'text', weight, center, style, ...rest }: AppTextProps) {
  const p = usePalette();
  const map: Record<string, string> = {
    text: p.text,
    dim: p.textDim,
    mute: p.textMute,
    accent: p.accentFg,
    danger: p.danger,
    success: p.success,
    onAccent: p.onAccent,
  };
  return (
    <Text
      maxFontSizeMultiplier={1.4}
      {...rest}
      style={[
        typeScale[variant],
        { color: map[color] ?? color },
        weight && { fontFamily: fonts[weight] },
        center && { textAlign: 'center' },
        style,
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Tap: pressable with a subtle press state + optional haptic
// ---------------------------------------------------------------------------
type TapProps = PressableProps & {
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  haptics?: boolean;
  scale?: number;
};

export function Tap({ style, pressedStyle, haptics = true, scale = 0.98, onPress, children, ...rest }: TapProps) {
  return (
    <Pressable
      {...rest}
      onPress={(e) => {
        if (haptics) haptic.tap();
        onPress?.(e);
      }}
      style={({ pressed }) => [
        style,
        pressed && { opacity: 0.86, transform: [{ scale }] },
        pressed && pressedStyle,
        rest.disabled && { opacity: 0.45 },
      ]}>
      {children as ReactNode}
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconRight?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  full?: boolean;
};

export function Button({ label, onPress, variant = 'primary', size = 'md', icon, iconRight, loading, disabled, style, full }: ButtonProps) {
  const p = usePalette();
  const h = size === 'lg' ? 54 : size === 'sm' ? 36 : 46;
  const bg =
    variant === 'primary' ? p.accent : variant === 'secondary' ? p.surface2 : variant === 'danger' ? p.dangerSoft : 'transparent';
  const fg = variant === 'primary' ? p.onAccent : variant === 'danger' ? p.danger : p.text;
  return (
    <Tap
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        {
          height: h,
          paddingHorizontal: size === 'sm' ? 14 : 20,
          borderRadius: radius.pill,
          backgroundColor: bg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          alignSelf: full ? 'stretch' : 'auto',
        },
        variant === 'outline' && { borderWidth: 1, borderColor: p.borderStrong },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={size === 'sm' ? 16 : 18} color={fg} />}
          <AppText variant={size === 'sm' ? 'label' : 'heading'} style={{ color: fg, fontSize: size === 'lg' ? 16 : size === 'sm' ? 13 : 15 }}>
            {label}
          </AppText>
          {iconRight && <Ionicons name={iconRight} size={size === 'sm' ? 16 : 18} color={fg} />}
        </>
      )}
    </Tap>
  );
}

export function IconButton({
  icon,
  onPress,
  color,
  bg,
  size = 40,
  label,
  active,
}: {
  icon: IconName;
  onPress?: () => void;
  color?: string;
  bg?: string;
  size?: number;
  label: string;
  active?: boolean;
}) {
  const p = usePalette();
  return (
    <Tap
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      scale={0.92}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg ?? (active ? p.accentSoft : p.surface2),
      }}>
      <Ionicons name={icon} size={size * 0.48} color={color ?? (active ? p.accentFg : p.text)} />
    </Tap>
  );
}

// ---------------------------------------------------------------------------
// Card / Chip / Badge
// ---------------------------------------------------------------------------
export function Card({ children, style, onPress, padded = true }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void; padded?: boolean }) {
  const p = usePalette();
  const base: ViewStyle = {
    backgroundColor: p.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: p.border,
    padding: padded ? space.lg : 0,
  };
  if (onPress)
    return (
      <Tap onPress={onPress} style={[base, style]}>
        {children}
      </Tap>
    );
  return <View style={[base, style]}>{children}</View>;
}

export function Chip({
  label,
  selected,
  onPress,
  icon,
  count,
  color,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  count?: number;
  color?: string;
}) {
  const p = usePalette();
  const fg = selected ? p.onAccent : p.textDim;
  return (
    <Tap
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        height: 36,
        borderRadius: radius.pill,
        backgroundColor: selected ? (color ?? p.accent) : p.surface,
        borderWidth: 1,
        borderColor: selected ? 'transparent' : p.border,
      }}>
      {icon && <Ionicons name={icon} size={15} color={fg} />}
      <AppText variant="label" style={{ color: selected ? p.onAccent : p.text }}>
        {label}
      </AppText>
      {count != null && (
        <AppText variant="caption" style={{ color: selected ? alpha(p.onAccent, 0.6) : p.textMute, fontFamily: fonts.mono }}>
          {count}
        </AppText>
      )}
    </Tap>
  );
}

export function Pill({ label, color, bg, icon, mono }: { label: string; color?: string; bg?: string; icon?: IconName; mono?: boolean }) {
  const p = usePalette();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        alignSelf: 'flex-start',
        paddingHorizontal: 9,
        paddingVertical: 3.5,
        borderRadius: radius.pill,
        backgroundColor: bg ?? p.surface2,
      }}>
      {icon && <Ionicons name={icon} size={11} color={color ?? p.textDim} />}
      <AppText variant="caption" style={[{ color: color ?? p.textDim }, mono && { fontFamily: fonts.mono }]}>
        {label}
      </AppText>
    </View>
  );
}

export function DifficultyPill({ value }: { value: string }) {
  const p = usePalette();
  const v = value.toLowerCase();
  const [c, bg] =
    v === 'easy' || v === 'beginner'
      ? [p.success, p.successSoft]
      : v === 'hard' || v === 'expert' || v === 'advanced'
        ? [p.danger, p.dangerSoft]
        : [p.warning, p.warningSoft];
  return <Pill label={value[0].toUpperCase() + value.slice(1)} color={c} bg={bg} />;
}

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------
export function Row({ children, gap = 8, style, align = 'center' }: { children: ReactNode; gap?: number; style?: StyleProp<ViewStyle>; align?: ViewStyle['alignItems'] }) {
  return <View style={[{ flexDirection: 'row', alignItems: align, gap }, style]}>{children}</View>;
}

export function SectionHeader({ title, eyebrow, action, onAction, style }: { title: string; eyebrow?: string; action?: string; onAction?: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: space.md }, style]}>
      <View style={{ flex: 1 }}>
        {eyebrow && (
          <AppText variant="eyebrow" color="accent" style={{ marginBottom: 4 }}>
            {eyebrow.toUpperCase()}
          </AppText>
        )}
        <AppText variant="heading" style={{ fontSize: 19 }}>
          {title}
        </AppText>
      </View>
      {action && (
        <Tap onPress={onAction} hitSlop={10}>
          <AppText variant="label" color="accent">
            {action}
          </AppText>
        </Tap>
      )}
    </View>
  );
}

export function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  const p = usePalette();
  return <View style={[{ height: StyleSheet.hairlineWidth * 2, backgroundColor: p.border }, style]} />;
}

export function ProgressBar({ value, color, height = 6, track }: { value: number; color?: string; height?: number; track?: string }) {
  const p = usePalette();
  const pct = Math.max(0, Math.min(1, value || 0));
  return (
    <View style={{ height, borderRadius: height, backgroundColor: track ?? p.surface3, overflow: 'hidden' }}>
      <View style={{ width: `${pct * 100}%`, height: '100%', borderRadius: height, backgroundColor: color ?? p.accent }} />
    </View>
  );
}

export function EmptyState({ icon, title, body, action, onAction }: { icon: IconName; title: string; body?: string; action?: string; onAction?: () => void }) {
  const p = usePalette();
  return (
    <View style={{ alignItems: 'center', paddingVertical: 48, paddingHorizontal: 32, gap: 10 }}>
      <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: p.surface2, alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
        <Ionicons name={icon} size={28} color={p.textDim} />
      </View>
      <AppText variant="heading" center>
        {title}
      </AppText>
      {body && (
        <AppText variant="body" color="dim" center>
          {body}
        </AppText>
      )}
      {action && <Button label={action} onPress={onAction} size="sm" style={{ marginTop: 8 }} />}
    </View>
  );
}

export function Loading({ label }: { label?: string }) {
  const p = usePalette();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: 48 }}>
      <ActivityIndicator color={p.accentFg} />
      {label && (
        <AppText variant="small" color="mute">
          {label}
        </AppText>
      )}
    </View>
  );
}

export const textStyles = StyleSheet.create({
  flex: { flex: 1 } as TextStyle,
});
