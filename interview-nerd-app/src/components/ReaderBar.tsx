import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, IconButton, Tap } from '@/components/ui/primitives';
import { useSettings } from '@/store/settings';
import { radius, usePalette } from '@/theme';

/** Bottom action bar for readers: previous / primary toggle / next. */
export function ReaderBar({
  onPrev,
  onNext,
  done,
  onToggle,
  doneLabel,
  todoLabel,
  position,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  done: boolean;
  onToggle: () => void;
  doneLabel: string;
  todoLabel: string;
  position?: string;
}) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 10, paddingBottom: Math.max(insets.bottom, 12), backgroundColor: p.bg, borderTopWidth: 1, borderTopColor: p.border }}>
      <IconButton icon="chevron-back" label="Previous" onPress={onPrev} size={46} color={onPrev ? p.text : p.textMute} />
      <Tap
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={done ? doneLabel : todoLabel}
        style={{ flex: 1, height: 46, borderRadius: radius.pill, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: done ? p.successSoft : p.accent }}>
        <Ionicons name={done ? 'checkmark-circle' : 'checkmark-circle-outline'} size={19} color={done ? p.success : p.onAccent} />
        <AppText variant="label" style={{ fontSize: 14.5, color: done ? p.success : p.onAccent }}>
          {done ? doneLabel : todoLabel}
        </AppText>
        {!!position && (
          <AppText variant="caption" style={{ color: done ? p.success : 'rgba(11,11,13,0.55)' }}>
            {position}
          </AppText>
        )}
      </Tap>
      <IconButton icon="chevron-forward" label="Next" onPress={onNext} size={46} color={onNext ? p.text : p.textMute} />
    </View>
  );
}

const SCALES = [0.9, 1, 1.12, 1.25];

/** Cycles the reading text size. */
export function FontSizeButton() {
  const scale = useSettings((s) => s.fontScale);
  const set = useSettings((s) => s.set);
  return (
    <IconButton
      icon="text"
      label="Change text size"
      onPress={() => {
        const i = SCALES.findIndex((x) => Math.abs(x - scale) < 0.01);
        set({ fontScale: SCALES[(i + 1) % SCALES.length] });
      }}
    />
  );
}
