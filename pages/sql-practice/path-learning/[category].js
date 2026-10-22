import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { sqlQuestions } from "@/data/sqlDatasets";
import { useSQLProgress } from "@/hooks/useSQLProgress";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  mono,
  trackSpotlight,
  usePageMotion,
} from "@/components/landing/shared";

export default function CategoryTopicsPage() {
  const router = useRouter();
  const { category } = router.query;
  const { status } = useSession();
  const { isQuestionCompleted } = useSQLProgress();
  const rootRef = React.useRef(null);
  const isLoading = status === "loading";

  usePageMotion(rootRef, [isLoading]);

  // Filter questions by category
  const categoryQuestions = category
    ? sqlQuestions.filter((q) => q.category === decodeURIComponent(category))
    : [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-300 bg-green-500/10 border-green-500/20";
      case "medium":
        return "text-yellow-300 bg-yellow-500/10 border-yellow-500/20";
      case "hard":
        return "text-red-300 bg-red-500/10 border-red-500/20";
      default:
        return "text-neutral-300 bg-neutral-500/10 border-neutral-500/20";
    }
  };

  if (isLoading || !category) {
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
        <title>
          {decodeURIComponent(category)} - SQL Path Learning | Interview Nerd
        </title>
        <meta name="description" content={`Learn ${category} in SQL`} />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "SQL Practice", href: "/sql-practice" },
          { label: "Path Learning", href: "/sql-practice/path-learning" },
          { label: decodeURIComponent(category) },
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
              href="/sql-practice/path-learning"
              className="hero-fade group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 text-xs text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Back to Categories
            </Link>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              <span className="block">
                <SplitTitle text={decodeURIComponent(category)} />
              </span>
              <span className="block">
                <SplitTitle text="Questions" accent />
              </span>
            </h1>

            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Master {decodeURIComponent(category)} concepts with{" "}
              {categoryQuestions.length} practice questions
            </p>
          </div>
        </section>

        {/* Questions Table */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/[0.08] bg-white/[0.02]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider w-16">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider w-32">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider w-48">
                      Dataset
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider w-32">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08]">
                  {categoryQuestions.length > 0 ? (
                    categoryQuestions.map((question, index) => (
                      <Link
                        key={question.id}
                        href={`/sql-practice/question/${question.id}`}
                        onMouseMove={trackSpotlight}
                        className="spotlight group block hover:bg-white/[0.03] transition-colors"
                      >
                        <tr className="cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {question.id}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="font-medium text-neutral-50 group-hover:text-[#D4FF4F] transition-colors">
                              {question.title}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`${mono.className} rounded-full border px-3 py-1 text-[11px] ${getDifficultyColor(question.difficulty)}`}
                            >
                              {question.difficulty.charAt(0).toUpperCase() +
                                question.difficulty.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 capitalize">
                            {question.dataset}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {isQuestionCompleted(question.id.toString()) ? (
                              <span className="flex items-center gap-1 text-green-400">
                                <CheckCircle className="w-4 h-4" />
                                Completed
                              </span>
                            ) : (
                              <span className="text-neutral-600">
                                Not Started
                              </span>
                            )}
                          </td>
                        </tr>
                      </Link>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-neutral-500"
                      >
                        No questions found for this category
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
