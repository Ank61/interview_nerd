import { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, View } from 'react-native';

import { Field } from '@/components/ui/inputs';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Button } from '@/components/ui/primitives';
import { haptic } from '@/lib/haptics';
import { AuthError, useAuth } from '@/store/auth';
import { toast } from '@/store/toast';
import { radius, usePalette } from '@/theme';

export default function Account() {
  const p = usePalette();
  const user = useAuth((s) => s.user);
  const updateProfile = useAuth((s) => s.updateProfile);
  const changePassword = useAuth((s) => s.changePassword);
  const deleteAccount = useAuth((s) => s.deleteAccount);
  const [name, setName] = useState(user?.name ?? '');
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [delPw, setDelPw] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const saveName = async () => {
    if (name.trim().length < 2) return setErrors({ name: 'Please enter your name.' });
    setBusy('name');
    await updateProfile({ name });
    setBusy(null);
    setErrors({});
    haptic.success();
    toast({ kind: 'info', emoji: '✅', title: 'Profile updated' });
  };

  const savePassword = async () => {
    setBusy('pw');
    try {
      await changePassword(current, next);
      setCurrent('');
      setNext('');
      setErrors({});
      haptic.success();
      toast({ kind: 'info', emoji: '🔐', title: 'Password changed' });
    } catch (e) {
      const err = e as AuthError;
      setErrors({ [err.field === 'current' ? 'current' : 'next']: err.message });
      haptic.error();
    } finally {
      setBusy(null);
    }
  };

  const remove = () =>
    Alert.alert('Delete account?', 'Your profile and all progress on this device will be permanently deleted.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setBusy('del');
          try {
            await deleteAccount(delPw);
          } catch (e) {
            setErrors({ del: (e as Error).message });
            haptic.error();
            setBusy(null);
          }
        },
      },
    ]);

  const card = { padding: 16, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, gap: 14 } as const;

  return (
    <Screen>
      <TopBar title="Account & security" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 22 }}>
          <View style={card}>
            <AppText variant="heading">Profile</AppText>
            <Field label="Display name" icon="person-outline" value={name} onChangeText={setName} error={errors.name} />
            <Field label="Email" icon="mail-outline" value={user?.email} editable={false} hint="Email is your login on this device and can’t be changed." />
            <Button label="Save changes" onPress={saveName} loading={busy === 'name'} disabled={name.trim() === user?.name} />
          </View>

          <View style={card}>
            <AppText variant="heading">Change password</AppText>
            <Field label="Current password" icon="lock-closed-outline" value={current} onChangeText={setCurrent} secure autoCapitalize="none" error={errors.current} />
            <Field label="New password" icon="key-outline" value={next} onChangeText={setNext} secure autoCapitalize="none" error={errors.next} hint="At least 6 characters" />
            <Button label="Update password" variant="secondary" onPress={savePassword} loading={busy === 'pw'} disabled={!current || !next} />
          </View>

          <View style={[card, { borderColor: p.dangerSoft }]}>
            <AppText variant="heading" color="danger">
              Danger zone
            </AppText>
            <AppText variant="small" color="dim">
              Deleting your account removes your profile and all progress stored on this device.
            </AppText>
            <Field label="Confirm with password" icon="lock-closed-outline" value={delPw} onChangeText={setDelPw} secure autoCapitalize="none" error={errors.del} />
            <Button label="Delete account" variant="danger" icon="trash-outline" onPress={remove} loading={busy === 'del'} disabled={!delPw} />
          </View>

          <AppText variant="caption" color="mute" center>
            Passwords are salted and hashed (SHA-256) before being stored locally.
          </AppText>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
