import * as React from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import {
  Code2,
  ArrowLeft,
  ArrowUpRight,
  ListChecks,
  Type,
  Table2,
  Hand,
  Layers,
  GitBranch,
  RefreshCw,
  Timer,
  ArrowUpAZ,
  Gauge,
} from "lucide-react";
import { playgroundQuestions } from "@/data/playgroundQuestions";
import { useJSProgress } from "@/hooks/useJSProgress";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  mono,
  trackSpotlight,
  usePageMotion,
} from "@/components/landing/shared";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function buildTopicList() {
  const topics = {};
  const allQuestions = [
    ...(playgroundQuestions.beginner || []),
    ...(playgroundQuestions.advanced || []),
  ];

  allQuestions.forEach((question) => {
    if (question.tags && question.tags.length > 0) {
      const mainTag = question.tags[0];
      if (!topics[mainTag]) {
        topics[mainTag] = {
          name: mainTag,
          questions: [],
          easy: 0,
          medium: 0,
          hard: 0,
        };
      }
      topics[mainTag].questions.push(question);
      topics[mainTag][question.difficulty]++;
    }
  });

  return Object.values(topics).sort(
    (a, b) => b.questions.length - a.questions.length,
  );
}

const getTopicIcon = (topic) => {
  switch (topic) {
    case "array":
      return ListChecks;
    case "string":
      return Type;
    case "hash-table":
      return Table2;
    case "two-pointers":
      return Hand;
    case "stack":
      return Layers;
    case "binary-tree":
      return GitBranch;
    case "recursion":
      return RefreshCw;
    case "traversal":
      return GitBranch;
    case "intervals":
      return Timer;
    case "sorting":
      return ArrowUpAZ;
    case "greedy":
      return Gauge;
    default:
      return Code2;
  }
};

const getTopicDisplayName = (topic) => {
  const displayNames = {
    array: "Arrays",
    string: "Strings",
    "hash-table": "Hash Tables",
    "two-pointers": "Two Pointers",
    stack: "Stack",
    "binary-tree": "Binary Trees",
    recursion: "Recursion",
    traversal: "Tree Traversal",
    intervals: "Intervals",
    sorting: "Sorting",
    greedy: "Greedy Algorithms",
  };
  return displayNames[topic] || topic.charAt(0).toUpperCase() + topic.slice(1);
};

export default function JSPathLearning() {
  const { status } = useSession();
  const { getTopicProgress } = useJSProgress();
  const rootRef = React.useRef(null);

  const topicList = React.useMemo(buildTopicList, []);
  const isLoading = status === "loading";

  usePageMotion(rootRef, [isLoading]);

  if (isLoading) {
    return (
      <PageShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#D4FF4F]" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell ref={rootRef}>
      <Head>
        <title>JavaScript Path Learning - Interview Nerd</title>
        <meta
          name="description"
          content="Learn JavaScript step by step with structured topics"
        />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "JavaScript Practice", href: "/playground" },
          { label: "Path Learning" },
        ]}
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-10 pt-24 md:pb-14 md:pt-28">
          <div
            className="grid-bg pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <Link
              href="/playground"
              className="hero-fade group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 text-xs text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Back to JavaScript Practice
            </Link>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              <span className="block">
                <SplitTitle text="JavaScript" />
              </span>
              <span className="block">
                <SplitTitle text="Learning Path" accent />
              </span>
            </h1>

            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Master JavaScript concepts step by step. Choose a topic to start
              your learning journey.
            </p>
          </div>
        </section>

        {/* Topics */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div
            data-stagger
            className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
          >
            {topicList.map((topic) => {
              const Icon = getTopicIcon(topic.name);
              const total = topic.questions.length;
              const completed = getTopicProgress(topic.name)?.total || 0;
              const percent =
                total > 0 ? Math.min(100, (completed / total) * 100) : 0;

              return (
                <Link
                  key={topic.name}
                  href={`/js-practice/path-learning/${encodeURIComponent(
                    topic.name,
                  )}`}
                  prefetch={false}
                  onMouseMove={trackSpotlight}
                  className="spotlight group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/20"
                >
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-neutral-300 transition-colors group-hover:text-[#D4FF4F]" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-100" />
                  </div>

                  <div className="relative z-10 mt-6">
                    <h2 className="text-lg font-semibold tracking-tight text-neutral-50">
                      {getTopicDisplayName(topic.name)}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                      {topic.questions.length} question
                      {topic.questions.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                    {DIFFICULTIES.filter((d) => topic[d.toLowerCase()] > 0).map(
                      (d) => (
                        <span
                          key={d}
                          className={`${mono.className} rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-neutral-300`}
                        >
                          {topic[d.toLowerCase()]} {d}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="relative z-10 mt-auto pt-6">
                    <div
                      className="h-px w-full bg-white/10"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={total}
                      aria-valuenow={completed}
                      aria-label={`${getTopicDisplayName(topic.name)} progress`}
                    >
                      <div
                        className="h-px bg-[#D4FF4F] transition-[width] duration-1000 ease-out"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div
                      className={`${mono.className} mt-3 flex items-center justify-between text-xs text-neutral-500`}
                    >
                      <span>
                        {completed} / {total} completed
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
