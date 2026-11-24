/**
 * Prompts and JSON schemas for the local LLM (Ollama).
 *
 * Live turns run during the interview, so they ask for the smallest possible
 * output (a verdict, an action and one spoken line). Detailed grading happens
 * after the interview, where speed does not matter.
 */
import { clip, oneLine } from './text';
import type { AnswerReview, Difficulty, InterviewLevel, LiveDecision, Verdict } from './types';

export const INTERVIEWER_NAME = 'Alex';

export type ThreadLine = { who: 'interviewer' | 'candidate'; text: string };
export type ChatPrompt = { system: string; user: string };

const VERDICTS: Verdict[] = ['strong', 'partial', 'weak', 'wrong', 'no_answer'];

export const INTRO_REFERENCE =
  'A strong self-introduction is under two minutes and covers: current role and years of experience, the main technologies they work with, ' +
  'one notable project and their personal contribution to it, and what kind of role they want next.';

function threadText(thread: ThreadLine[]) {
  return thread
    .map((l) => `${l.who === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${oneLine(l.text) || '(no answer)'}`)
    .join('\n');
}

// ---------------------------------------------------------------------------
// Live turn: judge the last answer, then follow up or move on.
// ---------------------------------------------------------------------------
export type LiveTurnInput = {
  level: InterviewLevel;
  years: number;
  difficulty: Difficulty;
  topic: string;
  isIntro: boolean;
  question: string;
  reference: string;
  thread: ThreadLine[];
  followUpsLeft: number;
};

export const LIVE_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: VERDICTS },
    action: { type: 'string', enum: ['follow_up', 'next'] },
    say: { type: 'string' },
  },
  required: ['verdict', 'action', 'say'],
};

const PROBE: Record<Difficulty, string> = {
  easy: 'Only follow up on a clear gap, and keep the follow-up simple and friendly.',
  medium: 'Follow up on the most important missing concept, or ask for a concrete example.',
  hard: 'Probe hard: internals, trade-offs, edge cases, failure modes and "why". Challenge vague or imprecise claims.',
};

/**
 * The system prompt depends only on interview-wide settings, so it is byte-identical
 * on every turn. Ollama then reuses its cached prefix and only processes the new
 * user message, which roughly halves the wait on a CPU-bound laptop.
 */
export function liveTurnPrompt(i: LiveTurnInput): ChatPrompt {
  const system = [
    `You are ${INTERVIEWER_NAME}, a senior engineer running a live voice interview for a ${i.level}-level software engineering role. The candidate has ${i.years} years of experience. Difficulty: ${i.difficulty}.`,
    '',
    "Judge the candidate's LAST answer and decide the next move.",
    '- The answer is a speech-to-text transcript: ignore filler words, missing punctuation and small mis-heard words.',
    '- Compare it with the reference notes. The candidate cannot see the notes. Never reveal them, never explain the answer, never teach.',
    '- verdict: strong = correct and complete; partial = right idea but missing key points; weak = vague or mostly missing; wrong = contains an incorrect claim; no_answer = they do not know or said nothing useful.',
    `- action "follow_up" when the answer is partial, weak or wrong, or makes a claim worth probing. ${PROBE[i.difficulty]}`,
    '- action "next" when the answer is strong, or when another question on this would not add much.',
    '- say: for "follow_up", ONE short spoken question (under 25 words) that builds on what they actually said and targets the most important gap or the incorrect claim. Sound like a real person talking.',
    '- say: for "next", a brief neutral acknowledgement under 6 words, like "Okay, thanks." Never say the answer was good, great or correct.',
    'Reply with JSON only.',
  ].join('\n');
  const user = [
    `Topic: ${i.isIntro ? 'self-introduction (judge clarity, structure and relevance)' : i.topic}`,
    `Question: ${oneLine(i.question)}`,
    `Reference notes: ${clip(i.isIntro ? INTRO_REFERENCE : i.reference || 'No notes. Use your own expertise.', 900)}`,
    '',
    'Conversation on this question so far:',
    threadText(i.thread),
    '',
    `Follow-ups you may still ask on this question: ${i.followUpsLeft}`,
  ].join('\n');
  return { system, user };
}

const ACKS = ['Okay, thanks.', 'Got it.', 'Okay.', 'Alright, thank you.', 'Understood.'];
export const randomAck = () => ACKS[Math.floor(Math.random() * ACKS.length)];

/** Validate and tidy the model's live decision. Returns null when it is unusable. */
export function parseLiveDecision(raw: unknown): LiveDecision | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const verdict = VERDICTS.includes(r.verdict as Verdict) ? (r.verdict as Verdict) : 'partial';
  let action: LiveDecision['action'] = r.action === 'follow_up' ? 'follow_up' : 'next';
  let say = typeof r.say === 'string' ? oneLine(r.say) : '';
  say = say
    .replace(/^(interviewer|alex)\s*:\s*/i, '')
    .replace(/^["'“”]+|["'“”]+$/g, '')
    .trim();

  if (action === 'follow_up') {
    if (say.length < 8) return null;
    if (say.length > 240) {
      // Keep the first question sentence only.
      const q = say.indexOf('?');
      say = q > 0 && q < 240 ? say.slice(0, q + 1) : clip(say, 200).replace(/ \.\.\.$/, '?');
    }
    // A "follow-up" that is just an acknowledgement means the model wanted to move on.
    if (!say.includes('?') && say.split(/\s+/).length < 6) action = 'next';
  }
  if (action === 'next' && (say.length === 0 || say.length > 60 || say.includes('?'))) say = randomAck();
  return { verdict, action, say };
}

// ---------------------------------------------------------------------------
// Post-interview grading of one question thread.
// ---------------------------------------------------------------------------
export type ReviewInput = {
  level: InterviewLevel;
  years: number;
  difficulty: Difficulty;
  topic: string;
  isIntro: boolean;
  question: string;
  reference: string;
  thread: ThreadLine[];
};

/** Key order matters: the model writes its reasoning before committing to a score. */
export const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' } },
    gaps: { type: 'array', items: { type: 'string' } },
    tip: { type: 'string' },
    score: { type: 'integer' },
  },
  required: ['summary', 'strengths', 'gaps', 'tip', 'score'],
};

export function reviewPrompt(i: ReviewInput): ChatPrompt {
  const subject = i.isIntro ? 'self-introduction' : `${i.topic} question`;
  const system = [
    `You are an experienced technical interviewer writing honest feedback on one ${subject} from a mock interview.`,
    `Candidate: ${i.years} years of experience, interviewing for a ${i.level}-level role. Difficulty: ${i.difficulty}.`,
    'The answers are speech-to-text transcripts: ignore filler words, missing punctuation and small mis-heard words.',
    'Judge the whole conversation, including answers to follow-up questions.',
    `The reference notes are a long written article. Grade against what a strong ${i.level}-level candidate would say OUT LOUD in about two minutes, not against every detail in the notes.`,
    'Before writing each gap, re-read the candidate\'s words and make sure they really did not cover it anywhere. Never list something they said as missing.',
    'For facts, trust the reference notes over your own memory: only call a statement incorrect if it clearly contradicts the reference notes.',
    'Write directly to the candidate using "you". Be specific: name the exact concepts that were right, missing or incorrect.',
    '- summary: 1-2 sentences on how the answer came across.',
    '- strengths: up to 3 short points (empty list if none).',
    '- gaps: up to 3 short points about missing or incorrect content (empty list if none).',
    '- tip: one concrete thing to say or do differently next time.',
    '- score: 5 = covers the main points correctly and precisely, 4 = correct with minor gaps, 3 = partially correct, 2 = major gaps or an important error, 1 = wrong or no real answer.',
    'A correct answer that covers the main points must score 4 or 5, even if it skips minor details.',
    'Reply with JSON only.',
  ].join('\n');
  const user = [
    `Question: ${oneLine(i.question)}`,
    `Reference notes: ${clip(i.isIntro ? INTRO_REFERENCE : i.reference || 'No notes. Use your own expertise.', 1500)}`,
    '',
    'Conversation (verbatim transcript):',
    threadText(i.thread),
  ].join('\n');
  return { system, user };
}

const strList = (v: unknown, max: number) =>
  Array.isArray(v)
    ? v
        .filter((s): s is string => typeof s === 'string')
        .map(oneLine)
        .filter((s) => s.length > 2)
        .slice(0, max)
    : [];

export function parseReview(raw: unknown, model: string): AnswerReview | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const score = Math.round(Number(r.score));
  const summary = typeof r.summary === 'string' ? oneLine(r.summary) : '';
  if (!Number.isFinite(score) || !summary) return null;
  return {
    score: Math.min(5, Math.max(1, score)),
    summary,
    strengths: strList(r.strengths, 3),
    gaps: strList(r.gaps, 3),
    tip: typeof r.tip === 'string' ? oneLine(r.tip) : '',
    model,
  };
}

// ---------------------------------------------------------------------------
// Overall summary across the interview.
// ---------------------------------------------------------------------------
export type OverallInput = {
  level: InterviewLevel;
  years: number;
  difficulty: Difficulty;
  topics: string[];
  score: number;
  items: { question: string; score: number; summary: string; gaps: string[] }[];
};

export const OVERALL_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' } },
    improve: { type: 'array', items: { type: 'string' } },
  },
  required: ['summary', 'strengths', 'improve'],
};

export function overallPrompt(i: OverallInput): ChatPrompt {
  const system = [
    'You are an experienced technical interviewer giving the candidate a short debrief after a mock interview.',
    `Role: ${i.level}-level, topics: ${i.topics.join(', ')}. Candidate experience: ${i.years} years. Difficulty: ${i.difficulty}.`,
    'Base everything only on the per-question results provided. Write directly to the candidate ("you").',
    '- summary: 2-3 sentences: overall impression and the single most important thing to work on.',
    '- strengths: up to 3 short points.',
    '- improve: up to 4 short, specific study or practice actions (name concepts).',
    'Reply with JSON only.',
  ].join('\n');
  const user = [
    `Overall score: ${i.score}/100`,
    '',
    ...i.items.map(
      (it, n) => `${n + 1}. ${oneLine(it.question)}\n   score ${it.score}/5. ${it.summary}${it.gaps.length ? ` Gaps: ${it.gaps.join('; ')}` : ''}`,
    ),
  ].join('\n');
  return { system, user };
}

export function parseOverall(raw: unknown): { summary: string; strengths: string[]; improve: string[] } | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const summary = typeof r.summary === 'string' ? oneLine(r.summary) : '';
  if (!summary) return null;
  return { summary, strengths: strList(r.strengths, 3), improve: strList(r.improve, 4) };
}
