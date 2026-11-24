import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, type ScrollViewInstance, View } from 'react-native';

import { HtmlView } from '@/components/content';
import { FontSizeButton, ReaderBar } from '@/components/ReaderBar';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, DifficultyPill, EmptyState, IconButton, Loading, Pill, Row, Tap } from '@/components/ui/primitives';
import { TopicIcon } from '@/components/ui/visuals';
import { getTopic, questionKey, type InterviewItem } from '@/data/catalog';
import { useContent } from '@/lib/content';
import { haptic } from '@/lib/haptics';
import { useProgress } from '@/store/progress';
import { useSettings } from '@/store/settings';
import { fonts, radius, usePalette } from '@/theme';

export default function QuestionScreen() {
  const { id, s, i } = useLocalSearchParams<{ id: string; s: string; i: string }>();
  const p = usePalette();
  const topic = getTopic(id);
  const setIdx = Number(s) || 0;
  const index = Number(i) || 0;
  const set = topic?.sets[setIdx];
  const { data, loading } = useContent<InterviewItem[]>(set?.a);
  const item = data?.[index];
  const hideAnswers = useSettings((st) => st.hideAnswers);
  const scrollRef = useRef<ScrollViewInstance>(null);

  const key = topic ? questionKey(topic.id, setIdx, index) : '';
  // Reveal state is per question, so the next question starts hidden again.
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const revealed = !hideAnswers || revealedKey === key;
  const setRevealed = () => setRevealedKey(key);
  const done = useProgress((st) => !!st.reviewed[key]);
  const saved = useProgress((st) => !!st.bookmarks[key]);
  const toggleReviewed = useProgress((st) => st.toggleReviewed);
  const toggleBookmark = useProgress((st) => st.toggleBookmark);
  const pushRecent = useProgress((st) => st.pushRecent);
  const href = `/question/${id}?s=${setIdx}&i=${index}`;

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    if (topic && item) pushRecent({ key, kind: 'question', title: item.q, sub: `${topic.title} · ${set?.label}`, href });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, !!item]);

  if (!topic || !set) return <Screen><TopBar /><EmptyState icon="alert-circle" title="Question not found" /></Screen>;
  const total = set.count;
  const go = (n: number) => router.replace(`/question/${id}?s=${setIdx}&i=${n}`);

  return (
    <Screen>
      <TopBar
        title={`${topic.title} · ${set.label}`}
        subtitle={`Question ${index + 1} of ${total}`}
        right={
          <>
            <FontSizeButton />
            <IconButton
              icon={saved ? 'bookmark' : 'bookmark-outline'}
              active={saved}
              label={saved ? 'Remove bookmark' : 'Bookmark'}
              onPress={() => {
                if (!item) return;
                const on = toggleBookmark({ key, kind: 'question', title: item.q, sub: `${topic.title} · ${set.label}`, href });
                if (on) haptic.success();
              }}
            />
          </>
        }
      />
      {loading || !item ? (
        <Loading label="Loading question" />
      ) : (
        <ScrollView ref={scrollRef} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 18 }}>
          <View style={{ height: 3, borderRadius: 2, backgroundColor: p.surface3, overflow: 'hidden' }}>
            <View style={{ width: `${((index + 1) / total) * 100}%`, height: '100%', backgroundColor: p.accent }} />
          </View>
          <Row gap={10}>
            <TopicIcon item={topic} size={30} radius={9} />
            <AppText variant="label" color="dim">
              {set.label} interview question
            </AppText>
            {item.d && <DifficultyPill value={item.d} />}
          </Row>
          <AppText style={{ fontFamily: fonts.bold, fontSize: 22, lineHeight: 30, letterSpacing: -0.4, color: p.text }}>{item.q}</AppText>
          {item.g.length > 0 && (
            <Row gap={6} style={{ flexWrap: 'wrap' }}>
              {item.g.map((g) => (
                <Pill key={g} label={`#${g}`} mono />
              ))}
            </Row>
          )}

          <View style={{ gap: 10 }}>
            <Row gap={8}>
              <Ionicons name="sparkles" size={15} color={p.accentFg} />
              <AppText variant="eyebrow" color="accent">
                MODEL ANSWER
              </AppText>
            </Row>
            {!revealed ? (
              <Tap
                onPress={() => {
                  setRevealed();
                  haptic.light();
                }}
                style={{ alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 36, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderStyle: 'dashed', borderColor: p.borderStrong }}>
                <Ionicons name="eye" size={26} color={p.accentFg} />
                <AppText variant="label">Tap to reveal the answer</AppText>
                <AppText variant="caption" color="mute">
                  Try answering out loud first
                </AppText>
              </Tap>
            ) : item.a ? (
              <View style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, padding: 16 }}>
                <HtmlView key={key} html={item.a} autoHeight />
              </View>
            ) : (
              <AppText color="mute">This answer is still being written.</AppText>
            )}
          </View>
        </ScrollView>
      )}
      <ReaderBar
        done={done}
        onToggle={() => {
          const on = toggleReviewed(key);
          if (on) {
            haptic.success();
            if (index < total - 1) setTimeout(() => go(index + 1), 350);
          }
        }}
        doneLabel="Reviewed"
        todoLabel="Mark as reviewed"
        onPrev={index > 0 ? () => go(index - 1) : undefined}
        onNext={index < total - 1 ? () => go(index + 1) : undefined}
      />
    </Screen>
  );
}
