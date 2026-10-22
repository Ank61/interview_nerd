import * as React from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calculator,
  Calendar,
  Database,
  Edit3,
  Filter,
  GitBranch,
  Globe,
  Layers,
  Settings,
  Terminal,
  Type,
} from "lucide-react";
import { mongoQuestions } from "@/data/mongoDatasets";
import { useMongoProgress } from "@/hooks/useMongoProgress";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  mono,
  trackSpotlight,
  usePageMotion,
} from "@/components/landing/shared";

// MongoDB operation categories with keywords
const OPERATION_CATEGORIES = {
  "Query Operations": {
    keywords: ["find", "findOne", "count", "distinct"],
    description:
      "Basic query operations: find, findOne, countDocuments, distinct",
    icon: Filter,
  },
  "Aggregation Pipeline": {
    keywords: ["aggregate", "$group", "$match", "$project", "$sort", "$limit"],
    description: "Aggregation: $group, $match, $project, $sort, $limit, $skip",
    icon: Database,
  },
  "Write Operations": {
    keywords: [
      "insert",
      "update",
      "delete",
      "replace",
      "$addToSet",
      "$pull",
      "$inc",
      "$mul",
    ],
    description:
      "insertOne, insertMany, updateOne, updateMany, replaceOne, deleteMany, $addToSet, $pull",
    icon: Edit3,
  },
  "Arithmetic Operations": {
    keywords: ["$add", "$subtract", "$multiply", "$divide"],
    description: "$add, $subtract, $multiply, $divide",
    icon: Calculator,
  },
  "String Operations": {
    keywords: ["$concat", "$split", "$toUpper", "$toLower", "$size"],
    description: "$concat, $split, $toUpper, $toLower, $size",
    icon: Type,
  },
  "Date Operations": {
    keywords: ["$year", "$month", "$dayOfWeek", "Date"],
    description: "$year, $month, $dayOfWeek with date calculations",
    icon: Calendar,
  },
  "Conditional Operations": {
    keywords: ["$cond", "$ifNull", "$switch"],
    description: "$cond, $ifNull, $switch with complex logic",
    icon: GitBranch,
  },
  "Array Operations": {
    keywords: ["$map", "$filter", "$reduce", "$unwind"],
    description: "$map, $filter, $reduce with transformations",
    icon: Layers,
  },
  "System Variables": {
    keywords: ["$$NOW", "$$ROOT", "$$CURRENT"],
    description: "$$NOW, $$ROOT, $$CURRENT",
    icon: Terminal,
  },
  Geospatial: {
    keywords: ["$geoNear", "$geoWithin", "$centerSphere", "coordinates"],
    description: "$geoNear, $geoWithin, $centerSphere",
    icon: Globe,
  },
  Administrative: {
    keywords: ["stats", "explain", "createIndex", "getIndexes"],
    description: "stats(), explain(), createIndex(), getIndexes()",
    icon: Settings,
  },
};

const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

// Categorize questions by operation type, biggest category first.
function buildCategoryList() {
  const allQuestions = [
    ...mongoQuestions.beginner,
    ...mongoQuestions.advanced,
    ...(mongoQuestions.expert || []),
  ];

  const categories = {};
  Object.keys(OPERATION_CATEGORIES).forEach((catName) => {
    categories[catName] = {
      name: catName,
      ...OPERATION_CATEGORIES[catName],
      questions: [],
      Easy: 0,
      Medium: 0,
      Hard: 0,
      Expert: 0,
    };
  });

  const add = (catName, question) => {
    categories[catName].questions.push(question);
    if (categories[catName][question.difficulty] !== undefined) {
      categories[catName][question.difficulty]++;
    }
  };

  allQuestions.forEach((question) => {
    const solution = question.solution.toLowerCase();
    const title = question.title.toLowerCase();
    const hint = (question.hint || "").toLowerCase();

    // Only add to the first matching category
    const match = Object.entries(OPERATION_CATEGORIES).find(([, info]) =>
      info.keywords.some(
        (keyword) =>
          solution.includes(keyword.toLowerCase()) ||
          title.includes(keyword.toLowerCase()) ||
          hint.includes(keyword.toLowerCase()),
      ),
    );

    // If no category matched, add to Query Operations as default
    add(match ? match[0] : "Query Operations", question);
  });

  return Object.values(categories)
    .filter((cat) => cat.questions.length > 0)
    .sort((a, b) => b.questions.length - a.questions.length);
}

export default function MongoDBPathLearning() {
  const { status } = useSession();
  const { getCategoryProgress } = useMongoProgress();
  const rootRef = React.useRef(null);

  const categoryList = React.useMemo(buildCategoryList, []);
  const isLoading = status === "loading";

  // Landing-page entrance: hero words, fades and the staggered card grid.
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
        <title>MongoDB Path Learning - Interview Nerd</title>
        <meta
          name="description"
          content="Learn MongoDB step by step with structured categories"
        />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "MongoDB Practice", href: "/mongodb-practice" },
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
              href="/mongodb-practice"
              className="hero-fade group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 text-xs text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Back to MongoDB Practice
            </Link>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              <span className="block">
                <SplitTitle text="MongoDB" />
              </span>
              <span className="block">
                <SplitTitle text="Learning Path" accent />
              </span>
            </h1>

            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Master MongoDB concepts step by step. Choose a category to start
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
              const Icon = category.icon;
              const total = category.questions.length;
              const completed = getCategoryProgress(category.name)?.total || 0;
              const percent =
                total > 0 ? Math.min(100, (completed / total) * 100) : 0;

              return (
                <Link
                  key={category.name}
                  href={`/mongodb-practice/path-learning/${encodeURIComponent(
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
                      {category.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                    {DIFFICULTIES.filter((d) => category[d] > 0).map((d) => (
                      <span
                        key={d}
                        className={`${mono.className} rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-neutral-300`}
                      >
                        {category[d]} {d}
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
                      <span className="text-neutral-600">
                        {total} question{total !== 1 ? "s" : ""}
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
