import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ArrowLeft,
  Container,
  Layers,
  Terminal,
  Network,
  HardDrive,
  Wrench,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { dockerConcepts } from "@/data/dockerData";

// ─── Icon / style maps ────────────────────────────────────────────────────────
const ICON_MAP = { Container, Layers, Terminal, Network, HardDrive, Wrench };

const DIFFICULTY_BADGE = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Advanced: "bg-red-100 text-red-700 border-red-200",
};

const LEVEL_STYLES = {
  Beginner: { accent: "from-green-500 to-emerald-600" },
  Intermediate: { accent: "from-yellow-500 to-orange-500" },
  Advanced: { accent: "from-red-500 to-rose-600" },
};

// ─── Basic structural checker ─────────────────────────────────────────────────
function checkAnswer(userCode, solution, fileType) {
  const normalize = (s) =>
    s
      .trim()
      .split("\n")
      .map((l) => l.trim().replace(/\s+/g, " "))
      .filter((l) => l && !l.startsWith("#"))
      .join("\n")
      .toUpperCase();

  const userNorm = normalize(userCode);
  const solNorm = normalize(solution);

  if (userNorm === solNorm) return "correct";

  // Dockerfile key-instruction matching
  if (fileType === "Dockerfile") {
    const keyLines = solNorm
      .split("\n")
      .filter((l) =>
        l.match(/^(FROM|RUN|COPY|CMD|ENTRYPOINT|EXPOSE|ENV|WORKDIR|ARG|VOLUME)/)
      );
    const matched = keyLines.filter((inst) => userNorm.includes(inst));
    return matched.length >= Math.ceil(keyLines.length * 0.6)
      ? "partial"
      : "wrong";
  }

  // docker-compose.yml — check key YAML keys
  const composeKeys = ["services", "image", "build", "ports", "volumes", "networks", "environment", "depends_on"];
  const matchedKeys = composeKeys.filter(
    (k) => solNorm.includes(k.toUpperCase()) && userNorm.includes(k.toUpperCase())
  );
  return matchedKeys.length >= Math.ceil(composeKeys.filter(k => solNorm.includes(k.toUpperCase())).length * 0.6)
    ? "partial"
    : "wrong";
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ConceptExercises() {
  const router = useRouter();
  const { id } = router.query;

  const concept = dockerConcepts.find((c) => String(c.id) === String(id));

  const exercises = concept?.exercises ?? [];

  const [selected, setSelected] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Initialise selected once exercises are available (after hydration)
  const activeExercise = selected ?? exercises[0] ?? null;

  const selectExercise = (ex) => {
    setSelected(ex);
    setUserCode("");
    setShowSolution(false);
    setShowHints(false);
    setFeedback(null);
  };

  const handleCheck = () => {
    if (!activeExercise) return;
    setFeedback(
      checkAnswer(userCode, activeExercise.solution, activeExercise.fileType)
    );
  };

  const handleReset = () => {
    setUserCode("");
    setFeedback(null);
    setShowSolution(false);
    setShowHints(false);
  };

  // ── Not found ──
  if (!concept) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Concept not found.</p>
          <button
            onClick={() => router.push("/docker-practice/concepts")}
            className="text-cyan-600 hover:underline text-sm"
          >
            ← Back to Concepts
          </button>
        </div>
      </div>
    );
  }

  const Icon = ICON_MAP[concept.icon] ?? Container;
  const styles = LEVEL_STYLES[concept.level] ?? LEVEL_STYLES.Beginner;
  const badgeClass = (ex) =>
    DIFFICULTY_BADGE[ex.difficulty] ?? DIFFICULTY_BADGE.Beginner;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>
          {concept.title} Exercises | Docker Practice | Interview Nerd
        </title>
        <meta
          name="description"
          content={`Hands-on Dockerfile exercises for Docker concept: ${concept.title}`}
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

              {/* Breadcrumb */}
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
                <button
                  onClick={() => router.push("/docker-practice/concepts")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Concepts
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate max-w-[160px]">
                  {concept.title}
                </span>
              </nav>
            </div>

            <button
              onClick={() => router.push("/docker-practice/concepts")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-cyan-200 text-cyan-700 bg-cyan-50 hover:bg-cyan-100 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Concepts
            </button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
        {/* ── Left sidebar ── */}
        <aside className="hidden md:flex flex-col w-72 xl:w-80 border-r border-gray-200 bg-white shrink-0">
          {/* Concept info */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`p-2 rounded-xl bg-gradient-to-br ${styles.accent}`}
              >
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">
                  {concept.title}
                </h2>
                <p className="text-xs text-gray-500">{concept.level}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              {exercises.length} exercise{exercises.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Exercise list */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-2">
            {exercises.map((ex) => (
              <button
                key={ex.id}
                onClick={() => selectExercise(ex)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                  activeExercise?.id === ex.id
                    ? "border-cyan-400 bg-cyan-50 shadow-sm"
                    : "border-gray-100 bg-gray-50 hover:border-cyan-200 hover:bg-cyan-50/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`font-medium text-sm leading-5 ${
                      activeExercise?.id === ex.id
                        ? "text-cyan-900"
                        : "text-gray-800"
                    }`}
                  >
                    {ex.title}
                  </p>
                  <ChevronRight
                    size={14}
                    className={`mt-0.5 shrink-0 ${
                      activeExercise?.id === ex.id
                        ? "text-cyan-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badgeClass(ex)}`}
                  >
                    {ex.difficulty}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {ex.fileType}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer nav */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => router.push("/docker-practice/exercises")}
              className="w-full py-2 rounded-xl text-xs font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 transition-colors"
            >
              All Exercises →
            </button>
          </div>
        </aside>

        {/* ── Right panel ── */}
        <main className="flex-1 overflow-y-auto">
          {activeExercise ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">
              {/* Exercise description */}
              <motion.div
                key={activeExercise.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border font-semibold ${badgeClass(activeExercise)}`}
                  >
                    {activeExercise.difficulty}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-mono">
                    {activeExercise.fileType}
                  </span>
                  {activeExercise.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {activeExercise.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {activeExercise.description}
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
                      {activeExercise.hints.map((hint, i) => (
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

              {/* Editor */}
              <motion.div
                key={`${activeExercise.id}-editor`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700"
              >
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-gray-400" />
                      <span className="text-gray-300 text-xs font-mono">
                        {activeExercise.fileType}
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
                  placeholder={
                    activeExercise.fileType === "docker-compose.yml"
                      ? `# Write your docker-compose.yml here...\nversion: "3.9"\n\nservices:\n  `
                      : `# Write your Dockerfile here...\nFROM `
                  }
                  spellCheck={false}
                  className="w-full bg-gray-900 text-gray-100 font-mono text-sm leading-6 p-5 resize-none outline-none placeholder-gray-600 min-h-[280px]"
                  rows={16}
                />

                {/* Actions */}
                <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleCheck}
                    disabled={!userCode.trim()}
                    className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
                  >
                    Check Answer
                  </button>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-colors"
                  >
                    {showSolution ? "Hide Solution" : "Show Solution"}
                  </button>

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
                    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-emerald-700 shadow-xl">
                      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-emerald-800">
                        <Layers size={14} className="text-emerald-400" />
                        <span className="text-emerald-300 text-xs font-mono font-semibold">
                          Solution — {activeExercise.fileType}
                        </span>
                      </div>
                      <pre className="text-green-300 font-mono text-sm leading-6 p-5 overflow-x-auto whitespace-pre-wrap">
                        {activeExercise.solution}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile exercise list */}
              <div className="md:hidden bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
                  Other Exercises
                </p>
                <div className="space-y-2">
                  {exercises
                    .filter((e) => e.id !== activeExercise.id)
                    .map((ex) => (
                      <button
                        key={ex.id}
                        onClick={() => selectExercise(ex)}
                        className="w-full text-left p-3 rounded-xl border border-gray-100 bg-gray-50 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all"
                      >
                        <p className="font-medium text-sm text-gray-800">
                          {ex.title}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badgeClass(ex)}`}
                          >
                            {ex.difficulty}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {ex.fileType}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No exercises for this concept yet.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
