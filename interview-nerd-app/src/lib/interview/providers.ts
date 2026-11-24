/**
 * Optional "bring your own API key" providers. Without a key, everything runs on the laptop.
 * Keys are stored only in the phone's secure storage (iOS Keychain / Android Keystore).
 */
import * as SecureStore from 'expo-secure-store';

export type ProviderId = 'openai' | 'groq' | 'gemini' | 'openrouter' | 'anthropic' | 'custom';

export type ProviderInfo = {
  id: ProviderId;
  name: string;
  /** OpenAI-compatible base URL (empty for Anthropic, which uses its own SDK). */
  baseUrl: string;
  /** Where to create a key. */
  keyUrl: string;
  /** Models to show before the live list is loaded. */
  suggested: string[];
  /** Speech-to-text model on this provider's /audio/transcriptions endpoint, if it has one. */
  sttModel: string | null;
  note: string;
};

export const PROVIDERS: ProviderInfo[] = [
  {
    id: 'groq',
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    keyUrl: 'https://console.groq.com/keys',
    suggested: [],
    sttModel: 'whisper-large-v3-turbo',
    note: 'Very fast, with a free tier. Also offers accurate Whisper speech-to-text.',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    keyUrl: 'https://platform.openai.com/api-keys',
    suggested: [],
    sttModel: 'whisper-1',
    note: 'GPT models. Also offers speech-to-text.',
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    baseUrl: '',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    suggested: ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'],
    sttModel: null,
    note: 'Claude models. Opus is the most capable; Haiku is the fastest.',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    keyUrl: 'https://aistudio.google.com/apikey',
    suggested: [],
    sttModel: null,
    note: 'Gemini models through Google AI Studio.',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    keyUrl: 'https://openrouter.ai/keys',
    suggested: [],
    sttModel: null,
    note: 'One key for models from many providers.',
  },
  {
    id: 'custom',
    name: 'Other (OpenAI-compatible)',
    baseUrl: '',
    keyUrl: '',
    suggested: [],
    sttModel: null,
    note: 'Any server with an OpenAI-compatible /chat/completions endpoint (Together, DeepSeek, LM Studio...).',
  },
];

export const providerInfo = (id: ProviderId) => PROVIDERS.find((p) => p.id === id)!;

/** Non-secret cloud settings (kept in normal app storage). */
export type CloudConfig = {
  provider: ProviderId | null;
  model: string;
  /** Base URL for the "custom" provider. */
  baseUrl: string;
  forInterview: boolean;
  forFeedback: boolean;
  forSpeech: boolean;
  sttModel: string;
};

export const DEFAULT_CLOUD: CloudConfig = {
  provider: null,
  model: '',
  baseUrl: '',
  forInterview: true,
  forFeedback: true,
  forSpeech: true,
  sttModel: '',
};

export function cloudBaseUrl(c: CloudConfig) {
  if (!c.provider) return '';
  return (c.provider === 'custom' ? c.baseUrl : providerInfo(c.provider).baseUrl).trim().replace(/\/+$/, '');
}

export function cloudSttModel(c: CloudConfig): string | null {
  if (!c.provider) return null;
  const def = providerInfo(c.provider).sttModel;
  if (c.provider === 'custom') return c.sttModel.trim() || null;
  return def ? c.sttModel.trim() || def : null;
}

// ---------------------------------------------------------------------------
// Secure key storage
// ---------------------------------------------------------------------------
const keyName = (p: ProviderId) => `interview_ai_key_${p}`;

export async function getApiKey(p: ProviderId): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(keyName(p));
  } catch {
    return null;
  }
}

export async function saveApiKey(p: ProviderId, key: string) {
  await SecureStore.setItemAsync(keyName(p), key.trim());
}

export async function deleteApiKey(p: ProviderId) {
  await SecureStore.deleteItemAsync(keyName(p));
}

export function maskKey(key: string) {
  const k = key.trim();
  return k.length <= 10 ? '••••' : `${k.slice(0, 4)}…${k.slice(-4)}`;
}
