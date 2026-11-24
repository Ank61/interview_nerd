import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { ListRow } from '@/components/rows';
import { Segmented } from '@/components/ui/inputs';
import { Screen } from '@/components/ui/layout';
import { AppText, Chip, EmptyState, IconName, Row, Tap } from '@/components/ui/primitives';
import { useProgress, type ItemKind, type SavedItem } from '@/store/progress';
import { radius, usePalette } from '@/theme';

const KIND_ICON: Record<ItemKind, IconName> = { concept: 'book', question: 'chatbubbles', exercise: 'code-slash' };

function timeAgo(ts: number) {
  const s = Math.round((Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function Saved() {
  const p = usePalette();
  const bookmarks = useProgress((s) => s.bookmarks);
  const recent = useProgress((s) => s.recent);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const clearRecent = useProgress((s) => s.clearRecent);
  const [tab, setTab] = useState<'saved' | 'recent'>('saved');
  const [kind, setKind] = useState<'all' | ItemKind>('all');

  const items = useMemo(() => {
    const list: SavedItem[] = tab === 'saved' ? Object.values(bookmarks).sort((a, b) => b.ts - a.ts) : recent;
    return kind === 'all' ? list : list.filter((x) => x.kind === kind);
  }, [tab, kind, bookmarks, recent]);

  const counts = useMemo(() => {
    const src = tab === 'saved' ? Object.values(bookmarks) : recent;
    return { all: src.length, concept: src.filter((x) => x.kind === 'concept').length, question: src.filter((x) => x.kind === 'question').length, exercise: src.filter((x) => x.kind === 'exercise').length };
  }, [tab, bookmarks, recent]);

  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(x) => x.key}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListHeaderComponent={
          <View style={{ gap: 16, paddingTop: 10, paddingBottom: 16 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <AppText variant="display">{tab === 'saved' ? 'Saved' : 'History'}</AppText>
              {tab === 'recent' && recent.length > 0 && (
                <Tap onPress={clearRecent} hitSlop={10}>
                  <AppText variant="label" color="mute">
                    Clear
                  </AppText>
                </Tap>
              )}
            </Row>
            <Segmented
              value={tab}
              onChange={setTab}
              options={[
                { value: 'saved', label: 'Bookmarks', count: Object.keys(bookmarks).length },
                { value: 'recent', label: 'Recently viewed', count: recent.length },
              ]}
            />
            <Row gap={8} style={{ flexWrap: 'wrap' }}>
              <Chip label="All" count={counts.all} selected={kind === 'all'} onPress={() => setKind('all')} />
              <Chip label="Concepts" icon="book-outline" count={counts.concept} selected={kind === 'concept'} onPress={() => setKind('concept')} />
              <Chip label="Q&A" icon="chatbubbles-outline" count={counts.question} selected={kind === 'question'} onPress={() => setKind('question')} />
              <Chip label="Exercises" icon="code-slash-outline" count={counts.exercise} selected={kind === 'exercise'} onPress={() => setKind('exercise')} />
            </Row>
          </View>
        }
        ListEmptyComponent={
          tab === 'saved' ? (
            <EmptyState icon="bookmark-outline" title="No bookmarks yet" body="Tap the bookmark icon on any concept, interview question or exercise to save it here." action="Browse topics" onAction={() => router.push('/learn')} />
          ) : (
            <EmptyState icon="time-outline" title="Nothing viewed yet" body="Concepts, questions and exercises you open will appear here." />
          )
        }
        renderItem={({ item }) => (
          <ListRow
            title={item.title}
            subtitle={`${item.sub} · ${timeAgo(item.ts)}`}
            onPress={() => router.push(item.href as never)}
            leading={
              <View style={{ width: 40, height: 40, borderRadius: radius.md, backgroundColor: p.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={KIND_ICON[item.kind]} size={19} color={p.accentFg} />
              </View>
            }
            trailing={
              tab === 'saved' ? (
                <Tap onPress={() => toggleBookmark(item)} hitSlop={10} accessibilityLabel="Remove bookmark">
                  <Ionicons name="bookmark" size={20} color={p.accentFg} />
                </Tap>
              ) : undefined
            }
          />
        )}
      />
    </Screen>
  );
}
