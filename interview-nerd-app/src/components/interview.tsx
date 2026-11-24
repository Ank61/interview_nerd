import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode, useEffect, useState } from 'react';
import { Switch, View } from 'react-native';

import { AppText, type IconName, Row } from '@/components/ui/primitives';
import { radius, usePalette } from '@/theme';

/** Re-renders every `ms` so countdowns stay current. */
export function useNow(ms = 500) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

export function clock(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function Group({ title, children, footer }: { title?: string; children: ReactNode; footer?: string }) {
  const p = usePalette();
  return (
    <View style={{ gap: 8 }}>
      {!!title && (
        <AppText variant="eyebrow" color="mute">
          {title.toUpperCase()}
        </AppText>
      )}
      <View style={{ borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border, overflow: 'hidden' }}>{children}</View>
      {!!footer && (
        <AppText variant="caption" color="mute">
          {footer}
        </AppText>
      )}
    </View>
  );
}

export function ToggleRow({ icon, title, body, value, onChange, first }: { icon: IconName; title: string; body?: string; value: boolean; onChange: (v: boolean) => void; first?: boolean }) {
  const p = usePalette();
  return (
    <Row gap={14} style={{ padding: 16, borderTopWidth: first ? 0 : 1, borderTopColor: p.border }}>
      <Ionicons name={icon} size={20} color={p.textDim} />
      <View style={{ flex: 1 }}>
        <AppText variant="bodyMedium">{title}</AppText>
        {!!body && (
          <AppText variant="caption" color="mute">
            {body}
          </AppText>
        )}
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: p.accent, false: p.surface3 }} thumbColor={value ? '#0B0B0D' : '#FFFFFF'} />
    </Row>
  );
}

/** Coloured information strip (warnings, notices). */
export function Banner({ tone = 'info', icon, children, action }: { tone?: 'info' | 'warning' | 'danger' | 'success'; icon?: IconName; children: ReactNode; action?: ReactNode }) {
  const p = usePalette();
  const [fg, bg] =
    tone === 'warning' ? [p.warning, p.warningSoft] : tone === 'danger' ? [p.danger, p.dangerSoft] : tone === 'success' ? [p.success, p.successSoft] : [p.info, p.infoSoft];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: radius.md, backgroundColor: bg }}>
      <Ionicons
        name={icon ?? (tone === 'warning' || tone === 'danger' ? 'warning-outline' : tone === 'success' ? 'checkmark-circle-outline' : 'information-circle-outline')}
        size={18}
        color={fg}
      />
      <View style={{ flex: 1 }}>{typeof children === 'string' ? <AppText variant="small" style={{ color: fg }}>{children}</AppText> : children}</View>
      {action}
    </View>
  );
}

export function InfoRow({ label, value, first }: { label: string; value: string; first?: boolean }) {
  const p = usePalette();
  return (
    <Row gap={12} style={{ paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: first ? 0 : 1, borderTopColor: p.border, justifyContent: 'space-between' }}>
      <AppText variant="small" color="mute">
        {label}
      </AppText>
      <AppText variant="small" style={{ flex: 1, textAlign: 'right' }}>
        {value}
      </AppText>
    </Row>
  );
}
