import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Terminal,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { allLinuxExercises } from "@/data/linuxData";

export default function LinuxExercises() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const filteredExercises = useMemo(() => {
    return allLinuxExercises.filter((ex) => {
      const matchesSearch =
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDifficulty =
        difficultyFilter === "all" ||
        ex.difficulty.toLowerCase() === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  const [activeExercise, setActiveExercise] = useState(filteredExercises[0] || null);
  const [userCode, setUserCode] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // When filters change, reset active exercise if it's no longer in the list
  useEffect(() => {
    if (filteredExercises.length > 0) {
      if (!filteredExercises.find((e) => e.id === activeExercise?.id)) {
        selectExercise(filteredExercises[0]);
      }
    } else {
      setActiveExercise(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredExercises]);

  const selectExercise = (ex) => {
    setActiveExercise(ex);
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

    // Exact match
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

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Linux Command Exercises | Interview Nerd</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/linux-practice"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="font-bold text-lg text-gray-900">Exercises</h1>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)] flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-96 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50/50 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <Filter size={14} className="text-gray-400 shrink-0" />
                {["all", "beginner", "intermediate", "advanced"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap transition-colors ${
                      difficultyFilter === diff
                        ? "bg-orange-50 border-orange-200 text-orange-700"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Found {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredExercises.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No matching exercises found.</p>
                </div>
              ) : (
                filteredExercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => selectExercise(ex)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      activeExercise?.id === ex.id
                        ? "border-orange-400 bg-orange-50 shadow-sm"
                        : "border-gray-100 bg-gray-50 hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <div className="text-xs text-gray-500 mb-1 font-medium truncate">
                      {ex.conceptTitle}
                    </div>
                    <div className="font-semibold text-sm text-gray-900 mb-2 truncate">
                      {ex.title}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${badgeClass(ex)}`}>
                        {ex.difficulty}
                      </span>
                      {ex.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* Main Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {activeExercise ? (
                <>
                  <motion.div
                    key={activeExercise.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Terminal size={24} className="text-orange-600" />
                        {activeExercise.title}
                      </h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed mt-4">
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
                          {showHints ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
                          {showQuestions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
                          {showCommands ? "Hide Commands" : "Commands"}
                          {showCommands ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
                                  <span className="font-bold text-amber-600 shrink-0">{i + 1}.</span>
                                  {hint}
                                </li>
                              ))}
                            </ol>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Terminal Editor */}
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
                </>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  Select an exercise from the sidebar to begin.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
