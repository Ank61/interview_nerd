import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, Tap } from '@/components/ui/primitives';
import { TopicIcon } from '@/components/ui/visuals';
import { coreTopics } from '@/data/catalog';
import { haptic } from '@/lib/haptics';
import { useAuth, type User } from '@/store/auth';
import { radius, usePalette } from '@/theme';

const GOALS: { value: NonNullable<User['goal']>; title: string; body: string }[] = [
  { value: 'Junior', title: 'Junior', body: 'Fundamentals and first-job interviews' },
  { value: 'Mid', title: 'Mid-level', body: 'Deeper concepts and practical trade-offs' },
  { value: 'Senior', title: 'Senior', body: 'Architecture, scale and system design' },
];

export default function Onboarding() {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const user = useAuth((s) => s.user);
  const update = useAuth((s) => s.updateProfile);
  const [goal, setGoal] = useState<User['goal']>(user?.goal ?? 'Mid');
  const [focus, setFocus] = useState<string[]>(user?.focus ?? []);
  const [busy, setBusy] = useState(false);

  const toggle = (id: string) => setFocus((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const finish = async () => {
    setBusy(true);
    await update({ goal, focus, onboarded: true });
    haptic.success();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: p.bg }}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 28, paddingHorizontal: 20, paddingBottom: 140, gap: 28 }}>
        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="accent">
            HI {user?.name.split(' ')[0].toUpperCase()} 👋
          </AppText>
          <AppText variant="display">Let’s tailor your prep</AppText>
          <AppText variant="body" color="dim">
            Pick your target level and the topics you care about. You can change this anytime.
          </AppText>
        </View>

        <View style={{ gap: 10 }}>
          <AppText variant="heading">Target level</AppText>
          {GOALS.map((g) => {
            const active = goal === g.value;
            return (
              <Tap
                key={g.value}
                onPress={() => setGoal(g.value)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                  padding: 16,
                  borderRadius: radius.lg,
                  backgroundColor: active ? p.accentSoft : p.surface,
                  borderWidth: 1.5,
                  borderColor: active ? p.accentFg : p.border,
                }}>
                <View style={{ flex: 1, gap: 2 }}>
                  <AppText variant="heading" style={{ fontSize: 16 }}>
                    {g.title}
                  </AppText>
                  <AppText variant="small" color="mute">
                    {g.body}
                  </AppText>
                </View>
                <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={22} color={active ? p.accentFg : p.textMute} />
              </Tap>
            );
          })}
        </View>

        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <AppText variant="heading">Focus topics</AppText>
            <AppText variant="small" color="mute">
              {focus.length} selected
            </AppText>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {coreTopics.map((t) => {
              const active = focus.includes(t.id);
              return (
                <Tap
                  key={t.id}
                  onPress={() => toggle(t.id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    paddingVertical: 7,
                    paddingLeft: 7,
                    paddingRight: 12,
                    borderRadius: radius.pill,
                    backgroundColor: active ? p.accentSoft : p.surface,
                    borderWidth: 1.5,
                    borderColor: active ? p.accentFg : p.border,
                  }}>
                  <TopicIcon item={t} size={26} radius={13} />
                  <AppText variant="label">{t.title}</AppText>
                  {active && <Ionicons name="checkmark-circle" size={16} color={p.accentFg} />}
                </Tap>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingBottom: insets.bottom + 16, backgroundColor: p.bg, borderTopWidth: 1, borderTopColor: p.border, gap: 8 }}>
        <Button label={focus.length ? 'Start learning' : 'Skip for now'} size="lg" iconRight="arrow-forward" onPress={finish} loading={busy} full />
      </View>
    </View>
  );
}
