/**
 * On-device storage for mock interviews (SQLite). Audio lives in files (see files.ts);
 * the database keeps the text, structure and file names. Every turn is written as soon
 * as it happens, so a crash or a killed app never loses an answer.
 */
import * as SQLite from 'expo-sqlite';

import type { AnswerReview, Interview, InterviewConfig, InterviewLevel, OverallReview, ReviewStatus, TranscriptSource, Turn, TurnKind, Verdict } from './types';

const SCHEMA_VERSION = 3;

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function open() {
  const db = await SQLite.openDatabaseAsync('interview-nerd-interviews.db');
  await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const version = row?.user_version ?? 0;
  if (version < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS interviews (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        started_at INTEGER,
        ended_at INTEGER,
        config TEXT NOT NULL,
        level TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'in_progress',
        elapsed_sec INTEGER NOT NULL DEFAULT 0,
        review_status TEXT NOT NULL DEFAULT 'none',
        review_error TEXT,
        review TEXT
      );
      CREATE INDEX IF NOT EXISTS interviews_user ON interviews (user_id, created_at DESC);
      CREATE TABLE IF NOT EXISTS turns (
        id TEXT PRIMARY KEY NOT NULL,
        interview_id TEXT NOT NULL REFERENCES interviews (id) ON DELETE CASCADE,
        seq INTEGER NOT NULL,
        kind TEXT NOT NULL,
        parent_seq INTEGER,
        topic_id TEXT,
        question TEXT NOT NULL,
        reference TEXT,
        source_key TEXT,
        answer TEXT NOT NULL DEFAULT '',
        audio TEXT NOT NULL DEFAULT '[]',
        asked_at INTEGER NOT NULL,
        answer_ms INTEGER NOT NULL DEFAULT 0,
        skipped INTEGER NOT NULL DEFAULT 0,
        live_verdict TEXT,
        review TEXT,
        UNIQUE (interview_id, seq)
      );
      CREATE INDEX IF NOT EXISTS turns_interview ON turns (interview_id, seq);
      PRAGMA user_version = 1;
    `);
  }
  if (version < 2) {
    await db.execAsync(`
      ALTER TABLE turns ADD COLUMN needs_transcript INTEGER NOT NULL DEFAULT 0;
      PRAGMA user_version = 2;
    `);
  }
  if (version < 3) {
    await db.execAsync(`
      ALTER TABLE turns ADD COLUMN transcript_source TEXT NOT NULL DEFAULT 'live';
      PRAGMA user_version = ${SCHEMA_VERSION};
    `);
  }
  return db;
}

export function getDb() {
  dbPromise ??= open().catch((e) => {
    dbPromise = null;
    throw e;
  });
  return dbPromise;
}

const parse = <T,>(s: string | null | undefined, fallback: T): T => {
  if (!s) return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
};

type InterviewRow = {
  id: string;
  user_id: string;
  created_at: number;
  started_at: number | null;
  ended_at: number | null;
  config: string;
  level: string;
  status: string;
  elapsed_sec: number;
  review_status: string;
  review_error: string | null;
  review: string | null;
};

type TurnRow = {
  id: string;
  interview_id: string;
  seq: number;
  kind: string;
  parent_seq: number | null;
  topic_id: string | null;
  question: string;
  reference: string | null;
  source_key: string | null;
  answer: string;
  audio: string;
  needs_transcript: number;
  transcript_source: string;
  asked_at: number;
  answer_ms: number;
  skipped: number;
  live_verdict: string | null;
  review: string | null;
};

const toInterview = (r: InterviewRow): Interview => ({
  id: r.id,
  userId: r.user_id,
  createdAt: r.created_at,
  startedAt: r.started_at,
  endedAt: r.ended_at,
  config: parse<InterviewConfig>(r.config, { years: 0, topics: [], difficulty: 'medium', minutes: 10, mode: 'offline', intro: false, audioOnly: false }),
  level: r.level as InterviewLevel,
  status: r.status === 'completed' ? 'completed' : 'in_progress',
  elapsedSec: r.elapsed_sec,
  reviewStatus: r.review_status as ReviewStatus,
  reviewError: r.review_error,
  review: parse<OverallReview | null>(r.review, null),
});

const toTurn = (r: TurnRow): Turn => ({
  id: r.id,
  interviewId: r.interview_id,
  seq: r.seq,
  kind: r.kind as TurnKind,
  parentSeq: r.parent_seq,
  topicId: r.topic_id,
  question: r.question,
  reference: r.reference,
  sourceKey: r.source_key,
  answer: r.answer,
  audio: parse<string[]>(r.audio, []),
  needsTranscript: !!r.needs_transcript,
  transcriptSource: (r.transcript_source || 'live') as TranscriptSource,
  askedAt: r.asked_at,
  answerMs: r.answer_ms,
  skipped: !!r.skipped,
  liveVerdict: (r.live_verdict as Verdict | null) ?? null,
  review: parse<AnswerReview | null>(r.review, null),
});

export async function createInterview(i: Interview) {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO interviews (id, user_id, created_at, started_at, ended_at, config, level, status, elapsed_sec, review_status, review_error, review)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [i.id, i.userId, i.createdAt, i.startedAt, i.endedAt, JSON.stringify(i.config), i.level, i.status, i.elapsedSec, i.reviewStatus, i.reviewError, i.review ? JSON.stringify(i.review) : null],
  );
}

export async function updateInterview(
  id: string,
  patch: Partial<Pick<Interview, 'startedAt' | 'endedAt' | 'status' | 'elapsedSec' | 'reviewStatus' | 'reviewError' | 'review'>>,
) {
  const cols: string[] = [];
  const vals: SQLite.SQLiteBindValue[] = [];
  const set = (col: string, v: SQLite.SQLiteBindValue) => {
    cols.push(`${col} = ?`);
    vals.push(v);
  };
  if ('startedAt' in patch) set('started_at', patch.startedAt ?? null);
  if ('endedAt' in patch) set('ended_at', patch.endedAt ?? null);
  if (patch.status) set('status', patch.status);
  if (patch.elapsedSec != null) set('elapsed_sec', Math.round(patch.elapsedSec));
  if (patch.reviewStatus) set('review_status', patch.reviewStatus);
  if ('reviewError' in patch) set('review_error', patch.reviewError ?? null);
  if ('review' in patch) set('review', patch.review ? JSON.stringify(patch.review) : null);
  if (!cols.length) return;
  const db = await getDb();
  await db.runAsync(`UPDATE interviews SET ${cols.join(', ')} WHERE id = ?`, [...vals, id]);
}

export async function getInterview(id: string): Promise<Interview | null> {
  const db = await getDb();
  const r = await db.getFirstAsync<InterviewRow>('SELECT * FROM interviews WHERE id = ?', [id]);
  return r ? toInterview(r) : null;
}

export type InterviewSummary = Interview & { questions: number; answered: number };

export async function listInterviews(userId: string): Promise<InterviewSummary[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<InterviewRow & { questions: number; answered: number }>(
    `SELECT i.*,
       (SELECT COUNT(*) FROM turns t WHERE t.interview_id = i.id AND t.kind != 'follow_up') AS questions,
       (SELECT COUNT(*) FROM turns t WHERE t.interview_id = i.id AND t.answer != '') AS answered
     FROM interviews i WHERE i.user_id = ? ORDER BY i.created_at DESC`,
    [userId],
  );
  return rows.map((r) => ({ ...toInterview(r), questions: r.questions, answered: r.answered }));
}

export async function deleteInterviewRow(id: string) {
  const db = await getDb();
  await db.runAsync('DELETE FROM interviews WHERE id = ?', [id]);
}

/** Insert or update a turn (keyed by id). */
export async function saveTurn(t: Turn) {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO turns (id, interview_id, seq, kind, parent_seq, topic_id, question, reference, source_key, answer, audio, needs_transcript, transcript_source, asked_at, answer_ms, skipped, live_verdict, review)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (id) DO UPDATE SET
       question = excluded.question, answer = excluded.answer, audio = excluded.audio, needs_transcript = excluded.needs_transcript, transcript_source = excluded.transcript_source, answer_ms = excluded.answer_ms,
       skipped = excluded.skipped, live_verdict = excluded.live_verdict, review = excluded.review`,
    [
      t.id,
      t.interviewId,
      t.seq,
      t.kind,
      t.parentSeq,
      t.topicId,
      t.question,
      t.reference,
      t.sourceKey,
      t.answer,
      JSON.stringify(t.audio),
      t.needsTranscript ? 1 : 0,
      t.transcriptSource,
      t.askedAt,
      Math.round(t.answerMs),
      t.skipped ? 1 : 0,
      t.liveVerdict,
      t.review ? JSON.stringify(t.review) : null,
    ],
  );
}

export async function setTurnReview(turnId: string, review: AnswerReview | null) {
  const db = await getDb();
  await db.runAsync('UPDATE turns SET review = ? WHERE id = ?', [review ? JSON.stringify(review) : null, turnId]);
}

export async function getTurns(interviewId: string): Promise<Turn[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<TurnRow>('SELECT * FROM turns WHERE interview_id = ? ORDER BY seq', [interviewId]);
  return rows.map(toTurn);
}

/** Question-bank keys asked to this user recently, so new interviews prefer fresh questions. */
export async function recentSourceKeys(userId: string, limit = 300): Promise<Set<string>> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ source_key: string }>(
    `SELECT t.source_key FROM turns t JOIN interviews i ON i.id = t.interview_id
     WHERE i.user_id = ? AND t.source_key IS NOT NULL ORDER BY t.asked_at DESC LIMIT ?`,
    [userId, limit],
  );
  return new Set(rows.map((r) => r.source_key));
}
