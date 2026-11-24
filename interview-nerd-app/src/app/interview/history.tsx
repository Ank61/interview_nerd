import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, EmptyState, Loading, Pill, Row, Tap } from '@/components/ui/primitives';
import { getTopic } from '@/data/catalog';
import { type InterviewSummary, listInterviews } from '@/lib/interview/db';
import { HIRE_LABEL } from '@/lib/interview/review';
import { useAuth } from '@/store/auth';
import { radius, usePalette } from '@/theme';

export default function InterviewHistory() {
  const p = usePalette();
  const userId = useAuth((s) => s.user?.id);
  const [items, setItems] = useState<InterviewSummary[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      listInterviews(userId)
        .then(setItems)
        .catch(() => setItems([]));
    }, [userId]),
  );

  return (
    <Screen>
      <TopBar title="Past interviews" />
      {items === null ? (
        <Loading />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 10 }}
          ListEmptyComponent={
            <EmptyState icon="mic-outline" title="No interviews yet" body="Your mock interviews, recordings and feedback will appear here." action="Start an interview" onAction={() => router.replace('/interview')} />
          }
          renderItem={({ item }) => {
            const d = new Date(item.createdAt);
            const score = item.review?.score;
            const tone = score == null ? p.textMute : score >= 65 ? p.success : score >= 45 ? p.warning : p.danger;
            const status =
              item.reviewStatus === 'done' && item.review
                ? HIRE_LABEL[item.review.hire]
                : item.reviewStatus === 'running'
                  ? 'Feedback in progress'
                  : item.reviewStatus === 'error'
                    ? 'Feedback failed'
                    : item.status === 'completed'
                      ? 'No feedback yet'
                      : 'Interrupted';
            return (
              <Tap
                onPress={() => router.push(`/interview/review/${item.id}`)}
                scale={0.985}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: tone, alignItems: 'center', justifyContent: 'center' }}>
                  {score != null ? <AppText style={{ fontWeight: '700', color: tone }}>{score}</AppText> : <Ionicons name="mic-outline" size={20} color={tone} />}
                </View>
                <View style={{ flex: 1, gap: 3 }}>
                  <AppText variant="label" numberOfLines={1}>
                    {item.config.topics.map((t) => getTopic(t)?.title ?? t).join(' · ')}
                  </AppText>
                  <AppText variant="caption" color="mute">
                    {`${d.toLocaleDateString()} · ${item.config.minutes} min · ${item.level} · ${item.answered}/${item.questions} answered`}
                  </AppText>
                  <Row>
                    <Pill label={status} />
                  </Row>
                </View>
                <Ionicons name="chevron-forward" size={18} color={p.textMute} />
              </Tap>
            );
          }}
        />
      )}
    </Screen>
  );
}
