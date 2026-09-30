import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  User,
  Settings,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Terminal,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Container,
  Layers,
} from "lucide-react";
import { dockerExercises } from "@/data/dockerData";

// ─── Difficulty badge colours ─────────────────────────────────────────────────
const DIFFICULTY_BADGE = {
  Beginner:     "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Advanced:     "bg-red-100 text-red-700 border-red-200",
};

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DockerExercises() {
  const router = useRouter();

  const [selected, setSelected]         = useState(dockerExercises[0]);
  const [userCode, setUserCode]         = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints]       = useState(false);
  const [feedback, setFeedback]         = useState(null); // "correct" | "partial" | "wrong" | null
  const [filter, setFilter]             = useState("All");

  const selectExercise = (ex) => {
    setSelected(ex);
    setUserCode("");
    setShowSolution(false);
    setShowHints(false);
    setFeedback(null);
  };

  // Basic structural checker — validates key Dockerfile instructions
  const handleCheck = () => {
    const normalize = (s) =>
      s
        .trim()
        .split("\n")
        .map((l) => l.trim().replace(/\s+/g, " "))
        .filter((l) => l && !l.startsWith("#"))
        .join("\n")
        .toUpperCase();

    const userNorm     = normalize(userCode);
    const solutionNorm = normalize(selected.solution);

    if (userNorm === solutionNorm) {
      setFeedback("correct");
    } else {
      const keyLines = solutionNorm
        .split("\n")
        .filter((l) =>
          l.match(/^(FROM|RUN|COPY|CMD|ENTRYPOINT|EXPOSE|ENV|WORKDIR)/)
        );
      const matched = keyLines.filter((inst) => userNorm.includes(inst));
      setFeedback(
        matched.length >= Math.ceil(keyLines.length * 0.6) ? "partial" : "wrong"
      );
    }
  };

  const handleReset = () => {
    setUserCode("");
    setFeedback(null);
    setShowSolution(false);
    setShowHints(false);
  };

  const filtered =
    filter === "All"
      ? dockerExercises
      : dockerExercises.filter((e) => e.difficulty === filter);

  const badgeClass = (ex) =>
    DIFFICULTY_BADGE[ex.difficulty] ?? DIFFICULTY_BADGE.Beginner;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dockerfile Exercises | Docker Practice | Interview Nerd</title>
        <meta
          name="description"
          content="Hands-on Dockerfile writing exercises for interview preparation"
        />
      </Head>

      {/* ── Header ── */}
      <header className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-50">
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
                <span className="text-gray-900 font-medium">Exercises</span>
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

      {/* ── Body ── */}
      <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
        {/* ── Left sidebar: exercise list ── */}
        <aside className="hidden md:flex flex-col w-72 xl:w-80 border-r border-gray-200 bg-surface shrink-0">
          {/* heading */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Container size={18} className="text-cyan-600" />
              <h2 className="font-semibold text-gray-900 text-base">
                Dockerfile Exercises
              </h2>
            </div>
            <p className="text-xs text-gray-500">
              {dockerExercises.length} challenges available
            </p>
          </div>

          {/* difficulty filter */}
          <div className="px-5 py-3 flex flex-wrap gap-2 border-b border-gray-100">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`text-xs px-3 py-1 rounded-full font-medium border transition-colors ${
                  filter === d
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "bg-surface text-gray-600 border-gray-200 hover:border-cyan-400 hover:text-cyan-600"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* exercise list — auto-populated from dockerData.js */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-2">
            {filtered.map((ex) => (
              <button
                key={ex.id}
                onClick={() => selectExercise(ex)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group ${
                  selected.id === ex.id
                    ? "border-cyan-400 bg-cyan-50 shadow-sm"
                    : "border-gray-100 bg-gray-50 hover:border-cyan-200 hover:bg-cyan-50/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`font-medium text-sm leading-5 ${
                      selected.id === ex.id ? "text-cyan-900" : "text-gray-800"
                    }`}
                  >
                    {ex.title}
                  </p>
                  <ChevronRight
                    size={14}
                    className={`mt-0.5 shrink-0 ${
                      selected.id === ex.id
                        ? "text-cyan-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <span
                  className={`mt-1.5 inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${badgeClass(ex)}`}
                >
                  {ex.difficulty}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* ── Right panel: editor ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">
            {/* Exercise description card */}
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-surface rounded-2xl border border-gray-200 shadow-sm p-6"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full border font-semibold ${badgeClass(selected)}`}
                >
                  {selected.difficulty}
                </span>
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {selected.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {selected.description}
              </p>

              {/* Hints toggle */}
              <button
                onClick={() => setShowHints(!showHints)}
                className="mt-4 flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                <Lightbulb size={16} />
                {showHints ? "Hide hints" : "Show hints"}
                {showHints ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>

              <AnimatePresence>
                {showHints && (
                  <motion.ol
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-1.5 overflow-hidden"
                  >
                    {selected.hints.map((hint, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2"
                      >
                        <span className="font-bold text-amber-600 shrink-0">
                          {i + 1}.
                        </span>
                        {hint}
                      </li>
                    ))}
                  </motion.ol>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Code editor */}
            <motion.div
              key={`${selected.id}-editor`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-neutral-900 rounded-2xl overflow-hidden shadow-xl border border-neutral-700"
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-neutral-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-gray-400" />
                    <span className="text-gray-300 text-xs font-mono">
                      Dockerfile
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <RotateCcw size={13} />
                  Reset
                </button>
              </div>

              {/* Textarea */}
              <textarea
                value={userCode}
                onChange={(e) => {
                  setUserCode(e.target.value);
                  setFeedback(null);
                }}
                placeholder={`# Write your Dockerfile here...\nFROM `}
                spellCheck={false}
                className="w-full bg-neutral-900 text-neutral-100 font-mono text-sm leading-6 p-5 resize-none outline-none placeholder-neutral-600 min-h-[280px]"
                rows={16}
              />

              {/* Actions bar */}
              <div className="px-4 py-3 bg-neutral-800 border-t border-neutral-700 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCheck}
                  disabled={!userCode.trim()}
                  className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
                >
                  Check Answer
                </button>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-5 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-200 text-sm font-medium transition-colors"
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </button>

                {/* Feedback */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                        feedback === "correct"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : feedback === "partial"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {feedback === "correct" ? (
                        <CheckCircle size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {feedback === "correct"
                        ? "Perfect! 🎉"
                        : feedback === "partial"
                        ? "Partially correct — review hints"
                        : "Not quite — check the instructions again"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Solution panel */}
            <AnimatePresence>
              {showSolution && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-emerald-700 shadow-xl">
                    <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800 border-b border-emerald-800">
                      <Layers size={14} className="text-emerald-400" />
                      <span className="text-emerald-300 text-xs font-mono font-semibold">
                        Solution
                      </span>
                    </div>
                    <pre className="text-green-300 font-mono text-sm leading-6 p-5 overflow-x-auto whitespace-pre-wrap">
                      {selected.solution}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile exercise list */}
            <div className="md:hidden bg-surface rounded-2xl border border-gray-200 shadow-sm p-4">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
                Other Exercises
              </p>
              <div className="space-y-2">
                {dockerExercises
                  .filter((e) => e.id !== selected.id)
                  .map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => selectExercise(ex)}
                      className="w-full text-left p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all"
                    >
                      <p className="font-medium text-sm text-gray-800">
                        {ex.title}
                      </p>
                      <span
                        className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${badgeClass(ex)}`}
                      >
                        {ex.difficulty}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
