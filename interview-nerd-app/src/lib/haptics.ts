import * as Haptics from 'expo-haptics';

import { useSettings } from '@/store/settings';

const enabled = () => useSettings.getState().haptics;

export const haptic = {
  tap: () => enabled() && Haptics.selectionAsync().catch(() => {}),
  light: () => enabled() && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {}),
  success: () => enabled() && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}),
  error: () => enabled() && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {}),
  warn: () => enabled() && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {}),
};
