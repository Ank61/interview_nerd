import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  mcqQuestions,
  nodeMCQs,
  reactMCQs,
  jsMCQs,
  tsMCQs,
  sqlMCQs,
  oopMCQs,
  mongodbMCQs,
} from "@/data/mcqDatasets";
import {
  Lock,
  Trophy,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Home,
  RotateCcw,
  Filter,
  BookOpen,
  User,
  Settings,
  Sparkles,
  Target,
  Award,
} from "lucide-react";

const BATCH_SIZE = 20;
const PASS_THRESHOLD = 16;

export default function PracticeMCQ() {
  const router = useRouter();
  const { category } = router.query;

  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [batchAnswers, setBatchAnswers] = useState({});
  const [progress, setProgress] = useState({});
  const [showBatchComplete, setShowBatchComplete] = useState(false);
  const [view, setView] = useState("batches");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [batchPage, setBatchPage] = useState(0);

  useEffect(() => {
    if (!category) return;
    const savedProgress = localStorage.getItem(
      `mcq-progress-${category}-${difficultyFilter}`
    );
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, [category, difficultyFilter]);

  useEffect(() => {
    if (!category) return;
    const combined = [
      ...mcqQuestions,
      ...nodeMCQs,
      ...reactMCQs,
      ...jsMCQs,
      ...tsMCQs,
      ...sqlMCQs,
      ...oopMCQs,
      ...mongodbMCQs,
    ];
    const filtered = combined.filter(
      (q) => q.category && q.category.toLowerCase() === category.toLowerCase()
    );
    setAllQuestions(filtered);
  }, [category]);

  useEffect(() => {
    if (difficultyFilter === "all") {
      setFilteredQuestions(allQuestions);
    } else {
      const filtered = allQuestions.filter(
        (q) => q.difficulty === difficultyFilter
      );
      setFilteredQuestions(filtered);
    }
    setCurrentBatch(0);
    setProgress({});
  }, [difficultyFilter, allQuestions]);

  useEffect(() => {
    if (!category || Object.keys(progress).length === 0) return;
    localStorage.setItem(
      `mcq-progress-${category}-${difficultyFilter}`,
      JSON.stringify(progress)
    );
  }, [progress, category, difficultyFilter]);

  const batches = [];
  for (let i = 0; i < filteredQuestions.length; i += BATCH_SIZE) {
    batches.push(filteredQuestions.slice(i, i + BATCH_SIZE));
  }

  const currentBatchQuestions = batches[currentBatch] || [];
  const currentQuestion = currentBatchQuestions[currentQuestionIndex];
  const totalBatches = batches.length;

  const isBatchUnlocked = (batchIndex) => {
    if (batchIndex === 0) return true;
    const prevBatchProgress = progress[batchIndex - 1];
    return prevBatchProgress && prevBatchProgress.score >= PASS_THRESHOLD;
  };

  const getBatchScore = (batchIndex) => {
    return progress[batchIndex]?.score || 0;
  };

  const getBatchStatus = (batchIndex) => {
    const batchProg = progress[batchIndex];
    if (!batchProg) return "not-started";
    if (batchProg.completed) {
      return batchProg.score >= PASS_THRESHOLD ? "passed" : "failed";
    }
    return "in-progress";
  };

  const startBatch = (batchIndex) => {
    if (!isBatchUnlocked(batchIndex)) return;
    setCurrentBatch(batchIndex);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setBatchAnswers({});
    setShowBatchComplete(false);
    setView("quiz");
  };

  const handleOptionSelect = (optionIndex) => {
    if (showAnswer) return;
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    setBatchAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        selected: optionIndex,
        correct: isCorrect,
      },
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentBatchQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      completeBatch();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      const prevAnswer = batchAnswers[currentQuestionIndex - 1];
      if (prevAnswer) {
        setSelectedOption(prevAnswer.selected);
        setShowAnswer(true);
      } else {
        setSelectedOption(null);
        setShowAnswer(false);
      }
    }
  };

  const completeBatch = () => {
    const score = Object.values(batchAnswers).filter((a) => a.correct).length;
    const newProgress = {
      ...progress,
      [currentBatch]: {
        score,
        total: currentBatchQuestions.length,
        completed: true,
        timestamp: new Date().toISOString(),
      },
    };
    setProgress(newProgress);
    setShowBatchComplete(true);
  };

  const retryBatch = () => {
    setBatchAnswers({});
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setShowBatchComplete(false);
  };

  const goToBatches = () => {
    setView("batches");
    setShowBatchComplete(false);
  };

  const batchScore = Object.values(batchAnswers).filter(
    (a) => a.correct
  ).length;
  const questionProgress =
    ((currentQuestionIndex + 1) / currentBatchQuestions.length) * 100;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-50 border-green-300";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-300";
      case "hard":
        return "text-red-600 bg-red-50 border-red-300";
      default:
        return "text-gray-600 bg-gray-50 border-gray-300";
    }
  };

  const getDifficultyStats = () => {
    const easy = allQuestions.filter((q) => q.difficulty === "easy").length;
    const medium = allQuestions.filter((q) => q.difficulty === "medium").length;
    const hard = allQuestions.filter((q) => q.difficulty === "hard").length;
    return { easy, medium, hard, total: allQuestions.length };
  };

  const stats = getDifficultyStats();

  if (view === "batches") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-surface/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4 sm:space-x-8">
                <div
                  className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <BookOpen
                      size={20}
                      className="sm:w-6 sm:h-6 text-brand"
                    />
                  </div>
                  <div>
                    <h1 className="hidden sm:block text-base sm:text-xl font-bold text-gray-900">
                      Interview Nerd
                    </h1>
                  </div>
                </div>
                <nav className="hidden md:flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <button
                    onClick={() => router.push("/")}
                    className="hover:text-gray-700 transition-colors"
                  >
                    Home
                  </button>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">
                    {category?.charAt(0).toUpperCase() + category?.slice(1)} MCQ
                  </span>
                </nav>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <User size={18} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
                <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings size={18} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <div className="text-center mb-3 sm:mb-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                {category?.charAt(0).toUpperCase() + category?.slice(1)}{" "}
                <span className="text-gray-700">MCQ Practice</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto px-4">
                Batches of 20 questions. Score 16+ to unlock the next.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2"
            >
              <button
                onClick={() => setDifficultyFilter("all")}
                className={`px-3 sm:px-4 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  difficultyFilter === "all"
                    ? "bg-brand text-neutral-950"
                    : "bg-surface text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline mr-1.5" />
                All <span className="hidden sm:inline">Questions</span> (
                {stats.total})
              </button>
              <button
                onClick={() => setDifficultyFilter("easy")}
                className={`px-3 sm:px-4 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  difficultyFilter === "easy"
                    ? "bg-green-600 text-white"
                    : "bg-surface text-green-700 border border-green-200 hover:border-green-300"
                }`}
              >
                Easy ({stats.easy})
              </button>
              <button
                onClick={() => setDifficultyFilter("medium")}
                className={`px-3 sm:px-4 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  difficultyFilter === "medium"
                    ? "bg-yellow-600 text-white"
                    : "bg-surface text-yellow-700 border border-yellow-200 hover:border-yellow-300"
                }`}
              >
                Medium ({stats.medium})
              </button>
              <button
                onClick={() => setDifficultyFilter("hard")}
                className={`px-3 sm:px-4 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  difficultyFilter === "hard"
                    ? "bg-red-600 text-white"
                    : "bg-surface text-red-700 border border-red-200 hover:border-red-300"
                }`}
              >
                Hard ({stats.hard})
              </button>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={difficultyFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {batches.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-base sm:text-lg">
                    No questions available for this difficulty level.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6">
                    {batches
                      .slice(batchPage * 6, batchPage * 6 + 6)
                      .map((batch, displayIndex) => {
                        const index = batchPage * 6 + displayIndex;
                        const unlocked = isBatchUnlocked(index);
                        const status = getBatchStatus(index);
                        const score = getBatchScore(index);

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: displayIndex * 0.03 }}
                            className="relative group"
                          >
                            <div
                              className={`relative overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 ${
                                unlocked
                                  ? "bg-surface hover:shadow-md hover:border-gray-300 cursor-pointer"
                                  : "bg-gray-50 cursor-not-allowed opacity-60"
                              }`}
                              onClick={() => unlocked && startBatch(index)}
                            >
                              <div className="absolute top-3 right-3 z-10">
                                {status === "passed" && (
                                  <div className="bg-green-600 text-white px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    <span className="hidden sm:inline">
                                      Passed
                                    </span>
                                  </div>
                                )}
                                {status === "failed" && (
                                  <div className="bg-red-600 text-white px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                                    <XCircle className="w-3 h-3" />
                                    <span className="hidden sm:inline">
                                      Failed
                                    </span>
                                  </div>
                                )}
                                {!unlocked && (
                                  <div className="bg-gray-400 text-white px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                                    <Lock className="w-3 h-3" />
                                    <span className="hidden sm:inline">
                                      Locked
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="p-3 sm:p-4 md:p-5 relative z-10">
                                <div className="flex items-center gap-3 sm:gap-3.5 mb-3">
                                  <div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-base sm:text-lg font-bold ${
                                      unlocked
                                        ? "bg-gray-100 text-gray-900"
                                        : "bg-gray-200 text-gray-500"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                                      Batch {index + 1}
                                    </h3>
                                    <p className="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1">
                                      <Target className="w-3 h-3" />
                                      {batch.length} Questions
                                    </p>
                                  </div>
                                </div>

                                {status !== "not-started" && (
                                  <div className="mb-3">
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className="text-xs font-medium text-gray-600">
                                        Your Score
                                      </span>
                                      <span
                                        className={`text-base sm:text-lg font-bold ${
                                          score >= PASS_THRESHOLD
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                      >
                                        {score}
                                        <span className="text-sm sm:text-base text-gray-400">
                                          /{batch.length}
                                        </span>
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${
                                            (score / batch.length) * 100
                                          }%`,
                                        }}
                                        transition={{
                                          duration: 0.6,
                                          ease: "easeOut",
                                        }}
                                        className={`h-full rounded-full ${
                                          score >= PASS_THRESHOLD
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                        }`}
                                      />
                                    </div>
                                  </div>
                                )}

                                <button
                                  className={`w-full py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                                    unlocked
                                      ? "bg-gray-900 text-neutral-950 hover:bg-gray-800"
                                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  }`}
                                  disabled={!unlocked}
                                >
                                  {status === "not-started"
                                    ? "Start Batch"
                                    : status === "passed"
                                    ? "Retry Batch"
                                    : "Try Again"}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>

                  {batches.length > 6 && (
                    <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
                      <button
                        onClick={() =>
                          setBatchPage((prev) => Math.max(0, prev - 1))
                        }
                        disabled={batchPage === 0}
                        className={`p-2 sm:p-2.5 rounded-lg transition-all ${
                          batchPage === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-surface border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-400 shadow-sm"
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      {Array.from({
                        length: Math.ceil(batches.length / 6),
                      }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setBatchPage(i)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-bold transition-all ${ batchPage === i ? " text-neutral-950 shadow-lg scale-110" : "bg-surface border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-400" } bg-brand hover:bg-brand/90`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setBatchPage((prev) =>
                            Math.min(
                              Math.ceil(batches.length / 6) - 1,
                              prev + 1
                            )
                          )
                        }
                        disabled={
                          batchPage === Math.ceil(batches.length / 6) - 1
                        }
                        className={`p-2 sm:p-2.5 rounded-lg transition-all ${
                          batchPage === Math.ceil(batches.length / 6) - 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-surface border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-400 shadow-sm"
                        }`}
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-gray-200 p-2 sm:p-4 md:p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-7 h-7 sm:w-6 sm:h-6 text-brand" />
                Overall Progress
              </h2>
              <div className="text-right">
                <div className="text-sm sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {totalBatches > 0
                    ? Math.round(
                        (Object.keys(progress).filter(
                          (k) => progress[k].completed
                        ).length /
                          totalBatches) *
                          100
                      )
                    : 0}
                  %
                </div>
                <div className="text-xs sm:text-sm text-gray-500">Complete</div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 md:h-5 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      totalBatches > 0
                        ? (Object.keys(progress).filter(
                            (k) => progress[k].completed
                          ).length /
                            totalBatches) *
                          100
                        : 0
                    }%`,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-end pr-2 sm:pr-3"
                >
                  {Object.keys(progress).filter((k) => progress[k].completed)
                    .length > 0 && (
                    <span className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">
                      {
                        Object.keys(progress).filter(
                          (k) => progress[k].completed
                        ).length
                      }
                      /{totalBatches}
                    </span>
                  )}
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 sm:mt-4">
              <div className="text-center p-1 sm:p-2 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-brand">
                  <span className="text-xs sm:text-sm text-gray-600 ">
                    Completed
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600  ml-3">
                    {
                      Object.keys(progress).filter((k) => progress[k].completed)
                        .length
                    }
                  </span>
                </div>
              </div>
              <div className="text-center p-1 sm:p-2 bg-green-50 rounded-lg sm:rounded-xl border border-green-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                  <span className="text-xs sm:text-sm text-gray-600 ">
                    Passed
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600  ml-3">
                    {
                      Object.keys(progress).filter(
                        (k) => progress[k].score >= PASS_THRESHOLD
                      ).length
                    }
                  </span>
                </div>
              </div>
              <div className="text-center p-1 sm:p-2 bg-purple-50 rounded-lg sm:rounded-xl border border-purple-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">
                  <span className="text-xs sm:text-sm text-gray-600 ">
                    Total Score
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600  ml-3">
                    {Object.values(progress).reduce(
                      (sum, p) => sum + p.score,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-brand animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Loading questions...
          </p>
        </div>
      </div>
    );
  }

  if (showBatchComplete) {
    const finalScore = Object.values(batchAnswers).filter(
      (a) => a.correct
    ).length;
    const passed = finalScore >= PASS_THRESHOLD;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-surface rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-center border-2 border-gray-100">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                passed
                  ? "bg-gradient-to-br from-green-400 to-emerald-500"
                  : "bg-gradient-to-br from-red-400 to-rose-500"
              } shadow-lg`}
            >
              {passed ? (
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              ) : (
                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              )}
            </motion.div>

            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${
                passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {passed ? "Congratulations!" : "Keep Trying!"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
              {passed
                ? "You passed this batch! The next batch is now unlocked."
                : "You need 16+ correct answers to unlock the next batch."}
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border-2 border-gray-200">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {finalScore}
                <span className="text-2xl sm:text-3xl text-gray-400">
                  /{currentBatchQuestions.length}
                </span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mb-4">
                Your Score
              </div>
              <div className="w-full bg-gray-300 rounded-full h-3 sm:h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (finalScore / currentBatchQuestions.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    passed
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : "bg-gradient-to-r from-red-500 to-rose-500"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={goToBatches}
                className="w-full py-3 sm:py-4 text-neutral-950 font-bold rounded-xl sm:rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base active:scale-95 bg-brand hover:bg-brand/90"
              >
                View All Batches
              </button>
              <button
                onClick={retryBatch}
                className="w-full py-3 sm:py-4 bg-surface border-2 border-gray-300 text-gray-700 font-bold rounded-xl sm:rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base active:scale-95"
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Retry This Batch
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-surface/90 backdrop-blur-md border-b border-gray-200/50 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 sm:py-3.5">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <button
              onClick={goToBatches}
              className="flex items-center text-xs sm:text-sm text-gray-600 hover:text-brand transition-colors font-medium"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Back to Batches</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div className="text-center flex-1 px-2">
              <div className="text-[11px] sm:text-xs font-semibold text-gray-900">
                Batch {currentBatch + 1} • Q{currentQuestionIndex + 1}/
                {currentBatchQuestions.length}
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-[11px] text-gray-500 font-medium">
                  Score:{" "}
                  <span className="text-brand font-bold">{batchScore}</span>/
                  {Object.keys(batchAnswers).length}
                </span>
                {currentQuestion.difficulty && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${getDifficultyColor(
                      currentQuestion.difficulty
                    )}`}
                  >
                    {currentQuestion.difficulty.charAt(0).toUpperCase() +
                      currentQuestion.difficulty.slice(1)}
                  </span>
                )}
              </div>
            </div>
            <div className="w-10 sm:w-14" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${questionProgress}%` }}
              className="bg-neutral-900 h-full rounded-full transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 min-h-[calc(100vh-88px)] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.15 }}
            className="bg-surface rounded-lg sm:rounded-xl shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="p-4 sm:p-5 md:p-6">
              <div className="mb-5 sm:mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <div className="inline-block bg-gray-900 text-neutral-950 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    Question {currentQuestionIndex + 1}
                  </div>
                  {currentQuestion.difficulty && (
                    <div
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getDifficultyColor(
                        currentQuestion.difficulty
                      )}`}
                    >
                      {currentQuestion.difficulty.toUpperCase()}
                    </div>
                  )}
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-2.5 sm:space-y-3.5 mb-5 sm:mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const isSelected = index === selectedOption;
                  let optionClass =
                    "w-full text-left p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl border transition-all duration-150 font-medium text-xs sm:text-sm";

                  if (showAnswer) {
                    if (isCorrect) {
                      optionClass +=
                        " bg-green-50 border-green-500 text-green-900";
                    } else if (isSelected && !isCorrect) {
                      optionClass += " bg-red-50 border-red-500 text-red-900";
                    } else {
                      optionClass +=
                        " bg-gray-50 border-gray-200 text-gray-700";
                    }
                  } else {
                    optionClass +=
                      " bg-surface border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99] cursor-pointer";
                  }

                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={optionClass}
                      onClick={() => handleOptionSelect(index)}
                      disabled={showAnswer}
                      whileHover={!showAnswer ? { scale: 1.005 } : {}}
                      whileTap={!showAnswer ? { scale: 0.995 } : {}}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm ${
                            showAnswer && isCorrect
                              ? "border-green-600 bg-green-100 text-green-700"
                              : showAnswer && isSelected && !isCorrect
                              ? "border-red-600 bg-red-100 text-red-700"
                              : "border-current"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1 text-left leading-relaxed">
                          {option}
                        </span>
                        {showAnswer && isCorrect && (
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                        )}
                        {showAnswer && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showAnswer && currentQuestion.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 sm:mb-6 overflow-hidden"
                  >
                    <div className="p-4 sm:p-4 md:p-5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1.5 text-xs sm:text-sm">
                            Explanation
                          </h3>
                          <p className="text-gray-800 leading-relaxed text-xs sm:text-sm">
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 text-xs sm:text-sm border border-gray-300"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="text-center px-2">
                  <div className="text-[11px] text-gray-500 mb-1">Score</div>
                  <div className="text-base sm:text-lg font-bold text-gray-900">
                    {batchScore}
                    <span className="text-sm sm:text-base text-gray-400">
                      /{Object.keys(batchAnswers).length}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!showAnswer}
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 bg-gray-900 text-neutral-950 font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 text-xs sm:text-sm active:scale-95"
                >
                  <span>
                    {currentQuestionIndex < currentBatchQuestions.length - 1
                      ? "Next"
                      : "Finish"}
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
