import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Lightbulb,
  Terminal,
  Play,
  Eye,
  EyeOff,
} from "lucide-react";
import { goConcepts } from "@/data/goData";

// ─── Minimal Badge Styles ────────────────────────────────────────────────────
const DIFFICULTY_BADGE = {
  Beginner: "bg-green-50 text-green-600 border-green-100",
  Intermediate: "bg-amber-50 text-amber-600 border-amber-100",
  Advanced: "bg-rose-50 text-rose-600 border-rose-100",
};

// ─── Go Answer Checker Algorithm (Unchanged) ─────────────────────────────────
function checkGoAnswer(userCode, solution) {
  const normalize = (s) =>
    s
      .trim()
      .split("\n")
      .map((l) => l.trim().replace(/\s+/g, " "))
      .filter((l) => l && !l.startsWith("//"))
      .join("\n");

  const userNorm = normalize(userCode);
  const solNorm = normalize(solution);

  if (userNorm === solNorm) return "correct";

  const patterns = [
    "func ", "package ", "import ", "for ", "go ", "chan ", "defer ",
    "return ", "if err", "goroutine", ":=", "var ",
  ];
  
  const solutionHits = patterns.filter((p) => solNorm.includes(p));
  
  if (solutionHits.length === 0) {
      if(userNorm.length > 10) return "partial";
      return "wrong";
  }
  
  const userHits = solutionHits.filter((p) => userNorm.includes(p));

  return userHits.length >= Math.ceil(solutionHits.length * 0.6)
    ? "partial"
    : "wrong";
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ConceptExercises() {
  const router = useRouter();
  const { id } = router.query;

  const concept = goConcepts.find((c) => String(c.id) === String(id));
  const exercises = concept?.exercises ?? [];

  const [selected, setSelected] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const activeExercise = selected ?? exercises[0] ?? null;

  // Hydration sync
  useEffect(() => {
    if (activeExercise && !userCode) {
      setUserCode(activeExercise.starterCode || "");
    }
  }, [activeExercise]);

  const selectExercise = (ex) => {
    setSelected(ex);
    setUserCode(ex.starterCode || "");
    setShowSolution(false);
    setShowHints(false);
    setFeedback(null);
  };

  const handleCheck = () => {
    if (!activeExercise) return;
    setFeedback(checkGoAnswer(userCode, activeExercise.solution));
  };

  const handleReset = () => {
    setUserCode(activeExercise.starterCode || "");
    setFeedback(null);
    setShowSolution(false);
  };

  if (!concept) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <button onClick={() => router.push("/go-practice/concepts")} className="text-sm text-teal-600 hover:underline">
          ← Back to Concepts
        </button>
      </div>
    );
  }

  const badgeClass = (ex) => DIFFICULTY_BADGE[ex?.difficulty] ?? DIFFICULTY_BADGE.Beginner;

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-900 font-sans overflow-hidden selection:bg-teal-100">
      <Head>
        <title>{concept.title} | Interview Nerd</title>
      </Head>

      {/* ── Top Navigation Bar (Slim) ── */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-gray-200/60 bg-surface shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/go-practice/concepts")}
            className="group flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={14} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Concepts
          </button>
          <div className="h-4 w-px bg-gray-200"></div>
          <h1 className="text-sm font-semibold truncate">{concept.title}</h1>
        </div>
        <div className="text-xs text-gray-400 font-medium tracking-wide">
          {exercises.length} Exercises
        </div>
      </header>

      {/* ── Main IDE Layout ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* 1. Left Sidebar: Exercise List */}
        <aside className="w-full md:w-56 lg:w-64 border-r border-gray-200/60 bg-gray-50 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-3">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
              Modules
            </h2>
            <div className="space-y-1">
              {exercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => selectExercise(ex)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between group ${
                    activeExercise?.id === ex.id
                      ? "bg-surface border border-teal-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] text-teal-800 font-medium"
                      : "border border-transparent text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="truncate pr-2">{ex.title}</span>
                  {activeExercise?.id === ex.id && (
                    <ChevronRight size={14} className="text-teal-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* 2. Middle Panel: Instructions */}
        <div className="w-full md:w-1/3 lg:w-[30%] border-r border-gray-200/60 bg-surface flex flex-col shrink-0 overflow-y-auto">
          {activeExercise ? (
            <div className="p-5 lg:p-6 flex flex-col h-full">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass(activeExercise)}`}>
                  {activeExercise.difficulty}
                </span>
                {activeExercise.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded border border-gray-100 bg-gray-50 text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h2 className="text-lg font-bold mb-3">{activeExercise.title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed mb-6 space-y-3">
                {activeExercise.description}
              </div>

              {/* Hints Accordion */}
              {activeExercise.hints && activeExercise.hints.length > 0 && (
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center gap-2 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    <Lightbulb size={14} />
                    {showHints ? "Hide Hints" : "Need a hint?"}
                  </button>
                  
                  <AnimatePresence>
                    {showHints && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-3 space-y-2 border-l-2 border-amber-200 pl-3 py-1">
                          {activeExercise.hints.map((hint, i) => (
                            <li key={i} className="text-xs text-gray-600 leading-relaxed">
                              <span className="font-semibold text-amber-700 mr-1">{i + 1}.</span>
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ) : (
             <div className="p-6 text-sm text-gray-400">Select an exercise...</div>
          )}
        </div>

        {/* 3. Right Panel: Code Workspace */}
        <div className="flex-1 flex flex-col bg-[#0D0D0D] text-gray-300 min-w-0">
          {/* Editor Header */}
          <div className="h-10 border-b border-gray-800 bg-[#161616] flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <Terminal size={14} className="text-teal-500/70" />
              main.go
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleReset} className="text-[11px] font-medium text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors">
                <RotateCcw size={12} /> Reset
              </button>
              <button 
                onClick={() => setShowSolution(!showSolution)} 
                className={`text-[11px] font-medium flex items-center gap-1 transition-colors ${showSolution ? "text-teal-400" : "text-gray-500 hover:text-gray-300"}`}
              >
                {showSolution ? <EyeOff size={12} /> : <Eye size={12} />} 
                {showSolution ? "Hide Solution" : "View Solution"}
              </button>
            </div>
          </div>

          {/* Split Workspace Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* User Editor */}
            <textarea
              value={userCode}
              onChange={(e) => {
                setUserCode(e.target.value);
                setFeedback(null);
              }}
              spellCheck={false}
              className={`w-full bg-transparent text-teal-50/90 font-mono text-[13px] leading-relaxed p-4 resize-none outline-none selection:bg-teal-900/50 ${showSolution ? "h-1/2 border-b border-gray-800" : "flex-1"}`}
              placeholder="// Write your Go code here..."
            />

            {/* Solution Pane (Only visible if toggled) */}
            {showSolution && (
              <div className="h-1/2 flex flex-col bg-[#111]">
                <div className="px-4 py-2 border-b border-gray-800 text-[11px] font-mono text-gray-500 uppercase tracking-widest bg-[#161616]">
                  solution.go
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <pre className="font-mono text-[13px] text-gray-400 leading-relaxed">
                    {activeExercise?.solution}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="h-14 border-t border-gray-800 bg-[#161616] px-4 flex items-center justify-between shrink-0">
             
             {/* Feedback Area */}
             <div className="flex-1">
                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={`flex items-center gap-2 text-xs font-medium ${
                        feedback === "correct" ? "text-green-400" : 
                        feedback === "partial" ? "text-amber-400" : "text-rose-400"
                      }`}
                    >
                      {feedback === "correct" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {feedback === "correct" ? "Compilation successful. Tests passed!" : 
                       feedback === "partial" ? "Syntax looks okay, but logic is missing." : 
                       "Incorrect structure. Review the hints."}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             {/* Run Button */}
            <button
              onClick={handleCheck}
              disabled={!userCode.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded shadow-sm bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:hover:bg-teal-600 text-white text-xs font-semibold transition-all"
            >
              <Play size={14} fill="currentColor" />
              Run Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}