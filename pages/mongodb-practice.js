import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import {
  Database,
  GraduationCap,
  Target,
  ArrowRight,
  BookOpen,
  User,
  Settings,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  trackSpotlight,
} from "@/components/landing/shared";

export default function MongoDBPracticeMode() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Removed authentication check - playground is now public

  return (
    <PageShell>
      <Head>
        <title>MongoDB Practice - Choose Your Mode | Interview Nerd</title>
        <meta
          name="description"
          content="Choose between Path Learning and Testing modes for MongoDB practice"
        />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "MongoDB Practice" },
        ]}
      />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
          <div
            className="grid-bg pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <Link
              href="/#categories"
              className="hero-fade group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 text-xs text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              All topics
            </Link>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              <span className="block">
                <SplitTitle text="MongoDB" />
              </span>
              <span className="block">
                <SplitTitle text="Practice" accent />
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-neutral-400">
              Select how you want to practice MongoDB. Path Learning offers
              structured progression, while Testing Mode lets you practice
              freely.
            </p>
          </div>
        </section>

        {/* Mode Cards */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Path Learning Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div
                className="spotlight group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 transition-all duration-500 hover:border-white/20 hover:shadow-2xl"
                onMouseMove={trackSpotlight}
                onClick={() => router.push("/mongodb-practice/path-learning")}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className="rounded-2xl bg-[#D4FF4F] p-6 shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <GraduationCap size={48} className="text-neutral-950" />
                    </motion.div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-center font-bold text-neutral-50 mb-2">
                    Learn Concepts
                  </h2>
                  <p className="text-center text-base text-neutral-400 mb-6">
                    Structured learning with progressive categories
                  </p>

                  <p className="text-neutral-300 text-center leading-relaxed mb-6">
                    Master MongoDB step-by-step through carefully organized
                    categories. Track your progress and build expertise
                    systematically.
                  </p>

                  <div className="space-y-3 rounded-xl bg-white/[0.03] p-4 border border-white/[0.08]">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                        <CheckCircle size={14} className="text-neutral-950" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-50 text-sm">
                          Basic Queries
                        </p>
                        <p className="text-xs text-neutral-400">
                          Learn find, insert, update, and delete
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                        <TrendingUp size={14} className="text-neutral-950" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-50 text-sm">
                          Aggregation Pipeline
                        </p>
                        <p className="text-xs text-neutral-400">
                          Master $group, $match, and $lookup
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                        <Sparkles size={14} className="text-neutral-950" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-50 text-sm">
                          Advanced Operations
                        </p>
                        <p className="text-xs text-neutral-400">
                          Complex queries and optimization
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D4FF4F] px-6 py-3 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(212,255,79,0.6)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/mongodb-practice/path-learning");
                    }}
                  >
                    Concepts
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Testing Mode Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div
                className="spotlight group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 transition-all duration-500 hover:border-white/20 hover:shadow-2xl"
                onMouseMove={trackSpotlight}
                onClick={() => router.push("/mongodb-practice/testing")}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className="rounded-2xl bg-[#D4FF4F] p-6 shadow-xl"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Target size={48} className="text-neutral-950" />
                    </motion.div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-center font-bold text-neutral-50 mb-2">
                    Practice Questions
                  </h2>
                  <p className="text-center text-base text-neutral-400 mb-6">
                    Free practice with all questions available
                  </p>

                  <p className="text-neutral-300 text-center leading-relaxed mb-6">
                    Practice any question at any time. Perfect for testing your
                    skills and preparing for interviews without restrictions.
                  </p>

                  <div className="space-y-3 rounded-xl bg-white/[0.03] p-4 border border-white/[0.08]">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                        <Database size={14} className="text-neutral-950" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-50 text-sm">
                          Full Access
                        </p>
                        <p className="text-xs text-neutral-400">
                          All questions from beginner to advanced
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                        <Zap size={14} className="text-neutral-950" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-50 text-sm">
                          No Restrictions
                        </p>
                        <p className="text-xs text-neutral-400">
                          No category requirements or prerequisites
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                        <TrendingUp size={14} className="text-neutral-950" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-50 text-sm">
                          Your Pace
                        </p>
                        <p className="text-xs text-neutral-400">
                          Practice at your own speed and style
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D4FF4F] px-6 py-3 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(212,255,79,0.6)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/mongodb-practice/testing");
                    }}
                  >
                    Questions
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
