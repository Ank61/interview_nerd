import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Bullets, HtmlView, InlineText } from '@/components/content';
import { NumberBadge } from '@/components/rows';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, DifficultyPill, EmptyState, Loading, Pill, Row, SectionHeader, Tap } from '@/components/ui/primitives';
import { getLab, type LabContent } from '@/data/catalog';
import { useContent } from '@/lib/content';
import { useProgress } from '@/store/progress';
import { radius, usePalette } from '@/theme';

export default function ModuleScreen() {
  const { lab: labId, m } = useLocalSearchParams<{ lab: string; m: string }>();
  const p = usePalette();
  const meta = getLab(labId);
  const { data, loading } = useContent<LabContent>(meta?.a);
  const mod = data?.modules[Number(m) || 0];
  const solved = useProgress((s) => s.solved);
  const [openQ, setOpenQ] = useState<number | null>(null);

  if (!meta) return <Screen><TopBar /><EmptyState icon="alert-circle" title="Lab not found" /></Screen>;
  if (loading || !mod) return <Screen><TopBar title={meta.title} /><Loading /></Screen>;

  return (
    <Screen>
      <TopBar title={mod.title} subtitle={meta.title} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 26 }}>
        <View style={{ gap: 10 }}>
          {!!mod.level && <Pill label={mod.level} color={p.accentFg} bg={p.accentSoft} />}
          <AppText variant="title">{mod.title}</AppText>
          {!!mod.summary && <InlineText text={mod.summary} color={p.textDim} />}
        </View>

        {!!mod.topics?.length && (
          <View>
            <SectionHeader title="What you’ll learn" />
            <View style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
              <Bullets items={mod.topics} />
            </View>
          </View>
        )}

        <View>
          <SectionHeader title="Exercises" eyebrow={`${mod.exercises.filter((e) => solved[`${meta.id}:${e.id}`]).length}/${mod.exercises.length} solved`} />
          <View style={{ gap: 8 }}>
            {mod.exercises.map((e, i) => {
              const done = !!solved[`${meta.id}:${e.id}`];
              return (
                <Tap
                  key={e.id}
                  onPress={() => router.push(`/exercise/${meta.id}?m=${m}&e=${i}`)}
                  scale={0.985}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: done ? p.accentSoft : p.border }}>
                  <NumberBadge n={i + 1} done={done} />
                  <View style={{ flex: 1, gap: 6 }}>
                    <AppText variant="bodyMedium" numberOfLines={2}>
                      {e.title}
                    </AppText>
                    <Row gap={6} style={{ flexWrap: 'wrap' }}>
                      <DifficultyPill value={e.difficulty} />
                      {e.tags.slice(0, 2).map((t) => (
                        <Pill key={t} label={t} mono />
                      ))}
                    </Row>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={p.textMute} />
                </Tap>
              );
            })}
          </View>
        </View>

        {mod.sections.map((s) => (
          <View key={s.title}>
            <SectionHeader title={s.title} />
            <View style={{ padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 12 }}>
              {!!s.text && <InlineText text={s.text} color={p.textDim} />}
              <Bullets items={s.items} mono={s.mono} />
            </View>
          </View>
        ))}

        {mod.interview.length > 0 && (
          <View>
            <SectionHeader title="Interview questions" eyebrow="Be ready for" />
            <View style={{ gap: 8 }}>
              {mod.interview.map((q, i) => {
                const open = openQ === i;
                return (
                  <View key={i} style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>
                    <Tap onPress={() => q.a && setOpenQ(open ? null : i)} scale={0.99} style={{ flexDirection: 'row', gap: 12, padding: 14, alignItems: 'flex-start' }}>
                      <Ionicons name="chatbubble-ellipses-outline" size={18} color={p.accentFg} style={{ marginTop: 2 }} />
                      <InlineText text={q.q} style={{ flex: 1 }} variant="bodyMedium" />
                      {!!q.a && <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={p.textMute} />}
                    </Tap>
                    {open && q.a && (
                      <View style={{ paddingHorizontal: 16, paddingBottom: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: p.border }}>
                        <HtmlView html={q.a} autoHeight />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
