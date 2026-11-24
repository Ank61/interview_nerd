import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Button, IconName } from '@/components/ui/primitives';
import { Wordmark } from '@/components/ui/visuals';
import { catalog } from '@/data/catalog';
import { alpha, fonts, usePalette } from '@/theme';

const fmt = (n: number) => (n >= 1000 ? `${(Math.floor(n / 100) / 10).toFixed(1).replace('.0', '')}k+` : `${n}+`);

export default function Welcome() {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const s = catalog.stats;
  const features: { icon: IconName; title: string; body: string }[] = [
    { icon: 'book', title: 'Learn', body: `${s.concepts}+ concepts across ${s.topics} topics` },
    { icon: 'chatbubbles', title: 'Interview Q&A', body: `${fmt(s.questions)} expert-written answers` },
    { icon: 'checkmark-done', title: 'Test', body: `${fmt(s.mcqs)} MCQs with explanations` },
    { icon: 'code-slash', title: 'Practice', body: `${s.exercises} hands-on exercises` },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: p.bg }}>
      <LinearGradient
        colors={[alpha('#D4FF4F', p.scheme === 'dark' ? 0.16 : 0.32), alpha('#D4FF4F', 0)]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 420 }}
      />
      <View style={{ flex: 1, paddingTop: insets.top + 20, paddingHorizontal: 24, paddingBottom: insets.bottom + 20 }}>
        <Animated.View entering={FadeInDown.duration(500)}>
          <Wordmark />
        </Animated.View>

        <View style={{ flex: 1, justifyContent: 'center', gap: 28 }}>
          <Animated.View entering={FadeInDown.delay(80).duration(600)}>
            <AppText variant="eyebrow" color="accent" style={{ marginBottom: 14 }}>
              OFFLINE INTERVIEW PREP
            </AppText>
            <AppText style={{ fontFamily: fonts.extrabold, fontSize: 44, lineHeight: 48, letterSpacing: -1.8, color: p.text }}>
              Interview-ready,{'\n'}one <AppText style={{ fontFamily: fonts.extrabold, fontSize: 44, color: p.accentFg, letterSpacing: -1.8 }}>question</AppText>
              {'\n'}at a time.
            </AppText>
            <AppText variant="body" color="dim" style={{ marginTop: 16, fontSize: 16, lineHeight: 24 }}>
              Handpicked questions, live practice labs and progress tracking — all stored privately on your device.
            </AppText>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(180).duration(600)} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {features.map((f) => (
              <View
                key={f.title}
                style={{ width: '48%', flexGrow: 1, padding: 14, borderRadius: 18, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 8 }}>
                <Ionicons name={f.icon} size={18} color={p.accentFg} />
                <AppText variant="label">{f.title}</AppText>
                <AppText variant="caption" color="mute">
                  {f.body}
                </AppText>
              </View>
            ))}
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(260).duration(600)} style={{ gap: 10 }}>
          <Button label="Create free account" size="lg" iconRight="arrow-forward" onPress={() => router.push('/signup')} full />
          <Button label="I already have an account" size="lg" variant="secondary" onPress={() => router.push('/login')} full />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6 }}>
            <Ionicons name="lock-closed" size={12} color={p.textMute} />
            <AppText variant="caption" color="mute">
              Works fully offline. Your data never leaves this device.
            </AppText>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
