import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, ProgressBar, Row, Tap } from '@/components/ui/primitives';
import { TopicIcon } from '@/components/ui/visuals';
import { awsTopics, type Topic } from '@/data/catalog';
import { topicLearnedCount, useProgress } from '@/store/progress';
import { alpha, radius, readable, usePalette } from '@/theme';

const ORDER = ['Overview', 'Compute', 'Containers', 'Storage', 'Database', 'Networking', 'Security', 'Messaging', 'Observability', 'DevOps', 'More'];

export default function AwsScreen() {
  const p = usePalette();
  const learned = useProgress((s) => s.learned);
  const groups = new Map<string, Topic[]>();
  for (const t of awsTopics) {
    const g = t.id === 'aws-essentials' ? 'Overview' : t.awsGroup || 'More';
    groups.set(g, [...(groups.get(g) ?? []), t]);
  }
  const ordered = [...groups.entries()].sort((a, b) => ORDER.indexOf(a[0]) - ORDER.indexOf(b[0]));
  const totalConcepts = awsTopics.reduce((n, t) => n + t.counts.concepts, 0);
  const totalLearned = awsTopics.reduce((n, t) => n + topicLearnedCount(learned, t.id), 0);

  return (
    <Screen>
      <TopBar title="AWS Cloud" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 24 }}>
        <View style={{ padding: 18, borderRadius: radius.xl, backgroundColor: alpha('#FF9900', p.scheme === 'dark' ? 0.1 : 0.14), borderWidth: 1, borderColor: alpha('#FF9900', 0.25), gap: 12 }}>
          <AppText variant="eyebrow" style={{ color: readable('#FF9900', p.scheme) }}>
            AMAZON WEB SERVICES
          </AppText>
          <AppText variant="title">Pick a service to master</AppText>
          <AppText variant="small" color="dim">
            {awsTopics.length} services · {totalConcepts} concepts from fundamentals to SDE-3 system design.
          </AppText>
          <ProgressBar value={totalLearned / Math.max(1, totalConcepts)} color="#FF9900" />
          <AppText variant="caption" color="mute">
            {totalLearned} of {totalConcepts} learned
          </AppText>
        </View>

        {ordered.map(([group, list]) => (
          <View key={group} style={{ gap: 10 }}>
            <AppText variant="eyebrow" color="mute">
              {group.toUpperCase()}
            </AppText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {list.map((t) => {
                const n = topicLearnedCount(learned, t.id);
                return (
                  <Tap
                    key={t.id}
                    onPress={() => router.push(`/topic/${t.id}`)}
                    style={{ width: '48%', flexGrow: 1, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 10 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <TopicIcon item={t} size={38} />
                      {t.counts.concepts > 0 && (
                        <AppText variant="caption" color="mute">
                          {n}/{t.counts.concepts}
                        </AppText>
                      )}
                    </Row>
                    <View style={{ gap: 2 }}>
                      <AppText variant="label" style={{ fontSize: 15 }} numberOfLines={1}>
                        {t.title}
                      </AppText>
                      <AppText variant="caption" color="mute" numberOfLines={2}>
                        {t.desc}
                      </AppText>
                    </View>
                    {t.counts.concepts > 0 && <ProgressBar value={n / t.counts.concepts} height={3} color={readable(t.color, p.scheme)} />}
                  </Tap>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
