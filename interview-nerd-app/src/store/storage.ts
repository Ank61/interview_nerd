import AsyncStorage from '@react-native-async-storage/async-storage';

/** Namespaced JSON helpers over AsyncStorage. Everything stays on device. */
const NS = 'interviewnerd:';

export const keys = {
  users: `${NS}users`,
  session: `${NS}session`,
  settings: `${NS}settings`,
  interview: `${NS}interview`,
  progress: (userId: string) => `${NS}progress:${userId}`,
};

export async function readJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function writeJSON(key: string, value: unknown) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to persist', key, e);
  }
}

export async function removeKeys(...k: string[]) {
  try {
    await AsyncStorage.multiRemove(k);
  } catch {}
}
