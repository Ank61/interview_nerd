import * as Crypto from 'expo-crypto';
import { create } from 'zustand';

import { keys, readJSON, removeKeys, writeJSON } from './storage';

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  /** Topics the user said they are preparing for (onboarding). */
  focus: string[];
  /** Target role level picked at onboarding. */
  goal?: 'Junior' | 'Mid' | 'Senior';
  onboarded: boolean;
};

type StoredUser = User & { salt: string; hash: string };
type UserDB = Record<string, StoredUser>; // keyed by lower-cased email

type AuthState = {
  hydrated: boolean;
  user: User | null;
  hydrate: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateProfile: (patch: Partial<Pick<User, 'name' | 'focus' | 'goal' | 'onboarded'>>) => Promise<void>;
  changePassword: (current: string, next: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  accountCount: () => Promise<number>;
};

const ITERATIONS = 32;

async function hashPassword(password: string, salt: string) {
  let h = `${salt}:${password}`;
  for (let i = 0; i < ITERATIONS; i++) {
    h = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}${h}`);
  }
  return h;
}

const toHex = (bytes: Uint8Array) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

const publicUser = ({ salt: _s, hash: _h, ...u }: StoredUser): User => u;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export class AuthError extends Error {
  field?: 'name' | 'email' | 'password' | 'current';
  constructor(message: string, field?: AuthError['field']) {
    super(message);
    this.field = field;
  }
}

export const useAuth = create<AuthState>((set, get) => ({
  hydrated: false,
  user: null,

  hydrate: async () => {
    const [db, session] = await Promise.all([
      readJSON<UserDB>(keys.users, {}),
      readJSON<{ email?: string } | null>(keys.session, null),
    ]);
    const stored = session?.email ? db[session.email] : undefined;
    set({ user: stored ? publicUser(stored) : null, hydrated: true });
  },

  signUp: async (name, email, password) => {
    const e = email.trim().toLowerCase();
    if (name.trim().length < 2) throw new AuthError('Please enter your name.', 'name');
    if (!EMAIL_RE.test(e)) throw new AuthError('Enter a valid email address.', 'email');
    if (password.length < 6) throw new AuthError('Use at least 6 characters.', 'password');
    const db = await readJSON<UserDB>(keys.users, {});
    if (db[e]) throw new AuthError('An account with this email already exists on this device.', 'email');
    const salt = toHex(Crypto.getRandomBytes(16));
    const stored: StoredUser = {
      id: Crypto.randomUUID(),
      name: name.trim(),
      email: e,
      createdAt: Date.now(),
      focus: [],
      onboarded: false,
      salt,
      hash: await hashPassword(password, salt),
    };
    db[e] = stored;
    await writeJSON(keys.users, db);
    await writeJSON(keys.session, { email: e });
    set({ user: publicUser(stored) });
  },

  logIn: async (email, password) => {
    const e = email.trim().toLowerCase();
    if (!EMAIL_RE.test(e)) throw new AuthError('Enter a valid email address.', 'email');
    if (!password) throw new AuthError('Enter your password.', 'password');
    const db = await readJSON<UserDB>(keys.users, {});
    const stored = db[e];
    if (!stored) throw new AuthError('No account found with this email on this device.', 'email');
    const hash = await hashPassword(password, stored.salt);
    if (hash !== stored.hash) throw new AuthError('Incorrect password. Try again.', 'password');
    await writeJSON(keys.session, { email: e });
    set({ user: publicUser(stored) });
  },

  logOut: async () => {
    await removeKeys(keys.session);
    set({ user: null });
  },

  updateProfile: async (patch) => {
    const u = get().user;
    if (!u) return;
    const db = await readJSON<UserDB>(keys.users, {});
    const stored = db[u.email];
    if (!stored) return;
    const next = { ...stored, ...patch, name: (patch.name ?? stored.name).trim() || stored.name };
    db[u.email] = next;
    await writeJSON(keys.users, db);
    set({ user: publicUser(next) });
  },

  changePassword: async (current, next) => {
    const u = get().user;
    if (!u) return;
    const db = await readJSON<UserDB>(keys.users, {});
    const stored = db[u.email];
    if ((await hashPassword(current, stored.salt)) !== stored.hash)
      throw new AuthError('Current password is incorrect.', 'current');
    if (next.length < 6) throw new AuthError('Use at least 6 characters.', 'password');
    const salt = toHex(Crypto.getRandomBytes(16));
    db[u.email] = { ...stored, salt, hash: await hashPassword(next, salt) };
    await writeJSON(keys.users, db);
  },

  deleteAccount: async (password) => {
    const u = get().user;
    if (!u) return;
    const db = await readJSON<UserDB>(keys.users, {});
    const stored = db[u.email];
    if ((await hashPassword(password, stored.salt)) !== stored.hash)
      throw new AuthError('Password is incorrect.', 'password');
    delete db[u.email];
    await writeJSON(keys.users, db);
    await removeKeys(keys.session, keys.progress(u.id));
    set({ user: null });
  },

  accountCount: async () => Object.keys(await readJSON<UserDB>(keys.users, {})).length,
}));
