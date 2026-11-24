/**
 * Turns the user's settings into ordered fallback chains:
 *  - interviewer / feedback model: own API key (if set) first, then Ollama on the laptop;
 *  - speech-to-text for recordings: own API (if it has speech-to-text) first, then laptop Whisper.
 */
import type { Transcriber } from './fileRecorder';
import type { LlmTarget } from './llm';
import { type CloudConfig, cloudBaseUrl, cloudSttModel, getApiKey } from './providers';
import { transcribeCloud, transcribeFile } from './whisper';

export type AiSettings = {
  serverUrl: string;
  liveModel: string;
  reviewModel: string;
  whisperUrl: string;
  whisperAccurateUrl: string;
  cloud: CloudConfig;
};

export type ResolvedAi = {
  live: LlmTarget[];
  review: LlmTarget[];
  /** Own-API speech-to-text, if configured. */
  cloudStt: { baseUrl: string; apiKey: string; model: string } | null;
  /** A cloud provider is selected but no key is saved. */
  missingKey: boolean;
  cloudName: string | null;
};

export async function resolveAi(s: AiSettings): Promise<ResolvedAi> {
  const local = (model: string): LlmTarget => ({ kind: 'ollama', baseUrl: s.serverUrl, model });
  const c = s.cloud;
  let cloud: LlmTarget | null = null;
  let cloudStt: ResolvedAi['cloudStt'] = null;
  let missingKey = false;
  if (c.provider) {
    const apiKey = await getApiKey(c.provider);
    if (!apiKey) missingKey = true;
    else {
      if (c.model.trim()) {
        cloud =
          c.provider === 'anthropic'
            ? { kind: 'anthropic', apiKey, model: c.model.trim() }
            : { kind: 'openai', provider: c.provider, baseUrl: cloudBaseUrl(c), apiKey, model: c.model.trim() };
      }
      const sttModel = cloudSttModel(c);
      if (c.forSpeech && sttModel && c.provider !== 'anthropic') cloudStt = { baseUrl: cloudBaseUrl(c), apiKey, model: sttModel };
    }
  }
  const live = [...(cloud && c.forInterview ? [cloud] : []), ...(s.serverUrl ? [local(s.liveModel)] : [])];
  const review = [...(cloud && c.forFeedback ? [cloud] : []), ...(s.serverUrl ? [local(s.reviewModel)] : [])];
  return { live, review, cloudStt, missingKey, cloudName: c.provider };
}

/** Speech-to-text engines for finished recordings during the interview, best first. */
export function liveTranscribers(ai: ResolvedAi, whisperUrl: string | null, prompt: string): Transcriber[] {
  const list: Transcriber[] = [];
  if (ai.cloudStt) {
    const c = ai.cloudStt;
    list.push({ label: 'cloud', source: 'cloud', transcribe: (uri) => transcribeCloud({ ...c, uri, prompt, timeoutMs: 45_000 }) });
  }
  if (whisperUrl) list.push({ label: 'laptop', source: 'live', transcribe: (uri) => transcribeFile({ baseUrl: whisperUrl, uri, prompt, timeoutMs: 90_000 }) });
  return list;
}

/** The most accurate engine available for re-checking answers before feedback. */
export function accurateTranscriber(ai: ResolvedAi, accurateUrl: string | null, prompt: string): Transcriber | null {
  if (ai.cloudStt) {
    const c = ai.cloudStt;
    return { label: 'cloud', source: 'cloud', transcribe: (uri) => transcribeCloud({ ...c, uri, prompt, timeoutMs: 120_000 }) };
  }
  if (accurateUrl) return { label: 'accurate', source: 'accurate', transcribe: (uri) => transcribeFile({ baseUrl: accurateUrl, uri, prompt, timeoutMs: 240_000 }) };
  return null;
}
