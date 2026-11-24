/**
 * What the interviewer says outside of the actual questions: greeting, transitions,
 * closing lines, and the scripted follow-ups used when no AI is available.
 */
import { INTERVIEWER_NAME } from './prompts';
import { wordCount } from './text';
import type { Difficulty } from './types';

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

function listJoin(items: string[]) {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export function greeting(opts: { minutes: number; topics: string[]; intro: boolean }) {
  const hello = pick(['Hi, thanks for joining.', 'Hello, thanks for making the time.', 'Hi there, thanks for joining today.']);
  const plan = `I'm ${INTERVIEWER_NAME}, and I'll be interviewing you today. We have about ${opts.minutes} minutes, and we'll focus on ${listJoin(opts.topics)}.`;
  const style = "Take your time with each answer. When you've finished, just pause, and I'll pick it up from there.";
  return `${hello} ${plan} ${style} ${opts.intro ? "Let's start with a quick introduction." : "Let's get started."}`;
}

export const INTRO_QUESTION = 'Tell me a little about yourself and your experience.';

/** Lead-in for the first technical question. */
export function firstQuestionLead(opts: { afterIntro: boolean; topic: string }) {
  return opts.afterIntro ? `Thanks for that. Let's get into ${opts.topic}.` : `Let's start with ${opts.topic}.`;
}

/** Spoken between questions. Never starts with "Okay" because it usually follows an acknowledgement. */
export function transition(opts: { topicChanged: boolean; topic?: string }) {
  if (opts.topicChanged && opts.topic) return pick([`Let's switch to ${opts.topic}.`, `Now let's talk about ${opts.topic}.`, `Moving on to ${opts.topic}.`]);
  return pick(["Let's move on.", 'Next question.', 'Alright, next one.', 'Moving on.']);
}

/** Said immediately after the candidate finishes, while the AI decides. Keeps the call feeling alive. */
export const listeningAck = () => pick(['Okay.', 'I see.', 'Right.', 'Okay, got it.']);

/** Said after a long silence before the candidate starts answering. */
export const nudgeLine = () =>
  pick(["Take your time. If you're not sure, it's fine to say so and we'll move on.", 'No rush. Think out loud if that helps.', 'Take a moment. Even a partial answer is fine.']);

export const skipLine = () => pick(['No problem, we can skip that one.', "That's fine, let's skip it.", 'Sure, we can come back to that.']);
export const dontKnowLine = () => pick(["That's okay.", 'No problem.', 'Fair enough.']);
export const noAnswerLine = () => pick(["I didn't catch an answer there, so let's move on.", "Okay, let's keep going."]);
export const repeatLead = () => pick(['Sure.', 'Of course.', 'No problem.']);

export function closingLine(early: boolean) {
  if (early) return "Okay, let's stop here. Thanks for your time today. Your answers are saved, and you can review them in the report.";
  return "That's all the time we have. Thank you, I enjoyed the conversation. You'll find your answers and feedback in the interview report.";
}

export const graceLine = "We're about out of time, so please wrap up your answer.";

const DONT_KNOW = [
  /\b(i\s*)?(do\s*not|don'?t|dont)\s+(really\s+)?know\b/i,
  /\bno idea\b/i,
  /\bnot (really |quite )?sure\b/i,
  /\b(i\s*)?(have\s*not|haven'?t)\s+(really\s+)?(used|worked with|heard of|come across)\b/i,
  /\b(can'?t|cannot|don'?t) (remember|recall)\b/i,
  /^\s*(i'?ll\s+|i will\s+)?pass\b/i,
  /\bskip (this|it)\b/i,
];

/**
 * True when the whole answer is essentially "I don't know". Only very short answers
 * qualify, so "I'm not sure, but I think closures capture variables..." still counts as an attempt.
 */
export function isDontKnow(answer: string) {
  const words = wordCount(answer);
  if (words === 0 || words > 12) return false;
  return DONT_KNOW.some((re) => re.test(answer));
}

// ---------------------------------------------------------------------------
// Scripted follow-ups (no-AI mode, or when the laptop stops responding).
// ---------------------------------------------------------------------------
const SHORT_ANSWER = [
  'Could you go a bit deeper on that?',
  'Can you expand on that a little?',
  'What else would you add to that?',
];

const PROBES: Record<Difficulty, string[]> = {
  easy: ['Can you give me a simple example of that?', 'Where have you used this in practice?'],
  medium: [
    'Can you walk me through a concrete example?',
    'Where have you used this in a real project, and what did you learn?',
    "What's a common mistake people make with this?",
    'How would you explain that to a junior developer?',
  ],
  hard: [
    'What trade-offs would you consider there?',
    'How does that behave at scale, or under heavy load?',
    'What can go wrong with that approach, and how would you detect it?',
    'Why does it work that way under the hood?',
    'When would you choose a different approach?',
  ],
};

/** How many follow-ups the interviewer may ask per main question. */
export function followUpLimit(difficulty: Difficulty, mode: 'ai' | 'offline', isIntro: boolean) {
  if (isIntro) return 1;
  if (mode === 'offline') return difficulty === 'easy' ? 0 : 1;
  return difficulty === 'easy' ? 1 : 2;
}

/**
 * Picks a scripted follow-up, or null to move on. Avoids repeating lines within one interview.
 * Short answers get "go deeper"; longer answers get a probe on medium/hard.
 */
export function scriptedFollowUp(opts: { answer: string; difficulty: Difficulty; used: Set<string> }): string | null {
  const words = wordCount(opts.answer);
  if (words < 4) return null;
  const pool = words < 30 ? SHORT_ANSWER : opts.difficulty === 'easy' ? [] : PROBES[opts.difficulty];
  if (opts.difficulty === 'medium' && words >= 30 && Math.random() < 0.4) return null;
  const fresh = pool.filter((l) => !opts.used.has(l));
  if (!fresh.length) return null;
  const line = pick(fresh);
  opts.used.add(line);
  return line;
}

export function introFollowUp(used: Set<string>): string {
  const lines = ['What was the most challenging part of that work?', 'What are you most proud of in that project?', 'What was your exact role on that team?'];
  const line = pick(lines.filter((l) => !used.has(l))) ?? lines[0];
  used.add(line);
  return line;
}
