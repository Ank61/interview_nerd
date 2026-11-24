/**
 * One way to ask any model for JSON: local Ollama, an OpenAI-compatible API (OpenAI, Groq,
 * Gemini, OpenRouter, custom), or Anthropic Claude (official SDK).
 */
import type AnthropicClient from '@anthropic-ai/sdk';

import { chatJSON as ollamaChatJSON } from './ollama';
import type { ChatPrompt } from './prompts';
import { type ProviderId, providerInfo } from './providers';

type AnthropicModule = typeof AnthropicClient;
let anthropicModule: Promise<AnthropicModule> | null = null;
/** The SDK is loaded only when a Claude key is actually used, so it can never affect app startup. */
function loadAnthropic(): Promise<AnthropicModule> {
  anthropicModule ??= import('@anthropic-ai/sdk').then((m) => m.default);
  return anthropicModule;
}

export type LlmTarget =
  | { kind: 'ollama'; baseUrl: string; model: string }
  | { kind: 'openai'; provider: ProviderId; baseUrl: string; apiKey: string; model: string }
  | { kind: 'anthropic'; apiKey: string; model: string };

export class LlmError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export function describeTarget(t: LlmTarget) {
  if (t.kind === 'ollama') return `${t.model} on your laptop`;
  if (t.kind === 'anthropic') return `${t.model} (Anthropic)`;
  return `${t.model} (${providerInfo(t.provider).name})`;
}

export type JsonRequest = {
  target: LlmTarget;
  prompt: ChatPrompt;
  schema: Record<string, unknown>;
  timeoutMs: number;
  maxTokens: number;
  temperature?: number;
  /** How hard reasoning models should think: live turns use 'low' for speed. */
  effort?: 'low' | 'medium' | 'high';
  signal?: AbortSignal;
};

export async function llmJSON<T = unknown>(r: JsonRequest): Promise<{ data: T; ms: number }> {
  const started = Date.now();
  if (r.target.kind === 'ollama') {
    const res = await ollamaChatJSON<T>({
      baseUrl: r.target.baseUrl,
      model: r.target.model,
      prompt: r.prompt,
      schema: r.schema,
      timeoutMs: r.timeoutMs,
      maxTokens: r.maxTokens,
      temperature: r.temperature,
      signal: r.signal,
    });
    return { data: res.data, ms: res.ms };
  }
  const data = r.target.kind === 'anthropic' ? await anthropicJSON<T>(r, r.target) : await openaiJSON<T>(r, r.target);
  return { data, ms: Date.now() - started };
}

/** Plain-language description of the JSON shape, for providers without schema enforcement. */
export function schemaHint(schema: Record<string, unknown>): string {
  const props = (schema.properties ?? {}) as Record<string, { type?: string; enum?: string[]; items?: { type?: string } }>;
  const parts = Object.entries(props).map(([k, v]) => {
    if (v.enum) return `"${k}": one of ${v.enum.map((e) => `"${e}"`).join(', ')}`;
    if (v.type === 'array') return `"${k}": array of ${v.items?.type ?? 'string'}s`;
    return `"${k}": ${v.type ?? 'string'}`;
  });
  return `Respond with only a JSON object with exactly these keys: ${parts.join('; ')}.`;
}

/** Parse JSON from model text, tolerating code fences or a sentence around the object. */
export function parseJsonText<T>(text: string): T {
  const cleaned = text.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1)) as T;
    throw new LlmError('The model did not return JSON.');
  }
}

function withTimeout(timeoutMs: number, outer?: AbortSignal) {
  const ctrl = new AbortController();
  const onAbort = () => ctrl.abort();
  outer?.addEventListener('abort', onAbort);
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  return {
    signal: ctrl.signal,
    done: () => {
      clearTimeout(timer);
      outer?.removeEventListener('abort', onAbort);
    },
    timedOut: () => ctrl.signal.aborted && !outer?.aborted,
  };
}

function friendlyStatus(status: number, detail: string) {
  if (status === 401 || status === 403) return 'The API key was rejected. Check it in "Your own AI".';
  if (status === 404) return `Model not found. ${detail}`.trim();
  if (status === 429) return 'Rate limit or quota reached on your API key. Try again in a minute.';
  if (status >= 500) return 'The AI provider is having problems. Try again shortly.';
  return detail || `Request failed (HTTP ${status}).`;
}

// ---------------------------------------------------------------------------
// OpenAI-compatible
// ---------------------------------------------------------------------------
/** Parameters a given model rejected once; they are left out on later calls. */
const unsupported = new Map<string, Set<string>>();

async function openaiJSON<T>(r: JsonRequest, t: Extract<LlmTarget, { kind: 'openai' }>): Promise<T> {
  const key = `${t.baseUrl}|${t.model}`;
  const drop = unsupported.get(key) ?? new Set<string>();
  unsupported.set(key, drop);
  for (let attempt = 0; attempt < 4; attempt++) {
    const body: Record<string, unknown> = {
      model: t.model,
      messages: [
        { role: 'system', content: `${r.prompt.system}\n\n${schemaHint(r.schema)}` },
        { role: 'user', content: r.prompt.user },
      ],
      response_format: { type: 'json_object' },
      temperature: r.temperature ?? 0.4,
      // OpenAI's newer models only accept max_completion_tokens; other providers use max_tokens.
      [t.provider === 'openai' ? 'max_completion_tokens' : 'max_tokens']: r.maxTokens,
    };
    if (t.provider === 'openai' && r.effort) body.reasoning_effort = r.effort;
    for (const p of drop) delete body[p];

    const to = withTimeout(r.timeoutMs, r.signal);
    let res: Response;
    try {
      res = await fetch(`${t.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t.apiKey}` },
        body: JSON.stringify(body),
        signal: to.signal,
      });
    } catch {
      throw new LlmError(to.timedOut() ? 'The AI provider took too long to answer.' : "Can't reach the AI provider. Check the internet connection.");
    } finally {
      to.done();
    }
    if (res.ok) {
      const j = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const content = j.choices?.[0]?.message?.content ?? '';
      if (!content) throw new LlmError('The model returned an empty answer.');
      return parseJsonText<T>(content);
    }
    const text = await res.text();
    let detail = text;
    try {
      const e = JSON.parse(text) as { error?: { message?: string } | string; message?: string };
      detail = (typeof e.error === 'string' ? e.error : e.error?.message) ?? e.message ?? text;
    } catch {}
    // A parameter this model does not support: drop it and retry.
    if (res.status === 400) {
      const bad = ['temperature', 'max_completion_tokens', 'max_tokens', 'reasoning_effort', 'response_format'].find((p) => !drop.has(p) && detail.includes(p));
      if (bad) {
        drop.add(bad);
        continue;
      }
    }
    throw new LlmError(friendlyStatus(res.status, detail.slice(0, 200)), res.status);
  }
  throw new LlmError('The model rejected the request.');
}

// ---------------------------------------------------------------------------
// Anthropic (official SDK)
// ---------------------------------------------------------------------------
/** Anthropic structured outputs require additionalProperties: false on every object. */
function strictSchema(schema: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...schema };
  if (out.type === 'object') {
    out.additionalProperties = false;
    const props = (out.properties ?? {}) as Record<string, Record<string, unknown>>;
    out.properties = Object.fromEntries(Object.entries(props).map(([k, v]) => [k, strictSchema(v)]));
  }
  if (out.type === 'array' && out.items) out.items = strictSchema(out.items as Record<string, unknown>);
  return out;
}

/** Current Claude models accept effort and the server-side refusal fallback. */
const MODERN_CLAUDE = /^claude-(opus|sonnet|haiku|fable|mythos)-[5-9]/;
const FALLBACK_CLAUDE = /^claude-(opus-5|sonnet-5-5|fable)/;

async function anthropicJSON<T>(r: JsonRequest, t: Extract<LlmTarget, { kind: 'anthropic' }>): Promise<T> {
  const Anthropic = await loadAnthropic();
  const client = new Anthropic({ apiKey: t.apiKey, dangerouslyAllowBrowser: true, maxRetries: 1, timeout: r.timeoutMs });
  const modern = MODERN_CLAUDE.test(t.model);
  const base = {
    model: t.model,
    // Thinking counts toward max_tokens on current models, so leave headroom.
    max_tokens: modern ? r.maxTokens + 4000 : r.maxTokens,
    system: r.prompt.system,
    messages: [{ role: 'user' as const, content: r.prompt.user }],
    output_config: {
      format: { type: 'json_schema' as const, schema: strictSchema(r.schema) },
      ...(modern && r.effort ? { effort: r.effort } : {}),
    },
  };
  try {
    const msg = FALLBACK_CLAUDE.test(t.model)
      ? await client.beta.messages.create({ ...base, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' }, { signal: r.signal })
      : await client.messages.create(base, { signal: r.signal });
    if (msg.stop_reason === 'refusal') throw new LlmError('Claude declined to answer this request.');
    const text = msg.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
    if (!text) throw new LlmError('Claude returned an empty answer.');
    return parseJsonText<T>(text);
  } catch (e) {
    if (e instanceof LlmError) throw e;
    if (e instanceof Anthropic.APIError && typeof e.status === 'number') throw new LlmError(friendlyStatus(e.status, e.message.slice(0, 200)), e.status);
    if (e instanceof Anthropic.APIConnectionTimeoutError) throw new LlmError('Claude took too long to answer.');
    if (e instanceof Anthropic.APIConnectionError) throw new LlmError("Can't reach Anthropic. Check the internet connection.");
    throw new LlmError(e instanceof Error ? e.message : String(e));
  }
}

// ---------------------------------------------------------------------------
// Model lists
// ---------------------------------------------------------------------------
/** Models available to this key, straight from the provider. */
export async function listModels(provider: ProviderId, baseUrl: string, apiKey: string): Promise<string[]> {
  if (provider === 'anthropic') {
    const Anthropic = await loadAnthropic();
    const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 1, timeout: 15_000 });
    const ids: string[] = [];
    try {
      for await (const m of client.models.list({ limit: 100 })) ids.push(m.id);
    } catch (e) {
      if (e instanceof Anthropic.APIError && typeof e.status === 'number') throw new LlmError(friendlyStatus(e.status, e.message), e.status);
      throw new LlmError("Can't reach Anthropic. Check the internet connection.");
    }
    return ids;
  }
  const to = withTimeout(15_000);
  try {
    const res = await fetch(`${baseUrl}/models`, { headers: { Authorization: `Bearer ${apiKey}` }, signal: to.signal });
    if (!res.ok) throw new LlmError(friendlyStatus(res.status, ''), res.status);
    const j = (await res.json()) as { data?: { id: string }[]; models?: { id?: string; name?: string }[] };
    const raw = (j.data ?? j.models ?? []).map((m) => ('id' in m && m.id ? m.id : ((m as { name?: string }).name ?? '')));
    // Gemini lists "models/gemini-..."; its chat endpoint takes the bare id.
    const ids = raw.map((id) => id.replace(/^models\//, '')).filter(Boolean);
    // Hide models that can't chat (embeddings, speech, images, moderation).
    return [...new Set(ids)].filter((id) => !/(embed|whisper|tts|dall-e|image|moderation|transcribe|audio|realtime|guard)/i.test(id)).sort();
  } catch (e) {
    if (e instanceof LlmError) throw e;
    throw new LlmError(to.timedOut() ? 'The provider took too long to list models.' : "Can't reach the provider. Check the internet connection and address.");
  } finally {
    to.done();
  }
}

