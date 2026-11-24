/**
 * Local gamification rules, adapted from the web app's lib/gamification.js.
 */

export const XP = {
  CONCEPT_LEARNED: 10,
  QUESTION_REVIEWED: 5,
  MCQ_CORRECT: 10,
  PERFECT_QUIZ: 25,
  DAILY_COMPLETE: 15,
  TOPIC_COMPLETE: 50,
  WEEK_STREAK: 25,
  EXERCISE: { Easy: 10, Medium: 25, Hard: 50 } as Record<string, number>,
};

export const LEVELS = [
  { level: 1, xp: 0, name: 'Beginner' },
  { level: 2, xp: 100, name: 'Novice' },
  { level: 3, xp: 300, name: 'Learner' },
  { level: 4, xp: 600, name: 'Practitioner' },
  { level: 5, xp: 1000, name: 'Skilled' },
  { level: 6, xp: 1500, name: 'Expert' },
  { level: 7, xp: 2200, name: 'Master' },
  { level: 8, xp: 3000, name: 'Guru' },
  { level: 9, xp: 4000, name: 'Legend' },
  { level: 10, xp: 5500, name: 'Interview Ninja' },
];

export function levelFor(xp: number) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) idx = i;
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const span = next ? next.xp - cur.xp : 1;
  return {
    ...cur,
    next,
    into: xp - cur.xp,
    span,
    progress: next ? Math.min(1, (xp - cur.xp) / span) : 1,
  };
}

// ---------------------------------------------------------------------------
// Dates & streaks
// ---------------------------------------------------------------------------
export const dayKey = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

/** Current streak: consecutive active days ending today (or yesterday). */
export function currentStreak(activity: Record<string, number>, today = new Date()) {
  let d = today;
  if (!activity[dayKey(d)]) d = addDays(d, -1);
  let n = 0;
  while (activity[dayKey(d)]) {
    n++;
    d = addDays(d, -1);
  }
  return n;
}

/** Longest run of consecutive active days ever. */
export function longestStreak(activity: Record<string, number>) {
  const days = Object.keys(activity)
    .filter((k) => activity[k] > 0)
    .sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const k of days) {
    const d = new Date(`${k}T12:00:00`);
    run = prev && dayKey(addDays(prev, 1)) === k ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

// ---------------------------------------------------------------------------
// Badges
// ---------------------------------------------------------------------------
export type BadgeStats = {
  xp: number;
  learned: number;
  reviewed: number;
  solved: number;
  answered: number;
  correct: number;
  bestRun: number;
  quizzes: number;
  perfectQuizzes: number;
  dailies: number;
  streak: number;
  topicsTouched: number;
  completedTopics: string[];
  hour: number;
  weekendBoth: boolean;
  bookmarks: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  check: (s: BadgeStats) => boolean;
  progress?: (s: BadgeStats) => [number, number];
};

export const BADGES: Badge[] = [
  { id: 'first_steps', name: 'First Steps', description: 'Earn your first XP', icon: '🎯', rarity: 'common', check: (s) => s.xp > 0 },
  { id: 'getting_started', name: 'Getting Started', description: 'Keep a 3-day streak', icon: '🔥', rarity: 'common', check: (s) => s.streak >= 3, progress: (s) => [Math.min(s.streak, 3), 3] },
  { id: 'consistent', name: 'Consistent Learner', description: 'Keep a 7-day streak', icon: '🌟', rarity: 'rare', check: (s) => s.streak >= 7, progress: (s) => [Math.min(s.streak, 7), 7] },
  { id: 'dedicated', name: 'Dedicated Student', description: 'Keep a 30-day streak', icon: '💎', rarity: 'epic', check: (s) => s.streak >= 30, progress: (s) => [Math.min(s.streak, 30), 30] },
  { id: 'champion', name: 'Study Champion', description: 'Keep a 100-day streak', icon: '👑', rarity: 'legendary', check: (s) => s.streak >= 100, progress: (s) => [Math.min(s.streak, 100), 100] },
  { id: 'perfect_score', name: 'Perfect Score', description: 'Answer 10 MCQs right in a row', icon: '💯', rarity: 'rare', check: (s) => s.bestRun >= 10, progress: (s) => [Math.min(s.bestRun, 10), 10] },
  { id: 'accuracy_expert', name: 'Accuracy Expert', description: '80%+ accuracy over 50 answers', icon: '🎯', rarity: 'epic', check: (s) => s.answered >= 50 && s.correct / s.answered >= 0.8, progress: (s) => [Math.min(s.answered, 50), 50] },
  { id: 'quiz_master', name: 'Quiz Master', description: 'Complete 10 quizzes', icon: '🧠', rarity: 'rare', check: (s) => s.quizzes >= 10, progress: (s) => [Math.min(s.quizzes, 10), 10] },
  { id: 'flawless', name: 'Flawless', description: 'Finish a quiz with 100%', icon: '✨', rarity: 'rare', check: (s) => s.perfectQuizzes >= 1 },
  { id: 'scholar', name: 'Scholar', description: 'Learn 25 concepts', icon: '📚', rarity: 'common', check: (s) => s.learned >= 25, progress: (s) => [Math.min(s.learned, 25), 25] },
  { id: 'sage', name: 'Sage', description: 'Learn 150 concepts', icon: '🦉', rarity: 'epic', check: (s) => s.learned >= 150, progress: (s) => [Math.min(s.learned, 150), 150] },
  { id: 'interviewer', name: 'Interview Ready', description: 'Review 50 interview answers', icon: '🎤', rarity: 'rare', check: (s) => s.reviewed >= 50, progress: (s) => [Math.min(s.reviewed, 50), 50] },
  { id: 'lab_rat', name: 'Lab Rat', description: 'Solve 10 practice exercises', icon: '🧪', rarity: 'rare', check: (s) => s.solved >= 10, progress: (s) => [Math.min(s.solved, 10), 10] },
  { id: 'polyglot', name: 'Polyglot', description: 'Make progress in 5 topics', icon: '🌍', rarity: 'rare', check: (s) => s.topicsTouched >= 5, progress: (s) => [Math.min(s.topicsTouched, 5), 5] },
  { id: 'daily_devotee', name: 'Daily Devotee', description: 'Complete 7 daily challenges', icon: '📅', rarity: 'rare', check: (s) => s.dailies >= 7, progress: (s) => [Math.min(s.dailies, 7), 7] },
  { id: 'js_ninja', name: 'JavaScript Ninja', description: 'Learn every JavaScript concept', icon: '🥷', rarity: 'epic', check: (s) => s.completedTopics.includes('javascript') },
  { id: 'collector', name: 'Collector', description: 'Save 10 bookmarks', icon: '🔖', rarity: 'common', check: (s) => s.bookmarks >= 10, progress: (s) => [Math.min(s.bookmarks, 10), 10] },
  { id: 'night_owl', name: 'Night Owl', description: 'Study after 10 PM', icon: '🌙', rarity: 'common', check: (s) => s.hour >= 22 },
  { id: 'early_bird', name: 'Early Bird', description: 'Study before 7 AM', icon: '🌅', rarity: 'common', check: (s) => s.hour < 7 && s.hour >= 4 },
  { id: 'weekend_warrior', name: 'Weekend Warrior', description: 'Study on Saturday and Sunday', icon: '🚀', rarity: 'rare', check: (s) => s.weekendBoth },
  { id: 'ninja', name: 'Interview Ninja', description: 'Reach level 10', icon: '⚔️', rarity: 'legendary', check: (s) => s.xp >= 5500, progress: (s) => [Math.min(s.xp, 5500), 5500] },
];

export const RARITY_COLOR: Record<Badge['rarity'], string> = {
  common: '#A1A1AA',
  rare: '#60A5FA',
  epic: '#C084FC',
  legendary: '#FBBF24',
};

// ---------------------------------------------------------------------------
// Seeded randomness (daily challenge, shuffles)
// ---------------------------------------------------------------------------
export function seeded(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: T[], rand: () => number = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
