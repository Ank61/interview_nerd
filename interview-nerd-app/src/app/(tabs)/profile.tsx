import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';

import { StatTile } from '@/components/rows';
import { Screen } from '@/components/ui/layout';
import { AppText, IconName, ProgressBar, Row, SectionHeader, Tap } from '@/components/ui/primitives';
import { Avatar, TopicIcon } from '@/components/ui/visuals';
import { catalog } from '@/data/catalog';
import { BADGES, RARITY_COLOR, addDays, currentStreak, dayKey, levelFor, longestStreak } from '@/lib/gamification';
import { useAuth } from '@/store/auth';
import { topicLearnedCount, useProgress } from '@/store/progress';
import { alpha, fonts, radius, readable, usePalette } from '@/theme';

export default function Profile() {
  const p = usePalette();
  const user = useAuth((s) => s.user);
  const logOut = useAuth((s) => s.logOut);
  const st = useProgress();
  const lvl = levelFor(st.xp);
  const streak = currentStreak(st.activity);
  const bestStreak = longestStreak(st.activity);
  const accuracy = st.totals.answered ? Math.round((st.totals.correct / st.totals.answered) * 100) : 0;
  const earned = BADGES.filter((b) => st.badges[b.id]);

  const topicProgress = catalog.topics
    .map((t) => ({ t, n: topicLearnedCount(st.learned, t.id) }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n / b.t.counts.concepts - a.n / a.t.counts.concepts)
    .slice(0, 6);

  const menu: { icon: IconName; label: string; onPress: () => void; danger?: boolean }[] = [
    { icon: 'trophy-outline', label: 'Achievements', onPress: () => router.push('/achievements') },
    { icon: 'person-outline', label: 'Account & security', onPress: () => router.push('/account') },
    { icon: 'options-outline', label: 'Preferences', onPress: () => router.push('/settings') },
    { icon: 'compass-outline', label: 'Update focus topics', onPress: () => router.push('/onboarding') },
    {
      icon: 'log-out-outline',
      label: 'Log out',
      danger: true,
      onPress: () =>
        Alert.alert('Log out?', 'Your progress stays saved on this device for next time.', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Log out', style: 'destructive', onPress: logOut },
        ]),
    },
  ];

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 26 }} showsVerticalScrollIndicator={false}>
        <Row gap={16} style={{ paddingTop: 14 }}>
          <Avatar name={user?.name || ''} size={68} />
          <View style={{ flex: 1, gap: 2 }}>
            <AppText variant="title" numberOfLines={1}>
              {user?.name}
            </AppText>
            <AppText variant="small" color="mute" numberOfLines={1}>
              {user?.email}
            </AppText>
            <Row gap={6} style={{ marginTop: 4 }}>
              <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: p.accentSoft }}>
                <AppText variant="caption" color="accent">
                  Lv {lvl.level} · {lvl.name}
                </AppText>
              </View>
              {user?.goal && (
                <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: p.surface2 }}>
                  <AppText variant="caption" color="dim">
                    {user.goal} track
                  </AppText>
                </View>
              )}
            </Row>
          </View>
        </Row>

        <View style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 10 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <AppText variant="label">{st.xp.toLocaleString()} XP</AppText>
            <AppText variant="caption" color="mute">
              {lvl.next ? `${lvl.next.xp.toLocaleString()} XP for ${lvl.next.name}` : 'Max level'}
            </AppText>
          </Row>
          <ProgressBar value={lvl.progress} height={8} />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          <StatTile icon="flame" value={streak} label={`Day streak${bestStreak > streak ? ` · best ${bestStreak}` : ''}`} color="#FB923C" />
          <StatTile icon="book" value={Object.keys(st.learned).length} label="Concepts learned" />
          <StatTile icon="chatbubbles" value={Object.keys(st.reviewed).length} label="Answers reviewed" color="#60A5FA" />
          <StatTile icon="code-slash" value={Object.keys(st.solved).length} label="Exercises solved" color="#F472B6" />
          <StatTile icon="checkmark-done" value={st.totals.answered} label="MCQs answered" color="#A78BFA" />
          <StatTile icon="analytics" value={`${accuracy}%`} label="MCQ accuracy" color="#22C55E" />
        </View>

        <View>
          <SectionHeader title="Activity" eyebrow="Last 15 weeks" />
          <Heatmap activity={st.activity} />
        </View>

        <View>
          <SectionHeader title="Badges" eyebrow={`${earned.length} of ${BADGES.length} unlocked`} action="View all" onAction={() => router.push('/achievements')} />
          {earned.length ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 20 }} style={{ marginRight: -20 }}>
              {earned.map((b) => (
                <View key={b.id} style={{ width: 96, alignItems: 'center', gap: 6, padding: 12, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: alpha(RARITY_COLOR[b.rarity], 0.35) }}>
                  <AppText style={{ fontSize: 30 }}>{b.icon}</AppText>
                  <AppText variant="caption" center numberOfLines={2}>
                    {b.name}
                  </AppText>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Tap onPress={() => router.push('/achievements')} style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
              <AppText variant="small" color="dim">
                Learn a concept or finish a quiz to unlock your first badge 🎯
              </AppText>
            </Tap>
          )}
        </View>

        {topicProgress.length > 0 && (
          <View>
            <SectionHeader title="Topic progress" />
            <View style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>
              {topicProgress.map(({ t, n }, i) => (
                <Tap key={t.id} onPress={() => router.push(`/topic/${t.id}`)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderTopWidth: i ? 1 : 0, borderTopColor: p.border }}>
                  <TopicIcon item={t} size={34} />
                  <View style={{ flex: 1, gap: 6 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <AppText variant="label">{t.title}</AppText>
                      <AppText variant="caption" style={{ fontFamily: fonts.mono, color: p.textMute }}>
                        {n}/{t.counts.concepts}
                      </AppText>
                    </Row>
                    <ProgressBar value={n / t.counts.concepts} height={4} color={readable(t.color, p.scheme)} />
                  </View>
                </Tap>
              ))}
            </View>
          </View>
        )}

        <View style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>
          {menu.map((m, i) => (
            <Tap key={m.label} onPress={m.onPress} scale={0.99} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 15, borderTopWidth: i ? 1 : 0, borderTopColor: p.border }}>
              <Ionicons name={m.icon} size={20} color={m.danger ? p.danger : p.textDim} />
              <AppText variant="bodyMedium" style={{ flex: 1, color: m.danger ? p.danger : p.text }}>
                {m.label}
              </AppText>
              {!m.danger && <Ionicons name="chevron-forward" size={17} color={p.textMute} />}
            </Tap>
          ))}
        </View>
        <AppText variant="caption" color="mute" center>
          Interview Nerd · all data stored locally on this device
        </AppText>
      </ScrollView>
    </Screen>
  );
}

function Heatmap({ activity }: { activity: Record<string, number> }) {
  const p = usePalette();
  const weeks = 15;
  const today = new Date();
  const start = addDays(today, -(weeks * 7 - 1) - today.getDay());
  const cols = Array.from({ length: weeks + 1 }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)));
  const level = (v: number) => (v <= 0 ? 0 : v < 20 ? 1 : v < 50 ? 2 : v < 100 ? 3 : 4);
  const shades = [p.surface3, alpha(p.accent, 0.3), alpha(p.accent, 0.55), alpha(p.accent, 0.8), p.accent];
  const activeDays = Object.values(activity).filter((v) => v > 0).length;
  return (
    <View style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'space-between' }}>
        {cols.map((col, i) => (
          <View key={i} style={{ gap: 4, flex: 1 }}>
            {col.map((d) => {
              const future = d > today;
              return <View key={dayKey(d)} style={{ aspectRatio: 1, borderRadius: 3, backgroundColor: future ? 'transparent' : shades[level(activity[dayKey(d)] || 0)] }} />;
            })}
          </View>
        ))}
      </View>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="caption" color="mute">
          {activeDays} active day{activeDays === 1 ? '' : 's'}
        </AppText>
        <Row gap={4}>
          <AppText variant="caption" color="mute">
            Less
          </AppText>
          {shades.map((c, i) => (
            <View key={i} style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: c }} />
          ))}
          <AppText variant="caption" color="mute">
            More
          </AppText>
        </Row>
      </Row>
    </View>
  );
}
