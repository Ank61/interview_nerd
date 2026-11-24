/**
 * Minimal Ollama HTTP client (https://github.com/ollama/ollama/blob/main/docs/api.md).
 * The app talks to the laptop directly over the local network; nothing leaves the LAN.
 */
import type { ChatPrompt } from './prompts';

export type OllamaErrorKind = 'unreachable' | 'timeout' | 'model_missing' | 'bad_output' | 'server';

export class OllamaError extends Error {
  kind: OllamaErrorKind;
  constructor(kind: OllamaErrorKind, message: string) {
    super(message);
    this.kind = kind;
  }
}

/** Keep models loaded between turns so the candidate never waits for a cold start. */
const KEEP_ALIVE = '30m';

export function normalizeBaseUrl(url: string) {
  let u = url.trim().replace(/\/+$/, '');
  if (!u) return u;
  if (!/^https?:\/\//i.test(u)) u = `http://${u}`;
  // Default Ollama port when the user typed only a host/IP.
  if (!/:\d+$/.test(u.replace(/^https?:\/\//i, ''))) u = `${u}:11434`;
  return u;
}

async function request(url: string, init: RequestInit & { timeoutMs: number; signal?: AbortSignal }) {
  const ctrl = new AbortController();
  const onAbort = () => ctrl.abort();
  init.signal?.addEventListener('abort', onAbort);
  const timer = setTimeout(() => ctrl.abort(), init.timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } catch (e) {
    if (init.signal?.aborted) throw e;
    if (ctrl.signal.aborted) throw new OllamaError('timeout', 'The laptop took too long to respond.');
    throw new OllamaError('unreachable', "Can't reach Ollama on your laptop.");
  } finally {
    clearTimeout(timer);
    init.signal?.removeEventListener('abort', onAbort);
  }
}

async function readError(res: Response) {
  try {
    const j = (await res.json()) as { error?: string };
    return j.error ?? `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

export type OllamaStatus = { ok: true; version: string; models: string[] } | { ok: false; error: string };

/** Quick reachability check + installed model names. */
export async function ollamaStatus(baseUrl: string, timeoutMs = 4000): Promise<OllamaStatus> {
  const base = normalizeBaseUrl(baseUrl);
  if (!base) return { ok: false, error: 'Set the laptop address first.' };
  try {
    const [v, tags] = await Promise.all([
      request(`${base}/api/version`, { method: 'GET', timeoutMs }),
      request(`${base}/api/tags`, { method: 'GET', timeoutMs }),
    ]);
    if (!v.ok || !tags.ok) return { ok: false, error: `Ollama answered with ${await readError(v.ok ? tags : v)}` };
    const version = ((await v.json()) as { version?: string }).version ?? '?';
    const models = (((await tags.json()) as { models?: { name: string }[] }).models ?? []).map((m) => m.name);
    return { ok: true, version, models };
  } catch (e) {
    return { ok: false, error: e instanceof OllamaError ? e.message : "Can't reach Ollama on your laptop." };
  }
}

/** True when `model` (e.g. "llama3:8b") is installed, tolerating an implicit ":latest" tag. */
export function hasModel(models: string[], model: string) {
  const want = model.includes(':') ? model : `${model}:latest`;
  return models.some((m) => m === model || m === want);
}

/** Load a model into memory ahead of time (an empty prompt only loads it). */
export async function warmUp(baseUrl: string, model: string, timeoutMs = 120_000) {
  const res = await request(`${normalizeBaseUrl(baseUrl)}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, keep_alive: KEEP_ALIVE }),
    timeoutMs,
  });
  if (res.status === 404) throw new OllamaError('model_missing', `Model ${model} is not installed. Run "ollama pull ${model}" on the laptop.`);
  if (!res.ok) throw new OllamaError('server', await readError(res));
  await res.text();
}

export type ChatResult<T> = { data: T; ms: number; outputTokens: number };

/** One non-streaming chat call constrained to a JSON schema. */
export async function chatJSON<T = unknown>(opts: {
  baseUrl: string;
  model: string;
  prompt: ChatPrompt;
  schema: object;
  timeoutMs: number;
  maxTokens: number;
  temperature?: number;
  signal?: AbortSignal;
}): Promise<ChatResult<T>> {
  const started = Date.now();
  const res = await request(`${normalizeBaseUrl(opts.baseUrl)}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    timeoutMs: opts.timeoutMs,
    signal: opts.signal,
    body: JSON.stringify({
      model: opts.model,
      stream: false,
      keep_alive: KEEP_ALIVE,
      format: opts.schema,
      options: { temperature: opts.temperature ?? 0.4, num_ctx: 4096, num_predict: opts.maxTokens },
      messages: [
        { role: 'system', content: opts.prompt.system },
        { role: 'user', content: opts.prompt.user },
      ],
    }),
  });
  if (res.status === 404) throw new OllamaError('model_missing', `Model ${opts.model} is not installed. Run "ollama pull ${opts.model}" on the laptop.`);
  if (!res.ok) throw new OllamaError('server', await readError(res));
  const body = (await res.json()) as { message?: { content?: string }; eval_count?: number };
  const content = body.message?.content ?? '';
  let data: T;
  try {
    data = JSON.parse(content) as T;
  } catch {
    throw new OllamaError('bad_output', 'The model returned something that was not JSON.');
  }
  return { data, ms: Date.now() - started, outputTokens: body.eval_count ?? 0 };
}
