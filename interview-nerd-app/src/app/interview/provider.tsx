import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useMemo, useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';

import { Banner, Group, ToggleRow } from '@/components/interview';
import { Field } from '@/components/ui/inputs';
import { Screen, TopBar } from '@/components/ui/layout';
import { AppText, Button, Chip, Loading, Row, Tap } from '@/components/ui/primitives';
import { describeTarget, type LlmTarget, listModels, llmJSON } from '@/lib/interview/llm';
import { LIVE_SCHEMA, liveTurnPrompt, parseLiveDecision } from '@/lib/interview/prompts';
import {
  cloudBaseUrl,
  cloudSttModel,
  deleteApiKey,
  getApiKey,
  maskKey,
  PROVIDERS,
  type ProviderId,
  providerInfo,
  saveApiKey,
} from '@/lib/interview/providers';
import { useInterviewPrefs } from '@/store/interviewPrefs';
import { radius, usePalette } from '@/theme';

export default function OwnAiScreen() {
  const prefs = useInterviewPrefs();
  useEffect(() => {
    prefs.hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!prefs.hydrated)
    return (
      <Screen>
        <TopBar title="Your own AI" />
        <Loading />
      </Screen>
    );
  return <OwnAi />;
}

type TestResult = { ok: true; text: string } | { ok: false; text: string } | 'running' | null;

function OwnAi() {
  const p = usePalette();
  const prefs = useInterviewPrefs();
  const cloud = prefs.cloud;
  const setCloud = (patch: Partial<typeof cloud>) => prefs.set({ cloud: { ...cloud, ...patch } });
  const provider = cloud.provider;
  const info = provider ? providerInfo(provider) : null;

  // ----- key (secure storage)
  const [savedKey, setSavedKey] = useState<string | null | undefined>(undefined);
  const [keyText, setKeyText] = useState('');
  const [keyBusy, setKeyBusy] = useState(false);
  useEffect(() => {
    let alive = true;
    if (provider) getApiKey(provider).then((k) => alive && setSavedKey(k));
    return () => {
      alive = false;
    };
  }, [provider]);

  // ----- models
  const [models, setModels] = useState<string[] | null>(null);
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [loadingModels, setLoadingModels] = useState(false);
  const [filter, setFilter] = useState('');
  const [test, setTest] = useState<TestResult>(null);

  const choose = (id: ProviderId | null) => {
    if (id === provider) return;
    setSavedKey(undefined);
    setKeyText('');
    setModels(null);
    setModelsError(null);
    setTest(null);
    setFilter('');
    setCloud({ provider: id, model: id ? (providerInfo(id).suggested[0] ?? '') : '', sttModel: '' });
  };

  const saveKey = async () => {
    if (!provider || !keyText.trim()) return;
    setKeyBusy(true);
    try {
      await saveApiKey(provider, keyText);
      setSavedKey(keyText.trim());
      setKeyText('');
    } finally {
      setKeyBusy(false);
    }
  };

  const removeKey = async () => {
    if (!provider) return;
    await deleteApiKey(provider);
    setSavedKey(null);
    setModels(null);
    setTest(null);
  };

  const loadModels = async () => {
    if (!provider || !savedKey) return;
    setLoadingModels(true);
    setModelsError(null);
    try {
      const list = await listModels(provider, cloudBaseUrl(cloud), savedKey);
      setModels(list);
      if (!cloud.model && list.length) setCloud({ model: list[0] });
    } catch (e) {
      setModelsError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoadingModels(false);
    }
  };

  const runTest = async () => {
    if (!provider || !savedKey || !cloud.model.trim()) return;
    const target: LlmTarget =
      provider === 'anthropic'
        ? { kind: 'anthropic', apiKey: savedKey, model: cloud.model.trim() }
        : { kind: 'openai', provider, baseUrl: cloudBaseUrl(cloud), apiKey: savedKey, model: cloud.model.trim() };
    setTest('running');
    try {
      const question = 'What is the difference between == and === in JavaScript?';
      const r = await llmJSON({
        target,
        prompt: liveTurnPrompt({
          level: 'Mid',
          years: 3,
          difficulty: 'medium',
          topic: 'JavaScript',
          isIntro: false,
          question,
          reference: 'Strict equality (===) compares value and type without coercion; loose equality (==) converts types first.',
          thread: [
            { who: 'interviewer', text: question },
            { who: 'candidate', text: 'triple equals also checks the type, double equals only the value' },
          ],
          followUpsLeft: 2,
        }),
        schema: LIVE_SCHEMA,
        timeoutMs: 30_000,
        maxTokens: 1500,
        effort: 'low',
      });
      const d = parseLiveDecision(r.data);
      if (!d) throw new Error('The model answered, but not in the expected format. Try another model.');
      setTest({ ok: true, text: `${describeTarget(target)} answered in ${(r.ms / 1000).toFixed(1)} s: "${d.say}"` });
    } catch (e) {
      setTest({ ok: false, text: e instanceof Error ? e.message : String(e) });
    }
  };

  const shown = useMemo(() => {
    const all = [...new Set([...(info?.suggested ?? []), ...(models ?? [])])];
    const q = filter.trim().toLowerCase();
    return (q ? all.filter((m) => m.toLowerCase().includes(q)) : all).slice(0, 40);
  }, [info, models, filter]);

  const sttDefault = provider ? cloudSttModel({ ...cloud, sttModel: '' }) : null;
  const sttPossible = provider === 'custom' || !!sttDefault;

  return (
    <Screen>
      <TopBar title="Your own AI" subtitle="Optional: use an API key for faster answers" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 48, gap: 24 }} keyboardShouldPersistTaps="handled">
        <AppText variant="body" color="dim">
          Without a key, the interviewer runs free on your laptop. With your own key, follow-ups and feedback are faster, and the laptop is still used
          as a backup if the API fails.
        </AppText>

        <View style={{ gap: 10 }}>
          <AppText variant="eyebrow" color="mute">
            PROVIDER
          </AppText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Chip label="None (laptop only)" selected={!provider} onPress={() => choose(null)} />
            {PROVIDERS.map((pr) => (
              <Chip key={pr.id} label={pr.name} selected={provider === pr.id} onPress={() => choose(pr.id)} />
            ))}
          </View>
          {info && (
            <AppText variant="caption" color="mute">
              {info.note}
            </AppText>
          )}
        </View>

        {provider && info && (
          <>
            {provider === 'custom' && (
              <Field
                label="API base URL"
                value={cloud.baseUrl}
                onChangeText={(baseUrl) => setCloud({ baseUrl })}
                placeholder="https://api.example.com/v1"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                hint="The URL that ends before /chat/completions."
              />
            )}

            <View style={{ gap: 10 }}>
              <AppText variant="eyebrow" color="mute">
                API KEY
              </AppText>
              {savedKey === undefined ? (
                <Loading />
              ) : savedKey ? (
                <Row gap={10} style={{ padding: 14, borderRadius: radius.md, backgroundColor: p.surface, borderWidth: 1, borderColor: p.border }}>
                  <Ionicons name="lock-closed-outline" size={18} color={p.success} />
                  <AppText variant="bodyMedium" style={{ flex: 1 }}>{`Saved: ${maskKey(savedKey)}`}</AppText>
                  <Button label="Remove" size="sm" variant="danger" onPress={removeKey} />
                </Row>
              ) : (
                <>
                  <Field label="Paste your key" value={keyText} onChangeText={setKeyText} secure autoCapitalize="none" autoCorrect={false} icon="key-outline" />
                  <Row gap={10}>
                    <Button label="Save key" size="sm" onPress={saveKey} loading={keyBusy} disabled={!keyText.trim()} />
                    {!!info.keyUrl && <Button label="Get a key" size="sm" variant="ghost" iconRight="open-outline" onPress={() => Linking.openURL(info.keyUrl)} />}
                  </Row>
                </>
              )}
              <AppText variant="caption" color="mute">
                The key is stored only in this phone&apos;s secure storage (Keychain) and sent only to {info.name}.
              </AppText>
            </View>

            <View style={{ gap: 10 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <AppText variant="eyebrow" color="mute">
                  MODEL
                </AppText>
                <Button label={models ? 'Reload list' : 'Load models'} size="sm" variant="secondary" icon="list-outline" onPress={loadModels} loading={loadingModels} disabled={!savedKey} />
              </Row>
              {modelsError && <Banner tone="danger">{modelsError}</Banner>}
              {(models?.length ?? 0) > 8 && <Field label="Search models" value={filter} onChangeText={setFilter} autoCapitalize="none" autoCorrect={false} icon="search" />}
              {shown.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {shown.map((m) => (
                    <Chip key={m} label={m} selected={cloud.model === m} onPress={() => setCloud({ model: m })} />
                  ))}
                </View>
              )}
              <Field
                label="Model id"
                value={cloud.model}
                onChangeText={(model) => setCloud({ model })}
                placeholder={savedKey ? 'Tap "Load models" or type an id' : 'Save a key first'}
                autoCapitalize="none"
                autoCorrect={false}
                hint="Faster, smaller models give quicker follow-ups. Larger models judge answers more precisely."
              />
            </View>

            <Group title="Use my key for">
              <ToggleRow first icon="chatbubbles-outline" title="The interviewer" body="Judging answers and asking follow-ups during the call" value={cloud.forInterview} onChange={(forInterview) => setCloud({ forInterview })} />
              <ToggleRow icon="document-text-outline" title="Feedback" body="Scores and tips after the interview" value={cloud.forFeedback} onChange={(forFeedback) => setCloud({ forFeedback })} />
              {sttPossible && (
                <ToggleRow
                  icon="mic-outline"
                  title="Speech to text"
                  body={`More accurate transcripts${sttDefault ? ` (${sttDefault})` : ''}. Audio of your answers is sent to ${info.name}.`}
                  value={cloud.forSpeech}
                  onChange={(forSpeech) => setCloud({ forSpeech })}
                />
              )}
            </Group>
            {sttPossible && cloud.forSpeech && (
              <Field
                label="Speech-to-text model"
                value={cloud.sttModel}
                onChangeText={(sttModel) => setCloud({ sttModel })}
                placeholder={sttDefault ?? 'e.g. whisper-1'}
                autoCapitalize="none"
                autoCorrect={false}
                hint="Leave empty for the default."
              />
            )}

            <View style={{ gap: 10 }}>
              <Button label="Test with a sample answer" icon="flash-outline" onPress={runTest} loading={test === 'running'} disabled={!savedKey || !cloud.model.trim()} full />
              {test && test !== 'running' && <Banner tone={test.ok ? 'success' : 'danger'}>{test.text}</Banner>}
            </View>

            <AppText variant="caption" color="mute">
              {`When your key is used, the text of your answers (and audio, if speech to text is on) is sent to ${info.name}. Without a key, nothing leaves your laptop and phone.`}
            </AppText>
          </>
        )}

        {!provider && (
          <Tap onPress={() => choose('groq')} style={{ padding: 14, borderRadius: radius.md, backgroundColor: p.accentSoft }}>
            <AppText variant="small">Tip: Groq has a free tier and is very fast, and it also offers accurate speech-to-text. Tap to set it up.</AppText>
          </Tap>
        )}
      </ScrollView>
    </Screen>
  );
}
