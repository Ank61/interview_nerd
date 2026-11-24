import { create } from 'zustand';

import { catalog, getTopic } from '@/data/catalog';
import { BADGES, BadgeStats, XP, currentStreak, dayKey, levelFor } from '@/lib/gamification';

import { keys, readJSON, removeKeys, writeJSON } from './storage';
import { toast } from './toast';

export type ItemKind = 'concept' | 'question' | 'exercise';

export type SavedItem = {
  key: string;
  kind: ItemKind;
  title: string;
  sub: string;
  href: string;
  ts: number;
};

export type QuizRecord = {
  cat: string;
  title: string;
  score: number;
  total: number;
  ts: number;
  mode: 'practice' | 'timed' | 'daily' | 'mistakes';
};

export type ProgressData = {
  v: 1;
  xp: number;
  learned: Record<string, number>;
  reviewed: Record<string, number>;
  solved: Record<string, number>;
  bookmarks: Record<string, SavedItem>;
  recent: SavedItem[];
  mcq: Record<string, { answered: number; correct: number; best: number; quizzes: number }>;
  mistakes: Record<string, { c: string; n: number; ts: number }>;
  quizzes: QuizRecord[];
  activity: Record<string, number>;
  daily: Record<string, { score: number; total: number }>;
  badges: Record<string, number>;
  milestones: Record<string, number>;
  totals: { answered: number; correct: number; run: number; bestRun: number; perfect: number };
  drafts: Record<string, string>;
};

const empty = (): ProgressData => ({
  v: 1,
  xp: 0,
  learned: {},
  reviewed: {},
  solved: {},
  bookmarks: {},
  recent: [],
  mcq: {},
  mistakes: {},
  quizzes: [],
  activity: {},
  daily: {},
  badges: {},
  milestones: {},
  totals: { answered: 0, correct: 0, run: 0, bestRun: 0, perfect: 0 },
  drafts: {},
});

type ProgressState = ProgressData & {
  userId: string | null;
  loaded: boolean;
  load: (userId: string | null) => Promise<void>;
  toggleLearned: (topicId: string, level: number, index: number) => boolean;
  toggleReviewed: (key: string) => boolean;
  setSolved: (labId: string, exId: string, difficulty: string, on?: boolean) => void;
  toggleBookmark: (item: Omit<SavedItem, 'ts'>) => boolean;
  pushRecent: (item: Omit<SavedItem, 'ts'>) => void;
  recordAnswer: (args: { id: string; cat: string; correct: boolean; mode: QuizRecord['mode'] }) => void;
  finishQuiz: (rec: Omit<QuizRecord, 'ts'>) => { xp: number };
  saveDraft: (key: string, code: string) => void;
  clearRecent: () => void;
  resetAll: () => Promise<void>;
};

// ---------------------------------------------------------------------------
// Persistence (debounced, per user)
// ---------------------------------------------------------------------------
let timer: ReturnType<typeof setTimeout> | undefined;
const pick = (s: ProgressState): ProgressData => ({
  v: 1,
  xp: s.xp,
  learned: s.learned,
  reviewed: s.reviewed,
  solved: s.solved,
  bookmarks: s.bookmarks,
  recent: s.recent,
  mcq: s.mcq,
  mistakes: s.mistakes,
  quizzes: s.quizzes,
  activity: s.activity,
  daily: s.daily,
  badges: s.badges,
  milestones: s.milestones,
  totals: s.totals,
  drafts: s.drafts,
});

function schedulePersist() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    const s = useProgress.getState();
    if (s.userId && s.loaded) writeJSON(keys.progress(s.userId), pick(s));
  }, 350);
}

// ---------------------------------------------------------------------------
// Derived stats
// ---------------------------------------------------------------------------
export function topicLearnedCount(learned: Record<string, number>, topicId: string) {
  const prefix = `${topicId}:`;
  let n = 0;
  for (const k in learned) if (k.startsWith(prefix)) n++;
  return n;
}

function badgeStats(p: ProgressData): BadgeStats {
  const touched = new Set<string>();
  for (const k in p.learned) touched.add(k.split(':')[0]);
  for (const k in p.reviewed) touched.add(k.split(':')[0]);
  const completedTopics = catalog.topics
    .filter((t) => t.counts.concepts > 0 && topicLearnedCount(p.learned, t.id) >= t.counts.concepts)
    .map((t) => t.id);
  // Weekend warrior: both days of any weekend
  let weekendBoth = false;
  for (const k in p.activity) {
    const d = new Date(`${k}T12:00:00`);
    if (d.getDay() === 6) {
      const sun = new Date(d);
      sun.setDate(d.getDate() + 1);
      if (p.activity[dayKey(sun)]) weekendBoth = true;
    }
  }
  return {
    xp: p.xp,
    learned: Object.keys(p.learned).length,
    reviewed: Object.keys(p.reviewed).length,
    solved: Object.keys(p.solved).length,
    answered: p.totals.answered,
    correct: p.totals.correct,
    bestRun: p.totals.bestRun,
    quizzes: p.quizzes.length,
    perfectQuizzes: p.totals.perfect,
    dailies: Object.keys(p.daily).length,
    streak: currentStreak(p.activity),
    topicsTouched: touched.size,
    completedTopics,
    hour: new Date().getHours(),
    weekendBoth,
    bookmarks: Object.keys(p.bookmarks).length,
  };
}

export const useProgress = create<ProgressState>((set, get) => {
  /** Apply a patch, award XP, check level-ups, badges and streak milestones. */
  const commit = (patch: Partial<ProgressData>, xpGain = 0, reason?: string) => {
    const before = get();
    const beforeLevel = levelFor(before.xp).level;
    const today = dayKey();
    const next: Partial<ProgressData> = { ...patch };
    if (xpGain > 0) {
      next.xp = before.xp + xpGain;
      next.activity = { ...before.activity, [today]: (before.activity[today] || 0) + xpGain };
      toast({ kind: 'xp', title: `+${xpGain} XP`, sub: reason });
    }
    set(next);

    // Streak milestone (every 7 days)
    const afterState = get();
    const streak = currentStreak(afterState.activity);
    if (xpGain > 0 && streak > 0 && streak % 7 === 0 && !afterState.milestones[`streak-${today}`]) {
      set({
        xp: afterState.xp + XP.WEEK_STREAK,
        milestones: { ...afterState.milestones, [`streak-${today}`]: Date.now() },
        activity: { ...afterState.activity, [today]: (afterState.activity[today] || 0) + XP.WEEK_STREAK },
      });
      toast({ kind: 'info', emoji: '🔥', title: `${streak}-day streak!`, sub: `+${XP.WEEK_STREAK} XP bonus` });
    }

    const after = get();
    const lvl = levelFor(after.xp);
    if (lvl.level > beforeLevel) {
      toast({ kind: 'level', emoji: '⚡', title: `Level ${lvl.level} · ${lvl.name}`, sub: 'You levelled up!' });
    }

    const stats = badgeStats(after);
    const earned: Record<string, number> = {};
    for (const b of BADGES) {
      if (!after.badges[b.id] && b.check(stats)) {
        earned[b.id] = Date.now();
        toast({ kind: 'badge', emoji: b.icon, title: `Badge unlocked: ${b.name}`, sub: b.description });
      }
    }
    if (Object.keys(earned).length) set({ badges: { ...after.badges, ...earned } });
    schedulePersist();
  };

  return {
    ...empty(),
    userId: null,
    loaded: false,

    load: async (userId) => {
      if (timer) clearTimeout(timer);
      if (!userId) {
        set({ ...empty(), userId: null, loaded: false });
        return;
      }
      const saved = await readJSON<Partial<ProgressData>>(keys.progress(userId), {});
      const base = empty();
      set({ ...base, ...saved, totals: { ...base.totals, ...(saved.totals || {}) }, userId, loaded: true });
    },

    toggleLearned: (topicId, level, index) => {
      const key = `${topicId}:${level}:${index}`;
      const s = get();
      if (s.learned[key]) {
        const learned = { ...s.learned };
        delete learned[key];
        commit({ learned });
        return false;
      }
      const learned = { ...s.learned, [key]: Date.now() };
      let gain = XP.CONCEPT_LEARNED;
      const topic = getTopic(topicId);
      const milestones = { ...s.milestones };
      if (
        topic &&
        !milestones[`topic-${topicId}`] &&
        topicLearnedCount(learned, topicId) >= topic.counts.concepts
      ) {
        milestones[`topic-${topicId}`] = Date.now();
        gain += XP.TOPIC_COMPLETE;
        toast({ kind: 'info', emoji: '🏆', title: `${topic.title} complete!`, sub: `+${XP.TOPIC_COMPLETE} XP bonus` });
      }
      commit({ learned, milestones }, gain, 'Concept learned');
      return true;
    },

    toggleReviewed: (key) => {
      const s = get();
      if (s.reviewed[key]) {
        const reviewed = { ...s.reviewed };
        delete reviewed[key];
        commit({ reviewed });
        return false;
      }
      commit({ reviewed: { ...s.reviewed, [key]: Date.now() } }, XP.QUESTION_REVIEWED, 'Answer reviewed');
      return true;
    },

    setSolved: (labId, exId, difficulty, on = true) => {
      const key = `${labId}:${exId}`;
      const s = get();
      if (!on) {
        const solved = { ...s.solved };
        delete solved[key];
        commit({ solved });
        return;
      }
      if (s.solved[key]) return;
      commit({ solved: { ...s.solved, [key]: Date.now() } }, XP.EXERCISE[difficulty] ?? 10, 'Exercise solved');
    },

    toggleBookmark: (item) => {
      const s = get();
      const bookmarks = { ...s.bookmarks };
      if (bookmarks[item.key]) {
        delete bookmarks[item.key];
        commit({ bookmarks });
        return false;
      }
      bookmarks[item.key] = { ...item, ts: Date.now() };
      commit({ bookmarks });
      return true;
    },

    pushRecent: (item) => {
      const s = get();
      const recent = [{ ...item, ts: Date.now() }, ...s.recent.filter((r) => r.key !== item.key)].slice(0, 25);
      set({ recent });
      schedulePersist();
    },

    recordAnswer: ({ id, cat, correct, mode }) => {
      const s = get();
      const totals = { ...s.totals, answered: s.totals.answered + 1 };
      const m = s.mcq[cat] || { answered: 0, correct: 0, best: 0, quizzes: 0 };
      const mcq = { ...s.mcq, [cat]: { ...m, answered: m.answered + 1, correct: m.correct + (correct ? 1 : 0) } };
      const mistakes = { ...s.mistakes };
      if (correct) {
        totals.correct++;
        totals.run++;
        totals.bestRun = Math.max(totals.bestRun, totals.run);
        if (mode === 'mistakes') delete mistakes[id];
      } else {
        totals.run = 0;
        mistakes[id] = { c: cat, n: (mistakes[id]?.n || 0) + 1, ts: Date.now() };
      }
      commit({ totals, mcq, mistakes }, correct && mode !== 'timed' ? XP.MCQ_CORRECT : 0, correct ? 'Correct answer' : undefined);
    },

    finishQuiz: (rec) => {
      const s = get();
      let gain = 0;
      const totals = { ...s.totals };
      const daily = { ...s.daily };
      const mcq = { ...s.mcq };
      const today = dayKey();
      if (rec.mode === 'timed') gain += rec.score * XP.MCQ_CORRECT;
      if (rec.total >= 5 && rec.score === rec.total) {
        gain += XP.PERFECT_QUIZ;
        totals.perfect++;
      }
      if (rec.mode === 'daily' && !daily[today]) {
        daily[today] = { score: rec.score, total: rec.total };
        gain += XP.DAILY_COMPLETE;
      }
      if (mcq[rec.cat]) {
        const pct = Math.round((rec.score / Math.max(1, rec.total)) * 100);
        mcq[rec.cat] = { ...mcq[rec.cat], best: Math.max(mcq[rec.cat].best, pct), quizzes: mcq[rec.cat].quizzes + 1 };
      }
      commit(
        { quizzes: [{ ...rec, ts: Date.now() }, ...s.quizzes].slice(0, 60), totals, daily, mcq },
        gain,
        'Quiz complete',
      );
      return { xp: gain };
    },

    saveDraft: (key, code) => {
      set({ drafts: { ...get().drafts, [key]: code } });
      schedulePersist();
    },

    clearRecent: () => {
      set({ recent: [] });
      schedulePersist();
    },

    resetAll: async () => {
      const userId = get().userId;
      if (userId) await removeKeys(keys.progress(userId));
      set({ ...empty() });
      schedulePersist();
    },
  };
});

export const selectStreak = (s: ProgressState) => currentStreak(s.activity);
export { badgeStats };
