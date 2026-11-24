import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { TopicCard } from '@/components/rows';
import { Screen } from '@/components/ui/layout';
import { AppText, IconName, Row, SectionHeader, Tap } from '@/components/ui/primitives';
import { Avatar, ProgressRing, TopicIcon } from '@/components/ui/visuals';
import { catalog, coreTopics, getTopic } from '@/data/catalog';
import { currentStreak, dayKey, levelFor, seeded } from '@/lib/gamification';
import { useAuth } from '@/store/auth';
import { useProgress } from '@/store/progress';
import { alpha, fonts, radius, usePalette } from '@/theme';

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Burning the midnight oil';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/** Deterministic "question of the day" drawn from interview set previews. */
function useQuestionOfTheDay() {
  return useMemo(() => {
    const pool: { topicId: string; set: number; i: number; q: string }[] = [];
    for (const t of catalog.topics) t.sets.forEach((s, si) => s.preview.forEach((q, i) => pool.push({ topicId: t.id, set: si, i, q })));
    const rand = seeded(`qotd-${dayKey()}`);
    return pool[Math.floor(rand() * pool.length)];
  }, []);
}

export default function Home() {
  const p = usePalette();
  const user = useAuth((s) => s.user);
  const xp = useProgress((s) => s.xp);
  const activity = useProgress((s) => s.activity);
  const recent = useProgress((s) => s.recent);
  const dailyDone = useProgress((s) => !!s.daily[dayKey()]);
  const mistakes = useProgress((s) => Object.keys(s.mistakes).length);
  const streak = currentStreak(activity);
  const todayXp = activity[dayKey()] || 0;
  const lvl = levelFor(xp);
  const qotd = useQuestionOfTheDay();
  const qTopic = getTopic(qotd?.topicId);

  const focusTopics = (user?.focus?.length ? user.focus.map((id) => getTopic(id)).filter(Boolean) : coreTopics.slice(0, 8)) as typeof coreTopics;
  const last = recent[0];

  const quick: { icon: IconName; label: string; sub: string; href: string; color: string }[] = [
    { icon: 'checkmark-done', label: 'MCQ Quizzes', sub: `${catalog.stats.mcqs.toLocaleString()} questions`, href: '/practice', color: '#60A5FA' },
    { icon: 'code-slash', label: 'Coding Labs', sub: `${catalog.stats.exercises} exercises`, href: '/practice', color: '#F472B6' },
    { icon: 'cloud', label: 'AWS', sub: `${catalog.topics.filter((t) => t.aws).length} services`, href: '/aws', color: '#FF9900' },
    { icon: 'document-text', label: 'Cheat Sheets', sub: `${catalog.resources.length} references`, href: '/resources', color: '#22C55E' },
  ];

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 28 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Row style={{ paddingTop: 10, justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <AppText variant="small" color="mute">
              {greeting()},
            </AppText>
            <AppText variant="title" numberOfLines={1}>
              {user?.name.split(' ')[0]}
            </AppText>
          </View>
          <Row gap={10}>
            <Tap
              onPress={() => router.push('/search')}
              accessibilityLabel="Search"
              style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="search" size={20} color={p.text} />
            </Tap>
            <Tap onPress={() => router.push('/profile')} accessibilityLabel="Profile">
              <Avatar name={user?.name || ''} size={44} />
            </Tap>
          </Row>
        </Row>

        {/* Level + streak */}
        <View style={{ borderRadius: radius.xl, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, padding: 18, gap: 16 }}>
          <Row gap={16}>
            <ProgressRing value={lvl.progress} size={68} stroke={6}>
              <AppText style={{ fontFamily: fonts.extrabold, fontSize: 20, color: p.text }}>{lvl.level}</AppText>
            </ProgressRing>
            <View style={{ flex: 1, gap: 4 }}>
              <AppText variant="eyebrow" color="accent">
                LEVEL {lvl.level}
              </AppText>
              <AppText variant="heading" style={{ fontSize: 18 }}>
                {lvl.name}
              </AppText>
              <AppText variant="small" color="mute">
                {lvl.next ? `${lvl.next.xp - xp} XP to ${lvl.next.name}` : 'Max level reached'}
              </AppText>
            </View>
          </Row>
          <Row gap={10}>
            {[
              { icon: 'flame' as IconName, value: streak, label: streak === 1 ? 'day streak' : 'day streak', color: '#FB923C' },
              { icon: 'flash' as IconName, value: xp.toLocaleString(), label: 'total XP', color: p.accentFg },
              { icon: 'today' as IconName, value: todayXp, label: 'XP today', color: '#60A5FA' },
            ].map((s) => (
              <View key={s.label} style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: radius.md, backgroundColor: p.surface2, gap: 2 }}>
                <Row gap={6}>
                  <Ionicons name={s.icon} size={15} color={s.color} />
                  <AppText style={{ fontFamily: fonts.bold, fontSize: 17, color: p.text }}>{s.value}</AppText>
                </Row>
                <AppText variant="caption" color="mute">
                  {s.label}
                </AppText>
              </View>
            ))}
          </Row>
        </View>

        {/* Daily challenge */}
        <Tap onPress={() => router.push('/quiz/daily')} scale={0.985}>
          <LinearGradient
            colors={dailyDone ? [p.surface, p.surface] : ['#D4FF4F', '#A3E635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: radius.xl, padding: 18, borderWidth: dailyDone ? 1 : 0, borderColor: p.border }}>
            <Row gap={14}>
              <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: dailyDone ? p.successSoft : 'rgba(11,11,13,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={dailyDone ? 'checkmark-circle' : 'trophy'} size={26} color={dailyDone ? p.success : '#0B0B0D'} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <AppText variant="eyebrow" style={{ color: dailyDone ? p.textMute : 'rgba(11,11,13,0.6)' }}>
                  DAILY CHALLENGE
                </AppText>
                <AppText variant="heading" style={{ color: dailyDone ? p.text : '#0B0B0D' }}>
                  {dailyDone ? 'Done for today — nice!' : '5 mixed questions'}
                </AppText>
                <AppText variant="small" style={{ color: dailyDone ? p.textMute : 'rgba(11,11,13,0.65)' }}>
                  {dailyDone ? 'Come back tomorrow to keep your streak' : 'Finish for a +15 XP bonus'}
                </AppText>
              </View>
              <Ionicons name="arrow-forward" size={20} color={dailyDone ? p.textMute : '#0B0B0D'} />
            </Row>
          </LinearGradient>
        </Tap>

        {/* Continue */}
        {last && (
          <View>
            <SectionHeader title="Continue where you left off" />
            <Tap
              onPress={() => router.push(last.href as never)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
              <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: p.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={last.kind === 'concept' ? 'book' : last.kind === 'question' ? 'chatbubbles' : 'code-slash'} size={20} color={p.accentFg} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <AppText variant="bodyMedium" numberOfLines={1}>
                  {last.title}
                </AppText>
                <AppText variant="small" color="mute" numberOfLines={1}>
                  {last.sub}
                </AppText>
              </View>
              <Ionicons name="play-circle" size={28} color={p.accentFg} />
            </Tap>
          </View>
        )}

        {/* Question of the day */}
        {qotd && qTopic && (
          <View>
            <SectionHeader eyebrow="Question of the day" title="Can you answer this?" />
            <Tap
              onPress={() => router.push(`/question/${qotd.topicId}?s=${qotd.set}&i=${qotd.i}`)}
              style={{ padding: 18, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 14 }}>
              <Row gap={10}>
                <TopicIcon item={qTopic} size={28} radius={8} />
                <AppText variant="label" color="dim">
                  {qTopic.title} · {qTopic.sets[qotd.set]?.label}
                </AppText>
              </Row>
              <AppText style={{ fontFamily: fonts.semibold, fontSize: 18, lineHeight: 26, color: p.text, letterSpacing: -0.2 }}>“{qotd.q}”</AppText>
              <Row gap={6}>
                <AppText variant="label" color="accent">
                  Reveal the answer
                </AppText>
                <Ionicons name="arrow-forward" size={14} color={p.accentFg} />
              </Row>
            </Tap>
          </View>
        )}

        {/* Focus topics */}
        <View>
          <SectionHeader title={user?.focus?.length ? 'Your topics' : 'Popular topics'} action="See all" onAction={() => router.push('/learn')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 20 }} style={{ marginRight: -20 }}>
            {focusTopics.map((t) => (
              <TopicCard key={t.id} topic={t} compact onPress={() => router.push(`/topic/${t.id}`)} />
            ))}
          </ScrollView>
        </View>

        {/* Explore */}
        <View>
          <SectionHeader title="Explore" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {quick.map((q) => (
              <Tap
                key={q.label}
                onPress={() => router.push(q.href as never)}
                style={{ width: '47%', flexGrow: 1, padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 14 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: alpha(q.color, 0.15), alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={q.icon} size={20} color={q.color} />
                </View>
                <View style={{ gap: 2 }}>
                  <AppText variant="label" style={{ fontSize: 14.5 }}>
                    {q.label}
                  </AppText>
                  <AppText variant="caption" color="mute">
                    {q.sub}
                  </AppText>
                </View>
              </Tap>
            ))}
          </View>
        </View>

        {/* Mistakes nudge */}
        {mistakes > 0 && (
          <Tap
            onPress={() => router.push('/quiz/mistakes')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, backgroundColor: p.dangerSoft }}>
            <Ionicons name="refresh-circle" size={30} color={p.danger} />
            <View style={{ flex: 1 }}>
              <AppText variant="label" style={{ fontSize: 14.5 }}>
                Review {mistakes} missed question{mistakes === 1 ? '' : 's'}
              </AppText>
              <AppText variant="caption" color="dim">
                Spaced repetition: answer them right to clear the list
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={p.danger} />
          </Tap>
        )}

        {/* Weekly activity */}
        <WeekStrip activity={activity} />
      </ScrollView>
    </Screen>
  );
}

function WeekStrip({ activity }: { activity: Record<string, number> }) {
  const p = usePalette();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const max = Math.max(20, ...days.map((d) => activity[dayKey(d)] || 0));
  return (
    <View style={{ padding: 18, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 14 }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="label">This week</AppText>
        <AppText variant="caption" color="mute">
          {days.reduce((n, d) => n + (activity[dayKey(d)] || 0), 0)} XP
        </AppText>
      </Row>
      <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end', height: 86 }}>
        {days.map((d) => {
          const v = activity[dayKey(d)] || 0;
          const today = dayKey(d) === dayKey();
          return (
            <View key={dayKey(d)} style={{ alignItems: 'center', gap: 6, flex: 1 }}>
              <View style={{ width: 18, height: 60, justifyContent: 'flex-end' }}>
                <View style={{ height: Math.max(4, (v / max) * 60), borderRadius: 6, backgroundColor: v ? p.accent : p.surface3 }} />
              </View>
              <AppText variant="caption" style={{ color: today ? p.accentFg : p.textMute, fontFamily: today ? fonts.bold : fonts.medium }}>
                {d.toLocaleDateString(undefined, { weekday: 'narrow' })}
              </AppText>
            </View>
          );
        })}
      </Row>
    </View>
  );
}
