import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  BookOpen,
  User,
  Settings,
  ArrowLeft,
  Container,
  Layers,
  Terminal,
  Network,
  HardDrive,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { dockerConcepts } from "@/data/dockerData";

// ─── Map icon name strings → lucide components ────────────────────────────────
const ICON_MAP = {
  Container,
  Layers,
  Terminal,
  Network,
  HardDrive,
  Wrench,
};

// ─── Level → styling ─────────────────────────────────────────────────────────
const LEVEL_STYLES = {
  Beginner: {
    badge: "bg-green-100 text-green-700 border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  Intermediate: {
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  Advanced: {
    badge: "bg-red-100 text-red-700 border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
};

export default function DockerConcepts() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Docker Concepts | Docker Practice | Interview Nerd</title>
        <meta
          name="description"
          content="Learn Docker concepts progressively from beginner to advanced"
        />
      </Head>

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
                  <BookOpen size={24} className="text-cyan-600" />
                </div>
                <h1 className="hidden lg:block text-xl font-bold text-gray-900">
                  Interview Nerd
                </h1>
              </div>

              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Home
                </button>
                <span>/</span>
                <button
                  onClick={() => router.push("/docker-practice")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Docker Practice
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">Concepts</span>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/docker-practice")}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-cyan-200 text-cyan-700 bg-cyan-50 hover:bg-cyan-100 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Docker Practice
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <User size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl">
              <Layers size={40} className="text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Docker Concepts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A structured path from beginner to advanced — {dockerConcepts.length} concept
            cards covering everything you need for Docker interviews.
          </p>
        </motion.div>

        {/* ── Concept cards — driven entirely by dockerData.js ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dockerConcepts.map((concept, i) => {
            const Icon = ICON_MAP[concept.icon] ?? Container;
            const styles = LEVEL_STYLES[concept.level] ?? LEVEL_STYLES.Beginner;

            return (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="p-6 flex-1">
                  {/* Icon + level badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${styles.iconBg}`}>
                      <Icon size={22} className={styles.iconColor} />
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full border font-semibold ${styles.badge}`}
                    >
                      {concept.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {concept.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {concept.summary}
                  </p>

                  {/* Topic bullets */}
                  <ul className="space-y-1.5">
                    {concept.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <ChevronRight
                          size={13}
                          className="text-cyan-500 shrink-0"
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer CTA */}
                <div className="px-6 pb-5">
                  <button
                    onClick={() =>
                      router.push(`/docker-practice/concepts/${concept.id}`)
                    }
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow hover:shadow-md transition-all duration-200"
                  >
                    View Questions →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
