import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { SectionList, View } from 'react-native';

import { SearchField } from '@/components/ui/inputs';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, EmptyState, Row, Tap } from '@/components/ui/primitives';
import { catalog } from '@/data/catalog';
import { haptic } from '@/lib/haptics';
import { toast } from '@/store/toast';
import { fonts, radius, usePalette } from '@/theme';

export default function ResourceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = usePalette();
  const res = catalog.resources.find((r) => r.id === id);
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (res?.sheets ?? [])
      .map((s) => ({ ...s, data: s.items.filter((it) => !q || `${it.cmd} ${it.desc} ${it.ex}`.toLowerCase().includes(q)) }))
      .filter((s) => s.data.length);
  }, [res, query]);

  if (!res) return <Screen><TopBar /><EmptyState icon="alert-circle" title="Cheat sheet not found" /></Screen>;

  return (
    <Screen>
      <TopBar title={res.title} />
      <SectionList
        sections={sections}
        keyExtractor={(it, i) => it.cmd + i}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={{ gap: 12, paddingBottom: 6 }}>
            <AppText variant="body" color="dim">
              {res.description}
            </AppText>
            <SearchField value={query} onChangeText={setQuery} placeholder="Find a command" />
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Row gap={8} style={{ marginTop: 22, marginBottom: 10 }}>
            <AppText style={{ fontSize: 18 }}>{section.emoji}</AppText>
            <View style={{ flex: 1 }}>
              <AppText variant="heading">{section.title}</AppText>
              <AppText variant="caption" color="mute">
                {section.description}
              </AppText>
            </View>
          </Row>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={<EmptyState icon="search" title="No commands match" />}
        renderItem={({ item }) => (
          <Tap
            onPress={async () => {
              await Clipboard.setStringAsync(item.ex || item.cmd);
              haptic.success();
              toast({ kind: 'info', emoji: '📋', title: 'Copied to clipboard', sub: item.ex || item.cmd });
            }}
            scale={0.985}
            style={{ padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 8 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <AppText style={{ fontFamily: fonts.monoMedium, fontSize: 14, color: p.accentFg }}>{item.cmd}</AppText>
              <Ionicons name="copy-outline" size={15} color={p.textMute} />
            </Row>
            <AppText variant="small" color="dim">
              {item.desc}
            </AppText>
            {!!item.ex && (
              <View style={{ padding: 10, borderRadius: 10, backgroundColor: p.codeBg }}>
                <AppText style={{ fontFamily: fonts.mono, fontSize: 12, color: '#E6EDF3' }}>$ {item.ex}</AppText>
              </View>
            )}
          </Tap>
        )}
      />
    </Screen>
  );
}
