/**
 * Runs user JavaScript on device with a console shim, a loop guard (so an
 * accidental infinite loop can't freeze the app) and optional test cases.
 */
export type LogLine = { level: 'log' | 'warn' | 'error' | 'info'; text: string };
export type TestResult = { input: string; expected: string; actual: string; pass: boolean; error?: string };
export type JsRunResult = { logs: LogLine[]; error?: string; tests?: TestResult[]; ms: number };

const MAX_ITERATIONS = 2_000_000;
const MAX_MS = 3000;

export function format(v: unknown, depth = 0): string {
  if (typeof v === 'string') return depth ? JSON.stringify(v) : v;
  if (v === undefined) return 'undefined';
  if (typeof v === 'function') return `[Function ${v.name || 'anonymous'}]`;
  if (typeof v === 'bigint') return `${v}n`;
  if (v instanceof Error) return `${v.name}: ${v.message}`;
  if (v instanceof Map) return `Map(${v.size}) {${[...v].map(([k, x]) => `${format(k, 1)} => ${format(x, 1)}`).join(', ')}}`;
  if (v instanceof Set) return `Set(${v.size}) {${[...v].map((x) => format(x, 1)).join(', ')}}`;
  if (Array.isArray(v)) return depth > 3 ? '[Array]' : `[${v.map((x) => format(x, depth + 1)).join(', ')}]`;
  if (v && typeof v === 'object') {
    if (depth > 3) return '[Object]';
    try {
      return `{ ${Object.entries(v as object)
        .map(([k, x]) => `${k}: ${format(x, depth + 1)}`)
        .join(', ')} }`;
    } catch {
      return String(v);
    }
  }
  return String(v);
}

/** Insert a guard call at the start of every for/while/do loop body. */
export function instrumentLoops(code: string) {
  let out = '';
  let i = 0;
  const n = code.length;
  const isId = (c: string) => /[A-Za-z0-9_$]/.test(c);
  while (i < n) {
    const ch = code[i];
    // Skip strings, template literals and comments
    if (ch === '"' || ch === "'" || ch === '`') {
      const q = ch;
      let j = i + 1;
      while (j < n && code[j] !== q) j += code[j] === '\\' ? 2 : 1;
      out += code.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if (ch === '/' && code[i + 1] === '/') {
      const j = code.indexOf('\n', i);
      const end = j === -1 ? n : j;
      out += code.slice(i, end);
      i = end;
      continue;
    }
    if (ch === '/' && code[i + 1] === '*') {
      const j = code.indexOf('*/', i + 2);
      const end = j === -1 ? n : j + 2;
      out += code.slice(i, end);
      i = end;
      continue;
    }
    const prev = code[i - 1] ?? ' ';
    const kw = code.startsWith('for', i) && !isId(prev) && !isId(code[i + 3] ?? ' ') ? 'for' : code.startsWith('while', i) && !isId(prev) && !isId(code[i + 5] ?? ' ') ? 'while' : code.startsWith('do', i) && !isId(prev) && !isId(code[i + 2] ?? ' ') ? 'do' : null;
    if (kw) {
      let j = i + kw.length;
      if (kw !== 'do') {
        while (j < n && /\s/.test(code[j])) j++;
        if (code[j] !== '(') {
          out += code.slice(i, j);
          i = j;
          continue;
        }
        let depth = 0;
        for (; j < n; j++) {
          if (code[j] === '(') depth++;
          else if (code[j] === ')' && --depth === 0) {
            j++;
            break;
          }
        }
      }
      let k = j;
      while (k < n && /\s/.test(code[k])) k++;
      if (code[k] === '{') {
        out += code.slice(i, k + 1) + '__guard();';
        i = k + 1;
        continue;
      }
      out += code.slice(i, j);
      i = j;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

const deepEqual = (a: unknown, b: unknown): boolean => {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b || !a || !b || typeof a !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a as object);
  const kb = Object.keys(b as object);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => deepEqual((a as any)[k], (b as any)[k]));
};

export function runJs(code: string, opts: { testCases?: { input: unknown[]; expected: unknown }[]; fnName?: string } = {}): JsRunResult {
  const logs: LogLine[] = [];
  const push = (level: LogLine['level']) => (...args: unknown[]) => {
    if (logs.length < 500) logs.push({ level, text: args.map((a) => format(a)).join(' ') });
  };
  const shim = { log: push('log'), info: push('info'), warn: push('warn'), error: push('error'), table: push('log'), debug: push('log') };
  let iterations = 0;
  const started = Date.now();
  const guard = () => {
    if (++iterations > MAX_ITERATIONS || (iterations % 10000 === 0 && Date.now() - started > MAX_MS)) {
      throw new Error('Execution stopped: possible infinite loop (time or iteration limit reached).');
    }
  };
  const fnName = opts.fnName;
  const body = `"use strict";\n${instrumentLoops(code)}\n;return ${fnName ? `typeof ${fnName} === "function" ? ${fnName} : undefined` : 'undefined'};`;
  try {
    const factory = new Function('console', '__guard', body);
    const fn = factory(shim, guard);
    let tests: TestResult[] | undefined;
    if (opts.testCases?.length && typeof fn === 'function') {
      tests = opts.testCases.map((tc) => {
        iterations = 0;
        const input = tc.input.map((x) => format(x, 1)).join(', ');
        const expected = format(tc.expected, 1);
        try {
          const clone = JSON.parse(JSON.stringify(tc.input));
          const returned = fn(...clone);
          // In-place algorithms (e.g. reverse an array) return nothing: check the mutated input.
          const actualVal = returned === undefined && clone.length ? clone[0] : returned;
          return { input, expected, actual: format(actualVal, 1), pass: deepEqual(actualVal, tc.expected) };
        } catch (e) {
          return { input, expected, actual: '—', pass: false, error: (e as Error).message };
        }
      });
    } else if (opts.testCases?.length && fnName) {
      tests = [{ input: '', expected: '', actual: '', pass: false, error: `Function "${fnName}" was not found. Keep the original function name.` }];
    }
    return { logs, tests, ms: Date.now() - started };
  } catch (e) {
    return { logs, error: (e as Error)?.message ?? String(e), ms: Date.now() - started };
  }
}

/** Find the primary function name in starter code. */
export function detectFunctionName(starter: string) {
  return starter.match(/function\s+([A-Za-z_$][\w$]*)\s*\(/)?.[1] ?? starter.match(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/)?.[1];
}
