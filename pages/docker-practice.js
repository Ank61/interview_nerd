import * as React from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Terminal,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  trackSpotlight,
  usePageMotion,
} from "@/components/landing/shared";

export default function DockerPracticeMode() {
  const { status } = useSession();
  const rootRef = React.useRef(null);
  const isLoading = status === "loading";

  usePageMotion(rootRef, [isLoading]);

  return (
    <PageShell ref={rootRef}>
      <Head>
        <title>Docker Practice - Choose Your Mode | Interview Nerd</title>
        <meta
          name="description"
          content="Choose between Concepts and Exercises modes for Docker practice"
        />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "Docker Practice" },
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
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-neutral-50">
              <span className="block">
                <SplitTitle text="Docker" />
              </span>
              <span className="block">
                <SplitTitle text="Practice" accent />
              </span>
            </h1>

            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
              Master Docker from the ground up. Learn core concepts with
              structured guidance or jump straight into hands-on Dockerfile
              exercises.
            </p>
          </div>
        </section>

        {/* Mode Cards */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Concepts Card */}
            <Link
              href="/docker-practice/concepts"
              onMouseMove={trackSpotlight}
              className="spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4FF4F]">
                    <Layers className="h-7 w-7 text-neutral-950" />
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-100" />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-neutral-50 mb-2">
                  Learn Concepts
                </h2>
                <p className="text-sm leading-relaxed text-neutral-400 mb-6">
                  Structured Docker learning with progressive levels
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <CheckCircle size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Beginner Level
                      </p>
                      <p className="text-xs text-neutral-400">
                        Images, containers, basic commands
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <TrendingUp size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Intermediate Level
                      </p>
                      <p className="text-xs text-neutral-400">
                        Volumes, networking, Docker Compose
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <Sparkles size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Advanced Level
                      </p>
                      <p className="text-xs text-neutral-400">
                        Multi-stage builds, optimisation, orchestration
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D4FF4F] px-6 py-3 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(212,255,79,0.6)]">
                  Concepts
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Link>

            {/* Exercises Card */}
            <Link
              href="/docker-practice/exercises"
              onMouseMove={trackSpotlight}
              className="spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4FF4F]">
                    <Terminal className="h-7 w-7 text-neutral-950" />
                  </div>
                  <ArrowUpRight className="h-6 w-6 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-100" />
                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-neutral-50 mb-2">
                  Dockerfile Exercises
                </h2>
                <p className="text-sm leading-relaxed text-neutral-400 mb-6">
                  Hands-on Dockerfile writing challenges
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4FF4F] flex items-center justify-center mt-0.5">
                      <Target size={14} className="text-neutral-950" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-50 text-sm">
                        Full Access
                      </p>
                      <p className="text-xs text-neutral-400">
                        All exercises from beginner to advanced
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
                        Practice any exercise without prerequisites
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
                        Write Dockerfiles at your own speed and style
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D4FF4F] px-6 py-3 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_30px_-6px_rgba(212,255,79,0.6)]">
                  Exercises
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
