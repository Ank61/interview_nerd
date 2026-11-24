import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';
import { useMemo, useState } from 'react';
import { ScrollView, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { haptic } from '@/lib/haptics';
import { buildHtmlDocument } from '@/lib/html';
import { useSettings } from '@/store/settings';
import { toast } from '@/store/toast';
import { fonts, radius, type, usePalette } from '@/theme';

import { AppText, Tap } from './ui/primitives';

/**
 * Renders short text with `inline code` and **bold** segments natively.
 * Used for MCQs, exercise descriptions and hints.
 */
export function InlineText({ text, style, variant = 'body', color }: { text: string; style?: StyleProp<TextStyle>; variant?: keyof typeof type; color?: string }) {
  const p = usePalette();
  const parts = useMemo(() => {
    const out: { t: string; k: 'text' | 'code' | 'bold' }[] = [];
    const re = /(`[^`]+`|\*\*[^*]+\*\*)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      if (m.index > last) out.push({ t: text.slice(last, m.index), k: 'text' });
      const tok = m[0];
      out.push(tok.startsWith('`') ? { t: tok.slice(1, -1), k: 'code' } : { t: tok.slice(2, -2), k: 'bold' });
      last = m.index + tok.length;
    }
    if (last < text.length) out.push({ t: text.slice(last), k: 'text' });
    return out;
  }, [text]);
  return (
    <Text maxFontSizeMultiplier={1.4} style={[type[variant], { color: color ?? p.text }, style]}>
      {parts.map((s, i) =>
        s.k === 'code' ? (
          <Text key={i} style={{ fontFamily: fonts.mono, fontSize: (type[variant].fontSize || 15) * 0.88, backgroundColor: p.surface2, color: p.text }}>
            {` ${s.t} `}
          </Text>
        ) : s.k === 'bold' ? (
          <Text key={i} style={{ fontFamily: fonts.semibold }}>
            {s.t}
          </Text>
        ) : (
          <Text key={i}>{s.t}</Text>
        ),
      )}
    </Text>
  );
}

/** Native monospace code view with a copy button; horizontally scrollable. */
export function CodeView({ code, label, style, maxHeight }: { code: string; label?: string; style?: StyleProp<ViewStyle>; maxHeight?: number }) {
  const p = usePalette();
  const [copied, setCopied] = useState(false);
  return (
    <View style={[{ backgroundColor: p.codeBg, borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 14, paddingRight: 8, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.04)' }}>
        <AppText variant="eyebrow" style={{ color: '#8B949E' }}>
          {(label || 'code').toUpperCase()}
        </AppText>
        <Tap
          onPress={async () => {
            await Clipboard.setStringAsync(code);
            setCopied(true);
            haptic.success();
            setTimeout(() => setCopied(false), 1400);
          }}
          accessibilityLabel="Copy code"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: copied ? '#D4FF4F' : 'rgba(255,255,255,0.07)' }}>
          <Ionicons name={copied ? 'checkmark' : 'copy-outline'} size={12} color={copied ? '#0B0B0D' : '#C9D1D9'} />
          <AppText variant="caption" style={{ color: copied ? '#0B0B0D' : '#C9D1D9' }}>
            {copied ? 'Copied' : 'Copy'}
          </AppText>
        </Tap>
      </View>
      <ScrollView style={maxHeight ? { maxHeight } : undefined} nestedScrollEnabled>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 14 }}>
          <Text selectable style={{ fontFamily: fonts.mono, fontSize: 12.5, lineHeight: 20, color: '#E6EDF3' }}>
            {code}
          </Text>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

/**
 * Themed WebView for pre-rendered lesson HTML.
 * - `autoHeight`: sizes itself to its content (for use inside a ScrollView)
 * - otherwise fills its parent and scrolls internally (long lessons)
 */
export function HtmlView({ html, autoHeight, padding, minHeight = 40 }: { html: string; autoHeight?: boolean; padding?: number; minHeight?: number }) {
  const p = usePalette();
  const fontScale = useSettings((s) => s.fontScale);
  const [height, setHeight] = useState(minHeight);
  const [ready, setReady] = useState(false);
  const doc = useMemo(() => buildHtmlDocument(html, p, { fontScale, autoHeight, padding }), [html, p, fontScale, autoHeight, padding]);

  const onMessage = async (e: WebViewMessageEvent) => {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === 'height' && autoHeight) setHeight(Math.max(minHeight, msg.h + 4));
      else if (msg.type === 'copy') {
        await Clipboard.setStringAsync(msg.text || '');
        haptic.success();
        toast({ kind: 'info', emoji: '📋', title: 'Code copied' });
      } else if (msg.type === 'link' && /^https?:/.test(msg.href)) {
        WebBrowser.openBrowserAsync(msg.href).catch(() => {});
      }
    } catch {}
  };

  return (
    <View style={autoHeight ? { height } : { flex: 1, backgroundColor: p.bg }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: doc }}
        onMessage={onMessage}
        onLoadEnd={() => setReady(true)}
        scrollEnabled={!autoHeight}
        nestedScrollEnabled={!autoHeight}
        showsVerticalScrollIndicator={!autoHeight}
        setSupportMultipleWindows={false}
        javaScriptEnabled
        overScrollMode="never"
        decelerationRate="normal"
        onShouldStartLoadWithRequest={(req) => {
          if (req.url.startsWith('about:') || req.url.startsWith('data:')) return true;
          if (/^https?:/.test(req.url)) {
            WebBrowser.openBrowserAsync(req.url).catch(() => {});
            return false;
          }
          return true;
        }}
        style={{ backgroundColor: 'transparent', opacity: ready ? 1 : 0 }}
        containerStyle={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
}

/** Plain-text bullet list. */
export function Bullets({ items, mono, color }: { items: string[]; mono?: boolean; color?: string }) {
  const p = usePalette();
  return (
    <View style={{ gap: 10 }}>
      {items.map((it, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color ?? p.accentFg, marginTop: 8 }} />
          {mono ? (
            <AppText variant="mono" style={{ flex: 1, color: p.text }}>
              {it}
            </AppText>
          ) : (
            <InlineText text={it} style={{ flex: 1 }} />
          )}
        </View>
      ))}
    </View>
  );
}
