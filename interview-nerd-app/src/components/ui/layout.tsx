import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePalette } from '@/theme';

import { AppText, Tap } from './primitives';

/** Full-screen container painted with the theme background. */
export function Screen({ children, style, edges = ['top'] }: { children: ReactNode; style?: StyleProp<ViewStyle>; edges?: ('top' | 'bottom')[] }) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        { flex: 1, backgroundColor: p.bg, paddingTop: edges.includes('top') ? insets.top : 0, paddingBottom: edges.includes('bottom') ? insets.bottom : 0 },
        style,
      ]}>
      {children}
    </View>
  );
}

/** Compact top bar with a back button, optional title and right-side actions. */
export function TopBar({
  title,
  subtitle,
  right,
  onBack,
  back = true,
  transparent,
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  onBack?: () => void;
  back?: boolean;
  transparent?: boolean;
}) {
  const p = usePalette();
  return (
    <View
      style={{
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        gap: 8,
        backgroundColor: transparent ? 'transparent' : p.bg,
      }}>
      {back && (
        <Tap
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          scale={0.9}
          onPress={() => (onBack ? onBack() : router.canGoBack() ? router.back() : router.replace('/'))}
          style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: p.surface2 }}>
          <Ionicons name="chevron-back" size={21} color={p.text} />
        </Tap>
      )}
      <View style={{ flex: 1, paddingHorizontal: 4 }}>
        {!!title && (
          <AppText variant="heading" numberOfLines={1}>
            {title}
          </AppText>
        )}
        {!!subtitle && (
          <AppText variant="caption" color="mute" numberOfLines={1}>
            {subtitle}
          </AppText>
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>{right}</View>
    </View>
  );
}
