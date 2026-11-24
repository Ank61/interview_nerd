import { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TopBar } from '@/components/ui/layout';
import { AppText } from '@/components/ui/primitives';
import { usePalette } from '@/theme';

/** Shared frame for the log in / sign up screens. */
export function AuthFrame({ eyebrow, title, subtitle, children, footer }: { eyebrow: string; title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: p.bg }} behavior="padding">
      <View style={{ paddingTop: insets.top }}>
        <TopBar />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 32, gap: 28 }}>
        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="accent">
            {eyebrow}
          </AppText>
          <AppText variant="display">{title}</AppText>
          <AppText variant="body" color="dim">
            {subtitle}
          </AppText>
        </View>
        <View style={{ gap: 18 }}>{children}</View>
        {footer}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
