/**
 * Post-interview AI feedback. Grades each question thread (main question + its follow-ups)
 * with the review model on the laptop, then writes an overall debrief.
 *
 * Runs outside React so it keeps going if the user leaves the screen. Each thread's
 * feedback is saved as soon as it is ready, so a failed or interrupted run resumes
 * where it stopped.
 */
import { getTopic } from '@/data/catalog';

import { getInterview, getTurns, saveTurn, setTurnReview, updateInterview } from './db';
import { recordingUri } from './files';
import { accurateTranscriber, type AiSettings, type ResolvedAi, resolveAi } from './aiTargets';
import type { Transcriber } from './fileRecorder';
import { type LlmTarget, llmJSON } from './llm';
import { type ChatPrompt, OVERALL_SCHEMA, overallPrompt, parseOverall, parseReview, REVIEW_SCHEMA, reviewPrompt, type ThreadLine } from './prompts';
import { vocabularyFor } from './questions';
import { joinText } from './text';
import type { AnswerReview, HireSignal, OverallReview, Turn } from './types';
import { transcribeFile, whisperPrompt, whisperReachable } from './whisper';

export type TurnThread = { main: Turn; followUps: Turn[] };

/** Group turns into threads: each intro/question with the follow-ups asked after it. */
export function groupThreads(turns: Turn[]): TurnThread[] {
  const threads: TurnThread[] = [];
  const bySeq = new Map<number, TurnThread>();
  for (const t of [...turns].sort((a, b) => a.seq - b.seq)) {
    if (t.kind === 'follow_up' && t.parentSeq != null && bySeq.has(t.parentSeq)) {
      bySeq.get(t.parentSeq)!.followUps.push(t);
    } else {
      const th = { main: t, followUps: [] };
      threads.push(th);
      bySeq.set(t.seq, th);
    }
  }
  return threads;
}

const threadAnswered = (th: TurnThread) => [th.main, ...th.followUps].some((t) => t.answer.trim().length > 0);

export function scoreToPercent(avg: number) {
  return Math.round(((Math.min(5, Math.max(1, avg)) - 1) / 4) * 100);
}

export function hireSignal(score: number): HireSignal {
  if (score >= 80) return 'strong_hire';
  if (score >= 65) return 'hire';
  if (score >= 50) return 'lean_hire';
  if (score >= 35) return 'lean_no_hire';
  return 'no_hire';
}

export const HIRE_LABEL: Record<HireSignal, string> = {
  strong_hire: 'Strong hire',
  hire: 'Hire',
  lean_hire: 'Leaning hire',
  lean_no_hire: 'Leaning no hire',
  no_hire: 'No hire',
};

const NO_ANSWER: Omit<AnswerReview, 'model'> = {
  score: 1,
  summary: 'No answer was recorded for this question.',
  strengths: [],
  gaps: ['No answer was given.'],
  tip: 'Read the model answer, then practise saying the key points out loud in under two minutes.',
};

// ---------------------------------------------------------------------------
// Job registry (observable from screens)
// ---------------------------------------------------------------------------
export type ReviewJob = { status: 'running' | 'done' | 'error'; done: number; total: number; step: string; error?: string };

const jobs = new Map<string, ReviewJob>();
const listeners = new Set<() => void>();

export function getReviewJob(id: string) {
  return jobs.get(id);
}

export function subscribeReviews(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function update(id: string, patch: Partial<ReviewJob>) {
  const prev = jobs.get(id) ?? { status: 'running', done: 0, total: 0, step: '' };
  jobs.set(id, { ...prev, ...patch });
  listeners.forEach((l) => l());
}

export type ReviewOptions = { ai: AiSettings; accurateRecheck: boolean };

export function startReview(interviewId: string, opts: ReviewOptions) {
  if (jobs.get(interviewId)?.status === 'running') return;
  update(interviewId, { status: 'running', done: 0, total: 0, step: 'Getting ready…', error: undefined });
  run(interviewId, opts).catch(() => {});
}

function threadLines(th: TurnThread): ThreadLine[] {
  return [th.main, ...th.followUps].flatMap((t) => [
    { who: 'interviewer' as const, text: t.question },
    { who: 'candidate' as const, text: t.answer },
  ]);
}

/**
 * Before grading: transcribe answers that were only recorded, and re-check answers that the
 * fast laptop model transcribed with the most accurate engine available. Answers the user
 * edited by hand are never touched.
 */
async function transcriptionPass(id: string, turns: Turn[], topics: string[], ai: ResolvedAi, s: AiSettings, recheck: boolean) {
  const pending = turns.filter((t) => t.needsTranscript && t.audio.length);
  const toCheck = recheck ? turns.filter((t) => !t.needsTranscript && t.audio.length && t.transcriptSource === 'live') : [];
  if (!pending.length && !toCheck.length) return;
  const prompt = whisperPrompt(
    topics.map((t) => getTopic(t)?.title ?? t),
    vocabularyFor(topics),
  );
  update(id, { step: 'Connecting to speech-to-text…' });
  let engine: Transcriber | null = accurateTranscriber(ai, s.whisperAccurateUrl || null, prompt);
  if (engine?.source === 'accurate' && !(await whisperReachable(s.whisperAccurateUrl))) engine = null;
  const accurate = !!engine;
  // No accurate engine: recorded-only answers can still use the fast laptop model.
  if (!engine && pending.length && s.whisperUrl && (await whisperReachable(s.whisperUrl))) {
    const url = s.whisperUrl;
    engine = { label: 'laptop', source: 'live', transcribe: (uri) => transcribeFile({ baseUrl: url, uri, prompt, timeoutMs: 120_000 }) };
  }
  if (!engine) {
    if (pending.length) {
      const n = pending.length;
      throw new Error(`${n} recorded ${n === 1 ? 'answer still needs' : 'answers still need'} transcribing. Start start-whisper.cmd on the laptop, then try again.`);
    }
    return; // keep the fast transcripts
  }
  const work = [...pending, ...(accurate ? toCheck : [])];
  for (let i = 0; i < work.length; i++) {
    const t = work[i];
    update(id, { step: `Checking your answers for accuracy (${i + 1} of ${work.length})…` });
    try {
      const parts: string[] = [];
      for (const name of t.audio) {
        const uri = recordingUri(id, name);
        if (uri) parts.push(await engine.transcribe(uri));
      }
      const text = joinText(parts);
      // Keep the earlier transcript if the re-check heard nothing.
      if (text || t.needsTranscript) t.answer = text;
      t.needsTranscript = false;
      t.transcriptSource = engine.source;
      await saveTurn(t);
    } catch (e) {
      if (t.needsTranscript) throw e;
    }
  }
}

/** Try each model in order (own API first, then the laptop); return the first usable result. */
async function askChain<T>(
  targets: LlmTarget[],
  input: { prompt: ChatPrompt; schema: Record<string, unknown> },
  parse: (data: unknown, model: string) => T | null,
): Promise<{ value: T; model: string }> {
  let lastError = 'No AI is available. Start Ollama on the laptop or add an API key.';
  for (const target of targets) {
    const local = target.kind === 'ollama';
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const r = await llmJSON({
          target,
          prompt: input.prompt,
          schema: input.schema,
          timeoutMs: local ? 240_000 : 90_000,
          maxTokens: local ? 600 : 4000,
          temperature: 0.2,
          effort: 'medium',
        });
        const value = parse(r.data, target.model);
        if (value) return { value, model: target.model };
        lastError = 'The model could not produce usable feedback.';
      } catch (e) {
        lastError = e instanceof Error ? e.message : String(e);
        break; // a connection or key problem won't fix itself on retry: try the next target
      }
    }
  }
  throw new Error(lastError);
}

async function run(id: string, opts: ReviewOptions) {
  try {
    const interview = await getInterview(id);
    if (!interview) throw new Error('Interview not found.');
    const turns = await getTurns(id);
    const threads = groupThreads(turns);
    if (!threads.length) throw new Error('This interview has no questions to review.');
    update(id, { total: threads.length + 1, done: 0 });
    await updateInterview(id, { reviewStatus: 'running', reviewError: null });

    const ai = await resolveAi(opts.ai);
    await transcriptionPass(id, turns, interview.config.topics, ai, opts.ai, opts.accurateRecheck);
    if (!ai.review.length) throw new Error('No AI is available. Start Ollama on the laptop or add an API key in "Your own AI".');

    const { config, level } = interview;
    const reviews = new Map<number, AnswerReview>();
    for (let n = 0; n < threads.length; n++) {
      const th = threads[n];
      const isIntro = th.main.kind === 'intro';
      const label = isIntro ? 'your introduction' : `question ${threads.slice(0, n + 1).filter((t) => t.main.kind !== 'intro').length}`;
      update(id, { done: n, step: `Reviewing ${label} of ${threads.length}…` });
      if (th.main.review) {
        reviews.set(th.main.seq, th.main.review);
        continue;
      }
      let review: AnswerReview;
      if (!threadAnswered(th)) {
        review = { ...NO_ANSWER, model: 'none' };
      } else {
        const prompt = reviewPrompt({
          level,
          years: config.years,
          difficulty: config.difficulty,
          topic: getTopic(th.main.topicId ?? '')?.title ?? 'software engineering',
          isIntro,
          question: th.main.question,
          reference: th.main.reference ?? '',
          thread: threadLines(th),
        });
        review = (await askChain(ai.review, { prompt, schema: REVIEW_SCHEMA }, parseReview)).value;
      }
      await setTurnReview(th.main.id, review);
      reviews.set(th.main.seq, review);
    }

    update(id, { done: threads.length, step: 'Writing your overall feedback…' });
    // Technical questions decide the score; the introduction only counts if it is all there is.
    const technical = threads.filter((t) => t.main.kind !== 'intro');
    const scored = (technical.length ? technical : threads).map((t) => reviews.get(t.main.seq)!.score);
    const score = scoreToPercent(scored.reduce((a, b) => a + b, 0) / scored.length);
    const items = threads.map((t) => {
      const r = reviews.get(t.main.seq)!;
      return { question: t.main.question, score: r.score, summary: r.summary, gaps: r.gaps };
    });
    let debrief: ReturnType<typeof parseOverall> = null;
    let debriefModel = ai.review[0].model;
    try {
      const prompt = overallPrompt({
        level,
        years: config.years,
        difficulty: config.difficulty,
        topics: config.topics.map((t) => getTopic(t)?.title ?? t),
        score,
        items,
      });
      const r = await askChain(ai.review, { prompt, schema: OVERALL_SCHEMA }, (d) => parseOverall(d));
      debrief = r.value;
      debriefModel = r.model;
    } catch {}
    const worst = [...items].sort((a, b) => a.score - b.score)[0];
    const fallbackSummary = `You scored ${score}/100. Start with the questions you scored lowest on, such as: "${worst?.question ?? ''}".`;
    const overall: OverallReview = {
      score,
      hire: hireSignal(score),
      summary: debrief?.summary ?? fallbackSummary,
      strengths: debrief?.strengths ?? [],
      improve: debrief?.improve ?? items.filter((i) => i.score <= 3).flatMap((i) => i.gaps).slice(0, 4),
      model: debriefModel,
      at: Date.now(),
    };
    await updateInterview(id, { reviewStatus: 'done', reviewError: null, review: overall });
    update(id, { status: 'done', done: threads.length + 1, step: '' });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await updateInterview(id, { reviewStatus: 'error', reviewError: message }).catch(() => {});
    update(id, { status: 'error', error: message, step: '' });
  }
}
