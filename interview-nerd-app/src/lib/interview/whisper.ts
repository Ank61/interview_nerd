/**
 * Speech-to-text on the laptop with whisper.cpp's server (`whisper-server.exe`).
 * Used when the phone has no native speech recognizer available (e.g. Expo Go on iPhone).
 */
import { File, UploadTask, UploadType } from 'expo-file-system';

import { normalizeBaseUrl } from './ollama';

export const DEFAULT_WHISPER_PORT = 11435;

export function normalizeWhisperUrl(url: string) {
  let u = url.trim().replace(/\/+$/, '');
  if (!u) return u;
  if (!/^https?:\/\//i.test(u)) u = `http://${u}`;
  if (!/:\d+$/.test(u.replace(/^https?:\/\//i, ''))) u = `${u}:${DEFAULT_WHISPER_PORT}`;
  return u;
}

/** Same host as Ollama, Whisper's port. */
export function whisperUrlFromOllama(ollamaUrl: string) {
  const base = normalizeBaseUrl(ollamaUrl);
  if (!base) return '';
  return base.replace(/:\d+$/, `:${DEFAULT_WHISPER_PORT}`);
}

/** Any HTTP answer means the server is up (its home page may legitimately be a 404). */
export async function whisperReachable(baseUrl: string, timeoutMs = 4000): Promise<boolean> {
  const base = normalizeWhisperUrl(baseUrl);
  if (!base) return false;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    await fetch(`${base}/`, { method: 'GET', signal: ctrl.signal });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Whisper writes markers like "[BLANK_AUDIO]" or "(silence)" for non-speech. */
export function cleanTranscript(text: string) {
  return text
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/\((?:silence|music|noise|inaudible|applause|laughs?)[^)]*\)/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Upload one WAV file and return the transcript. Throws on network/server errors or timeout. */
export async function transcribeFile(opts: { baseUrl: string; uri: string; prompt?: string; timeoutMs?: number }): Promise<string> {
  const base = normalizeWhisperUrl(opts.baseUrl);
  if (!base) throw new Error('Speech-to-text address is not set.');
  const file = new File(opts.uri);
  if (!file.exists) throw new Error('Recording file is missing.');
  const parameters: Record<string, string> = { response_format: 'json', temperature: '0' };
  if (opts.prompt) parameters.prompt = opts.prompt;
  const task = new UploadTask(file, `${base}/inference`, {
    httpMethod: 'POST',
    uploadType: UploadType.MULTIPART,
    fieldName: 'file',
    mimeType: opts.uri.toLowerCase().endsWith('.wav') ? 'audio/wav' : 'audio/mp4',
    parameters,
  });
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    const result = await Promise.race([
      task.uploadAsync(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          task.cancel();
          reject(new Error('Speech-to-text took too long.'));
        }, opts.timeoutMs ?? 60_000);
      }),
    ]);
    if (result.status < 200 || result.status >= 300) throw new Error(`Speech-to-text failed (HTTP ${result.status}).`);
    const body = JSON.parse(result.body) as { text?: string; error?: string };
    if (body.error) throw new Error(`Speech-to-text failed: ${body.error}`);
    return cleanTranscript(body.text ?? '');
  } finally {
    if (timer) clearTimeout(timer);
    task.release();
  }
}

/** Short context that helps Whisper spell technical terms (e.g. "setTimeout", "useEffect"). */
export function whisperPrompt(topics: string[], vocabulary: string[]) {
  return `Technical job interview about ${topics.join(', ')}. Terms: ${vocabulary.slice(0, 40).join(', ')}.`.slice(0, 600);
}

/** Cloud speech-to-text on an OpenAI-compatible API (OpenAI, Groq, ...). Throws on failure. */
export async function transcribeCloud(opts: { baseUrl: string; apiKey: string; model: string; uri: string; prompt?: string; timeoutMs?: number }): Promise<string> {
  const file = new File(opts.uri);
  if (!file.exists) throw new Error('Recording file is missing.');
  const parameters: Record<string, string> = { model: opts.model, response_format: 'json', language: 'en', temperature: '0' };
  if (opts.prompt) parameters.prompt = opts.prompt;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 60_000);
  const task = new UploadTask(file, `${opts.baseUrl}/audio/transcriptions`, {
    httpMethod: 'POST',
    uploadType: UploadType.MULTIPART,
    fieldName: 'file',
    mimeType: opts.uri.toLowerCase().endsWith('.wav') ? 'audio/wav' : 'audio/mp4',
    headers: { Authorization: `Bearer ${opts.apiKey}` },
    parameters,
    signal: ctrl.signal,
  });
  try {
    const result = await task.uploadAsync();
    if (result.status === 401 || result.status === 403) throw new Error('The API key was rejected for speech-to-text.');
    if (result.status < 200 || result.status >= 300) throw new Error(`Cloud speech-to-text failed (HTTP ${result.status}).`);
    const body = JSON.parse(result.body) as { text?: string };
    return cleanTranscript(body.text ?? '');
  } finally {
    clearTimeout(timer);
    task.release();
  }
}
