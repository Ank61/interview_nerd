import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { HtmlView } from '@/components/content';
import { FontSizeButton, ReaderBar } from '@/components/ReaderBar';
import { Segmented } from '@/components/ui/inputs';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, EmptyState, IconButton, Loading, Pill, Row, Tap } from '@/components/ui/primitives';
import { conceptKey, getTopic, type ConceptContent } from '@/data/catalog';
import { prefetchContent, useContent } from '@/lib/content';
import { haptic } from '@/lib/haptics';
import { esc } from '@/lib/html';
import { useProgress } from '@/store/progress';
import { radius, usePalette } from '@/theme';

type Tab = 'lesson' | 'examples' | 'practice';

export default function ConceptScreen() {
  const { id, l, i } = useLocalSearchParams<{ id: string; l: string; i: string }>();
  const p = usePalette();
  const topic = getTopic(id);
  const level = Number(l) || 0;
  const index = Number(i) || 0;
  const lvl = topic?.levels[level];
  const meta = lvl?.concepts[index];
  const { data, loading, error } = useContent<ConceptContent>(meta?.a);
  const key = topic ? conceptKey(topic.id, level, index) : '';
  // The selected tab belongs to one concept; moving to another starts on the lesson.
  const [tabState, setTabState] = useState<{ key: string; tab: Tab }>({ key, tab: 'lesson' });
  const tab: Tab = tabState.key === key ? tabState.tab : 'lesson';
  const setTab = (t: Tab) => setTabState({ key, tab: t });
  const done = useProgress((s) => !!s.learned[key]);
  const saved = useProgress((s) => !!s.bookmarks[key]);
  const toggleLearned = useProgress((s) => s.toggleLearned);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const pushRecent = useProgress((s) => s.pushRecent);
  const href = `/concept/${id}?l=${level}&i=${index}`;

  useEffect(() => {
    if (!topic || !meta) return;
    pushRecent({ key, kind: 'concept', title: meta.t, sub: `${topic.title} · ${lvl?.label}`, href });
    prefetchContent(lvl?.concepts[index + 1]?.a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const examplesHtml = useMemo(
    () => (data?.examples ?? []).map((e, n) => `<div class="ex-title">${esc(e.title || `Example ${n + 1}`)}</div>${e.html}`).join(''),
    [data],
  );

  if (!topic || !meta || !lvl) return <Screen><TopBar /><EmptyState icon="alert-circle" title="Concept not found" /></Screen>;

  const go = (n: number) => router.replace(`/concept/${id}?l=${level}&i=${n}`);
  const tabs: { value: Tab; label: string; count?: number }[] = [{ value: 'lesson', label: 'Lesson' }];
  if (meta.ex) tabs.push({ value: 'examples', label: 'Examples', count: meta.ex });
  if (meta.pq) tabs.push({ value: 'practice', label: 'Practice', count: meta.pq });

  return (
    <Screen>
      <TopBar
        title={topic.title}
        subtitle={`${lvl.label} · ${index + 1} of ${lvl.concepts.length}`}
        right={
          <>
            <FontSizeButton />
            <IconButton
              icon={saved ? 'bookmark' : 'bookmark-outline'}
              active={saved}
              label={saved ? 'Remove bookmark' : 'Bookmark'}
              onPress={() => {
                const on = toggleBookmark({ key, kind: 'concept', title: meta.t, sub: `${topic.title} · ${lvl.label}`, href });
                if (on) haptic.success();
              }}
            />
          </>
        }
      />
      <View style={{ paddingHorizontal: 20, paddingBottom: 12, gap: 10 }}>
        <AppText variant="title" style={{ fontSize: 22, lineHeight: 28 }}>
          {meta.t}
        </AppText>
        {meta.g.length > 0 && (
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            {meta.g.map((g) => (
              <Pill key={g} label={`#${g}`} mono />
            ))}
          </Row>
        )}
        {tabs.length > 1 && <Segmented value={tab} onChange={setTab} options={tabs} />}
      </View>

      <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: p.border }}>
        {loading ? (
          <Loading label="Loading lesson" />
        ) : error || !data ? (
          <EmptyState icon="cloud-offline" title="Couldn't load this lesson" body={error?.message} />
        ) : tab === 'lesson' ? (
          data.html ? (
            <HtmlView key={`l-${key}`} html={data.html + linksHtml(data.links)} />
          ) : (
            <EmptyState icon="document-text" title="Lesson coming soon" body="Check the examples and practice tabs." />
          )
        ) : tab === 'examples' ? (
          <HtmlView key={`e-${key}`} html={examplesHtml} />
        ) : (
          <Practice items={data.questions} />
        )}
      </View>

      <ReaderBar
        done={done}
        onToggle={() => {
          const on = toggleLearned(topic.id, level, index);
          if (on) {
            haptic.success();
            if (index < lvl.concepts.length - 1) setTimeout(() => go(index + 1), 350);
          }
        }}
        doneLabel="Learned"
        todoLabel="Mark as learned"
        onPrev={index > 0 ? () => go(index - 1) : undefined}
        onNext={index < lvl.concepts.length - 1 ? () => go(index + 1) : undefined}
      />
    </Screen>
  );
}

function linksHtml(links: string[]) {
  if (!links?.length) return '';
  return `<h4>Further reading</h4><ul>${links.map((u) => `<li><a href="${esc(u)}">${esc(u.replace(/^https?:\/\/(www\.)?/, ''))}</a></li>`).join('')}</ul>`;
}

/** Flash-card style self-test for the concept's practice questions. */
function Practice({ items }: { items: { q: string; a: string }[] }) {
  const p = usePalette();
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const revealed = Object.values(open).filter(Boolean).length;
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 40 }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <AppText variant="small" color="mute">
          Think of your answer first, then reveal.
        </AppText>
        <AppText variant="caption" color="mute">
          {revealed}/{items.length} revealed
        </AppText>
      </Row>
      {items.map((it, n) => {
        const isOpen = !!open[n];
        return (
          <View key={n} style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: isOpen ? p.accentSoft : p.border, overflow: 'hidden' }}>
            <Tap onPress={() => setOpen((o) => ({ ...o, [n]: !o[n] }))} scale={0.99} style={{ flexDirection: 'row', gap: 12, padding: 16, alignItems: 'flex-start' }}>
              <AppText variant="eyebrow" color="accent" style={{ marginTop: 3 }}>
                Q{n + 1}
              </AppText>
              <AppText variant="bodyMedium" style={{ flex: 1 }}>
                {it.q}
              </AppText>
              <Ionicons name={isOpen ? 'chevron-up' : 'eye-outline'} size={18} color={isOpen ? p.accentFg : p.textMute} />
            </Tap>
            {isOpen && (
              <View style={{ paddingHorizontal: 16, paddingBottom: 14, borderTopWidth: 1, borderTopColor: p.border, paddingTop: 12 }}>
                {it.a ? <HtmlView html={it.a} autoHeight /> : <AppText color="mute">No answer provided yet.</AppText>}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
