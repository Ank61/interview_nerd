/**
 * Natural interviewer voice generated on the laptop (Kokoro, voice_server.py on port 11436).
 *
 * Speech is split into sentences: the first sentence plays as soon as it is ready while the
 * next one is generated, so the interviewer starts talking almost immediately. Clips are cached
 * on the phone, so repeated lines ("Okay.", a question asked before) play instantly.
 */
import { type AudioPlayer, createAudioPlayer } from 'expo-audio';
import { Directory, File, Paths } from 'expo-file-system';

export const DEFAULT_VOICE_PORT = 11436;
export const DEFAULT_LAPTOP_VOICE = 'am_michael';

export type LaptopVoice = { id: string; name: string; accent: string; gender: string; featured: boolean };

export function normalizeVoiceUrl(url: string) {
  let u = url.trim().replace(/\/+$/, '');
  if (!u) return u;
  if (!/^https?:\/\//i.test(u)) u = `http://${u}`;
  if (!/:\d+$/.test(u.replace(/^https?:\/\//i, ''))) u = `${u}:${DEFAULT_VOICE_PORT}`;
  return u;
}

export async function voiceServerStatus(baseUrl: string, timeoutMs = 4000): Promise<{ ok: true; voices: LaptopVoice[] } | { ok: false }> {
  const base = normalizeVoiceUrl(baseUrl);
  if (!base) return { ok: false };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${base}/`, { signal: ctrl.signal });
    if (!res.ok) return { ok: false };
    const body = (await res.json()) as { voices?: LaptopVoice[] };
    return { ok: true, voices: body.voices ?? [] };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

/** Split into sentences; very short pieces are merged so the voice keeps a natural rhythm. */
export function splitSentences(text: string): string[] {
  // A sentence ends at . ! or ? (plus closing quotes/brackets) followed by a space and a capital,
  // digit or opening quote. No regex lookbehind, so it works on every JS engine.
  const flat = text.replace(/\s+/g, ' ').trim();
  const raw: string[] = [];
  const re = /[.!?]+["')\]]*\s+(?=[A-Z0-9"'(])/g;
  let start = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(flat))) {
    raw.push(flat.slice(start, m.index + m[0].length));
    start = m.index + m[0].length;
  }
  raw.push(flat.slice(start));
  const out: string[] = [];
  for (const s of raw) {
    const t = s.trim();
    if (!t) continue;
    const last = out[out.length - 1];
    if (last && (last.length < 25 || t.length < 12)) out[out.length - 1] = `${last} ${t}`;
    else out.push(t);
  }
  return out;
}

function hash(s: string) {
  let h1 = 0x811c9dc5;
  let h2 = 0x1b873593;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193);
    h2 = Math.imul(h2 ^ c, 0x5bd1e995);
  }
  return (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36);
}

function cacheDir() {
  const dir = new Directory(Paths.cache, 'interview-voice');
  if (!dir.exists) dir.create({ intermediates: true, idempotent: true });
  return dir;
}

export type VoiceOpts = { baseUrl: string; voice: string; speed: number };

/** Get a playable local file for one sentence (from the phone cache or the laptop). */
export async function fetchClip(text: string, o: VoiceOpts, timeoutMs = 15_000): Promise<File> {
  const file = new File(cacheDir(), `${hash(`${o.voice}|${o.speed.toFixed(2)}|${text}`)}.wav`);
  if (file.exists && (file.size ?? 0) > 44) return file;
  const base = normalizeVoiceUrl(o.baseUrl);
  const url = `${base}/tts?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(o.voice)}&speed=${o.speed.toFixed(2)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    if (file.exists) file.delete();
    const downloaded = await File.downloadFileAsync(url, file, { signal: ctrl.signal, idempotent: true });
    if ((downloaded.size ?? 0) <= 44) throw new Error('Empty audio from the voice server.');
    return downloaded;
  } catch (e) {
    try {
      if (file.exists) file.delete();
    } catch {}
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export type PlayResult = 'done' | 'stopped' | 'error';

/** Plays laptop-generated speech sentence by sentence; stop() interrupts immediately. */
export class NeuralSpeaker {
  private player: AudioPlayer | null = null;
  private interrupt: ((r: PlayResult) => void) | null = null;
  private generation = 0;

  /**
   * Speak `text`. If the laptop fails before or during playback, `fallback` speaks whatever
   * was not played yet (the phone's own voice), so the interviewer never goes silent.
   */
  async speak(text: string, o: VoiceOpts, fallback: (rest: string) => Promise<PlayResult>): Promise<PlayResult> {
    const gen = ++this.generation;
    const sentences = splitSentences(text);
    if (!sentences.length) return 'done';
    let next: Promise<File> = fetchClip(sentences[0], o);
    for (let i = 0; i < sentences.length; i++) {
      let file: File;
      try {
        file = await next;
      } catch {
        if (gen !== this.generation) return 'stopped';
        return fallback(sentences.slice(i).join(' '));
      }
      if (gen !== this.generation) return 'stopped';
      if (i + 1 < sentences.length) {
        next = fetchClip(sentences[i + 1], o);
        next.catch(() => {}); // handled when awaited
      }
      const r = await this.play(file);
      if (r !== 'done') return r;
      if (gen !== this.generation) return 'stopped';
    }
    return 'done';
  }

  /** Generate clips ahead of time (e.g. the next question while the candidate answers). */
  async prefetch(text: string, o: VoiceOpts) {
    for (const s of splitSentences(text)) {
      try {
        await fetchClip(s, o, 30_000);
      } catch {
        return;
      }
    }
  }

  private play(file: File): Promise<PlayResult> {
    return new Promise((resolve) => {
      let settled = false;
      const player = (this.player ??= createAudioPlayer(null));
      const finish = (r: PlayResult) => {
        if (settled) return;
        settled = true;
        clearTimeout(safety);
        sub.remove();
        this.interrupt = null;
        resolve(r);
      };
      const sub = player.addListener('playbackStatusUpdate', (st) => {
        if (st.didJustFinish) finish('done');
      });
      // 24 kHz 16-bit mono WAV = 48,000 bytes per second; allow generous slack.
      const seconds = Math.max(0, ((file.size ?? 0) - 44) / 48_000);
      const safety = setTimeout(() => finish('done'), seconds * 1000 * 1.5 + 4000);
      this.interrupt = finish;
      try {
        player.replace({ uri: file.uri });
        player.play();
      } catch {
        finish('error');
      }
    });
  }

  stop() {
    this.generation += 1;
    try {
      this.player?.pause();
    } catch {}
    this.interrupt?.('stopped');
  }

  release() {
    this.stop();
    try {
      this.player?.remove();
    } catch {}
    this.player = null;
  }
}
