import Ionicons from '@expo/vector-icons/Ionicons';
import { forwardRef, useState } from 'react';
import { TextInput, type TextInputInstance, TextInputProps, View } from 'react-native';

import { fonts, radius, usePalette } from '@/theme';

import { AppText, IconName, Tap } from './primitives';

type FieldProps = TextInputProps & {
  label: string;
  error?: string;
  icon?: IconName;
  secure?: boolean;
  hint?: string;
};

/** Labelled text field with icon, error state and optional show/hide toggle. */
export const Field = forwardRef<TextInputInstance, FieldProps>(function Field({ label, error, icon, secure, hint, style, ...rest }, ref) {
  const p = usePalette();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secure);
  const border = error ? p.danger : focused ? p.accentFg : p.border;
  return (
    <View style={{ gap: 7 }}>
      <AppText variant="label" color="dim">
        {label}
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 52,
          borderRadius: radius.md,
          backgroundColor: p.surface,
          borderWidth: 1.5,
          borderColor: border,
          paddingHorizontal: 14,
          gap: 10,
        }}>
        {icon && <Ionicons name={icon} size={18} color={focused ? p.accentFg : p.textMute} />}
        <TextInput
          ref={ref}
          placeholderTextColor={p.textMute}
          selectionColor={p.accentFg}
          secureTextEntry={hidden}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[{ flex: 1, color: p.text, fontFamily: fonts.medium, fontSize: 15.5, height: '100%' }, style]}
          {...rest}
        />
        {secure && (
          <Tap onPress={() => setHidden((h) => !h)} hitSlop={10} accessibilityLabel={hidden ? 'Show password' : 'Hide password'}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={19} color={p.textMute} />
          </Tap>
        )}
      </View>
      {error ? (
        <AppText variant="small" color="danger">
          {error}
        </AppText>
      ) : hint ? (
        <AppText variant="small" color="mute">
          {hint}
        </AppText>
      ) : null}
    </View>
  );
});

export function SearchField({
  value,
  onChangeText,
  placeholder = 'Search',
  autoFocus,
  onSubmit,
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmit?: () => void;
}) {
  const p = usePalette();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        borderRadius: radius.pill,
        backgroundColor: p.surface,
        borderWidth: 1,
        borderColor: p.border,
        paddingHorizontal: 16,
        gap: 10,
      }}>
      <Ionicons name="search" size={18} color={p.textMute} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={p.textMute}
        selectionColor={p.accentFg}
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        style={{ flex: 1, color: p.text, fontFamily: fonts.medium, fontSize: 15, height: '100%' }}
      />
      {!!value && (
        <Tap onPress={() => onChangeText('')} hitSlop={10} accessibilityLabel="Clear search">
          <Ionicons name="close-circle" size={18} color={p.textMute} />
        </Tap>
      )}
    </View>
  );
}

/** Pill segmented control. */
export function Segmented<T extends string>({ options, value, onChange }: { options: { value: T; label: string; count?: number }[]; value: T; onChange: (v: T) => void }) {
  const p = usePalette();
  return (
    <View style={{ flexDirection: 'row', backgroundColor: p.surface, borderRadius: radius.pill, padding: 4, borderWidth: 1, borderColor: p.border }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Tap
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            scale={1}
            style={{ flex: 1, height: 38, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, backgroundColor: active ? p.accent : 'transparent' }}>
            <AppText variant="label" style={{ color: active ? p.onAccent : p.textDim }}>
              {o.label}
            </AppText>
            {o.count != null && (
              <AppText variant="caption" style={{ color: active ? 'rgba(11,11,13,0.55)' : p.textMute, fontFamily: fonts.mono }}>
                {o.count}
              </AppText>
            )}
          </Tap>
        );
      })}
    </View>
  );
}
