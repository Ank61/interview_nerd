import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';

import { SearchField } from '@/components/ui/inputs';
import { Screen } from '@/components/ui/layout';
import { AppText, Chip, EmptyState, IconButton, IconName, Loading, Row, Tap } from '@/components/ui/primitives';
import { TopicIcon } from '@/components/ui/visuals';
import { catalog, getLab, getTopic, type SearchEntry } from '@/data/catalog';
import { useContent } from '@/lib/content';
import { radius, usePalette } from '@/theme';

type Kind = 'all' | 'topic' | 'c' | 'q' | 'e';
type Hit = { kind: Exclude<Kind, 'all'>; key: string; title: string; sub: string; href: string; icon: IconName; score: number; topicId?: string };

const SUGGESTIONS = ['closures', 'event loop', 'useEffect', 'indexing', 'docker compose', 'goroutines', 'IAM policy', 'RAG', 'joins', 'rate limit'];

function useDebounced<T>(v: T, ms = 160) {
  const [d, setD] = useState(v);
  useEffect(() => {
    const t = setTimeout(() => setD(v), ms);
    return () => clearTimeout(t);
  }, [v, ms]);
  return d;
}

export default function Search() {
  const p = usePalette();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<Kind>('all');
  const q = useDebounced(query.trim().toLowerCase());
  const { data: index, loading } = useContent<SearchEntry[]>('search');

  const hits = useMemo<Hit[]>(() => {
    if (q.length < 2) return [];
    const words = q.split(/\s+/).filter(Boolean);
    const score = (text: string) => {
      const t = text.toLowerCase();
      if (!words.every((w) => t.includes(w))) return 0;
      return (t.startsWith(q) ? 3 : t.includes(q) ? 2 : 1) + (t.length < 60 ? 0.5 : 0);
    };
    const out: Hit[] = [];
    for (const t of catalog.topics) {
      const s = score(`${t.title} ${t.group} ${t.desc}`);
      if (s) out.push({ kind: 'topic', key: `t-${t.id}`, title: t.title, sub: `${t.group} · ${t.counts.concepts} concepts`, href: `/topic/${t.id}`, icon: 'library', score: s + 5, topicId: t.id });
    }
    for (const e of index ?? []) {
      const s = score(e[4]);
      if (!s) continue;
      const [type, owner, a, b, text] = e;
      if (type === 'c') {
        const t = getTopic(owner);
        out.push({ kind: 'c', key: `c-${owner}-${a}-${b}`, title: text.split(' · ')[0], sub: `${t?.title} · ${t?.levels[a]?.label}`, href: `/concept/${owner}?l=${a}&i=${b}`, icon: 'book', score: s + 1, topicId: owner });
      } else if (type === 'q') {
        const t = getTopic(owner);
        out.push({ kind: 'q', key: `q-${owner}-${a}-${b}`, title: text, sub: `${t?.title} · ${t?.sets[a]?.label}`, href: `/question/${owner}?s=${a}&i=${b}`, icon: 'chatbubbles', score: s, topicId: owner });
      } else {
        const l = getLab(owner);
        out.push({ kind: 'e', key: `e-${owner}-${a}-${b}`, title: text, sub: `${l?.title} · ${l?.modules[a]?.title}`, href: `/exercise/${owner}?m=${a}&e=${b}`, icon: 'code-slash', score: s });
      }
      if (out.length > 600) break;
    }
    return out.sort((x, y) => y.score - x.score);
  }, [q, index]);

  const counts = useMemo(() => {
    const c = { all: hits.length, topic: 0, c: 0, q: 0, e: 0 };
    hits.forEach((h) => c[h.kind]++);
    return c;
  }, [hits]);
  const shown = (kind === 'all' ? hits : hits.filter((h) => h.kind === kind)).slice(0, 80);

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 6, paddingBottom: 12 }}>
        <IconButton icon="chevron-back" label="Close search" onPress={() => router.back()} />
        <View style={{ flex: 1 }}>
          <SearchField value={query} onChangeText={setQuery} placeholder="Concepts, questions, exercises…" autoFocus />
        </View>
      </View>
      {q.length >= 2 && (
        <Row gap={8} style={{ paddingHorizontal: 16, paddingBottom: 10, flexWrap: 'wrap' }}>
          <Chip label="All" count={counts.all} selected={kind === 'all'} onPress={() => setKind('all')} />
          {counts.topic > 0 && <Chip label="Topics" count={counts.topic} selected={kind === 'topic'} onPress={() => setKind('topic')} />}
          <Chip label="Concepts" count={counts.c} selected={kind === 'c'} onPress={() => setKind('c')} />
          <Chip label="Q&A" count={counts.q} selected={kind === 'q'} onPress={() => setKind('q')} />
          <Chip label="Exercises" count={counts.e} selected={kind === 'e'} onPress={() => setKind('e')} />
        </Row>
      )}
      {loading ? (
        <Loading label="Loading search index" />
      ) : q.length < 2 ? (
        <View style={{ paddingHorizontal: 20, gap: 14, paddingTop: 8 }}>
          <AppText variant="eyebrow" color="mute">
            TRY SEARCHING FOR
          </AppText>
          <Row gap={8} style={{ flexWrap: 'wrap' }}>
            {SUGGESTIONS.map((s) => (
              <Chip key={s} label={s} icon="search" onPress={() => setQuery(s)} />
            ))}
          </Row>
        </View>
      ) : (
        <FlatList
          data={shown}
          keyExtractor={(h) => h.key}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          ListEmptyComponent={<EmptyState icon="search" title="No results" body={`Nothing matched “${query.trim()}”. Try fewer or different words.`} />}
          renderItem={({ item }) => {
            const topic = item.topicId ? getTopic(item.topicId) : undefined;
            return (
              <Tap
                onPress={() => router.push(item.href as never)}
                scale={0.985}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
                {topic && item.kind === 'topic' ? (
                  <TopicIcon item={topic} size={40} />
                ) : (
                  <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: p.surface2, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={item.icon} size={18} color={p.accentFg} />
                  </View>
                )}
                <View style={{ flex: 1, gap: 2 }}>
                  <AppText variant="bodyMedium" numberOfLines={2}>
                    {item.title}
                  </AppText>
                  <AppText variant="caption" color="mute" numberOfLines={1}>
                    {item.sub}
                  </AppText>
                </View>
              </Tap>
            );
          }}
        />
      )}
    </Screen>
  );
}
