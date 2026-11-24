// @ts-ignore - plain JS port of the web app's executor
import MongoExecutor from './mongo-executor';

/** Revive `{ $date: iso }` markers (emitted by the content build) into Dates. */
function revive(v: any): any {
  if (Array.isArray(v)) return v.map(revive);
  if (v && typeof v === 'object') {
    if (typeof v.$date === 'string' && Object.keys(v).length === 1) return new Date(v.$date);
    const out: Record<string, unknown> = {};
    for (const k in v) out[k] = revive(v[k]);
    return out;
  }
  return v;
}

const clean = (query: string) =>
  query
    .replace(/\s*([{}[\](),:$])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/;$/, '');

export type MongoResult = { success: boolean; result?: unknown; error?: string };

const WRITE_RE = /\.(insertOne|insertMany|updateOne|updateMany|replaceOne|deleteOne|deleteMany)\s*\(/;

function cloneDeep(v: any): any {
  if (v instanceof Date) return new Date(v.getTime());
  if (Array.isArray(v)) return v.map(cloneDeep);
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const k in v) out[k] = cloneDeep(v[k]);
    return out;
  }
  return v;
}

export function createMongoRunner(datasets: Record<string, any>) {
  const revived = revive(datasets);
  const exec = new MongoExecutor(revived);
  const run = (dataset: string, query: string): MongoResult => {
    // Writes run against a fresh copy so the sample data never changes.
    if (WRITE_RE.test(query) && revived[dataset]) {
      return new MongoExecutor({ [dataset]: cloneDeep(revived[dataset]) }).executeQuery(dataset, clean(query));
    }
    return exec.executeQuery(dataset, clean(query));
  };

  const normalize = (r: unknown) => {
    const sortKeys = (o: any): any => {
      if (o === null || typeof o !== 'object' || o instanceof Date) return o;
      if (Array.isArray(o)) return o.map(sortKeys);
      return Object.keys(o)
        .sort()
        .reduce((acc: any, k) => ((acc[k] = sortKeys(o[k])), acc), {});
    };
    if (Array.isArray(r)) return JSON.stringify(r.map(sortKeys).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))));
    return JSON.stringify(sortKeys(r));
  };

  return {
    run,
    check(dataset: string, userQuery: string, solution: string) {
      const user = run(dataset, userQuery);
      const expected = run(dataset, solution);
      const pass = !!(user.success && expected.success && normalize(user.result) === normalize(expected.result));
      return { pass, user, expected };
    },
    collections(dataset: string) {
      const ds = datasets[dataset];
      return ds ? Object.entries(ds.collections as Record<string, unknown[]>).map(([name, docs]) => ({ name, count: docs.length })) : [];
    },
  };
}
