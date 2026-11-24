import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { Screen } from '@/components/ui/layout';
import { AppText, ProgressBar, Row, SectionHeader, Tap } from '@/components/ui/primitives';
import { ProgressRing, TopicIcon } from '@/components/ui/visuals';
import { catalog } from '@/data/catalog';
import { dayKey } from '@/lib/gamification';
import { useProgress } from '@/store/progress';
import { alpha, fonts, radius, readable, usePalette } from '@/theme';

export default function Practice() {
  const p = usePalette();
  const mcqStats = useProgress((s) => s.mcq);
  const solved = useProgress((s) => s.solved);
  const mistakes = useProgress((s) => Object.keys(s.mistakes).length);
  const dailyDone = useProgress((s) => !!s.daily[dayKey()]);
  const quizzes = useProgress((s) => s.quizzes);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 28 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 10 }}>
          <AppText variant="display">Practice</AppText>
          <AppText variant="body" color="dim" style={{ marginTop: 4 }}>
            Test yourself with quizzes and hands-on coding labs.
          </AppText>
        </View>

        <Tap
          onPress={() => router.push('/interview')}
          scale={0.985}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.borderStrong }}>
          <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: p.accent, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="mic" size={22} color={p.onAccent} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText variant="heading" style={{ fontSize: 16 }}>
              Mock interview
            </AppText>
            <AppText variant="caption" color="dim">
              A timed voice interview with follow-up questions. Every answer is recorded for review.
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={p.textMute} />
        </Tap>

        <Row gap={12} align="stretch">
          <Tap onPress={() => router.push('/quiz/daily')} style={{ flex: 1, padding: 16, borderRadius: radius.lg, backgroundColor: dailyDone ? p.surface : p.accent, borderWidth: dailyDone ? 1 : 0, borderColor: p.border, gap: 12 }}>
            <Ionicons name={dailyDone ? 'checkmark-circle' : 'trophy'} size={24} color={dailyDone ? p.success : p.onAccent} />
            <View>
              <AppText variant="label" style={{ fontSize: 15, color: dailyDone ? p.text : p.onAccent }}>
                Daily challenge
              </AppText>
              <AppText variant="caption" style={{ color: dailyDone ? p.textMute : 'rgba(11,11,13,0.6)' }}>
                {dailyDone ? 'Completed today' : '5 questions · +15 XP'}
              </AppText>
            </View>
          </Tap>
          <Tap
            onPress={() => router.push('/quiz/mistakes')}
            disabled={!mistakes}
            style={{ flex: 1, padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 12 }}>
            <Ionicons name="refresh-circle" size={24} color={mistakes ? p.danger : p.textMute} />
            <View>
              <AppText variant="label" style={{ fontSize: 15 }}>
                Review mistakes
              </AppText>
              <AppText variant="caption" color="mute">
                {mistakes ? `${mistakes} to revisit` : 'Nothing to review'}
              </AppText>
            </View>
          </Tap>
        </Row>

        <View>
          <SectionHeader eyebrow="Multiple choice" title="Quizzes" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {catalog.mcq.map((m) => {
              const st = mcqStats[m.id];
              const best = st?.best ?? 0;
              return (
                <Tap
                  key={m.id}
                  onPress={() => router.push(`/quiz/${m.id}`)}
                  style={{ width: '47%', flexGrow: 1, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 12 }}>
                  <Row style={{ justifyContent: 'space-between' }} align="flex-start">
                    <TopicIcon item={m} size={40} />
                    <ProgressRing value={best / 100} size={38} stroke={3.5} color={readable(m.color, p.scheme)}>
                      <AppText style={{ fontFamily: fonts.bold, fontSize: 10, color: best ? p.text : p.textMute }}>{best ? `${best}%` : '–'}</AppText>
                    </ProgressRing>
                  </Row>
                  <View>
                    <AppText variant="label" style={{ fontSize: 15 }}>
                      {m.title}
                    </AppText>
                    <AppText variant="caption" color="mute">
                      {m.count} questions{st?.quizzes ? ` · ${st.quizzes} taken` : ''}
                    </AppText>
                  </View>
                </Tap>
              );
            })}
          </View>
        </View>

        <View>
          <SectionHeader eyebrow="Hands-on" title="Coding labs" />
          <View style={{ gap: 10 }}>
            {catalog.labs.map((l) => {
              const done = Object.keys(solved).filter((k) => k.startsWith(`${l.id}:`)).length;
              return (
                <Tap
                  key={l.id}
                  onPress={() => router.push(`/lab/${l.id}`)}
                  scale={0.985}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
                  <TopicIcon item={l} size={46} />
                  <View style={{ flex: 1, gap: 5 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <AppText variant="heading" style={{ fontSize: 16 }}>
                        {l.title}
                      </AppText>
                      {l.runner && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: p.accentSoft }}>
                          <Ionicons name="play" size={10} color={p.accentFg} />
                          <AppText variant="caption" color="accent">
                            Runs on device
                          </AppText>
                        </View>
                      )}
                    </Row>
                    <AppText variant="small" color="mute" numberOfLines={1}>
                      {l.desc}
                    </AppText>
                    <Row gap={10}>
                      <View style={{ flex: 1 }}>
                        <ProgressBar value={done / l.count} height={4} color={readable(l.color, p.scheme)} />
                      </View>
                      <AppText variant="caption" style={{ fontFamily: fonts.mono, color: p.textMute }}>
                        {done}/{l.count}
                      </AppText>
                    </Row>
                  </View>
                </Tap>
              );
            })}
          </View>
        </View>

        <Tap
          onPress={() => router.push('/resources')}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: radius.lg, backgroundColor: alpha('#22C55E', 0.12), borderWidth: 1, borderColor: alpha('#22C55E', 0.25) }}>
          <Ionicons name="document-text" size={26} color="#22C55E" />
          <View style={{ flex: 1 }}>
            <AppText variant="label" style={{ fontSize: 15 }}>
              Cheat sheets
            </AppText>
            <AppText variant="caption" color="dim">
              Quick command references for {catalog.resources.map((r) => r.title).join(' and ')}
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#22C55E" />
        </Tap>

        {quizzes.length > 0 && (
          <View>
            <SectionHeader title="Recent quizzes" />
            <View style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>
              {quizzes.slice(0, 5).map((q, n) => {
                const pct = Math.round((q.score / Math.max(1, q.total)) * 100);
                return (
                  <Row key={q.ts} gap={12} style={{ padding: 14, borderTopWidth: n ? 1 : 0, borderTopColor: p.border }}>
                    <View style={{ width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: pct >= 70 ? p.successSoft : pct >= 40 ? p.warningSoft : p.dangerSoft }}>
                      <AppText style={{ fontFamily: fonts.bold, fontSize: 13, color: pct >= 70 ? p.success : pct >= 40 ? p.warning : p.danger }}>{pct}%</AppText>
                    </View>
                    <View style={{ flex: 1 }}>
                      <AppText variant="label">{q.title}</AppText>
                      <AppText variant="caption" color="mute">
                        {q.score}/{q.total} correct · {q.mode} · {new Date(q.ts).toLocaleDateString()}
                      </AppText>
                    </View>
                  </Row>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
