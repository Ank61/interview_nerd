import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconName } from '@/components/ui/primitives';
import { useAuth } from '@/store/auth';
import { fonts, usePalette } from '@/theme';

const TABS: { name: string; title: string; icon: IconName; active: IconName }[] = [
  { name: 'index', title: 'Home', icon: 'home-outline', active: 'home' },
  { name: 'learn', title: 'Learn', icon: 'library-outline', active: 'library' },
  { name: 'practice', title: 'Practice', icon: 'flash-outline', active: 'flash' },
  { name: 'saved', title: 'Saved', icon: 'bookmark-outline', active: 'bookmark' },
  { name: 'profile', title: 'Profile', icon: 'person-circle-outline', active: 'person-circle' },
];

export default function TabLayout() {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const user = useAuth((s) => s.user);
  if (user && !user.onboarded) return <Redirect href="/onboarding" />;

  const bottom = Math.max(insets.bottom, Platform.OS === 'android' ? 10 : 8);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: p.accentFg,
        tabBarInactiveTintColor: p.textMute,
        tabBarStyle: {
          backgroundColor: p.surface,
          borderTopColor: p.border,
          borderTopWidth: 1,
          height: 58 + bottom,
          paddingTop: 6,
          paddingBottom: bottom,
          elevation: 0,
        },
        tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 11, marginTop: 1 },
        sceneStyle: { backgroundColor: p.bg },
      }}>
      {TABS.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? t.active : t.icon} size={23} color={color as string} />,
          }}
        />
      ))}
    </Tabs>
  );
}
