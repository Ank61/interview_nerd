import { useRef, useState } from 'react';
import { ScrollView, TextInput, type TextInputInstance, type TextInputSelectionChangeEvent, View } from 'react-native';

import { haptic } from '@/lib/haptics';
import { fonts, radius, usePalette } from '@/theme';

import { AppText, Tap } from './ui/primitives';

const SYMBOLS: Record<string, string[]> = {
  sql: ['*', ',', '(', ')', "'", '=', '<', '>', ';', '.', '_', 'SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY'],
  javascript: ['⇥', '{', '}', '(', ')', '[', ']', ';', '=', '=>', "'", '"', '`', '.', ',', ':', '$', '<', '>', '!', '&', '|'],
  default: ['⇥', '{', '}', '(', ')', '[', ']', ':', '=', "'", '"', '.', ',', '-', '_', '/', '$', '#', '|', '<', '>'],
};

/**
 * Lightweight code editor: monospace multiline input with a symbol bar for
 * characters that are awkward to type on mobile keyboards.
 */
export function CodeEditor({ value, onChange, lang, placeholder, minHeight = 180 }: { value: string; onChange: (v: string) => void; lang: string; placeholder?: string; minHeight?: number }) {
  const p = usePalette();
  const ref = useRef<TextInputInstance>(null);
  // Latest cursor position (tracked, not controlled, so typing stays smooth).
  const sel = useRef({ start: value.length, end: value.length });
  // Only force the selection right after inserting a symbol.
  const [forced, setForced] = useState<{ start: number; end: number } | undefined>();
  const [focused, setFocused] = useState(false);
  const symbols = SYMBOLS[lang] ?? (lang === 'mongo' ? SYMBOLS.javascript : SYMBOLS.default);

  const insert = (token: string) => {
    haptic.tap();
    const text = token === '⇥' ? '  ' : /^[A-Z ]{3,}$/.test(token) ? `${token} ` : token;
    const { start, end } = sel.current;
    const s = Math.min(start, value.length);
    const next = value.slice(0, s) + text + value.slice(Math.min(end, value.length));
    const pos = s + text.length;
    sel.current = { start: pos, end: pos };
    onChange(next);
    setForced({ start: pos, end: pos });
    ref.current?.focus();
  };

  const onSelectionChange = (e: TextInputSelectionChangeEvent) => {
    sel.current = e.nativeEvent.selection;
    if (forced) setForced(undefined);
  };

  return (
    <View style={{ borderRadius: radius.md, overflow: 'hidden', backgroundColor: p.codeBg, borderWidth: 1.5, borderColor: focused ? p.accentFg : 'rgba(255,255,255,0.08)' }}>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChange}
        selection={forced}
        onSelectionChange={onSelectionChange}
        multiline
        scrollEnabled={false}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoComplete="off"
        keyboardType={'ascii-capable' as never}
        textAlignVertical="top"
        placeholder={placeholder}
        placeholderTextColor="#6E7681"
        selectionColor="#D4FF4F"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ minHeight, padding: 14, color: '#E6EDF3', fontFamily: fonts.mono, fontSize: 13, lineHeight: 20 }}
      />
      <ScrollView
        horizontal
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.03)' }}
        contentContainerStyle={{ padding: 6, gap: 6 }}>
        {symbols.map((s) => (
          <Tap
            key={s}
            onPress={() => insert(s)}
            haptics={false}
            scale={0.9}
            style={{ minWidth: 36, height: 34, paddingHorizontal: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.07)' }}>
            <AppText style={{ fontFamily: fonts.monoMedium, fontSize: s.length > 2 ? 11 : 14, color: '#E6EDF3' }}>{s}</AppText>
          </Tap>
        ))}
      </ScrollView>
    </View>
  );
}
