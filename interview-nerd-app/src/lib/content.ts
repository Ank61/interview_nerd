import { Asset } from 'expo-asset';
import { File } from 'expo-file-system';
import { useEffect, useState } from 'react';

import { CONTENT_ASSETS } from '@/data/generated/assets';

/**
 * Lazily loads offline content payloads bundled under assets/content.
 * Parsed results are kept in a small LRU cache and concurrent requests for the
 * same key share one read, so revisiting a screen is instant.
 */
const MAX_CACHE = 60;
const cache = new Map<string, unknown>();
const inflight = new Map<string, Promise<unknown>>();

function remember(key: string, value: unknown) {
  cache.delete(key);
  cache.set(key, value);
  if (cache.size > MAX_CACHE) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

async function readAssetText(moduleId: number): Promise<string> {
  const asset = Asset.fromModule(moduleId);
  if (!asset.localUri) await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;
  if (uri.startsWith('http')) {
    const res = await fetch(uri);
    return res.text();
  }
  return new File(uri).text();
}

export function peekContent<T>(key: string): T | undefined {
  return cache.get(key) as T | undefined;
}

export async function loadContent<T>(key: string): Promise<T> {
  if (cache.has(key)) {
    const v = cache.get(key) as T;
    remember(key, v);
    return v;
  }
  const pending = inflight.get(key);
  if (pending) return pending as Promise<T>;
  const moduleId = CONTENT_ASSETS[key];
  if (moduleId == null) throw new Error(`Unknown content: ${key}`);
  const p = readAssetText(moduleId)
    .then((text) => {
      const data = JSON.parse(text) as T;
      remember(key, data);
      return data;
    })
    .finally(() => inflight.delete(key));
  inflight.set(key, p);
  return p;
}

/** Warm the cache without waiting (e.g. the next concept). */
export function prefetchContent(key?: string) {
  if (key && !cache.has(key) && CONTENT_ASSETS[key] != null) loadContent(key).catch(() => {});
}

type State<T> = { data: T | undefined; error: Error | undefined; loading: boolean };

export function useContent<T>(key: string | undefined): State<T> & { reload: () => void } {
  const [nonce, setNonce] = useState(0);
  // Result of the last async load, tagged with the key it belongs to.
  const [result, setResult] = useState<{ key?: string; data?: T; error?: Error }>({});

  useEffect(() => {
    if (!key || peekContent(key)) return;
    let alive = true;
    loadContent<T>(key)
      .then((data) => alive && setResult({ key, data }))
      .catch((error) => alive && setResult({ key, error }));
    return () => {
      alive = false;
    };
  }, [key, nonce]);

  // Cached payloads are returned synchronously, so revisits never flash a loader.
  const data = (key ? peekContent<T>(key) : undefined) ?? (result.key === key ? result.data : undefined);
  const error = result.key === key ? result.error : undefined;
  return {
    data,
    error,
    loading: !!key && !data && !error,
    reload: () => {
      setResult({});
      setNonce((n) => n + 1);
    },
  };
}

/** Load several payloads at once (e.g. all MCQ categories for the daily challenge). */
export function useContents<T>(keysList: string[]): State<T[]> {
  const joined = keysList.join('|');
  const [state, setState] = useState<State<T[]>>({ data: undefined, error: undefined, loading: true });
  useEffect(() => {
    let alive = true;
    Promise.all(joined ? joined.split('|').map((k) => loadContent<T>(k)) : [])
      .then((data) => alive && setState({ data, error: undefined, loading: false }))
      .catch((error) => alive && setState({ data: undefined, error, loading: false }));
    return () => {
      alive = false;
    };
  }, [joined]);
  return state;
}
