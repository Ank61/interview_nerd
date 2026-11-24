/** Picks interview questions from the local question bank. */
import { getTopic, type InterviewItem, type Topic } from '@/data/catalog';
import { loadContent } from '@/lib/content';

import { htmlToText } from './text';
import type { Difficulty, InterviewLevel } from './types';

export const LEVELS: InterviewLevel[] = ['Junior', 'Mid', 'Senior'];

/** Years of experience set the base level; difficulty moves it one step down or up. */
export function levelFor(years: number, difficulty: Difficulty): InterviewLevel {
  const base = years <= 2 ? 0 : years <= 5 ? 1 : 2;
  const shift = difficulty === 'easy' ? -1 : difficulty === 'hard' ? 1 : 0;
  return LEVELS[Math.max(0, Math.min(2, base + shift))];
}

export type BankQuestion = {
  topicId: string;
  topicTitle: string;
  setIndex: number;
  index: number;
  question: string;
  reference: string;
  sourceKey: string;
};

export const sourceKeyOf = (topicId: string, setIndex: number, index: number) => `${topicId}|${setIndex}|${index}`;

/** Parse a source key back into its parts (for "see model answer" links). */
export function parseSourceKey(key: string | null) {
  if (!key) return null;
  const [topicId, s, i] = key.split('|');
  const setIndex = Number(s);
  const index = Number(i);
  if (!topicId || !Number.isInteger(setIndex) || !Number.isInteger(index)) return null;
  return { topicId, setIndex, index };
}

function shuffle<T>(list: T[]) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Sets matching the level. Topics without Junior/Mid/Senior sets (e.g. System Design) use all sets. */
function setsFor(topic: Topic, level: InterviewLevel): number[] {
  const all = topic.sets.map((_, i) => i).filter((i) => topic.sets[i].count > 0);
  const leveled = all.filter((i) => LEVELS.includes(topic.sets[i].label as InterviewLevel));
  if (!leveled.length) return all;
  const exact = leveled.filter((i) => topic.sets[i].label === level);
  if (exact.length) return exact;
  // Closest available level.
  const want = LEVELS.indexOf(level);
  const best = Math.min(...leveled.map((i) => Math.abs(LEVELS.indexOf(topic.sets[i].label as InterviewLevel) - want)));
  return leveled.filter((i) => Math.abs(LEVELS.indexOf(topic.sets[i].label as InterviewLevel) - want) === best);
}

/**
 * A shuffled queue of questions, interleaving the chosen topics. Questions this user was
 * asked recently go to the back of each topic's list.
 */
export async function buildQuestionQueue(topicIds: string[], level: InterviewLevel, recent: Set<string>): Promise<BankQuestion[]> {
  const perTopic: BankQuestion[][] = [];
  for (const id of topicIds) {
    const topic = getTopic(id);
    if (!topic) continue;
    const items: BankQuestion[] = [];
    for (const setIndex of setsFor(topic, level)) {
      const data = await loadContent<InterviewItem[]>(topic.sets[setIndex].a);
      data.forEach((it, index) => {
        if (!it.q?.trim()) return;
        items.push({
          topicId: topic.id,
          topicTitle: topic.title,
          setIndex,
          index,
          question: it.q.trim(),
          reference: htmlToText(it.a ?? ''),
          sourceKey: sourceKeyOf(topic.id, setIndex, index),
        });
      });
    }
    const fresh = shuffle(items.filter((q) => !recent.has(q.sourceKey)));
    const seen = shuffle(items.filter((q) => recent.has(q.sourceKey)));
    if (fresh.length + seen.length) perTopic.push([...fresh, ...seen]);
  }
  const queue: BankQuestion[] = [];
  const order = shuffle(perTopic.map((_, i) => i));
  for (let round = 0; perTopic.some((l) => round < l.length); round++) {
    for (const t of order) if (round < perTopic[t].length) queue.push(perTopic[t][round]);
  }
  return queue;
}

/** Concept names for the chosen topics. They bias speech recognition towards technical terms. */
export function vocabularyFor(topicIds: string[], limit = 80): string[] {
  const out = new Set<string>();
  for (const id of topicIds) {
    const t = getTopic(id);
    if (!t) continue;
    out.add(t.title);
    for (const lvl of t.levels) for (const c of lvl.concepts) if (c.t.length <= 40) out.add(c.t);
  }
  return [...out].slice(0, limit);
}
