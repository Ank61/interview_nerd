import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode } from 'react';
import { View } from 'react-native';

import type { Topic } from '@/data/catalog';
import { topicLearnedCount, useProgress } from '@/store/progress';
import { fonts, radius, readable, usePalette } from '@/theme';

import { AppText, IconName, ProgressBar, Tap } from './ui/primitives';
import { TopicIcon } from './ui/visuals';

/** Generic list row with leading slot, title, subtitle and trailing slot. */
export function ListRow({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  numberOfLines = 2,
}: {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  numberOfLines?: number;
}) {
  const p = usePalette();
  return (
    <Tap
      onPress={onPress}
      scale={0.985}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 16, backgroundColor: p.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: p.border }}>
      {leading}
      <View style={{ flex: 1, gap: 3 }}>
        <AppText variant="bodyMedium" numberOfLines={numberOfLines} style={{ lineHeight: 21 }}>
          {title}
        </AppText>
        {!!subtitle && (
          <AppText variant="small" color="mute" numberOfLines={1}>
            {subtitle}
          </AppText>
        )}
      </View>
      {trailing ?? <Ionicons name="chevron-forward" size={18} color={p.textMute} />}
    </Tap>
  );
}

export function NumberBadge({ n, done }: { n: number; done?: boolean }) {
  const p = usePalette();
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: done ? p.accent : p.surface2,
      }}>
      {done ? (
        <Ionicons name="checkmark" size={17} color={p.onAccent} />
      ) : (
        <AppText style={{ fontFamily: fonts.mono, fontSize: 11.5, color: p.textDim }}>{String(n).padStart(2, '0')}</AppText>
      )}
    </View>
  );
}

/** Topic card with icon, counts and learned progress. */
export function TopicCard({ topic, onPress, compact }: { topic: Topic; onPress: () => void; compact?: boolean }) {
  const p = usePalette();
  const learned = useProgress((s) => topicLearnedCount(s.learned, topic.id));
  const total = topic.counts.concepts;
  const pct = total ? learned / total : 0;
  const tint = readable(topic.color, p.scheme);
  if (compact) {
    return (
      <Tap
        onPress={onPress}
        style={{ width: 148, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 12 }}>
        <TopicIcon item={topic} size={40} />
        <View style={{ gap: 2 }}>
          <AppText variant="label" numberOfLines={1} style={{ fontSize: 14.5 }}>
            {topic.title}
          </AppText>
          <AppText variant="caption" color="mute" numberOfLines={1}>
            {total ? `${total} concepts` : `${topic.counts.questions} questions`}
          </AppText>
        </View>
        <ProgressBar value={pct} height={4} color={tint} />
      </Tap>
    );
  }
  return (
    <Tap
      onPress={onPress}
      scale={0.985}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
      <TopicIcon item={topic} size={48} />
      <View style={{ flex: 1, gap: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <AppText variant="heading" numberOfLines={1} style={{ flex: 1, fontSize: 16 }}>
            {topic.title}
          </AppText>
          {total > 0 && (
            <AppText variant="caption" style={{ fontFamily: fonts.mono, color: pct >= 1 ? p.accentFg : p.textMute }}>
              {learned}/{total}
            </AppText>
          )}
        </View>
        <AppText variant="small" color="mute" numberOfLines={1}>
          {[total && `${total} concepts`, topic.counts.questions && `${topic.counts.questions} Q&A`].filter(Boolean).join('  ·  ') || topic.desc}
        </AppText>
        {total > 0 && <ProgressBar value={pct} height={4} color={tint} />}
      </View>
    </Tap>
  );
}

export function StatTile({ icon, value, label, color }: { icon: IconName; value: string | number; label: string; color?: string }) {
  const p = usePalette();
  return (
    <View style={{ flex: 1, minWidth: 140, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 10 }}>
      <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: p.surface2, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={17} color={color ?? p.accentFg} />
      </View>
      <View>
        <AppText style={{ fontFamily: fonts.bold, fontSize: 22, color: p.text, letterSpacing: -0.5 }}>{value}</AppText>
        <AppText variant="caption" color="mute">
          {label}
        </AppText>
      </View>
    </View>
  );
}
