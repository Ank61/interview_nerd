import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode } from 'react';
import { Alert, ScrollView, Switch, View } from 'react-native';

import { Segmented } from '@/components/ui/inputs';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Chip, IconName, Row, Tap } from '@/components/ui/primitives';
import { catalog } from '@/data/catalog';
import { useProgress } from '@/store/progress';
import { useSettings, type ThemePref } from '@/store/settings';
import { toast } from '@/store/toast';
import { radius, usePalette } from '@/theme';

function Group({ title, children }: { title: string; children: ReactNode }) {
  const p = usePalette();
  return (
    <View style={{ gap: 10 }}>
      <AppText variant="eyebrow" color="mute">
        {title.toUpperCase()}
      </AppText>
      <View style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>{children}</View>
    </View>
  );
}

function ToggleRow({ icon, title, body, value, onChange, first }: { icon: IconName; title: string; body?: string; value: boolean; onChange: (v: boolean) => void; first?: boolean }) {
  const p = usePalette();
  return (
    <Row gap={14} style={{ padding: 16, borderTopWidth: first ? 0 : 1, borderTopColor: p.border }}>
      <Ionicons name={icon} size={20} color={p.textDim} />
      <View style={{ flex: 1 }}>
        <AppText variant="bodyMedium">{title}</AppText>
        {!!body && (
          <AppText variant="caption" color="mute">
            {body}
          </AppText>
        )}
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: p.accent, false: p.surface3 }} thumbColor={value ? '#0B0B0D' : '#FFFFFF'} />
    </Row>
  );
}

export default function Settings() {
  const p = usePalette();
  const s = useSettings();
  const resetAll = useProgress((st) => st.resetAll);

  return (
    <Screen>
      <TopBar title="Preferences" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 24 }}>
        <Group title="Appearance">
          <View style={{ padding: 16, gap: 12 }}>
            <AppText variant="bodyMedium">Theme</AppText>
            <Segmented<ThemePref>
              value={s.theme}
              onChange={(theme) => s.set({ theme })}
              options={[
                { value: 'system', label: 'System' },
                { value: 'dark', label: 'Dark' },
                { value: 'light', label: 'Light' },
              ]}
            />
          </View>
          <View style={{ padding: 16, gap: 12, borderTopWidth: 1, borderTopColor: p.border }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <AppText variant="bodyMedium">Reading text size</AppText>
              <AppText variant="caption" color="mute">
                {Math.round(s.fontScale * 100)}%
              </AppText>
            </Row>
            <Row gap={8}>
              {[0.9, 1, 1.12, 1.25].map((v) => (
                <Chip key={v} label={v === 0.9 ? 'S' : v === 1 ? 'M' : v === 1.12 ? 'L' : 'XL'} selected={Math.abs(s.fontScale - v) < 0.01} onPress={() => s.set({ fontScale: v })} />
              ))}
            </Row>
          </View>
        </Group>

        <Group title="Learning">
          <ToggleRow first icon="eye-off-outline" title="Active recall mode" body="Hide interview answers until you tap to reveal" value={s.hideAnswers} onChange={(hideAnswers) => s.set({ hideAnswers })} />
          <View style={{ padding: 16, gap: 12, borderTopWidth: 1, borderTopColor: p.border }}>
            <AppText variant="bodyMedium">Timed quiz: seconds per question</AppText>
            <Row gap={8}>
              {[20, 30, 45, 60, 90].map((v) => (
                <Chip key={v} label={`${v}s`} selected={s.quizTimer === v} onPress={() => s.set({ quizTimer: v })} />
              ))}
            </Row>
          </View>
        </Group>

        <Group title="Feedback">
          <ToggleRow first icon="phone-portrait-outline" title="Haptic feedback" body="Subtle vibrations on taps and answers" value={s.haptics} onChange={(haptics) => s.set({ haptics })} />
        </Group>

        <Group title="Data">
          <Tap
            onPress={() =>
              Alert.alert('Reset all progress?', 'This clears XP, streaks, badges, bookmarks, quiz history and drafts for this account. This cannot be undone.', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Reset',
                  style: 'destructive',
                  onPress: async () => {
                    await resetAll();
                    toast({ kind: 'info', emoji: '🧹', title: 'Progress reset' });
                  },
                },
              ])
            }
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 }}>
            <Ionicons name="trash-outline" size={20} color={p.danger} />
            <AppText variant="bodyMedium" style={{ color: p.danger, flex: 1 }}>
              Reset my progress
            </AppText>
          </Tap>
        </Group>

        <View style={{ alignItems: 'center', gap: 4 }}>
          <AppText variant="caption" color="mute">
            Content bundle · {new Date(catalog.generatedAt).toLocaleDateString()}
          </AppText>
          <AppText variant="caption" color="mute">
            {catalog.stats.concepts} concepts · {catalog.stats.questions} Q&A · {catalog.stats.mcqs} MCQs · {catalog.stats.exercises} exercises
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}
