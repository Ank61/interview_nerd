import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Terminal,
  BookOpen,
  CheckCircle,
  XCircle,
  RotateCcw,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Award,
  MessageCircle,
} from "lucide-react";
import { linuxConcepts } from "@/data/linuxData";

export default function LinuxConceptDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const concept = linuxConcepts.find((c) => String(c.id) === String(id));
  const exercises = concept?.exercises ?? [];

  const hasExtraResources =
    concept?.interview_questions_summary ||
    concept?.best_practices_checklist ||
    concept?.common_mistakes ||
    concept?.optimization_techniques ||
    concept?.bonus_challenge;

  const [selected, setSelected] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const activeMode = selected ?? (hasExtraResources ? "overview" : exercises[0]);
  const activeExercise = typeof activeMode === "object" ? activeMode : null;

  const selectExercise = (ex) => {
    setSelected(ex);
    setUserCode("");
    setShowSolution(false);
    setShowHints(false);
    setShowQuestions(false);
    setShowCommands(false);
    setFeedback(null);
  };

  const badgeClass = (ex) => {
    switch (ex.difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const checkAnswer = () => {
    if (!activeExercise) return;

    const normalize = (code) =>
      code
        .replace(/\\/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const normalUser = normalize(userCode);
    const normalSolution = normalize(activeExercise.solution);

    if (normalUser === normalSolution) {
      setFeedback({ type: "success", msg: "Command executes perfectly!" });
      return;
    }

    const requiredCommands = normalSolution.split(" ");
    const userCommands = normalUser.split(" ");

    const cmdName = requiredCommands[0];
    if (userCommands[0] !== cmdName) {
      setFeedback({
        type: "error",
        msg: `Syntax error. Expected to run '${cmdName}' process.`,
      });
      return;
    }

    let matchCount = 0;
    for (let word of requiredCommands) {
      if (normalUser.includes(word)) {
        matchCount++;
      }
    }

    if (matchCount / requiredCommands.length >= 0.8) {
      setFeedback({
        type: "partial",
        msg: "You're close! Check your flags, wildcards, and absolute vs relative paths.",
      });
    } else {
      setFeedback({
        type: "error",
        msg: "Command not found or invalid arguments provided. Try again.",
      });
    }
  };

  if (!mounted || !concept) return null;

  return (
    <>
      <Head>
        <title>{concept.title} | Linux Practice</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/linux-practice/concepts"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="font-bold text-lg text-gray-900">
                {concept.title}
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-orange-600 font-medium bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
              <Terminal size={16} />
              Linux Terminal
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)] flex-col md:flex-row">
          <aside className="w-full md:w-80 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">{concept.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {exercises.length} exercise{exercises.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <div className="md:hidden bg-gray-50 p-4 border-b border-gray-200">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">
                Contents
              </p>
              <div className="space-y-2">
                {hasExtraResources && activeMode !== "overview" && (
                  <button
                    onClick={() => {
                      setSelected("overview");
                      setFeedback(null);
                    }}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-all font-medium flex justify-between text-sm items-center"
                  >
                    <span className="flex items-center gap-2 text-gray-700">
                      <BookOpen size={16} /> Study Guide
                    </span>
                    <ChevronRight size={14} className="text-gray-400" />
                  </button>
                )}
                {exercises
                  .filter((e) => e.id !== activeMode?.id)
                  .map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => selectExercise(ex)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-all"
                    >
                      <p className="font-medium text-sm text-gray-900 flex items-center justify-between">
                        {ex.title}
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${badgeClass(ex)}`}>
                          {ex.difficulty.substring(0,3).toUpperCase()}
                        </span>
                      </p>
                    </button>
                  ))}
              </div>
            </div>

            <div className="hidden md:block flex-1 overflow-y-auto p-3 space-y-2">
              {hasExtraResources && (
                <button
                  onClick={() => {
                    setSelected("overview");
                    setFeedback(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 mb-4 ${
                    activeMode === "overview"
                      ? "border-orange-400 bg-orange-50 shadow-sm"
                      : "border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`font-medium text-sm leading-5 flex items-center gap-2 ${
                        activeMode === "overview" ? "text-orange-900" : "text-gray-700"
                      }`}
                    >
                      <BookOpen size={16} className={activeMode === "overview" ? "text-orange-600" : "text-gray-400"} />
                      Study Guide
                    </p>
                    <ChevronRight
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        activeMode === "overview" ? "text-orange-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                </button>
              )}

              {exercises.length > 0 && (
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
                  Exercises
                </div>
              )}
              {exercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => selectExercise(ex)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                    activeMode?.id === ex.id
                      ? "border-orange-400 bg-orange-50 shadow-sm"
                      : "border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`font-medium text-sm leading-5 ${
                        activeMode?.id === ex.id ? "text-orange-900" : "text-gray-700"
                      }`}
                    >
                      {ex.title}
                    </p>
                    <ChevronRight
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        activeMode?.id === ex.id ? "text-orange-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${badgeClass(
                        ex
                      )}`}
                    >
                      {ex.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto bg-gray-50">
            {activeMode === "overview" ? (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Module Overview
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">{concept.summary}</p>

                  <div className="space-y-10">
                    {concept.interview_questions_summary && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 p-2 bg-purple-50 rounded-lg text-purple-900 w-fit">
                          <Terminal size={20} className="text-purple-600" /> Common Interview Questions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {concept.interview_questions_summary.map((q, i) => (
                            <div
                              key={i}
                              className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-gray-700 flex items-start gap-3 hover:border-purple-200 transition-colors"
                            >
                              <div className="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5 text-sm">
                                {i + 1}
                              </div>
                              <p className="text-sm font-medium">{q}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {concept.best_practices_checklist && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 p-2 bg-emerald-50 rounded-lg text-emerald-900 w-fit">
                          <FileCheck size={20} className="text-emerald-600" /> Best Practices
                        </h3>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                          {concept.best_practices_checklist.map((p, i) => (
                            <div key={i} className={`flex items-start gap-3 p-4 text-gray-700 ${i !== concept.best_practices_checklist.length - 1 ? 'border-b border-gray-100' : ''}`}>
                              <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-sm">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {concept.common_mistakes && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 p-2 bg-red-50 rounded-lg text-red-900 w-fit">
                          <AlertTriangle size={20} className="text-red-500" /> Common Mistakes
                        </h3>
                        <div className="bg-red-50/50 border border-red-100 rounded-xl overflow-hidden shadow-sm">
                          {concept.common_mistakes.map((m, i) => (
                            <div key={i} className={`flex items-start gap-3 p-4 text-gray-700 ${i !== concept.common_mistakes.length - 1 ? 'border-b border-red-100' : ''}`}>
                              <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                              <span className="text-sm">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {concept.optimization_techniques && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 p-2 bg-cyan-50 rounded-lg text-cyan-900 w-fit">
                          <TrendingUp size={20} className="text-cyan-600" /> Optimization Techniques
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {concept.optimization_techniques.map((t, i) => (
                            <div
                              key={i}
                              className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 relative overflow-hidden group hover:border-cyan-300 transition-all"
                            >
                              <div className="absolute top-0 right-0 bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                {t.savings}
                              </div>
                              <h4 className="font-bold text-gray-900 mb-2 pr-16">{t.name}</h4>
                              <p className="text-sm text-gray-600 mb-4">{t.description}</p>
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono text-cyan-700">
                                {t.example}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {concept.bonus_challenge && (
                      <div className="mt-8 border-t border-gray-200 pt-8">
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
                          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                            <Award size={160} className="text-amber-600" />
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wide">
                                Bonus Challenge
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              {concept.bonus_challenge.title}
                            </h3>
                            <p className="text-gray-700 mb-6 max-w-2xl">
                              {concept.bonus_challenge.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white/60 border border-amber-100 rounded-xl p-4">
                                <h4 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                                  <CheckCircle size={16} className="text-amber-600" /> Requirements
                               </h4>
                                <ul className="space-y-2">
                                  {concept.bonus_challenge.requirements?.map((r, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-white/60 border border-amber-100 rounded-xl p-4">
                                <h4 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                                  <TrendingUp size={16} className="text-amber-600" /> Success Metrics
                                </h4>
                                <ul className="space-y-2">
                                  {concept.bonus_challenge.success_metrics?.map((m, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                                      {m}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {concept.bonus_challenge.phases && (
                              <div className="mt-6">
                                <h4 className="text-base font-bold text-gray-900 mb-4">Implementation Phases</h4>
                                <div className="space-y-3">
                                  {concept.bonus_challenge.phases.map((p, i) => (
                                    <div key={i} className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
                                      <div className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                                        {p.phase}
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-bold text-gray-900 mb-1">
                                          {p.name}
                                        </h5>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          {p.tasks.map((t, j) => (
                                            <span
                                              key={j}
                                              className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-1 rounded-md font-mono"
                                            >
                                              {t}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ) : activeExercise ? (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">
                <motion.div
                  key={activeExercise.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Terminal size={20} className="text-orange-600" />
                      {activeExercise.title}
                    </h2>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${badgeClass(activeExercise)}`}>
                      {activeExercise.fileType}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mt-4">
                    {activeExercise.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6 bg-gray-50 border border-gray-100 rounded-xl p-2 px-3">
                    {activeExercise.hints && activeExercise.hints.length > 0 && (
                      <button
                        onClick={() => setShowHints(!showHints)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          showHints ? "text-amber-700" : "text-amber-600 hover:text-amber-700"
                        }`}
                      >
                        <Lightbulb size={16} />
                        {showHints ? "Hide hints" : "Show hints"}
                      </button>
                    )}

                    {activeExercise.interview_questions && activeExercise.interview_questions.length > 0 && (
                      <button
                        onClick={() => setShowQuestions(!showQuestions)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          showQuestions ? "text-purple-700" : "text-purple-600 hover:text-purple-700"
                        }`}
                      >
                        <MessageCircle size={16} />
                        {showQuestions ? "Hide Interview Qs" : "Interview Questions"}
                      </button>
                    )}

                    {activeExercise.commands_to_practice && activeExercise.commands_to_practice.length > 0 && (
                      <button
                        onClick={() => setShowCommands(!showCommands)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          showCommands ? "text-blue-700" : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        <Terminal size={16} />
                        {showCommands ? "Hide Commands" : "Practice Commands"}
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 mt-3">
                    <AnimatePresence>
                      {showHints && activeExercise.hints && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <ol className="space-y-1.5">
                            {activeExercise.hints.map((hint, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-gray-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2"
                              >
                                <span className="font-bold text-amber-600 shrink-0">#{i + 1}.</span>
                                {hint}
                              </li>
                            ))}
                          </ol>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {showQuestions && activeExercise.interview_questions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-1.5">
                            {activeExercise.interview_questions.map((q, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-purple-800 bg-purple-50 border border-purple-100 rounded-lg px-3 py-2"
                              >
                                <span className="font-bold text-purple-600 shrink-0 mt-0.5">?</span>
                                {q}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {showCommands && activeExercise.commands_to_practice && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-1.5">
                            {activeExercise.commands_to_practice.map((cmd, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-blue-800 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2"
                              >
                                <span className="font-mono text-blue-700">$ {cmd}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <div className="bg-[#1e1e1e] rounded-xl overflow-hidden flex flex-col shadow-xl">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                      <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <span className="text-xs font-mono text-gray-400">
                      bash
                    </span>
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="text-xs text-gray-400 hover:text-white font-mono transition-colors"
                    >
                      {showSolution ? "Hide Solution" : "Show Solution"}
                    </button>
                  </div>

                  <div className="p-4 relative">
                    <div className="flex font-mono">
                      <span className="text-orange-500 mr-2">$</span>
                      <textarea
                        value={userCode}
                        onChange={(e) => {
                          setUserCode(e.target.value);
                          setFeedback(null);
                        }}
                        placeholder="Type your command here..."
                        className="w-full bg-transparent text-gray-100 placeholder-gray-600 outline-none resize-none text-sm leading-relaxed"
                        rows={6}
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  <div className="bg-[#252526] p-3 flex justify-between items-center border-t border-[#404040]">
                    <button
                      onClick={checkAnswer}
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      <Terminal size={16} />
                      Run Command
                    </button>

                    {feedback && (
                      <div className="flex items-center gap-2 text-sm font-medium animate-in fade-in zoom-in duration-200">
                        {feedback.type === "success" && (
                          <div className="text-green-400 flex items-center gap-2">
                            <CheckCircle size={18} /> {feedback.msg}
                          </div>
                        )}
                        {feedback.type === "partial" && (
                          <div className="text-yellow-400 flex items-center gap-2">
                            <AlertTriangle size={18} /> {feedback.msg}
                          </div>
                        )}
                        {feedback.type === "error" && (
                          <div className="text-red-400 flex items-center gap-2">
                            <XCircle size={18} /> {feedback.msg}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {showSolution && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-900 rounded-xl p-5 relative">
                        <div className="absolute top-0 right-0 bg-gray-800 text-gray-400 px-3 py-1 text-xs rounded-bl-lg font-mono">
                          Solution
                        </div>
                        <pre className="text-sm text-green-400 font-mono overflow-x-auto mt-2">
                          {activeExercise.solution}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </>
  );
}
