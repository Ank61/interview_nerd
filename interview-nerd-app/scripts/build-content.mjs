/**
 * Builds the offline content bundle for the mobile app from the web app's
 * data/ folder (../data by default).
 *
 *   node scripts/build-content.mjs [path/to/web/data]
 *
 * Output
 *   assets/content/**.txt          lazily-loaded JSON payloads (one per concept,
 *                                  per interview set, per MCQ category, per lab)
 *   src/data/generated/catalog.json  small index rendered by list screens
 *   src/data/generated/assets.ts     static require() map for the payloads
 *
 * Everything is pre-processed here so the phone does no heavy work:
 *   - markdown answers -> HTML
 *   - code blocks      -> syntax-highlighted HTML (highlight.js)
 *   - inline colors / backgrounds stripped so the app theme controls them
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";
import hljs from "highlight.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(__dirname, "..");
const SRC = path.resolve(process.argv[2] || path.join(APP, "..", "data"));
const OUT_ASSETS = path.join(APP, "assets", "content");
const OUT_GEN = path.join(APP, "src", "data", "generated");

// ---------------------------------------------------------------------------
// Load the web data files as ES modules (the web package is CommonJS-typed,
// so copy them into a temp folder marked "type": "module").
// ---------------------------------------------------------------------------
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "in-content-"));
fs.cpSync(SRC, TMP, { recursive: true });
fs.writeFileSync(path.join(TMP, "package.json"), '{"type":"module"}');
const awsIndex = path.join(TMP, "awsServices.js");
fs.writeFileSync(
  awsIndex,
  fs
    .readFileSync(awsIndex, "utf8")
    .replace(/["']@\/data\/aws\/([A-Za-z0-9]+)["']/g, '"./aws/$1.js"'),
);
const imp = (f) => import(pathToFileURL(path.join(TMP, f)).href);

const { interviewData } = await imp("interviewData.js");
const { prepareData } = await imp("prepareData.js");
const { linuxPrepareData } = await imp("linuxPrepareData.js");
const { awsPrepareData } = await imp("awsPrepareData.js");
const { awsServices, awsServiceCategories } = await imp("awsServices.js");
const mcqModule = await imp("mcqDatasets.js");
const { snippetsData } = await imp("snippetsData.js");
const { resourceSheets, sheetContent } = await imp("resourceSheets.js");
const { componentTopicsData } = await imp("componentTopicsData.js");
const { dockerConcepts, dockerExercises } = await imp("dockerData.js");
const { goConcepts, goExercises } = await imp("goData.js");
const { linuxConcepts } = await imp("linuxData.js");
const { pythonQuestions, pythonConcepts } = await imp("pythonDatasets.js");
const { sqlDatasets, sqlQuestions } = await imp("sqlDatasets.js");
const { mongoDatasets, mongoQuestions } = await imp("mongoDatasets.js");
const { playgroundQuestions } = await imp("playgroundQuestions.js");

// Clear previous output (contents only, so an open folder on Windows doesn't block it).
fs.mkdirSync(OUT_ASSETS, { recursive: true });
for (const entry of fs.readdirSync(OUT_ASSETS)) fs.rmSync(path.join(OUT_ASSETS, entry), { recursive: true, force: true });
fs.mkdirSync(OUT_GEN, { recursive: true });

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------
const LANG_ALIAS = {
  js: "javascript", jsx: "javascript", mjs: "javascript", node: "javascript",
  mongo: "javascript", mongodb: "javascript", ts: "typescript", tsx: "typescript",
  sh: "bash", shell: "bash", zsh: "bash", console: "bash", terminal: "bash",
  html: "xml", jsx_html: "xml", golang: "go", docker: "dockerfile",
  yml: "yaml", py: "python", text: "plaintext", txt: "plaintext",
  postgres: "sql", postgresql: "sql", mysql: "sql", psql: "sql",
};
const AUTO_LANGS = [
  "javascript", "typescript", "python", "go", "bash", "sql", "json",
  "yaml", "dockerfile", "java", "xml", "css",
];

// Short class codes for highlight.js tokens (mirrored in src/lib/html.ts)
const HL = {
  keyword: "k", built_in: "b", type: "t", literal: "l", number: "n", string: "s",
  regexp: "r", comment: "c", doctag: "c", meta: "m", title: "f", params: "p",
  attr: "a", attribute: "a", variable: "v", property: "v", symbol: "y", selector: "e",
  "selector-tag": "e", "selector-class": "e", "selector-id": "e", tag: "g", name: "g",
  subst: "u", operator: "o", punctuation: "x", section: "h", bullet: "y", link: "s",
  addition: "ad", deletion: "de", emphasis: "em", strong: "st", quote: "c", "template-variable": "v",
  "template-tag": "k", code: "s", formula: "s", "meta-keyword": "k", "meta-string": "s", "char": "s",
};

const decode = (s) =>
  s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function dedent(code) {
  const lines = code.replace(/\t/g, "  ").replace(/\r/g, "").split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indents = lines
    .filter((l) => l.trim())
    .map((l) => l.match(/^ */)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join("\n");
}

function normLang(lang) {
  if (!lang) return undefined;
  const l = String(lang).toLowerCase().trim();
  const n = LANG_ALIAS[l] || l;
  return hljs.getLanguage(n) ? n : undefined;
}

/** Highlight a code string and wrap it in the app's code-block markup. */
function codeBlock(rawCode, lang) {
  const code = dedent(rawCode);
  if (!code.trim()) return "";
  let language = normLang(lang);
  let html;
  try {
    if (language) {
      html = hljs.highlight(code, { language, ignoreIllegals: true }).value;
    } else {
      const r = hljs.highlightAuto(code, AUTO_LANGS);
      html = r.value;
      language = r.language;
    }
  } catch {
    html = escapeHtml(code);
  }
  // Compact markup: <span class="hljs-keyword"> -> <i class=k> (CSS maps them back)
  html = html
    .replace(/<span class="hljs-([\w-]+)[^"]*">/g, (_, c) => `<i class=${HL[c] || c}>`)
    .replace(/<\/span>/g, "</i>");
  const label = language && language !== "plaintext" ? language : "code";
  return `<div class="code"><div class="code-head"><span>${label}</span><button class="copy" type="button">Copy</button></div><pre><code class="hljs">${html}</code></pre></div>`;
}

const STRIP_STYLE = /^(color|background|background-color|background-image|font-family|box-shadow|text-shadow)$/i;

/** Clean authored HTML so it renders well in both themes. */
function sanitizeHtml(input) {
  if (!input || typeof input !== "string") return "";
  let html = input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    // Any remaining openers are prose mentions (e.g. "`<style jsx>`"): show as text.
    .replace(/<(\/?)(script|style|title|textarea|iframe|noscript|xmp|template)\b/gi, "&lt;$1$2")
    .replace(/\sclassName=/g, " class=")
    .replace(/\son[a-z]+="[^"]*"/gi, "");

  // Code blocks -> highlighted, parked in placeholders while prose is tidied
  const blocks = [];
  const park = (block) => `@@CODE${blocks.push(block) - 1}@@`;
  html = html.replace(
    /<pre\b[^>]*>\s*<code\b([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, attrs, body) => {
      const m = attrs.match(/language-([\w+#-]+)/);
      return park(codeBlock(decode(body), m && m[1]));
    },
  );
  // <pre> without <code> (skip blocks produced above)
  html = html.replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, (all, body) => {
    return park(codeBlock(decode(body.replace(/<\/?(span|code|strong|b|em)[^>]*>/gi, ""))));
  });
  // Collapse template-string indentation in prose
  html = html.replace(/[ \t]*\n[ \t\n]*/g, "\n").replace(/[ \t]{2,}/g, " ");

  // Strip theme-breaking inline style declarations
  html = html.replace(/\sstyle="([^"]*)"/gi, (_, decls) => {
    const kept = decls
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .filter((d) => {
        const prop = d.split(":")[0].trim();
        return !STRIP_STYLE.test(prop);
      });
    const hadBox = /background|border(-left|-top)?\s*:/i.test(decls);
    const cls = hadBox ? ' data-box="1"' : "";
    return kept.length ? ` style="${kept.join("; ")}"${cls}` : cls;
  });
  html = html.replace(/@@CODE(\d+)@@/g, (_, i) => blocks[Number(i)]);
  return html.trim();
}

const SAFE_TAGS = new Set([
  "p", "br", "strong", "em", "b", "i", "u", "ul", "ol", "li", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6",
  "table", "thead", "tbody", "tr", "td", "th", "a", "blockquote", "hr", "span", "div", "sup", "sub", "img", "kbd", "mark",
]);
/**
 * Markdown prose often mentions tags literally ("<script async> downloads…").
 * Escape anything that isn't a formatting tag so the WebView shows it as text
 * instead of parsing it (a stray <script> would swallow the rest of the answer).
 * Inline `code` spans are left alone; marked escapes those itself.
 */
function escapeStrayTags(line) {
  return line
    .split(/(`[^`]*`)/)
    .map((seg, i) =>
      i % 2
        ? seg
        : seg.replace(/<(\/?)([A-Za-z][\w.-]*)([^<>]*)>/g, (all, slash, tag) =>
            SAFE_TAGS.has(tag.toLowerCase()) ? all : `&lt;${slash}${tag}${all.slice(1 + slash.length + tag.length, -1)}&gt;`,
          ),
    )
    .join("");
}

/** Interview answers are markdown written inside indented template strings. */
function markdownToHtml(src) {
  if (!src || typeof src !== "string") return "";
  // Strip accidental indentation outside fenced code blocks so marked does
  // not turn ordinary prose into indented code blocks.
  let inFence = false;
  const lines = src.replace(/\r/g, "").split("\n").map((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return line.trimStart();
    }
    return inFence ? line : escapeStrayTags(line.replace(/^[ \t]+/, ""));
  });
  const md = lines.join("\n");
  return sanitizeHtml(marked.parse(md, { gfm: true, breaks: true, async: false }));
}

const looksHtml = (s) => /<\/?(p|div|ul|ol|li|h[1-6]|pre|code|strong|table|br|span|em|b)\b/i.test(s);
const richText = (s) => (looksHtml(s) ? sanitizeHtml(s) : markdownToHtml(s));

// ---------------------------------------------------------------------------
// Asset writer
// ---------------------------------------------------------------------------
const assetMap = {};
let bytes = 0;
function writeAsset(key, data) {
  const file = key.replace(/[^a-zA-Z0-9/_-]/g, "_") + ".txt";
  const full = path.join(OUT_ASSETS, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  const json = JSON.stringify(data);
  bytes += json.length;
  fs.writeFileSync(full, json);
  assetMap[key] = `../../../assets/content/${file}`;
  return key;
}

const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ---------------------------------------------------------------------------
// Topic metadata
// ---------------------------------------------------------------------------
const META = {
  Javascript: { title: "JavaScript", group: "Languages", logo: "js", color: "#F7DF1E", desc: "ES6+, async/await, closures, prototypes" },
  Typescript: { title: "TypeScript", group: "Languages", logo: "ts", color: "#3178C6", desc: "Types, interfaces, generics" },
  python: { title: "Python", group: "Languages", logo: "python", color: "#4B8BBE", desc: "Data structures and problem solving" },
  go: { title: "Golang", group: "Languages", glyph: "Go", color: "#00ADD8", desc: "Goroutines, channels, concurrency" },
  React: { title: "React", group: "Frontend", logo: "react", color: "#61DAFB", desc: "Hooks, state, context, JSX" },
  Next: { title: "Next.js", group: "Frontend", logo: "next", color: "#A3A3A3", desc: "Routing, SSR, API routes" },
  Node: { title: "Node.js", group: "Backend", logo: "node", color: "#68A063", desc: "Express, async, event loop" },
  nest: { title: "NestJS", group: "Backend", logo: "nest", color: "#E0234E", desc: "Modules, DI, backend architecture" },
  RabbitMQ: { title: "RabbitMQ", group: "Backend", logo: "rabbitmq", color: "#FF6600", desc: "Queues, exchanges, routing" },
  SQL: { title: "SQL", group: "Databases", logo: "sql", color: "#00758F", desc: "Queries, joins, indexing" },
  redis: { title: "Redis", group: "Databases", logo: "redis", color: "#DC382D", desc: "Caching, in-memory storage" },
  docker: { title: "Docker", group: "DevOps", logo: "docker", color: "#2496ED", desc: "Containers, images, deploys" },
  linux: { title: "Linux", group: "DevOps", icon: "terminal", color: "#22C55E", desc: "Commands, scripting, sysadmin" },
  OOP: { title: "OOP", group: "Fundamentals", icon: "cube", color: "#A78BFA", desc: "Inheritance, polymorphism, patterns" },
  dsa: { title: "DSA", group: "Fundamentals", icon: "git-network", color: "#F472B6", desc: "Data structures and algorithms" },
  AI: { title: "AI & LLMs", group: "AI", icon: "sparkles", color: "#C084FC", desc: "LLMs, prompting, ML concepts" },
  "Advanced RAG": { title: "Advanced RAG", group: "AI", icon: "library", color: "#818CF8", desc: "Retrieval-augmented generation" },
  "System Design": { title: "System Design", group: "System Design", icon: "git-merge", color: "#E879F9", desc: "Snippets, case studies and patterns" },
  aws: { title: "AWS Essentials", group: "Cloud", logo: "aws", color: "#FF9900", aws: true, desc: "Core AWS services overview" },
  "AWS Kinesis": { title: "Kinesis", group: "Cloud", aws: true, icon: "pulse", color: "#8B5CF6", desc: "Real-time data streaming" },
  "AWS Parameter Store": { title: "Parameter Store", group: "Cloud", aws: true, icon: "key", color: "#E11D48", desc: "Configuration and secrets" },
  "AWS Fargate": { title: "Fargate", group: "Cloud", aws: true, icon: "rocket", color: "#F97316", desc: "Serverless containers" },
};
const AWS_ICON = {
  Server: "server", HardDrive: "archive", Shield: "shield-checkmark", Network: "git-network",
  Zap: "flash", Database: "server", Scale: "swap-horizontal", Activity: "pulse",
  Globe: "globe", Globe2: "globe", Radio: "radio", KeyRound: "key", Key: "key",
  Boxes: "cube", Box: "cube", Container: "cube", GitBranch: "git-branch", Workflow: "git-branch",
  MessageSquare: "chatbox", Bell: "notifications", Layers: "layers", Lock: "lock-closed", Cloud: "cloud",
  ShieldCheck: "shield-checkmark", Inbox: "file-tray-stacked", Users: "people", Bug: "bug",
};
META["AWS ECS"] = { title: "ECS", group: "Cloud", aws: true, awsGroup: "Containers", icon: "cube", color: "#F97316", desc: "Elastic Container Service: tasks, services, clusters and deployments." };
for (const svc of awsServices) {
  // The web index links its EC2 card to the ECS category; map it to EC2 here.
  const key = svc.name === "EC2" ? "AWS EC2" : svc.slug;
  META[key] = {
    ...(META[key] || {}),
    title: svc.name,
    group: "Cloud",
    aws: true,
    awsGroup: svc.group,
    icon: AWS_ICON[svc.icon] || "cloud",
    color: svc.color || "#FF9900",
    desc: svc.description,
  };
}

const LEVEL_LABEL = { Advance: "Advanced" };
const prettyLabel = (l) => LEVEL_LABEL[l] || l;

// ---------------------------------------------------------------------------
// Prepare concepts + interview questions -> topics
// ---------------------------------------------------------------------------
const topics = new Map();
const search = [];
const conceptCounts = { concepts: 0, practice: 0, examples: 0 };

function topicFor(rawKey) {
  // Interview data uses "Redis" where prepare data uses "redis": match case-insensitively.
  const existing = [...topics.keys()].find((k) => k.toLowerCase() === rawKey.toLowerCase());
  const metaKey = Object.keys(META).find((k) => k.toLowerCase() === rawKey.toLowerCase());
  const key = existing || metaKey || rawKey;
  if (!topics.has(key)) {
    const meta = META[key] || {
      title: key.replace(/^AWS /, ""),
      group: key.startsWith("AWS") ? "Cloud" : "Other",
      aws: key.startsWith("AWS"),
      icon: key.startsWith("AWS") ? "cloud" : "book",
      color: "#D4FF4F",
      desc: "",
    };
    const id = key === "aws" ? "aws-essentials" : slug(key);
    topics.set(key, { id, key, ...meta, levels: [], sets: [], counts: { concepts: 0, questions: 0 } });
  }
  return topics.get(key);
}

function normalizeExamples(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    if (typeof item === "string") {
      if (item.trim()) out.push({ html: codeBlock(decode(item)) });
      continue;
    }
    if (!item || typeof item !== "object") continue;
    if (typeof item.snippet === "string") {
      if (item.snippet.trim()) out.push({ title: item.language, html: codeBlock(item.snippet, item.language) });
      continue;
    }
    for (const v of Object.values(item)) {
      if (!v || typeof v !== "object") continue;
      const title = typeof v.questions === "string" ? v.questions : undefined;
      const html = typeof v.explanation === "string" ? richText(v.explanation) : "";
      if (title || html) out.push({ title, html });
    }
  }
  return out.filter((e) => e.html || e.title);
}

function addPrepare(category) {
  const t = topicFor(category.category);
  if (category.topicColor && !META[category.category]?.color) t.color = category.topicColor;
  for (const lvl of category.type || []) {
    const concepts = (lvl.concepts || []).filter((c) => c && c.topic);
    if (!concepts.length) continue;
    const levelIdx = t.levels.length;
    const level = { label: prettyLabel(lvl.label), concepts: [] };
    concepts.forEach((c, i) => {
      const examples = normalizeExamples(c.examples);
      const questions = (Array.isArray(c.questions) ? c.questions : [])
        .filter((q) => q && typeof q.question === "string" && q.question.trim())
        .map((q) => ({ q: q.question.trim(), a: richText(q.solution || "") }));
      const tags = (c.tags || []).filter((x) => typeof x === "string" && x.trim()).slice(0, 4);
      const key = writeAsset(`c/${t.id}/${levelIdx}-${i}`, {
        title: c.topic,
        tags,
        html: richText(c.explanation || ""),
        examples,
        questions,
        links: (c.links || []).filter((l) => typeof l === "string" && /^https?:/.test(l)),
      });
      level.concepts.push({ t: c.topic, g: tags, ex: examples.length, pq: questions.length, a: key });
      search.push(["c", t.id, levelIdx, i, c.topic + (tags.length ? " · " + tags.join(" ") : "")]);
      conceptCounts.concepts++;
      conceptCounts.practice += questions.length;
      conceptCounts.examples += examples.length;
    });
    t.levels.push(level);
    t.counts.concepts += level.concepts.length;
  }
}

// The web app serves linux from linuxPrepareData; the copy in prepareData is stale.
prepareData.filter((c) => c.category !== "linux").forEach(addPrepare);
addPrepare(linuxPrepareData);
addPrepare(awsPrepareData);
awsServiceCategories.forEach(addPrepare);
snippetsData.forEach(addPrepare);

const SET_ORDER = ["Junior", "Mid", "Senior"];
const ivByTopic = {};
for (const entry of interviewData) {
  (ivByTopic[entry.topic] ||= {});
  (ivByTopic[entry.topic][entry.categories] ||= []).push(...(entry.questions || []));
}
for (const [key, sets] of Object.entries(ivByTopic)) {
  const t = topicFor(key);
  for (const label of SET_ORDER) {
    const qs = (sets[label] || []).filter((q) => q && q.question);
    if (!qs.length) continue;
    const setIdx = t.sets.length;
    const items = qs.map((q, i) => {
      const tags = (q.tags || []).map((x) => (typeof x === "string" ? x : x?.name)).filter(Boolean).slice(0, 3);
      search.push(["q", t.id, setIdx, i, q.question.slice(0, 220)]);
      return { q: q.question.trim(), g: tags, a: q.solution ? markdownToHtml(q.solution) : "" };
    });
    const a = writeAsset(`q/${t.id}/${setIdx}`, items);
    t.sets.push({ label, count: items.length, a, preview: items.slice(0, 3).map((x) => x.q.slice(0, 160)) });
    t.counts.questions += items.length;
  }
}

// Component Q&A (System Design / AWS) as extra interview sets
const COMPONENT_TARGET = { SystemDesign: "System Design", AWS: "aws", Database: "SQL", DevOps: "docker" };
for (const [component, subs] of Object.entries(componentTopicsData)) {
  const t = topicFor(COMPONENT_TARGET[component] || component);
  for (const sub of Object.values(subs)) {
    const qs = (sub.questions || []).filter((q) => q && q.question);
    if (!qs.length) continue;
    const setIdx = t.sets.length;
    const items = qs.map((q, i) => {
      search.push(["q", t.id, setIdx, i, q.question.slice(0, 220)]);
      return {
        q: q.question.trim(),
        g: (q.tags || []).map((x) => (typeof x === "string" ? x : x?.name)).filter(Boolean).slice(0, 3),
        d: q.difficulty,
        a: richText(q.solution || ""),
      };
    });
    const a = writeAsset(`q/${t.id}/${setIdx}`, items);
    t.sets.push({ label: sub.title, count: items.length, a, preview: items.slice(0, 3).map((x) => x.q.slice(0, 160)) });
    t.counts.questions += items.length;
  }
}

// ---------------------------------------------------------------------------
// MCQs
// ---------------------------------------------------------------------------
const MCQ_META = {
  Javascript: { id: "javascript", title: "JavaScript", logo: "js", color: "#F7DF1E" },
  Typescript: { id: "typescript", title: "TypeScript", logo: "ts", color: "#3178C6" },
  React: { id: "react", title: "React", logo: "react", color: "#61DAFB" },
  Node: { id: "node", title: "Node.js", logo: "node", color: "#68A063" },
  Next: { id: "next", title: "Next.js", logo: "next", color: "#A3A3A3" },
  SQL: { id: "sql", title: "SQL", logo: "sql", color: "#00758F" },
  MongoDB: { id: "mongodb", title: "MongoDB", logo: "mongodb", color: "#47A248" },
  OOP: { id: "oop", title: "OOP", icon: "cube", color: "#A78BFA" },
  "AWS S3": { id: "aws-s3", title: "AWS S3", logo: "aws", color: "#FF9900" },
};
const mcqByCat = {};
const seen = new Set();
for (const arr of Object.values(mcqModule)) {
  if (!Array.isArray(arr)) continue;
  for (const q of arr) {
    if (!q || !q.question || !Array.isArray(q.options)) continue;
    const sig = q.category + "|" + q.question;
    if (seen.has(sig)) continue;
    seen.add(sig);
    (mcqByCat[q.category] ||= []).push(q);
  }
}
const mcq = [];
const DIFF_ORDER = ["easy", "medium", "hard", "expert"];
for (const [cat, list] of Object.entries(mcqByCat)) {
  const meta = MCQ_META[cat] || { id: slug(cat), title: cat, icon: "help", color: "#D4FF4F" };
  const items = list.map((q, i) => ({
    id: `${meta.id}-${i}`,
    d: (q.difficulty || "medium").toLowerCase(),
    q: q.question,
    o: q.options.map(String),
    a: q.correctAnswer,
    e: q.explanation || "",
  }));
  const byDifficulty = {};
  items.forEach((q) => (byDifficulty[q.d] = (byDifficulty[q.d] || 0) + 1));
  const a = writeAsset(`m/${meta.id}`, items);
  mcq.push({
    ...meta,
    key: cat,
    count: items.length,
    difficulties: DIFF_ORDER.filter((d) => byDifficulty[d]).map((d) => ({ d, n: byDifficulty[d] })),
    a,
  });
}
mcq.sort((x, y) => y.count - x.count);

// ---------------------------------------------------------------------------
// Practice labs
// ---------------------------------------------------------------------------
const DIFF = (d) => {
  const s = String(d || "").toLowerCase();
  if (/begin|easy/.test(s)) return "Easy";
  if (/inter|medium/.test(s)) return "Medium";
  if (/adv|hard|expert/.test(s)) return "Hard";
  return "Medium";
};
const strList = (a) => (Array.isArray(a) ? a.filter((x) => typeof x === "string" && x.trim()) : []);
const qaList = (a) =>
  (Array.isArray(a) ? a : [])
    .map((x) =>
      typeof x === "string"
        ? { q: x }
        : x && x.question
          ? { q: x.question, a: x.answer ? richText(x.answer) : undefined }
          : null,
    )
    .filter(Boolean);

function trackExercise(e, lang, prefix) {
  return {
    id: `${prefix}${e.id}`,
    title: e.title,
    difficulty: DIFF(e.difficulty),
    description: e.description || "",
    lang,
    fileType: e.fileType,
    starter: e.starterCode || "",
    solution: e.solution || "",
    hints: strList(e.hints),
    tags: strList(e.tags),
    commands: strList(e.commands_to_practice),
    questions: strList(e.interview_questions || e.interviewQuestions),
  };
}

function bonusSection(b) {
  if (!b || typeof b !== "object") return [];
  const items = [...strList(b.tasks), ...strList(b.requirements)];
  const out = [];
  if (b.title || items.length) out.push({ title: `Bonus: ${b.title || "Challenge"}`, text: b.description || "", items });
  if (strList(b.tools_to_use).length) out.push({ title: "Tools to use", items: strList(b.tools_to_use), mono: true });
  return out;
}

const labs = [];
function addLab(lab) {
  const count = lab.modules.reduce((n, m) => n + m.exercises.length, 0);
  const a = writeAsset(`l/${lab.id}`, lab);
  labs.push({
    id: lab.id,
    title: lab.title,
    desc: lab.desc,
    runner: lab.runner,
    color: lab.color,
    icon: lab.icon,
    logo: lab.logo,
    count,
    modules: lab.modules.map((m) => ({ id: m.id, title: m.title, level: m.level, count: m.exercises.length })),
    a,
  });
  lab.modules.forEach((m, mi) =>
    m.exercises.forEach((e, ei) => search.push(["e", lab.id, mi, ei, e.title])),
  );
}

// JavaScript (runs on device)
addLab({
  id: "javascript",
  title: "JavaScript Playground",
  desc: "Solve coding problems and run them on your phone with test cases.",
  runner: "js",
  logo: "js",
  color: "#F7DF1E",
  modules: Object.entries(playgroundQuestions).map(([k, list]) => ({
    id: k,
    title: k === "beginner" ? "Beginner Problems" : "Advanced Problems",
    level: k === "beginner" ? "Beginner" : "Advanced",
    summary: "",
    sections: [],
    interview: [],
    exercises: list.map((q) => ({
      id: `js-${q.id}`,
      title: q.title,
      difficulty: DIFF(q.difficulty),
      description: q.description,
      lang: "javascript",
      starter: q.starterCode,
      solution: q.solution,
      hints: strList(q.hints),
      tags: strList(q.tags),
      examples: q.examples || [],
      testCases: q.testCases || [],
      complexity: q.timeComplexity ? { time: q.timeComplexity, space: q.spaceComplexity } : undefined,
      commands: [],
      questions: [],
    })),
  })),
});

// SQL (runs on device via SQLite)
const sqlByDiff = { Easy: [], Medium: [], Hard: [] };
sqlQuestions.forEach((q) =>
  sqlByDiff[DIFF(q.difficulty)].push({
    id: `sql-${q.id}`,
    title: q.title,
    difficulty: DIFF(q.difficulty),
    description: [q.description, q.question].filter(Boolean).join("\n\n"),
    lang: "sql",
    starter: "",
    solution: q.expectedQuery,
    hints: q.hint ? [q.hint] : [],
    tags: [q.category].filter(Boolean),
    dataset: q.dataset,
    commands: [],
    questions: [],
  }),
);
const sqlSets = {};
for (const [name, ds] of Object.entries(sqlDatasets)) {
  sqlSets[name] = { description: ds.description, tables: ds.tables };
}
// Questions that span datasets reference "multiple": give them every table.
if (sqlQuestions.some((q) => !sqlSets[q.dataset])) {
  const all = {};
  for (const ds of Object.values(sqlSets)) Object.assign(all, ds.tables);
  for (const q of sqlQuestions) if (!sqlSets[q.dataset]) sqlSets[q.dataset] = { description: "All practice tables", tables: all };
}
addLab({
  id: "sql",
  title: "SQL Practice",
  desc: "Write real queries against realistic datasets, executed with SQLite on device.",
  runner: "sql",
  logo: "sql",
  color: "#00758F",
  datasets: sqlSets,
  modules: Object.entries(sqlByDiff)
    .filter(([, l]) => l.length)
    .map(([d, l]) => ({ id: d.toLowerCase(), title: `${d} Queries`, level: d, summary: "", sections: [], interview: [], exercises: l })),
});

// MongoDB (pure JS executor)
const reviveDates = (v) => JSON.parse(JSON.stringify(v, function (k, val) {
  const raw = this[k];
  return raw instanceof Date ? { $date: raw.toISOString() } : val;
}));
addLab({
  id: "mongodb",
  title: "MongoDB Practice",
  desc: "Queries and aggregation pipelines run against sample collections.",
  runner: "mongo",
  logo: "mongodb",
  color: "#47A248",
  datasets: reviveDates(Object.fromEntries(Object.entries(mongoDatasets).map(([k, v]) => [k, { name: v.name, description: v.description, collections: v.collections }]))),
  modules: ["beginner", "advanced", "expert"]
    .filter((k) => mongoQuestions[k]?.length)
    .map((k) => ({
      id: k,
      title: `${k[0].toUpperCase()}${k.slice(1)} Queries`,
      level: k,
      summary: "",
      sections: [],
      interview: [],
      exercises: mongoQuestions[k].map((q) => ({
        id: `mongo-${k}-${q.id}`,
        title: q.title,
        difficulty: DIFF(q.difficulty),
        description: q.question,
        lang: "javascript",
        starter: `db.${q.collection}.`,
        solution: q.solution,
        hints: q.hint ? [q.hint] : [],
        tags: [q.collection].filter(Boolean),
        dataset: q.dataset,
        expectedOutput: typeof q.expectedResult === "string" ? q.expectedResult : undefined,
        commands: [],
        questions: [],
      })),
    })),
});

// Python
const pyGroups = {};
for (const [lvl, list] of Object.entries(pythonQuestions)) {
  for (const q of list) {
    const cat = q.category || "basics";
    (pyGroups[cat] ||= { level: lvl, items: [] }).items.push(q);
  }
}
addLab({
  id: "python",
  title: "Python Practice",
  desc: "Beginner to advanced Python problems with expected output and hints.",
  runner: null,
  logo: "python",
  color: "#4B8BBE",
  modules: Object.entries(pyGroups).map(([cat, g]) => ({
    id: cat,
    title: pythonConcepts[cat]?.title || cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    level: g.level === "beginner" ? "Beginner" : "Advanced",
    summary: pythonConcepts[cat]?.description || "",
    sections: [],
    interview: [],
    exercises: g.items.map((q) => ({
      id: `py-${q.id}`,
      title: q.title,
      difficulty: DIFF(q.difficulty),
      description: q.description,
      lang: "python",
      starter: q.starterCode || "",
      solution: q.solution || "",
      hints: strList(q.hints),
      tags: [q.category].filter(Boolean),
      expectedOutput: q.expectedOutput,
      commands: [],
      questions: [],
    })),
  })),
});

// Docker / Go / Linux tracks
function conceptTrack({ id, title, desc, logo, icon, color, lang, concepts, extra }) {
  const modules = concepts.map((c) => ({
    id: String(c.id),
    title: c.title,
    level: c.level || "",
    summary: c.summary || c.description || "",
    topics: strList(c.topics),
    sections: [
      strList(c.best_practices_checklist).length && { title: "Best practices", items: strList(c.best_practices_checklist) },
      strList(c.common_mistakes).length && { title: "Common mistakes", items: strList(c.common_mistakes) },
      Array.isArray(c.optimization_techniques) && c.optimization_techniques.length && {
        title: "Optimization techniques",
        items: c.optimization_techniques.map((o) => `${o.name}: ${o.description}${o.example ? `  →  ${o.example}` : ""}`),
      },
      ...bonusSection(c.bonus_challenge),
    ].filter(Boolean),
    interview: qaList(c.interview_questions_summary),
    exercises: (c.exercises || []).map((e) => trackExercise(e, lang, `${id}-${c.id}-`)),
  }));
  if (extra?.length) {
    modules.push({
      id: "challenges",
      title: "Challenge Set",
      level: "Mixed",
      summary: "Stand-alone exercises that combine concepts from every module.",
      sections: [],
      interview: [],
      exercises: extra.map((e) => trackExercise(e, lang, `${id}-x-`)),
    });
  }
  addLab({ id, title, desc, runner: null, logo, icon, color, modules });
}
conceptTrack({ id: "docker", title: "Docker Practice", desc: "Write Dockerfiles and master container workflows.", logo: "docker", color: "#2496ED", lang: "dockerfile", concepts: dockerConcepts, extra: dockerExercises });
conceptTrack({ id: "go", title: "Go Practice", desc: "Goroutines, channels and real interviewer questions.", icon: "code-slash", color: "#00ADD8", lang: "go", concepts: goConcepts, extra: goExercises });
conceptTrack({ id: "linux", title: "Linux Practice", desc: "Commands, permissions and shell scripting.", icon: "terminal", color: "#22C55E", lang: "bash", concepts: linuxConcepts });

// ---------------------------------------------------------------------------
// Resources (cheat sheets) - small, bundled directly in the catalog
// ---------------------------------------------------------------------------
const resources = [];
for (const [id, r] of Object.entries(resourceSheets)) {
  const content = sheetContent[id];
  if (!content) continue;
  const sheets = (r.sheets || [])
    .map((s) => {
      const c = content[s.id];
      if (!c || !Array.isArray(c.commands) || !c.commands.length) return null;
      return { id: s.id, title: s.title, description: s.description, emoji: s.icon, items: c.commands.map((x) => ({ cmd: x.cmd, desc: x.desc, ex: x.ex })) };
    })
    .filter(Boolean);
  if (sheets.length) resources.push({ id, title: r.title, description: r.description, sheets });
}

// ---------------------------------------------------------------------------
// Write catalog + asset map
// ---------------------------------------------------------------------------
const GROUP_ORDER = ["Languages", "Frontend", "Backend", "Databases", "DevOps", "Fundamentals", "System Design", "AI", "Cloud", "Other"];
const topicList = [...topics.values()]
  .filter((t) => t.counts.concepts || t.counts.questions)
  .sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group));

writeAsset("search", search);

const catalog = {
  generatedAt: new Date().toISOString(),
  stats: {
    topics: topicList.length,
    concepts: conceptCounts.concepts,
    questions: topicList.reduce((n, t) => n + t.counts.questions, 0),
    mcqs: mcq.reduce((n, m) => n + m.count, 0),
    exercises: labs.reduce((n, l) => n + l.count, 0),
  },
  groups: GROUP_ORDER.filter((g) => topicList.some((t) => t.group === g)),
  topics: topicList,
  mcq,
  labs,
  resources,
};
fs.writeFileSync(path.join(OUT_GEN, "catalog.json"), JSON.stringify(catalog));

const lines = Object.entries(assetMap).map(
  ([k, p]) => `  ${JSON.stringify(k)}: require(${JSON.stringify(p)}),`,
);
fs.writeFileSync(
  path.join(OUT_GEN, "assets.ts"),
  `/* eslint-disable */\n// AUTO-GENERATED by scripts/build-content.mjs. Do not edit.\nexport const CONTENT_ASSETS: Record<string, number> = {\n${lines.join("\n")}\n};\n`,
);

fs.rmSync(TMP, { recursive: true, force: true });
console.log(
  JSON.stringify(catalog.stats),
  `\nassets: ${Object.keys(assetMap).length} files, ${(bytes / 1e6).toFixed(1)} MB`,
  `\ncatalog: ${(fs.statSync(path.join(OUT_GEN, "catalog.json")).size / 1e3).toFixed(0)} KB`,
);
