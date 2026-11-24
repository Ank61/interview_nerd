import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, SectionList, View } from 'react-native';

import { TopicCard } from '@/components/rows';
import { SearchField } from '@/components/ui/inputs';
import { Screen } from '@/components/ui/layout';
import { AppText, Chip, EmptyState, Row, Tap } from '@/components/ui/primitives';
import { TopicIcon } from '@/components/ui/visuals';
import { awsTopics, catalog, type Topic } from '@/data/catalog';
import { alpha, radius, usePalette } from '@/theme';

export default function Learn() {
  const p = usePalette();
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string>('All');

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (t: Topic) => !q || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.group.toLowerCase().includes(q);
    const groups = group === 'All' ? catalog.groups : [group];
    return groups
      .map((g) => ({
        title: g,
        // Cloud is summarised by a single AWS card unless searched/filtered.
        data: catalog.topics.filter((t) => t.group === g && match(t) && (g !== 'Cloud' || q || group === 'Cloud')),
      }))
      .filter((s) => s.data.length || (s.title === 'Cloud' && !q));
  }, [query, group]);

  const totalConcepts = catalog.stats.concepts;

  return (
    <Screen>
      <SectionList
        sections={sections}
        keyExtractor={(t) => t.id}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View style={{ gap: 16, paddingTop: 10, paddingBottom: 4 }}>
            <View>
              <AppText variant="display">Learn</AppText>
              <AppText variant="body" color="dim" style={{ marginTop: 4 }}>
                {catalog.stats.topics} topics · {totalConcepts.toLocaleString()} concepts · {catalog.stats.questions.toLocaleString()} interview answers
              </AppText>
            </View>
            <SearchField value={query} onChangeText={setQuery} placeholder="Filter topics" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingRight: 20 }} style={{ marginRight: -20 }}>
              {['All', ...catalog.groups].map((g) => (
                <Chip key={g} label={g} selected={group === g} onPress={() => setGroup(g)} />
              ))}
            </ScrollView>
            <Tap
              onPress={() => router.push('/search')}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 }}>
              <Ionicons name="sparkles" size={15} color={p.accentFg} />
              <AppText variant="small" color="dim">
                Looking for a specific concept or question?{' '}
                <AppText variant="small" color="accent">
                  Search everything
                </AppText>
              </AppText>
            </Tap>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <AppText variant="eyebrow" color="mute" style={{ marginTop: 22, marginBottom: 10 }}>
            {section.title.toUpperCase()}
          </AppText>
        )}
        renderSectionFooter={({ section }) =>
          section.title === 'Cloud' && !query && group !== 'Cloud' ? <AwsBanner /> : null
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <TopicCard topic={item} onPress={() => router.push(`/topic/${item.id}`)} />}
        ListEmptyComponent={<EmptyState icon="search" title="No topics found" body="Try a different keyword or search all content." action="Search everything" onAction={() => router.push('/search')} />}
      />
    </Screen>
  );
}

function AwsBanner() {
  const p = usePalette();
  const sample = awsTopics.slice(0, 5);
  return (
    <Tap
      onPress={() => router.push('/aws')}
      style={{ padding: 18, borderRadius: radius.lg, backgroundColor: alpha('#FF9900', p.scheme === 'dark' ? 0.1 : 0.12), borderWidth: 1, borderColor: alpha('#FF9900', 0.25), gap: 14 }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <View style={{ flex: 1, gap: 4 }}>
          <AppText variant="heading">AWS Cloud</AppText>
          <AppText variant="small" color="dim">
            {awsTopics.length} services · {awsTopics.reduce((n, t) => n + t.counts.concepts, 0)} concepts
          </AppText>
        </View>
        <Ionicons name="arrow-forward-circle" size={30} color="#FF9900" />
      </Row>
      <Row gap={-8}>
        {sample.map((t) => (
          <View key={t.id} style={{ marginRight: -6 }}>
            <TopicIcon item={t} size={34} radius={17} />
          </View>
        ))}
        <AppText variant="caption" color="mute" style={{ marginLeft: 16 }}>
          EC2, S3, Lambda, IAM, VPC…
        </AppText>
      </Row>
    </Tap>
  );
}
