import { ScrollView, View } from 'react-native';

import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, ProgressBar, Row } from '@/components/ui/primitives';
import { ProgressRing } from '@/components/ui/visuals';
import { BADGES, LEVELS, RARITY_COLOR, levelFor } from '@/lib/gamification';
import { badgeStats, useProgress } from '@/store/progress';
import { alpha, fonts, radius, usePalette } from '@/theme';

export default function Achievements() {
  const p = usePalette();
  const state = useProgress();
  const stats = badgeStats(state);
  const lvl = levelFor(state.xp);
  const earned = BADGES.filter((b) => state.badges[b.id]).length;

  return (
    <Screen>
      <TopBar title="Achievements" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 24 }}>
        <Row gap={16} style={{ padding: 18, borderRadius: radius.xl, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
          <ProgressRing value={earned / BADGES.length} size={76} stroke={7}>
            <AppText style={{ fontFamily: fonts.extrabold, fontSize: 18, color: p.text }}>{earned}</AppText>
          </ProgressRing>
          <View style={{ flex: 1, gap: 4 }}>
            <AppText variant="heading">
              {earned} of {BADGES.length} badges
            </AppText>
            <AppText variant="small" color="mute">
              Keep learning daily to unlock streak and mastery badges.
            </AppText>
          </View>
        </Row>

        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="mute">
            BADGES
          </AppText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {BADGES.map((b) => {
              const got = !!state.badges[b.id];
              const prog = b.progress?.(stats);
              const color = RARITY_COLOR[b.rarity];
              return (
                <View
                  key={b.id}
                  style={{ width: '48%', flexGrow: 1, padding: 14, borderRadius: radius.lg, backgroundColor: got ? alpha(color, 0.1) : p.surface, borderWidth: 1, borderColor: got ? alpha(color, 0.4) : p.border, gap: 8, opacity: got ? 1 : 0.85 }}>
                  <Row style={{ justifyContent: 'space-between' }} align="flex-start">
                    <AppText style={{ fontSize: 30, opacity: got ? 1 : 0.35 }}>{b.icon}</AppText>
                    <AppText variant="caption" style={{ color, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                      {b.rarity}
                    </AppText>
                  </Row>
                  <AppText variant="label" style={{ fontSize: 14.5 }}>
                    {b.name}
                  </AppText>
                  <AppText variant="caption" color="mute">
                    {b.description}
                  </AppText>
                  {got ? (
                    <AppText variant="caption" style={{ color }}>
                      Unlocked {new Date(state.badges[b.id]).toLocaleDateString()}
                    </AppText>
                  ) : prog ? (
                    <View style={{ gap: 4 }}>
                      <ProgressBar value={prog[0] / prog[1]} height={4} color={color} />
                      <AppText variant="caption" color="mute">
                        {prog[0]}/{prog[1]}
                      </AppText>
                    </View>
                  ) : (
                    <AppText variant="caption" color="mute">
                      Locked
                    </AppText>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="mute">
            LEVELS
          </AppText>
          <View style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>
            {LEVELS.map((l, i) => {
              const reached = state.xp >= l.xp;
              const current = l.level === lvl.level;
              return (
                <Row key={l.level} gap={12} style={{ padding: 14, borderTopWidth: i ? 1 : 0, borderTopColor: p.border, backgroundColor: current ? p.accentSoft : 'transparent' }}>
                  <View style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: reached ? p.accent : p.surface2 }}>
                    <AppText style={{ fontFamily: fonts.bold, fontSize: 13, color: reached ? p.onAccent : p.textMute }}>{l.level}</AppText>
                  </View>
                  <AppText variant="label" style={{ flex: 1, color: reached ? p.text : p.textMute }}>
                    {l.name}
                  </AppText>
                  <AppText variant="caption" style={{ fontFamily: fonts.mono, color: p.textMute }}>
                    {l.xp.toLocaleString()} XP
                  </AppText>
                </Row>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
