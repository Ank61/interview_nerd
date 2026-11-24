import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Chip, EmptyState, Loading, ProgressBar, Row, Tap } from '@/components/ui/primitives';
import { TopicIcon } from '@/components/ui/visuals';
import { getLab, type LabContent } from '@/data/catalog';
import { useContent } from '@/lib/content';
import { useProgress } from '@/store/progress';
import { fonts, radius, readable, usePalette } from '@/theme';

export default function LabScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = usePalette();
  const meta = getLab(id);
  const { data, loading } = useContent<LabContent>(meta?.a);
  const solved = useProgress((s) => s.solved);
  const [level, setLevel] = useState('All');

  const levels = useMemo(() => ['All', ...new Set((data?.modules ?? []).map((m) => m.level).filter(Boolean))], [data]);
  const modules = useMemo(
    () => (data?.modules ?? []).map((m, i) => ({ ...m, i })).filter((m) => level === 'All' || m.level === level),
    [data, level],
  );

  if (!meta) return <Screen><TopBar /><EmptyState icon="alert-circle" title="Lab not found" /></Screen>;
  const solvedCount = Object.keys(solved).filter((k) => k.startsWith(`${meta.id}:`)).length;
  const tint = readable(meta.color, p.scheme);

  return (
    <Screen>
      <TopBar title={meta.title} subtitle={`${meta.count} exercises`} />
      {loading || !data ? (
        <Loading label="Loading lab" />
      ) : (
        <FlatList
          data={modules}
          keyExtractor={(m) => m.id + m.i}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={
            <View style={{ gap: 18, paddingBottom: 16 }}>
              <Row gap={16} align="flex-start">
                <TopicIcon item={meta} size={60} />
                <View style={{ flex: 1, gap: 4 }}>
                  <AppText variant="title">{meta.title}</AppText>
                  <AppText variant="small" color="dim">
                    {meta.desc}
                  </AppText>
                </View>
              </Row>
              <View style={{ padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 10 }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <AppText variant="label">
                    {solvedCount} of {meta.count} solved
                  </AppText>
                  {meta.runner ? (
                    <Row gap={5}>
                      <Ionicons name="play-circle" size={15} color={p.accentFg} />
                      <AppText variant="caption" color="accent">
                        {meta.runner === 'js' ? 'JavaScript runs on device' : meta.runner === 'sql' ? 'Real SQLite on device' : 'Query engine on device'}
                      </AppText>
                    </Row>
                  ) : (
                    <Row gap={5}>
                      <Ionicons name="create-outline" size={14} color={p.textMute} />
                      <AppText variant="caption" color="mute">
                        Write, compare & self-check
                      </AppText>
                    </Row>
                  )}
                </Row>
                <ProgressBar value={solvedCount / meta.count} color={tint} />
              </View>
              {levels.length > 2 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingRight: 20 }} style={{ marginRight: -20 }}>
                  {levels.map((l) => (
                    <Chip key={l} label={l} selected={level === l} onPress={() => setLevel(l)} />
                  ))}
                </ScrollView>
              )}
            </View>
          }
          renderItem={({ item }) => {
            const done = item.exercises.filter((e) => solved[`${meta.id}:${e.id}`]).length;
            const complete = done === item.exercises.length && done > 0;
            return (
              <Tap
                onPress={() => router.push(`/module/${meta.id}?m=${item.i}`)}
                scale={0.985}
                style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: complete ? p.accentSoft : p.border, gap: 12 }}>
                <Row gap={12} align="flex-start">
                  <View style={{ width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: complete ? p.accent : p.surface2 }}>
                    {complete ? (
                      <Ionicons name="checkmark" size={18} color={p.onAccent} />
                    ) : (
                      <AppText style={{ fontFamily: fonts.mono, fontSize: 12, color: p.textDim }}>{String(item.i + 1).padStart(2, '0')}</AppText>
                    )}
                  </View>
                  <View style={{ flex: 1, gap: 3 }}>
                    <AppText variant="heading" style={{ fontSize: 16 }}>
                      {item.title}
                    </AppText>
                    {!!item.summary && (
                      <AppText variant="small" color="mute" numberOfLines={2}>
                        {item.summary.replace(/`/g, '')}
                      </AppText>
                    )}
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={p.textMute} />
                </Row>
                <Row gap={10}>
                  {!!item.level && (
                    <AppText variant="caption" color="mute">
                      {item.level}
                    </AppText>
                  )}
                  <View style={{ flex: 1 }}>
                    <ProgressBar value={item.exercises.length ? done / item.exercises.length : 0} height={4} color={tint} />
                  </View>
                  <AppText variant="caption" style={{ fontFamily: fonts.mono, color: p.textMute }}>
                    {done}/{item.exercises.length}
                  </AppText>
                </Row>
              </Tap>
            );
          }}
        />
      )}
    </Screen>
  );
}
