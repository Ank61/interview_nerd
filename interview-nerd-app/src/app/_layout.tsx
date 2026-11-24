// Per-weight imports so only the five weights we use are bundled.
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Inter_800ExtraBold } from '@expo-google-fonts/inter/800ExtraBold';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono/400Regular';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono/500Medium';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Toaster } from '@/components/Toaster';
import { useAuth } from '@/store/auth';
import { useProgress } from '@/store/progress';
import { useSettings } from '@/store/settings';
import { usePalette } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const p = usePalette();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
  });
  const settingsReady = useSettings((s) => s.hydrated);
  const authReady = useAuth((s) => s.hydrated);
  const user = useAuth((s) => s.user);
  const progressUser = useProgress((s) => s.userId);
  const progressReady = !user || progressUser === user.id;
  const ready = fontsLoaded && settingsReady && authReady && progressReady;

  useEffect(() => {
    useSettings.getState().hydrate();
    useAuth.getState().hydrate();
  }, []);

  useEffect(() => {
    if (authReady) useProgress.getState().load(user?.id ?? null);
  }, [authReady, user?.id]);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(p.bg).catch(() => {});
  }, [p.bg]);

  if (!ready) return <View style={{ flex: 1, backgroundColor: p.bg }} />;

  const base = p.scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: { ...base.colors, background: p.bg, card: p.bg, text: p.text, border: p.border, primary: p.accentFg },
  };
  const signedIn = !!user;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={navTheme}>
        <StatusBar style={p.scheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: p.bg }, animation: 'slide_from_right' }}>
          <Stack.Protected guard={signedIn} redirectTo="/welcome">
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="onboarding" options={{ gestureEnabled: false, animation: 'fade' }} />
            <Stack.Screen name="topic/[id]" />
            <Stack.Screen name="concept/[id]" />
            <Stack.Screen name="question/[id]" />
            <Stack.Screen name="quiz/[id]" options={{ gestureEnabled: false }} />
            <Stack.Screen name="lab/[id]" />
            <Stack.Screen name="module/[lab]" />
            <Stack.Screen name="exercise/[lab]" />
            <Stack.Screen name="aws" />
            <Stack.Screen name="resources" />
            <Stack.Screen name="resource/[id]" />
            <Stack.Screen name="search" options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="achievements" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="account" />
            <Stack.Screen name="interview/index" />
            <Stack.Screen name="interview/room" options={{ gestureEnabled: false, animation: 'fade' }} />
            <Stack.Screen name="interview/review/[id]" />
            <Stack.Screen name="interview/history" />
            <Stack.Screen name="interview/server" />
            <Stack.Screen name="interview/provider" />
          </Stack.Protected>
          <Stack.Protected guard={!signedIn} redirectTo="/">
            <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
          </Stack.Protected>
        </Stack>
        <Toaster />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
