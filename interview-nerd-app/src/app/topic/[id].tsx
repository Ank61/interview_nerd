import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import { NumberBadge } from '@/components/rows';
import { SearchField, Segmented } from '@/components/ui/inputs';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Chip, EmptyState, Loading, Pill, Row, Tap } from '@/components/ui/primitives';
import { ProgressRing, TopicIcon } from '@/components/ui/visuals';
import { catalog, conceptKey, getTopic, questionKey, type InterviewItem } from '@/data/catalog';
import { useContent } from '@/lib/content';
import { haptic } from '@/lib/haptics';
import { useAuth } from '@/store/auth';
import { topicLearnedCount, useProgress } from '@/store/progress';
import { fonts, radius, readable, usePalette } from '@/theme';

const LAB_FOR: Record<string, string> = { javascript: 'javascript', sql: 'sql', python: 'python', docker: 'docker', go: 'go', linux: 'linux' };

export default function TopicScreen() {
  const { id, tab: initialTab } = useLocalSearchParams<{ id: string; tab?: string }>();
  const topic = getTopic(id);
  const p = usePalette();
  const goal = useAuth((s) => s.user?.goal);
  const hasLearn = !!topic?.levels.length;
  const hasInterview = !!topic?.sets.length;
  const [tab, setTab] = useState<'learn' | 'interview'>(initialTab === 'interview' || !hasLearn ? 'interview' : 'learn');
  const [level, setLevel] = useState(0);
  const defaultSet = Math.max(0, topic?.sets.findIndex((s) => s.label === goal) ?? 0);
  const [setIdx, setSetIdx] = useState(defaultSet);
  const [query, setQuery] = useState('');

  const learned = useProgress((s) => s.learned);
  const reviewed = useProgress((s) => s.reviewed);
  const toggleLearned = useProgress((s) => s.toggleLearned);
  const learnedCount = topic ? topicLearnedCount(learned, topic.id) : 0;

  const qset = topic?.sets[setIdx];
  const { data: questions, loading } = useContent<InterviewItem[]>(tab === 'interview' ? qset?.a : undefined);

  const mcq = catalog.mcq.find((m) => m.key === topic?.key);
  const lab = topic ? catalog.labs.find((l) => l.id === LAB_FOR[topic.id]) : undefined;

  const q = query.trim().toLowerCase();
  const concepts = useMemo(() => {
    const list = topic?.levels[level]?.concepts.map((c, i) => ({ ...c, i })) ?? [];
    return q ? list.filter((c) => c.t.toLowerCase().includes(q) || c.g.some((g) => g.toLowerCase().includes(q))) : list;
  }, [topic, level, q]);
  const qs = useMemo(() => {
    const list = (questions ?? []).map((x, i) => ({ ...x, i }));
    return q ? list.filter((x) => x.q.toLowerCase().includes(q)) : list;
  }, [questions, q]);

  if (!topic) return <Screen><TopBar /><EmptyState icon="alert-circle" title="Topic not found" /></Screen>;
  const tint = readable(topic.color, p.scheme);
  const pct = topic.counts.concepts ? learnedCount / topic.counts.concepts : 0;

  const header = (
    <View style={{ gap: 18, paddingBottom: 14 }}>
      <Row gap={16} align="flex-start">
        <TopicIcon item={topic} size={64} />
        <View style={{ flex: 1, gap: 4 }}>
          <AppText variant="title">{topic.title}</AppText>
          <AppText variant="small" color="dim" numberOfLines={3}>
            {topic.desc}
          </AppText>
        </View>
      </Row>

      {hasLearn && (
        <Row gap={14} style={{ padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
          <ProgressRing value={pct} size={52} stroke={5} color={tint}>
            <AppText style={{ fontFamily: fonts.bold, fontSize: 12.5, color: p.text }}>{Math.round(pct * 100)}%</AppText>
          </ProgressRing>
          <View style={{ flex: 1 }}>
            <AppText variant="label" style={{ fontSize: 14.5 }}>
              {learnedCount} of {topic.counts.concepts} concepts learned
            </AppText>
            <AppText variant="caption" color="mute">
              {topic.counts.questions ? `${topic.counts.questions} interview answers to review` : 'Tap the circle on a concept to mark it learned'}
            </AppText>
          </View>
        </Row>
      )}

      {(mcq || lab) && (
        <Row gap={10}>
          {mcq && (
            <Tap onPress={() => router.push(`/quiz/${mcq.id}`)} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: radius.md, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
              <Ionicons name="checkmark-done" size={18} color={p.info} />
              <View style={{ flex: 1 }}>
                <AppText variant="label">Take a quiz</AppText>
                <AppText variant="caption" color="mute">{mcq.count} MCQs</AppText>
              </View>
            </Tap>
          )}
          {lab && (
            <Tap onPress={() => router.push(`/lab/${lab.id}`)} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: radius.md, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
              <Ionicons name="code-slash" size={18} color="#F472B6" />
              <View style={{ flex: 1 }}>
                <AppText variant="label">Practice lab</AppText>
                <AppText variant="caption" color="mute">{lab.count} exercises</AppText>
              </View>
            </Tap>
          )}
        </Row>
      )}

      {hasLearn && hasInterview && (
        <Segmented
          value={tab}
          onChange={(v) => {
            setTab(v);
            setQuery('');
          }}
          options={[
            { value: 'learn', label: 'Learn', count: topic.counts.concepts },
            { value: 'interview', label: 'Interview Q&A', count: topic.counts.questions },
          ]}
        />
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingRight: 20 }} style={{ marginRight: -20 }}>
        {tab === 'learn'
          ? topic.levels.map((l, i) => <Chip key={l.label + i} label={l.label} count={l.concepts.length} selected={level === i} onPress={() => setLevel(i)} />)
          : topic.sets.map((s, i) => <Chip key={s.label + i} label={s.label} count={s.count} selected={setIdx === i} onPress={() => setSetIdx(i)} />)}
      </ScrollView>
      <SearchField value={query} onChangeText={setQuery} placeholder={tab === 'learn' ? 'Filter concepts' : 'Filter questions'} />
    </View>
  );

  return (
    <Screen>
      <TopBar title={topic.title} subtitle={topic.group} />
      {tab === 'learn' ? (
        <FlatList
          data={concepts}
          keyExtractor={(c) => `${level}-${c.i}`}
          ListHeaderComponent={header}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          initialNumToRender={14}
          windowSize={9}
          ListEmptyComponent={<EmptyState icon="search" title="No matching concepts" />}
          renderItem={({ item }) => {
            const done = !!learned[conceptKey(topic.id, level, item.i)];
            return (
              <Tap
                onPress={() => router.push(`/concept/${topic.id}?l=${level}&i=${item.i}`)}
                scale={0.985}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: done ? p.accentSoft : p.border }}>
                <Tap
                  onPress={() => {
                    const on = toggleLearned(topic.id, level, item.i);
                    if (on) haptic.success();
                  }}
                  hitSlop={10}
                  scale={0.85}
                  accessibilityLabel={done ? `Mark ${item.t} as not learned` : `Mark ${item.t} as learned`}>
                  <NumberBadge n={item.i + 1} done={done} />
                </Tap>
                <View style={{ flex: 1, gap: 6 }}>
                  <AppText variant="bodyMedium" numberOfLines={2} style={{ lineHeight: 21 }}>
                    {item.t}
                  </AppText>
                  {(item.ex > 0 || item.pq > 0 || item.g.length > 0) && (
                    <Row gap={6} style={{ flexWrap: 'wrap' }}>
                      {item.pq > 0 && <Pill icon="help-circle" label={`${item.pq} practice`} />}
                      {item.ex > 0 && <Pill icon="bulb" label={`${item.ex} example${item.ex > 1 ? 's' : ''}`} />}
                      {item.g.slice(0, 2).map((g) => (
                        <Pill key={g} label={`#${g}`} mono />
                      ))}
                    </Row>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={18} color={p.textMute} />
              </Tap>
            );
          }}
        />
      ) : (
        <FlatList
          data={qs}
          keyExtractor={(x) => `${setIdx}-${x.i}`}
          ListHeaderComponent={header}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          initialNumToRender={12}
          windowSize={9}
          ListEmptyComponent={loading ? <Loading label="Loading questions" /> : <EmptyState icon="search" title="No matching questions" />}
          renderItem={({ item }) => {
            const done = !!reviewed[questionKey(topic.id, setIdx, item.i)];
            return (
              <Tap
                onPress={() => router.push(`/question/${topic.id}?s=${setIdx}&i=${item.i}`)}
                scale={0.985}
                style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: done ? p.accentSoft : p.border }}>
                <NumberBadge n={item.i + 1} done={done} />
                <View style={{ flex: 1, gap: 7 }}>
                  <AppText variant="bodyMedium" numberOfLines={3} style={{ lineHeight: 21 }}>
                    {item.q}
                  </AppText>
                  {item.g.length > 0 && (
                    <Row gap={6} style={{ flexWrap: 'wrap' }}>
                      {item.g.slice(0, 3).map((g) => (
                        <Pill key={g} label={`#${g}`} mono />
                      ))}
                    </Row>
                  )}
                </View>
              </Tap>
            );
          }}
        />
      )}
    </Screen>
  );
}
