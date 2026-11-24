/** Shared types for the mock interview feature. Pure types only (no runtime imports). */

export type Difficulty = 'easy' | 'medium' | 'hard';
export type InterviewLevel = 'Junior' | 'Mid' | 'Senior';
/** `ai`: a local LLM (Ollama) judges answers and asks follow-ups. `offline`: question bank + scripted follow-ups. */
export type InterviewMode = 'ai' | 'offline';
export type TurnKind = 'intro' | 'question' | 'follow_up';
export type Verdict = 'strong' | 'partial' | 'weak' | 'wrong' | 'no_answer';
/** Who produced an answer's text: phone recognizer, fast laptop Whisper, cloud, accurate re-check, or the user. */
export type TranscriptSource = 'phone' | 'live' | 'cloud' | 'accurate' | 'edited';

export type InterviewConfig = {
  years: number;
  /** Topic ids from the catalog. */
  topics: string[];
  difficulty: Difficulty;
  minutes: number;
  mode: InterviewMode;
  /** Open with "Tell me about yourself". */
  intro: boolean;
  /** Hide the question text so it feels like a voice call. */
  audioOnly: boolean;
};

export type InterviewStatus = 'in_progress' | 'completed';
export type ReviewStatus = 'none' | 'running' | 'done' | 'error';
export type HireSignal = 'strong_hire' | 'hire' | 'lean_hire' | 'lean_no_hire' | 'no_hire';

export type AnswerReview = {
  /** 1 (wrong / no answer) .. 5 (complete and precise). */
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  tip: string;
  model: string;
};

export type OverallReview = {
  /** 0..100, derived from the per-question scores. */
  score: number;
  hire: HireSignal;
  summary: string;
  strengths: string[];
  improve: string[];
  model: string;
  at: number;
};

export type Interview = {
  id: string;
  userId: string;
  createdAt: number;
  startedAt: number | null;
  endedAt: number | null;
  config: InterviewConfig;
  level: InterviewLevel;
  status: InterviewStatus;
  /** Seconds the interview actually ran. */
  elapsedSec: number;
  reviewStatus: ReviewStatus;
  reviewError: string | null;
  review: OverallReview | null;
};

export type Turn = {
  id: string;
  interviewId: string;
  seq: number;
  kind: TurnKind;
  /** For follow-ups: seq of the main question (or intro) this thread belongs to. */
  parentSeq: number | null;
  topicId: string | null;
  question: string;
  /** Plain-text reference answer from the question bank (main questions only). */
  reference: string | null;
  /** `${topicId}|${setIndex}|${itemIndex}` for linking to the model answer. */
  sourceKey: string | null;
  answer: string;
  /** Recording file names inside the interview folder (one per recognition session). */
  audio: string[];
  /** Audio was saved but not transcribed yet (laptop speech-to-text was unreachable). */
  needsTranscript: boolean;
  transcriptSource: TranscriptSource;
  askedAt: number;
  answerMs: number;
  skipped: boolean;
  /** The live interviewer's private judgement (AI mode only). */
  liveVerdict: Verdict | null;
  /** Post-interview grading, stored on the thread's main turn. */
  review: AnswerReview | null;
};

export type LiveDecision = { verdict: Verdict; action: 'follow_up' | 'next'; say: string };
