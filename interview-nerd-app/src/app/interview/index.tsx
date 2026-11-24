import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { Banner, Group, ToggleRow } from '@/components/interview';
import { Segmented } from '@/components/ui/inputs';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Button, Chip, IconButton, Loading, Row, Tap } from '@/components/ui/primitives';
import { catalog } from '@/data/catalog';
import { haptic } from '@/lib/haptics';
import { hasModel, type OllamaStatus, ollamaStatus } from '@/lib/interview/ollama';
import { cloudSttModel, providerInfo } from '@/lib/interview/providers';
import { levelFor } from '@/lib/interview/questions';
import { canRecordVoice, sttMode } from '@/lib/interview/speech';
import type { Difficulty, InterviewMode } from '@/lib/interview/types';
import { whisperReachable } from '@/lib/interview/whisper';
import { useAuth } from '@/store/auth';
import { useInterviewPrefs } from '@/store/interviewPrefs';
import { fonts, radius, usePalette } from '@/theme';

const MAX_TOPICS = 3;
const PRESETS = [5, 10, 15, 20];

export default function InterviewSetup() {
  const prefs = useInterviewPrefs();
  const focus = useAuth((s) => s.user?.focus);

  useEffect(() => {
    prefs.hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!prefs.hydrated) {
    return (
      <Screen>
        <TopBar title="Mock interview" />
        <Loading />
      </Screen>
    );
  }
  return <SetupForm focus={focus ?? []} />;
}

function SetupForm({ focus }: { focus: string[] }) {
  const p = usePalette();
  const prefs = useInterviewPrefs();
  const setup = prefs.setup;
  const set = prefs.setSetup;

  // First run: preselect topics from onboarding.
  useEffect(() => {
    if (!setup.topics.length && focus.length) {
      const valid = focus.filter((id) => catalog.topics.some((t) => t.id === id && t.sets.length)).slice(0, MAX_TOPICS);
      if (valid.length) set({ topics: valid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [customText, setCustomText] = useState(PRESETS.includes(setup.minutes) ? '' : String(setup.minutes));
  const [custom, setCustom] = useState(!PRESETS.includes(setup.minutes));
  const customMinutes = Number(customText);
  const customValid = Number.isInteger(customMinutes) && customMinutes >= 1 && customMinutes <= 90;
  const minutes = custom ? (customValid ? customMinutes : 0) : setup.minutes;

  const stt = useMemo(() => sttMode(), []);
  const [status, setStatus] = useState<OllamaStatus | 'checking' | null>(null);
  const [sttOk, setSttOk] = useState<boolean | null>(null);
  const check = useCallback(() => {
    if (setup.mode === 'ai') {
      setStatus('checking');
      ollamaStatus(prefs.serverUrl).then(setStatus);
    }
    if (stt === 'laptop') {
      setSttOk(null);
      whisperReachable(prefs.whisperUrl).then(setSttOk);
    }
  }, [setup.mode, prefs.serverUrl, prefs.whisperUrl, stt]);
  // Re-check whenever the screen regains focus (e.g. back from server settings).
  useFocusEffect(check);

  const recordsAudio = useMemo(() => canRecordVoice(), []);
  // Speech-to-text through the user's own API key makes laptop Whisper optional.
  const cloudStt = !!prefs.cloud.provider && prefs.cloud.forSpeech && !!cloudSttModel(prefs.cloud);
  const level = levelFor(setup.years, setup.difficulty);
  const topicsReady = setup.topics.length > 0;
  const canStart = topicsReady && minutes > 0;

  const toggleTopic = (id: string) => {
    if (setup.topics.includes(id)) return set({ topics: setup.topics.filter((t) => t !== id) });
    if (setup.topics.length >= MAX_TOPICS) {
      haptic.warn();
      return;
    }
    set({ topics: [...setup.topics, id] });
  };

  const start = () => {
    if (!canStart) return;
    set({ minutes });
    router.push('/interview/room');
  };

  return (
    <Screen>
      <TopBar
        title="Mock interview"
        subtitle="A live voice interview"
        right={<IconButton icon="time-outline" label="Past interviews" onPress={() => router.push('/interview/history')} />}
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, gap: 24 }} keyboardShouldPersistTaps="handled">
        <Group title="Your experience">
          <Row gap={12} style={{ padding: 16, justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <AppText variant="heading">{setup.years === 0 ? 'Fresher' : `${setup.years} ${setup.years === 1 ? 'year' : 'years'}`}</AppText>
              <AppText variant="caption" color="mute">
                of professional experience
              </AppText>
            </View>
            <IconButton icon="remove" label="Fewer years" onPress={() => set({ years: Math.max(0, setup.years - 1) })} />
            <AppText style={{ fontFamily: fonts.bold, fontSize: 18, minWidth: 28, textAlign: 'center' }}>{setup.years}</AppText>
            <IconButton icon="add" label="More years" onPress={() => set({ years: Math.min(30, setup.years + 1) })} />
          </Row>
        </Group>

        <View style={{ gap: 10 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <AppText variant="eyebrow" color="mute">
              TOPICS
            </AppText>
            <AppText variant="caption" color={setup.topics.length >= MAX_TOPICS ? 'accent' : 'mute'}>
              {setup.topics.length}/{MAX_TOPICS} selected
            </AppText>
          </Row>
          {catalog.groups.map((g) => {
            const topics = catalog.topics.filter((t) => t.group === g && t.sets.some((s) => s.count > 0));
            if (!topics.length) return null;
            return (
              <View key={g} style={{ gap: 8 }}>
                <AppText variant="caption" color="dim">
                  {g}
                </AppText>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {topics.map((t) => (
                    <Chip key={t.id} label={t.title} selected={setup.topics.includes(t.id)} onPress={() => toggleTopic(t.id)} />
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="mute">
            DIFFICULTY
          </AppText>
          <Segmented<Difficulty>
            value={setup.difficulty}
            onChange={(difficulty) => set({ difficulty })}
            options={[
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
            ]}
          />
          <AppText variant="caption" color="mute">
            {`You'll get ${level}-level questions. `}
            {setup.difficulty === 'hard'
              ? 'Expect sharp follow-ups on trade-offs and edge cases.'
              : setup.difficulty === 'easy'
                ? 'Follow-ups only when something important is missing.'
                : 'Follow-ups on gaps and for concrete examples.'}
          </AppText>
        </View>

        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="mute">
            DURATION
          </AppText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {PRESETS.map((m) => (
              <Chip
                key={m}
                label={`${m} min`}
                selected={!custom && setup.minutes === m}
                onPress={() => {
                  setCustom(false);
                  set({ minutes: m });
                }}
              />
            ))}
            <Chip label="Custom" selected={custom} onPress={() => setCustom(true)} />
          </View>
          {custom && (
            <Row gap={10}>
              <TextInput
                value={customText}
                onChangeText={(t) => setCustomText(t.replace(/[^0-9]/g, '').slice(0, 2))}
                keyboardType="number-pad"
                placeholder="30"
                placeholderTextColor={p.textMute}
                selectionColor={p.accentFg}
                autoFocus
                style={{
                  width: 90,
                  height: 46,
                  borderRadius: radius.md,
                  borderWidth: 1.5,
                  borderColor: customText && !customValid ? p.danger : p.border,
                  backgroundColor: p.surface,
                  color: p.text,
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                  textAlign: 'center',
                }}
              />
              <AppText variant="small" color={customText && !customValid ? 'danger' : 'mute'}>
                {customText && !customValid ? 'Enter 1 to 90 minutes' : 'minutes (1 to 90)'}
              </AppText>
            </Row>
          )}
        </View>

        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="mute">
            INTERVIEWER
          </AppText>
          <Segmented<InterviewMode>
            value={setup.mode}
            onChange={(mode) => set({ mode })}
            options={[
              { value: 'ai', label: 'AI on my laptop' },
              { value: 'offline', label: 'No AI' },
            ]}
          />
          {setup.mode === 'ai' ? (
            <AiStatus status={status} onRetry={check} />
          ) : (
            <AppText variant="caption" color="mute">
              Questions come from your question bank, with scripted follow-ups. Every answer is saved as voice and text, and you can get AI feedback later
              from the report.
            </AppText>
          )}
          <Tap onPress={() => router.push('/interview/server')} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 4 }}>
            <Ionicons name="settings-outline" size={15} color={p.accentFg} />
            <AppText variant="label" color="accent">
              AI and voice settings
            </AppText>
          </Tap>
        </View>

        <Group title="Options">
          <ToggleRow
            first
            icon="person-outline"
            title="Start with an introduction"
            body={'Opens with "Tell me about yourself"'}
            value={setup.intro}
            onChange={(intro) => set({ intro })}
          />
          <ToggleRow
            icon="call-outline"
            title="Audio only"
            body="Hide the question text, like a phone screen"
            value={setup.audioOnly}
            onChange={(audioOnly) => set({ audioOnly })}
          />
        </Group>

        {stt === 'laptop' &&
          !cloudStt &&
          (sttOk === null ? (
            <Banner tone="info" icon="sync-outline">Checking speech-to-text on your laptop…</Banner>
          ) : sttOk ? (
            <Banner tone="success" icon="mic-outline">Speech-to-text: Whisper on your laptop. Your words appear after each answer.</Banner>
          ) : (
            <Banner tone="warning" action={<Button label="Retry" size="sm" variant="secondary" onPress={check} />}>
              {`Can't reach Whisper at ${prefs.whisperUrl || '(no address set)'}. Run start-whisper.cmd on the laptop. Without it, answers are recorded and transcribed later.`}
            </Banner>
          ))}

        {!recordsAudio && (
          <Banner tone="warning">{"This phone can't save voice recordings (Android 13 or newer is needed). Your answers will be saved as text only."}</Banner>
        )}

        <Button label={topicsReady ? 'Continue' : 'Pick at least one topic'} size="lg" iconRight="arrow-forward" onPress={start} disabled={!canStart} full />
      </ScrollView>
    </Screen>
  );
}

function AiStatus({ status, onRetry }: { status: OllamaStatus | 'checking' | null; onRetry: () => void }) {
  const prefs = useInterviewPrefs();
  const cloud = prefs.cloud;
  if (cloud.provider && cloud.forInterview && cloud.model.trim()) {
    const backup = status && status !== 'checking' && status.ok ? ' Your laptop is the backup.' : '';
    return <Banner tone="success" icon="key-outline">{`Interviewer: ${cloud.model} (${providerInfo(cloud.provider).name}).${backup}`}</Banner>;
  }
  if (status === null || status === 'checking') return <Banner tone="info" icon="sync-outline">Checking your laptop…</Banner>;
  if (!status.ok)
    return (
      <Banner tone="warning" action={<Button label="Retry" size="sm" variant="secondary" onPress={onRetry} />}>
        {`Can't reach Ollama at ${prefs.serverUrl || '(no address set)'}. Open AI settings to fix it, or choose No AI.`}
      </Banner>
    );
  const missing = [prefs.liveModel, prefs.reviewModel].filter((m, i, a) => a.indexOf(m) === i && !hasModel(status.models, m));
  if (missing.length)
    return <Banner tone="warning">{`Connected, but ${missing.join(' and ')} ${missing.length > 1 ? 'are' : 'is'} not installed. On the laptop run: ollama pull ${missing[0]}`}</Banner>;
  return <Banner tone="success">{`Connected. Interviewer: ${prefs.liveModel}. Feedback: ${prefs.reviewModel}.`}</Banner>;
}
