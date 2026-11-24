import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { type TextInputInstance, View } from 'react-native';

import { AuthFrame } from '@/components/AuthForm';
import { Field } from '@/components/ui/inputs';
import { AppText, Button, Tap } from '@/components/ui/primitives';
import { haptic } from '@/lib/haptics';
import { AuthError, useAuth } from '@/store/auth';
import { usePalette } from '@/theme';

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(4, s);
}
const LABELS = ['Too short', 'Weak', 'Okay', 'Strong', 'Excellent'];

export default function Signup() {
  const p = usePalette();
  const signUp = useAuth((s) => s.signUp);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [busy, setBusy] = useState(false);
  const emailRef = useRef<TextInputInstance>(null);
  const pwRef = useRef<TextInputInstance>(null);
  const confirmRef = useRef<TextInputInstance>(null);
  const score = strength(password);
  const colors = [p.danger, p.danger, p.warning, p.success, p.accentFg];

  const submit = async () => {
    setErrors({});
    if (password !== confirm) {
      setErrors({ confirm: 'Passwords do not match.' });
      haptic.error();
      return;
    }
    setBusy(true);
    try {
      await signUp(name, email, password);
      haptic.success();
    } catch (e) {
      haptic.error();
      const err = e as AuthError;
      setErrors({ [err.field || 'email']: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthFrame
      eyebrow="GET STARTED"
      title="Create account"
      subtitle="Set up a local profile to track your XP, streaks, bookmarks and progress."
      footer={
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
          <AppText variant="body" color="dim">
            Already have an account?
          </AppText>
          <Tap onPress={() => router.replace('/login')} hitSlop={10}>
            <AppText variant="label" color="accent" style={{ fontSize: 15 }}>
              Log in
            </AppText>
          </Tap>
        </View>
      }>
      <Field
        label="Full name"
        icon="person-outline"
        value={name}
        onChangeText={setName}
        placeholder="Ada Lovelace"
        autoComplete="name"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        error={errors.name}
      />
      <Field
        ref={emailRef}
        label="Email"
        icon="mail-outline"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => pwRef.current?.focus()}
        error={errors.email}
      />
      <View style={{ gap: 10 }}>
        <Field
          ref={pwRef}
          label="Password"
          icon="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          placeholder="At least 6 characters"
          secure
          autoCapitalize="none"
          autoComplete="new-password"
          returnKeyType="next"
          onSubmitEditing={() => confirmRef.current?.focus()}
          error={errors.password}
        />
        {password.length > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', gap: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < score ? colors[score] : p.surface3 }} />
              ))}
            </View>
            <AppText variant="caption" style={{ color: colors[score], width: 70, textAlign: 'right' }}>
              {LABELS[score]}
            </AppText>
          </View>
        )}
      </View>
      <Field
        ref={confirmRef}
        label="Confirm password"
        icon="shield-checkmark-outline"
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Repeat your password"
        secure
        autoCapitalize="none"
        returnKeyType="go"
        onSubmitEditing={submit}
        error={errors.confirm}
      />
      <Button label="Create account" size="lg" onPress={submit} loading={busy} full style={{ marginTop: 6 }} />
    </AuthFrame>
  );
}
