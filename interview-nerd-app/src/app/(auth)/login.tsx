import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { type TextInputInstance, View } from 'react-native';

import { AuthFrame } from '@/components/AuthForm';
import { Field } from '@/components/ui/inputs';
import { AppText, Button, Tap } from '@/components/ui/primitives';
import { haptic } from '@/lib/haptics';
import { AuthError, useAuth } from '@/store/auth';

export default function Login() {
  const logIn = useAuth((s) => s.logIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [busy, setBusy] = useState(false);
  const pwRef = useRef<TextInputInstance>(null);

  const submit = async () => {
    setErrors({});
    setBusy(true);
    try {
      await logIn(email, password);
      haptic.success();
    } catch (e) {
      haptic.error();
      const err = e as AuthError;
      setErrors(err.field === 'password' ? { password: err.message } : { email: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthFrame
      eyebrow="WELCOME BACK"
      title="Log in"
      subtitle="Pick up right where you left off. Your progress is saved on this device."
      footer={
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
          <AppText variant="body" color="dim">
            New here?
          </AppText>
          <Tap onPress={() => router.replace('/signup')} hitSlop={10}>
            <AppText variant="label" color="accent" style={{ fontSize: 15 }}>
              Create an account
            </AppText>
          </Tap>
        </View>
      }>
      <Field
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
      <Field
        ref={pwRef}
        label="Password"
        icon="lock-closed-outline"
        value={password}
        onChangeText={setPassword}
        placeholder="Your password"
        secure
        autoCapitalize="none"
        autoComplete="password"
        returnKeyType="go"
        onSubmitEditing={submit}
        error={errors.password}
      />
      <Button label="Log in" size="lg" onPress={submit} loading={busy} full style={{ marginTop: 6 }} />
    </AuthFrame>
  );
}
