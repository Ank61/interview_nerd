import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Banner, Group, ToggleRow } from '@/components/interview';
import { Field, Segmented } from '@/components/ui/inputs';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Button, Chip, Loading, Row, Tap } from '@/components/ui/primitives';
import { type PausePref } from '@/lib/interview/endpointer';
import { setRecordingMode } from '@/lib/interview/fileRecorder';
import { type LaptopVoice, normalizeVoiceUrl, voiceServerStatus } from '@/lib/interview/neuralVoice';
import { normalizeBaseUrl, type OllamaStatus, ollamaStatus } from '@/lib/interview/ollama';
import { INTERVIEWER_NAME } from '@/lib/interview/prompts';
import { providerInfo } from '@/lib/interview/providers';
import { sttMode } from '@/lib/interview/speech';
import { englishVoices, pickDefaultVoice, speak, stopSpeaking, type VoiceOption } from '@/lib/interview/tts';
import { normalizeWhisperUrl, whisperReachable } from '@/lib/interview/whisper';
import { type RecognitionLang, useInterviewPrefs, voiceConfigOf, withPort } from '@/store/interviewPrefs';
import { fonts, radius, usePalette } from '@/theme';

const MODEL_NOTES: Record<string, string> = {
  'llama3:8b': 'Best judgement. About 6 to 10 seconds per reply on your laptop.',
  'llama3.2:3b': 'Faster (about 3 to 4 seconds) but judges answers less accurately.',
};

/** Like the fast Whisper address, but defaults to the accurate server's port. */
function normalizeAccurateUrl(u: string) {
  const t = u.trim();
  if (!t) return '';
  const hasPort = /:\d+\/?$/.test(t.replace(/^https?:\/\//i, ''));
  return hasPort ? normalizeWhisperUrl(t) : withPort(normalizeWhisperUrl(t), 11437);
}

const SAMPLE =`Hi, I'm ${INTERVIEWER_NAME}. Thanks for joining today. Let's start with a quick introduction. Tell me a little about yourself.`;

export default function InterviewServerSettings() {
  const prefs = useInterviewPrefs();
  useEffect(() => {
    prefs.hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!prefs.hydrated)
    return (
      <Screen>
        <TopBar title="AI and voice" />
        <Loading />
      </Screen>
    );
  return <Settings />;
}

type Check = boolean | 'checking' | null;

function Settings() {
  const p = usePalette();
  const prefs = useInterviewPrefs();
  const stt = sttMode();

  // ----- laptop (Ollama)
  const [url, setUrl] = useState(prefs.serverUrl);
  const [status, setStatus] = useState<OllamaStatus | 'checking' | null>(() => (prefs.serverUrl ? 'checking' : null));
  const testOllama = async (raw = url) => {
    const normalized = normalizeBaseUrl(raw);
    setUrl(normalized);
    const prev = prefs.serverUrl;
    prefs.set({ serverUrl: normalized });
    // The other laptop services follow the same host unless they were changed by hand.
    const follow = (current: string, port: number) => !current || current === withPort(prev, port);
    const patch: Partial<typeof prefs> = {};
    if (follow(prefs.whisperUrl, 11435)) patch.whisperUrl = withPort(normalized, 11435);
    if (follow(prefs.whisperAccurateUrl, 11437)) patch.whisperAccurateUrl = withPort(normalized, 11437);
    if (follow(prefs.voiceUrl, 11436)) patch.voiceUrl = withPort(normalized, 11436);
    if (Object.keys(patch).length) prefs.set(patch);
    setStatus('checking');
    setStatus(await ollamaStatus(normalized));
  };

  // ----- voices
  const [laptopVoices, setLaptopVoices] = useState<LaptopVoice[] | null>(null);
  const [voiceCheck, setVoiceCheck] = useState<Check>(() => (prefs.voiceUrl ? 'checking' : null));
  const [phoneVoices, setPhoneVoices] = useState<VoiceOption[] | null>(null);
  const [showAllVoices, setShowAllVoices] = useState(false);
  const loadLaptopVoices = useCallback(async (raw: string) => {
    setVoiceCheck('checking');
    const r = await voiceServerStatus(raw);
    setVoiceCheck(r.ok);
    setLaptopVoices(r.ok ? r.voices : null);
  }, []);

  useEffect(() => {
    if (prefs.serverUrl) ollamaStatus(prefs.serverUrl).then(setStatus);
    if (prefs.voiceUrl) voiceServerStatus(prefs.voiceUrl).then((r) => {
      setVoiceCheck(r.ok);
      setLaptopVoices(r.ok ? r.voices : null);
    });
    englishVoices().then(setPhoneVoices);
    return () => {
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preview = async (patch: Partial<typeof prefs>) => {
    await stopSpeaking();
    await setRecordingMode(false); // play through the speaker, even in silent mode
    const cfg = voiceConfigOf({ ...prefs, ...patch });
    if (cfg.engine === 'phone' && !cfg.phoneVoice && phoneVoices) cfg.phoneVoice = pickDefaultVoice(phoneVoices, prefs.lang) ?? null;
    speak(SAMPLE, cfg);
  };

  // ----- local models
  const models = status && status !== 'checking' && status.ok ? status.models : [];
  const modelChoices = [...new Set([...models, prefs.liveModel, prefs.reviewModel, 'llama3:8b', 'llama3.2:3b'])].filter((m) => !/embed/i.test(m));

  const visibleVoices = laptopVoices ? (showAllVoices ? laptopVoices : laptopVoices.filter((v) => v.featured)) : [];

  return (
    <Screen>
      <TopBar title="AI and voice" subtitle="Your laptop, voice and speech-to-text" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 48, gap: 26 }} keyboardShouldPersistTaps="handled">
        <OwnAiLink />

        {/* ---------------- Laptop ---------------- */}
        <View style={{ gap: 12 }}>
          <Field
            label="Laptop address (Ollama)"
            value={url}
            onChangeText={setUrl}
            onSubmitEditing={() => testOllama()}
            placeholder="http://192.168.1.7:11434"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            icon="laptop-outline"
            hint="Your laptop's Wi-Fi IP address. The voice and speech-to-text addresses below follow it."
          />
          <Button label="Test connection" icon="pulse-outline" variant="secondary" onPress={() => testOllama()} loading={status === 'checking'} full />
          {status && status !== 'checking' && (
            <Banner tone={status.ok ? 'success' : 'warning'}>
              {status.ok ? `Connected to Ollama ${status.version}. Models: ${status.models.join(', ') || 'none installed'}` : status.error}
            </Banner>
          )}
        </View>

        {/* ---------------- Voice ---------------- */}
        <View style={{ gap: 12 }}>
          <AppText variant="eyebrow" color="mute">
            INTERVIEWER VOICE
          </AppText>
          <Segmented<'laptop' | 'phone'>
            value={prefs.voiceEngine}
            onChange={(voiceEngine) => prefs.set({ voiceEngine })}
            options={[
              { value: 'laptop', label: 'Natural (laptop)' },
              { value: 'phone', label: "Phone's voice" },
            ]}
          />
          {prefs.voiceEngine === 'laptop' ? (
            <>
              <AppText variant="caption" color="mute">
                A human-sounding neural voice generated on your laptop (Kokoro). Start it with start-voice.cmd. If it is not running, the phone&apos;s voice is used.
              </AppText>
              <UrlField
                label="Voice server address"
                value={prefs.voiceUrl}
                placeholder="http://192.168.1.7:11436"
                normalize={normalizeVoiceUrl}
                onSave={(voiceUrl) => {
                  prefs.set({ voiceUrl });
                  loadLaptopVoices(voiceUrl);
                }}
                check={voiceCheck}
                okText="Voice server is running."
                failText="Can't reach the voice server. Run start-voice.cmd on the laptop."
              />
              {laptopVoices && (
                <Group footer="Tap a voice to hear it.">
                  {visibleVoices.map((v, i) => (
                    <VoiceRow
                      key={v.id}
                      first={i === 0}
                      title={v.name}
                      subtitle={`${v.accent} · ${v.gender}${v.id === 'am_michael' ? ' · recommended' : ''}`}
                      selected={prefs.laptopVoice === v.id}
                      onPress={() => {
                        prefs.set({ laptopVoice: v.id });
                        preview({ laptopVoice: v.id, voiceEngine: 'laptop' });
                      }}
                    />
                  ))}
                  <Tap onPress={() => setShowAllVoices((x) => !x)} style={{ padding: 14, borderTopWidth: 1, borderTopColor: p.border }}>
                    <AppText variant="label" color="accent">
                      {showAllVoices ? 'Show fewer voices' : `Show all ${laptopVoices.length} voices`}
                    </AppText>
                  </Tap>
                </Group>
              )}
            </>
          ) : (
            <>
              <AppText variant="caption" color="mute">
                {"Tip: for a more natural phone voice, download a Premium or Enhanced voice in iPhone Settings > Accessibility > Spoken Content > Voices > English."}
              </AppText>
              <Group footer="Tap a voice to hear it.">
                {phoneVoices === null ? (
                  <Loading />
                ) : (
                  [{ id: '', name: 'Automatic', language: '', enhanced: false }, ...phoneVoices.slice(0, 15)].map((v, i) => (
                    <VoiceRow
                      key={v.id || 'auto'}
                      first={i === 0}
                      title={v.name}
                      subtitle={v.id ? [v.language, v.enhanced ? 'Enhanced' : ''].filter(Boolean).join(' · ') : 'Best voice on this phone'}
                      selected={(prefs.voice ?? '') === v.id}
                      onPress={() => {
                        prefs.set({ voice: v.id || null });
                        preview({ voice: v.id || null, voiceEngine: 'phone' });
                      }}
                    />
                  ))
                )}
              </Group>
            </>
          )}
          <AppText variant="eyebrow" color="mute" style={{ marginTop: 4 }}>
            SPEAKING SPEED
          </AppText>
          <Segmented<string>
            value={String(prefs.rate)}
            onChange={(r) => prefs.set({ rate: Number(r) })}
            options={[
              { value: '0.9', label: 'Slower' },
              { value: '1', label: 'Normal' },
              { value: '1.1', label: 'Faster' },
            ]}
          />
        </View>

        {/* ---------------- Answering ---------------- */}
        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="mute">
            PAUSE BEFORE {INTERVIEWER_NAME.toUpperCase()} CONTINUES
          </AppText>
          <Segmented<PausePref>
            value={prefs.pause}
            onChange={(pause) => prefs.set({ pause })}
            options={[
              { value: 'short', label: '3 sec' },
              { value: 'normal', label: '5 sec' },
              { value: 'long', label: '8 sec' },
            ]}
          />
          <AppText variant="caption" color="mute">
            {`Your answer ends after this much silence. Very short answers and sentences that trail off ("and...") get a few extra seconds. If you haven't started yet, you get 20 seconds to think before ${INTERVIEWER_NAME} checks in.`}
          </AppText>
        </View>

        {/* ---------------- Speech-to-text ---------------- */}
        <View style={{ gap: 12 }}>
          <AppText variant="eyebrow" color="mute">
            SPEECH TO TEXT
          </AppText>
          <AppText variant="caption" color="mute">
            {stt === 'phone'
              ? 'This build transcribes live on the phone. Whisper on the laptop re-checks answers before feedback.'
              : 'This phone (Expo Go) records each answer and transcribes it with Whisper on the laptop (or your AI provider). Start it with start-whisper.cmd.'}
          </AppText>
          <UrlField
            label="Fast Whisper (during the interview)"
            value={prefs.whisperUrl}
            placeholder="http://192.168.1.7:11435"
            normalize={normalizeWhisperUrl}
            onSave={(whisperUrl) => prefs.set({ whisperUrl })}
            test={whisperReachable}
            okText="Fast Whisper is reachable."
            failText="Can't reach Whisper. Run start-whisper.cmd on the laptop."
          />
          <UrlField
            label="Accurate Whisper (before feedback)"
            value={prefs.whisperAccurateUrl}
            placeholder="http://192.168.1.7:11437"
            normalize={normalizeAccurateUrl}
            onSave={(whisperAccurateUrl) => prefs.set({ whisperAccurateUrl })}
            test={whisperReachable}
            okText="Accurate Whisper is reachable."
            failText="Can't reach the accurate Whisper. It starts together with start-whisper.cmd."
          />
          <Group>
            <ToggleRow
              first
              icon="checkmark-done-outline"
              title="Re-check answers before feedback"
              body="Transcribes every answer again with the accurate model (about 12 s per minute of speech). You can also edit any answer in the report."
              value={prefs.accurateRecheck}
              onChange={(accurateRecheck) => prefs.set({ accurateRecheck })}
            />
          </Group>
          <AppText variant="eyebrow" color="mute">
            YOUR ACCENT (PHONE SPEECH RECOGNITION)
          </AppText>
          <Segmented<RecognitionLang>
            value={prefs.lang}
            onChange={(lang) => prefs.set({ lang })}
            options={[
              { value: 'en-US', label: 'US' },
              { value: 'en-IN', label: 'India' },
              { value: 'en-GB', label: 'UK' },
            ]}
          />
        </View>

        {/* ---------------- Local models ---------------- */}
        <ModelPicker title="Laptop interviewer model" value={prefs.liveModel} choices={modelChoices} installed={models} onChange={(liveModel) => prefs.set({ liveModel })} />
        <ModelPicker title="Laptop feedback model" value={prefs.reviewModel} choices={modelChoices} installed={models} onChange={(reviewModel) => prefs.set({ reviewModel })} />

        {/* ---------------- Setup ---------------- */}
        <Group title="Set up the laptop">
          <View style={{ padding: 16, gap: 12 }}>
            <Step n={1} text='Each time you practise, double-click "Start Interview Nerd servers" in your user folder. It opens Whisper and the natural voice. Ollama starts with Windows.' code={'%USERPROFILE%\\Start Interview Nerd servers.cmd'} />
            <Step n={2} text="Once only: allow the ports through Windows Firewall (PowerShell as administrator):" code={'New-NetFirewallRule -DisplayName "Interview Nerd (local network)" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 11434,11435,11436,11437,8081 -RemoteAddress LocalSubnet -Profile Any'} />
            <Step n={3} text="Find the laptop's IP address (Wi-Fi adapter, IPv4 Address) and enter it at the top:" code="ipconfig" />
          </View>
        </Group>
      </ScrollView>
    </Screen>
  );
}

function OwnAiLink() {
  const p = usePalette();
  const cloud = useInterviewPrefs((s) => s.cloud);
  const label = cloud.provider ? `${providerInfo(cloud.provider).name}${cloud.model ? ` · ${cloud.model}` : ''}` : 'Not set up: everything runs on your laptop';
  return (
    <Tap
      onPress={() => router.push('/interview/provider')}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.lg, backgroundColor: p.surface, borderWidth: 1, borderColor: p.borderStrong }}>
      <Ionicons name="key-outline" size={20} color={p.accentFg} />
      <View style={{ flex: 1 }}>
        <AppText variant="label">Your own AI (API key)</AppText>
        <AppText variant="caption" color="mute" numberOfLines={1}>
          {label}
        </AppText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={p.textMute} />
    </Tap>
  );
}

/** Address field with a test button. The value is saved (normalised) when tested or submitted. */
function UrlField({
  label,
  value,
  placeholder,
  normalize,
  onSave,
  test,
  check: externalCheck,
  okText,
  failText,
}: {
  label: string;
  value: string;
  placeholder: string;
  normalize: (u: string) => string;
  onSave: (u: string) => void;
  test?: (u: string) => Promise<boolean>;
  check?: Check;
  okText: string;
  failText: string;
}) {
  const [text, setText] = useState(value);
  const [own, setOwn] = useState<Check>(null);
  useFocusEffect(
    useCallback(() => {
      setText(value);
    }, [value]),
  );
  const check = test ? own : (externalCheck ?? null);
  const run = async () => {
    const u = normalize(text);
    setText(u);
    onSave(u);
    if (!test) return;
    setOwn('checking');
    setOwn(await test(u));
  };
  return (
    <View style={{ gap: 8 }}>
      <Field label={label} value={text} onChangeText={setText} onSubmitEditing={run} placeholder={placeholder} autoCapitalize="none" autoCorrect={false} keyboardType="url" />
      <Row gap={10}>
        <Button label="Test" icon="pulse-outline" size="sm" variant="secondary" onPress={run} loading={check === 'checking'} />
        {check !== null && check !== 'checking' && (
          <AppText variant="caption" color={check ? 'success' : 'danger'} style={{ flex: 1 }}>
            {check ? okText : failText}
          </AppText>
        )}
      </Row>
    </View>
  );
}

function VoiceRow({ title, subtitle, selected, onPress, first }: { title: string; subtitle: string; selected: boolean; onPress: () => void; first: boolean }) {
  const p = usePalette();
  return (
    <Tap onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderTopWidth: first ? 0 : 1, borderTopColor: p.border }}>
      <Ionicons name="volume-medium-outline" size={18} color={selected ? p.accentFg : p.textMute} />
      <View style={{ flex: 1 }}>
        <AppText variant="bodyMedium" numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="caption" color="mute">
          {subtitle}
        </AppText>
      </View>
      {selected && (
        <AppText variant="label" color="accent">
          Selected
        </AppText>
      )}
    </Tap>
  );
}

function ModelPicker({ title, value, choices, installed, onChange }: { title: string; value: string; choices: string[]; installed: string[]; onChange: (m: string) => void }) {
  const missing = installed.length > 0 && !installed.includes(value);
  return (
    <View style={{ gap: 10 }}>
      <AppText variant="eyebrow" color="mute">
        {title.toUpperCase()}
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {choices.map((m) => (
          <Chip key={m} label={m} selected={m === value} onPress={() => onChange(m)} />
        ))}
      </View>
      {(MODEL_NOTES[value] || missing) && (
        <AppText variant="caption" color="mute">
          {[MODEL_NOTES[value], missing ? `Not installed on the laptop yet: ollama pull ${value}` : ''].filter(Boolean).join(' ')}
        </AppText>
      )}
    </View>
  );
}

function Step({ n, text, code }: { n: number; text: string; code: string }) {
  const p = usePalette();
  return (
    <Row gap={10} align="flex-start">
      <AppText variant="label" color="accent" style={{ width: 16 }}>
        {n}
      </AppText>
      <View style={{ flex: 1, gap: 6 }}>
        <AppText variant="small" color="dim">
          {text}
        </AppText>
        <View style={{ padding: 10, borderRadius: radius.sm, backgroundColor: p.codeBg }}>
          <AppText selectable style={{ fontFamily: fonts.mono, fontSize: 12, color: '#E6EDF3' }}>
            {code}
          </AppText>
        </View>
      </View>
    </Row>
  );
}
