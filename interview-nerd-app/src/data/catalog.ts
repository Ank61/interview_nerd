import raw from './generated/catalog.json';

export type ConceptMeta = { t: string; g: string[]; ex: number; pq: number; a: string };
export type Level = { label: string; concepts: ConceptMeta[] };
export type QSet = { label: string; count: number; a: string; preview: string[] };

export type Topic = {
  id: string;
  key: string;
  title: string;
  group: string;
  desc: string;
  color: string;
  logo?: string;
  icon?: string;
  glyph?: string;
  aws?: boolean;
  awsGroup?: string;
  levels: Level[];
  sets: QSet[];
  counts: { concepts: number; questions: number };
};

export type McqCategory = {
  id: string;
  key: string;
  title: string;
  logo?: string;
  icon?: string;
  color: string;
  count: number;
  difficulties: { d: string; n: number }[];
  a: string;
};

export type LabMeta = {
  id: string;
  title: string;
  desc: string;
  runner: 'js' | 'sql' | 'mongo' | null;
  color: string;
  icon?: string;
  logo?: string;
  count: number;
  modules: { id: string; title: string; level: string; count: number }[];
  a: string;
};

export type ResourceTopic = {
  id: string;
  title: string;
  description: string;
  sheets: { id: string; title: string; description: string; emoji: string; items: { cmd: string; desc: string; ex: string }[] }[];
};

type Catalog = {
  generatedAt: string;
  stats: { topics: number; concepts: number; questions: number; mcqs: number; exercises: number };
  groups: string[];
  topics: Topic[];
  mcq: McqCategory[];
  labs: LabMeta[];
  resources: ResourceTopic[];
};

export const catalog = raw as unknown as Catalog;

const topicIndex = new Map(catalog.topics.map((t) => [t.id, t]));
const mcqIndex = new Map(catalog.mcq.map((m) => [m.id, m]));
const labIndex = new Map(catalog.labs.map((l) => [l.id, l]));

export const getTopic = (id?: string) => (id ? topicIndex.get(id) : undefined);
export const getMcq = (id?: string) => (id ? mcqIndex.get(id) : undefined);
export const getLab = (id?: string) => (id ? labIndex.get(id) : undefined);

export const coreTopics = catalog.topics.filter((t) => !t.aws);
export const awsTopics = catalog.topics.filter((t) => t.aws);

export const conceptKey = (topicId: string, level: number, index: number) => `${topicId}:${level}:${index}`;
export const questionKey = (topicId: string, set: number, index: number) => `${topicId}:${set}:${index}`;
export const exerciseKey = (labId: string, exId: string) => `${labId}:${exId}`;

export const LOGOS: Record<string, number> = {
  js: require('../../assets/images/logos/js.png'),
  ts: require('../../assets/images/logos/ts.png'),
  react: require('../../assets/images/logos/react.png'),
  next: require('../../assets/images/logos/next.png'),
  node: require('../../assets/images/logos/node.png'),
  python: require('../../assets/images/logos/python.png'),
  docker: require('../../assets/images/logos/docker.png'),
  nest: require('../../assets/images/logos/nest.png'),
  mongodb: require('../../assets/images/logos/mongodb.png'),
  redis: require('../../assets/images/logos/redis.png'),
  aws: require('../../assets/images/logos/aws.png'),
  rabbitmq: require('../../assets/images/logos/rabbitmq.png'),
  sql: require('../../assets/images/logos/sql.png'),
};

// ---------------------------------------------------------------------------
// Payload shapes (loaded lazily via lib/content)
// ---------------------------------------------------------------------------
export type ConceptContent = {
  title: string;
  tags: string[];
  html: string;
  examples: { title?: string; html: string }[];
  questions: { q: string; a: string }[];
  links: string[];
};

export type InterviewItem = { q: string; g: string[]; a: string; d?: string };

export type McqItem = { id: string; d: string; q: string; o: string[]; a: number; e: string };

export type Exercise = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  lang: string;
  fileType?: string;
  starter: string;
  solution: string;
  hints: string[];
  tags: string[];
  commands: string[];
  questions: string[];
  dataset?: string;
  expectedOutput?: string;
  examples?: { input: string; output: string; explanation?: string }[];
  testCases?: { input: unknown[]; expected: unknown }[];
  complexity?: { time: string; space: string };
};

export type LabModule = {
  id: string;
  title: string;
  level: string;
  summary: string;
  topics?: string[];
  sections: { title: string; text?: string; items: string[]; mono?: boolean }[];
  interview: { q: string; a?: string }[];
  exercises: Exercise[];
};

export type LabContent = {
  id: string;
  title: string;
  desc: string;
  runner: LabMeta['runner'];
  datasets?: Record<string, any>;
  modules: LabModule[];
};

/** [type, topicOrLabId, levelOrSetOrModuleIdx, indexOrExerciseId, text] */
export type SearchEntry = ['c' | 'q' | 'e', string, number, number | string, string];
