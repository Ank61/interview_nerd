import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  Workflow,
  FileCode,
  Cpu,
  Layers,
  Zap,
  ArrowRight,
} from "lucide-react";
import { goConcepts } from "@/data/goData";

// ─── Map icon name strings → lucide components ────────────────────────────────
const ICON_MAP = {
  Code2,
  Workflow,
  FileCode,
  Cpu,
  Layers,
  Zap,
};

// ─── Level → styling (Subtle minimalistic colors) ────────────────────────────
const LEVEL_STYLES = {
  Beginner: {
    badge: "bg-green-50 text-green-600 border-green-100",
    iconColor: "text-green-500",
  },
  Intermediate: {
    badge: "bg-amber-50 text-amber-600 border-amber-100",
    iconColor: "text-amber-500",
  },
  Advanced: {
    badge: "bg-rose-50 text-rose-600 border-rose-100",
    iconColor: "text-rose-500",
  },
};

export default function GoConcepts() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-teal-100">
      <Head>
        <title>Go Concepts | Interview Nerd</title>
        <meta
          name="description"
          content="Learn Go concepts progressively from beginner to advanced"
        />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* ── Minimal Header ── */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200/60 gap-4">
          <div>
            <button
              onClick={() => router.push("/go-practice")}
              className="group flex items-center text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors mb-3"
            >
              <ArrowLeft size={14} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Practice
            </button>
            <h1 className="text-2xl font-bold tracking-tight">Go Concepts</h1>
            <p className="text-sm text-gray-500 mt-1">
              {goConcepts?.length ?? 0} modules to master Golang
            </p>
          </div>
        </header>

        {/* ── Dense Concept Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(goConcepts || []).map((concept, i) => {
            const Icon = ICON_MAP[concept.icon] ?? Code2;
            const styles = LEVEL_STYLES[concept.level] ?? LEVEL_STYLES.Beginner;

            return (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => router.push(`/go-practice/concepts/${concept.id}`)}
                className="group relative bg-white rounded-xl border border-gray-200/70 p-4 cursor-pointer hover:border-teal-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-200 flex items-start gap-4"
              >
                {/* Minimal Icon */}
                <div className="mt-0.5 shrink-0">
                  <Icon size={18} className={styles.iconColor} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold truncate">
                      {concept.title}
                    </h3>
                    <span
                      className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${styles.badge} shrink-0`}
                    >
                      {concept.level}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {concept.summary}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-teal-500">
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}