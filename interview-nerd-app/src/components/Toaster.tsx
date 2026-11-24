import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { haptic } from '@/lib/haptics';
import { useToast } from '@/store/toast';
import { fonts, shadow, usePalette } from '@/theme';

import { AppText, Tap } from './ui/primitives';

/** Shows queued toasts one at a time at the top of the screen. */
export function Toaster() {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const current = useToast((s) => s.queue[0]);
  const shift = useToast((s) => s.shift);

  useEffect(() => {
    if (!current) return;
    if (current.kind === 'badge' || current.kind === 'level') haptic.success();
    const t = setTimeout(shift, current.kind === 'xp' ? 1500 : 2600);
    return () => clearTimeout(t);
  }, [current, shift]);

  if (!current) return null;
  const isXp = current.kind === 'xp';
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', top: insets.top + 8, left: 0, right: 0, alignItems: 'center', zIndex: 1000 }}>
      <Animated.View key={current.id} entering={FadeInUp.springify().damping(18)} exiting={FadeOutUp.duration(180)}>
        <Tap
          onPress={shift}
          haptics={false}
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingVertical: isXp ? 9 : 12,
              paddingLeft: isXp ? 12 : 14,
              paddingRight: 18,
              borderRadius: 999,
              backgroundColor: isXp ? p.accent : p.surface3,
              borderWidth: isXp ? 0 : 1,
              borderColor: p.borderStrong,
              maxWidth: 360,
            },
            shadow(p, 2),
          ]}>
          {isXp ? (
            <Ionicons name="flash" size={16} color={p.onAccent} />
          ) : current.emoji ? (
            <AppText style={{ fontSize: 22 }}>{current.emoji}</AppText>
          ) : (
            <Ionicons name={current.kind === 'error' ? 'alert-circle' : 'information-circle'} size={20} color={current.kind === 'error' ? p.danger : p.accentFg} />
          )}
          <View style={{ flexShrink: 1 }}>
            <AppText style={{ fontFamily: fonts.bold, fontSize: 14, color: isXp ? p.onAccent : p.text }} numberOfLines={1}>
              {current.title}
            </AppText>
            {!!current.sub && !isXp && (
              <AppText variant="caption" color="dim" numberOfLines={2}>
                {current.sub}
              </AppText>
            )}
          </View>
        </Tap>
      </Animated.View>
    </View>
  );
}
