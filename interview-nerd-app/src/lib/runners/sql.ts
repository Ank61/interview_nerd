import * as SQLite from 'expo-sqlite';

/**
 * Real SQL execution on device with SQLite. Each run reloads the dataset so
 * practice queries (including UPDATE/DELETE) never corrupt it.
 */
type Table = { columns: string[]; data: unknown[][] };
export type Dataset = { description?: string; tables: Record<string, Table> };
export type SqlResult = { columns: string[]; rows: unknown[][]; changes?: number; ms: number };

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;
const getDb = () => (dbPromise ??= SQLite.openDatabaseAsync('interview-nerd-sql-lab.db'));

let queue: Promise<unknown> = Promise.resolve();
/** Serialise operations: the dataset reload + query must not interleave. */
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

const q = (name: string) => `"${name.replace(/"/g, '""')}"`;

async function loadDataset(db: SQLite.SQLiteDatabase, ds: Dataset) {
  const existing = await db.getAllAsync<{ name: string; type: string }>(
    "SELECT name, type FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%'",
  );
  await db.withTransactionAsync(async () => {
    for (const t of existing) await db.execAsync(`DROP ${t.type === 'view' ? 'VIEW' : 'TABLE'} IF EXISTS ${q(t.name)}`);
    for (const [name, table] of Object.entries(ds.tables)) {
      await db.execAsync(`CREATE TABLE ${q(name)} (${table.columns.map(q).join(', ')})`);
      if (!table.data.length) continue;
      const stmt = await db.prepareAsync(`INSERT INTO ${q(name)} VALUES (${table.columns.map(() => '?').join(', ')})`);
      try {
        for (const row of table.data) {
          await stmt.executeAsync(row.map((v) => (v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : (v as SQLite.SQLiteBindValue))));
        }
      } finally {
        await stmt.finalizeAsync();
      }
    }
  });
}

function splitStatements(sql: string) {
  const out: string[] = [];
  let cur = '';
  let quote: string | null = null;
  for (let i = 0; i < sql.length; i++) {
    const c = sql[i];
    if (quote) {
      cur += c;
      if (c === quote) quote = null;
    } else if (c === "'" || c === '"') {
      quote = c;
      cur += c;
    } else if (c === '-' && sql[i + 1] === '-') {
      const j = sql.indexOf('\n', i);
      i = j === -1 ? sql.length : j;
      cur += '\n';
    } else if (c === ';') {
      if (cur.trim()) out.push(cur.trim());
      cur = '';
    } else cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

async function runOn(db: SQLite.SQLiteDatabase, sql: string): Promise<SqlResult> {
  const started = Date.now();
  const statements = splitStatements(sql);
  if (!statements.length) throw new Error('Write a query first.');
  let last: SqlResult = { columns: [], rows: [], ms: 0 };
  let changes = 0;
  for (const s of statements) {
    if (/^\s*(select|with|pragma|explain|values)\b/i.test(s)) {
      const rows = await db.getAllAsync<Record<string, unknown>>(s);
      const columns = rows.length ? Object.keys(rows[0]) : [];
      last = { columns, rows: rows.map((r) => columns.map((c) => r[c])), ms: 0 };
    } else {
      const r = await db.runAsync(s);
      changes += r.changes;
      last = { columns: [], rows: [], changes, ms: 0 };
    }
  }
  return { ...last, ms: Date.now() - started };
}

export function runSql(ds: Dataset, sql: string) {
  return serial(async () => {
    const db = await getDb();
    await loadDataset(db, ds);
    return runOn(db, sql);
  });
}

/** Run the user's query and the reference query; compare result sets. */
export async function checkSql(ds: Dataset, userSql: string, expectedSql: string) {
  const user = await runSql(ds, userSql);
  const expected = await runSql(ds, expectedSql);
  const ordered = /order\s+by/i.test(expectedSql);
  const norm = (r: SqlResult) => {
    const rows = r.rows.map((row) => JSON.stringify(row.map((v) => (typeof v === 'number' ? Math.round(v * 1000) / 1000 : v))));
    return ordered ? rows : rows.sort();
  };
  const a = norm(user);
  const b = norm(expected);
  const pass = a.length === b.length && a.every((x, i) => x === b[i]);
  return { pass, user, expected };
}

export function tableSummary(ds: Dataset) {
  return Object.entries(ds.tables).map(([name, t]) => ({ name, columns: t.columns, rows: t.data.length }));
}
