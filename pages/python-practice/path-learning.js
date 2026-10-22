import * as React from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Package,
  FileText,
  AlertTriangle,
  Layers,
  Activity,
  Search,
  Calendar,
  CheckCircle,
  Zap,
  GitBranch,
  Database,
  Repeat,
  List as ListIcon,
  Code2,
} from "lucide-react";
import { pythonConcepts, pythonQuestions } from "@/data/pythonDatasets";
import { usePythonProgress } from "@/hooks/usePythonProgress";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  mono,
  trackSpotlight,
  usePageMotion,
} from "@/components/landing/shared";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function buildCategoryList() {
  const categories = {};
  const allQuestions = Object.values(pythonQuestions).flat();

  Object.entries(pythonConcepts).forEach(([key, concept]) => {
    const categoryQuestions = allQuestions.filter((q) => q.category === key);

    categories[key] = {
      name: concept.title,
      questions: categoryQuestions,
      easy: categoryQuestions.filter((q) => q.difficulty === "easy").length,
      medium: categoryQuestions.filter((q) => q.difficulty === "medium").length,
      hard: categoryQuestions.filter((q) => q.difficulty === "hard").length,
    };
  });

  return Object.values(categories).sort(
    (a, b) => b.questions.length - a.questions.length,
  );
}

const getCategoryIcon = (categoryName) => {
  const name = (categoryName || "").toLowerCase();
  if (name.match(/basic|intro|syntax/)) return BookOpen;
  if (name.match(/variable|type|number|string|boolean/)) return Database;
  if (name.match(/list|dict|set|tuple|structure|collection/)) return ListIcon;
  if (name.match(/control|loop|while|for|flow/)) return Repeat;
  if (name.match(/if|else|branch/)) return GitBranch;
  if (name.match(/function|lambda/)) return Code2;
  if (name.match(/class|object|oop/)) return Layers;
  if (name.match(/module|package|import/)) return Package;
  if (name.match(/file|i\/o/)) return FileText;
  if (name.match(/error|exception/)) return AlertTriangle;
  if (name.match(/algorithm|performance|optimi/)) return Activity;
  if (name.match(/regex|regular|pattern/)) return Search;
  if (name.match(/date|time|datetime/)) return Calendar;
  if (name.match(/test|testing|pytest/)) return CheckCircle;
  if (name.match(/async|concurrent|thread/)) return Zap;
  return BookOpen;
};

export default function PythonPathLearning() {
  const { status } = useSession();
  const { getCategoryProgress } = usePythonProgress();
  const rootRef = React.useRef(null);

  const categoryList = React.useMemo(buildCategoryList, []);
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
        <title>Python Path Learning - Interview Nerd</title>
        <meta
          name="description"
          content="Learn Python step by step with structured categories"
        />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "Python Practice", href: "/python-practice" },
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
              href="/python-practice"
              className="hero-fade group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 text-xs text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Back to Python Practice
            </Link>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              <span className="block">
                <SplitTitle text="Python" />
              </span>
              <span className="block">
                <SplitTitle text="Concepts" accent />
              </span>
            </h1>

            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Master Python concepts step by step. Choose a category to start
              your learning journey.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div
            data-stagger
            className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
          >
            {categoryList.map((category) => {
              const Icon = getCategoryIcon(category.name);
              const total = category.questions.length;
              const completed = getCategoryProgress(category.name)?.total || 0;
              const percent =
                total > 0 ? Math.min(100, (completed / total) * 100) : 0;

              return (
                <Link
                  key={category.name}
                  href={`/python-practice/path-learning/${encodeURIComponent(
                    category.name,
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
                      {category.name}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                      {category.questions.length} question
                      {category.questions.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                    {DIFFICULTIES.filter(
                      (d) => category[d.toLowerCase()] > 0,
                    ).map((d) => (
                      <span
                        key={d}
                        className={`${mono.className} rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-neutral-300`}
                      >
                        {category[d.toLowerCase()]} {d}
                      </span>
                    ))}
                  </div>

                  <div className="relative z-10 mt-auto pt-6">
                    <div
                      className="h-px w-full bg-white/10"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={total}
                      aria-valuenow={completed}
                      aria-label={`${category.name} progress`}
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
