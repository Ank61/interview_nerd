import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Row, Tap } from '@/components/ui/primitives';
import { catalog } from '@/data/catalog';
import { radius, usePalette } from '@/theme';

export default function Resources() {
  const p = usePalette();
  return (
    <Screen>
      <TopBar title="Cheat sheets" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 14 }}>
        <AppText variant="body" color="dim">
          Quick-reference command sheets you can copy from. Great for last-minute revision.
        </AppText>
        {catalog.resources.map((r) => (
          <Tap key={r.id} onPress={() => router.push(`/resource/${r.id}`)} style={{ padding: 18, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 12 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <AppText variant="heading">{r.title}</AppText>
              <Ionicons name="arrow-forward" size={18} color={p.accentFg} />
            </Row>
            <AppText variant="small" color="dim">
              {r.description}
            </AppText>
            <Row gap={6} style={{ flexWrap: 'wrap' }}>
              {r.sheets.map((s) => (
                <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: p.surface2 }}>
                  <AppText style={{ fontSize: 12 }}>{s.emoji}</AppText>
                  <AppText variant="caption" color="dim">
                    {s.title}
                  </AppText>
                </View>
              ))}
            </Row>
          </Tap>
        ))}
      </ScrollView>
    </Screen>
  );
}
