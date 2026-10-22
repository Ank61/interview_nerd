import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Play,
  RotateCcw,
  Lightbulb,
  CheckCircle,
  XCircle,
} from "lucide-react";
import PythonExecutor from "@/lib/pythonExecutor";
import { pythonQuestions } from "@/data/pythonDatasets";
import { usePythonProgress } from "@/hooks/usePythonProgress";
import { PageShell, SiteNav, mono } from "@/components/landing/shared";

export default function PythonQuestionPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [pythonExecutor] = useState(() => new PythonExecutor());
  const { saveProgress, isQuestionCompleted } = usePythonProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  // Refs for resizable panels
  const containerRef = useRef(null);
  const verticalDividerRef = useRef(null);
  const horizontalDividerRef = useRef(null);
  const textareaRef = useRef(null);

  // State
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [resultOutput, setResultOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Panel sizes
  const [leftWidth, setLeftWidth] = useState(40); // percentage
  const [topHeight, setTopHeight] = useState(50); // percentage

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/login");
  //   }
  // }, [status, router]);

  // Fetch question data - ONLY run this once when id changes
  useEffect(() => {
    if (id) {
      const allQuestions = Object.values(pythonQuestions).flat();
      const foundQuestion = allQuestions.find((q) => q.id === parseInt(id));
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setCode(
          foundQuestion.starterCode || "# Write your Python code here..."
        );
        setIsCompleted(isQuestionCompleted(parseInt(foundQuestion.id)));
      } else {
        setError("Question not found");
      }
    }
  }, [id]);

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(
        100,
        textareaRef.current.scrollHeight
      )}px`;
    }
  }, [code]);

  // Vertical resizer (left-right)
  const handleVerticalMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftWidth;

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;

      const deltaX = e.clientX - startX;
      const containerWidth = container.offsetWidth;
      const deltaPercent = (deltaX / containerWidth) * 100;
      const newWidth = Math.min(Math.max(20, startWidth + deltaPercent), 80);
      setLeftWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Horizontal resizer (top-bottom)
  const handleHorizontalMouseDown = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = topHeight;

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;

      const deltaY = e.clientY - startY;
      const containerHeight = container.offsetHeight;
      const deltaPercent = (deltaY / containerHeight) * 100;
      const newHeight = Math.min(Math.max(20, startHeight + deltaPercent), 80);
      setTopHeight(newHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleRunCode = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    setSubmissionResult(null);
    try {
      const execResult = await pythonExecutor.execute(code);
      if (execResult.success) {
        setResultOutput(execResult.output || "");
      } else {
        setError(execResult.error || "Execution failed");
        setResultOutput("");
      }
    } catch (err) {
      setError(err.message);
      setResultOutput("");
    } finally {
      setLoading(false);
    }
  };

  const handleResetCode = () => {
    // Reset to the starter code, not empty string
    if (question) {
      setCode(question.starterCode || "# Your code here");
    }
    setOutput("");
    setError(null);
  };

  const submitSolution = async () => {
    if (!question || !code.trim()) return;
    setLoading(true);
    setError("");
    setSubmissionResult(null);

    try {
      const executionResult = await pythonExecutor.execute(code);
      if (executionResult.success) {
        const userOutput = (executionResult.output || "").toString().trim();
        const expectedOutput = (question.expectedOutput || "")
          .toString()
          .trim();
        const isCorrect = expectedOutput
          ? userOutput === expectedOutput
          : !!userOutput;

        setSubmissionResult({
          isCorrect,
          userOutput,
          expectedOutput,
          userCode: code,
        });

        if (isCorrect) {
          await saveProgress(
            question.id,
            question.category,
            question.difficulty,
            code,
            true
          );
          setIsCompleted(true);
        }
      } else {
        setSubmissionResult({
          isCorrect: false,
          error: executionResult.error || "Execution failed",
        });
      }
    } catch (err) {
      setSubmissionResult({ isCorrect: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-50 border-green-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "hard":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (status === "loading" || !question) {
    return (
      <PageShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#D4FF4F]" />
        </div>
      </PageShell>
    );
  }

  if (error && !question) {
    return (
      <PageShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-neutral-100 mb-2">
              Question Not Found
            </h2>
            <p className="text-neutral-400 mb-6">
              The requested question could not be found.
            </p>
            <button
              onClick={() => router.push("/python-practice/path-learning")}
              className="px-4 py-2 rounded-lg bg-[#D4FF4F] text-neutral-950 font-semibold"
            >
              Back to Practice
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Head>
        <title>{question.title} - Python Practice | Interview Nerd</title>
        <meta name="description" content="Practice Python coding" />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "Python Practice", href: "/python-practice" },
          { label: "Questions", href: "/python-practice/testing" },
          { label: question.title },
        ]}
      />

      {/* Main Content - Split Panes */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden" style={{ marginTop: '4rem' }}>
        {/* Left Panel - Question Description */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="border-r border-white/[0.08] bg-white/[0.02] overflow-y-auto"
        >
          <div className="p-6">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-neutral-50 mb-2">
                {question.id}. {question.title}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className={`${mono.className} rounded-full border px-3 py-1 text-[11px] ${getDifficultyColor(question.difficulty)}`}
                >
                  {question.difficulty.charAt(0).toUpperCase() +
                    question.difficulty.slice(1)}
                </span>
                <span className="text-sm text-neutral-400">
                  {question.category}
                </span>
                {isCompleted && (
                  <span className="flex items-center gap-1 text-green-400 text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>
            </div>

            {/* Question Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                Description
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {question.description}
              </p>
            </div>

            {/* Expected Output */}
            {question.expectedOutput && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                  Expected Output
                </h3>
                <div className="rounded-lg border border-white/[0.08] bg-neutral-950 p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono text-neutral-100">
                    {String(question.expectedOutput)}
                  </pre>
                </div>
              </div>
            )}

            {/* Hint & Solution */}
            <div className="space-y-3">
              {question.hints && question.hints.length > 0 && (
                <>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="w-full flex items-center justify-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-500/20 transition-colors"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? "Hide" : "Show"} Hint
                  </button>
                  {showHint && (
                    <div className="rounded-lg p-4 border border-yellow-500/20 bg-yellow-500/10">
                      <ul className="list-disc pl-5 space-y-2">
                        {question.hints.map((hint, idx) => (
                          <li key={idx} className="text-sm text-yellow-300">
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {question.solution && (
                <>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full flex items-center justify-start gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300 hover:bg-green-500/20 transition-colors"
                  >
                    {showSolution ? "Hide" : "Show"} Solution
                  </button>
                  {showSolution && (
                    <div className="rounded-lg p-4 border border-green-500/20 bg-green-500/10">
                      <p className="text-sm font-semibold text-green-200 mb-2">
                        Expected Solution:
                      </p>
                      <code className="text-sm font-mono p-3 rounded border border-green-500/20 block text-neutral-100 bg-neutral-950 whitespace-pre-wrap">
                        {question.solution}
                      </code>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div
          ref={verticalDividerRef}
          className="w-1 bg-white/[0.08] hover:bg-[#D4FF4F] cursor-col-resize transition-colors flex-shrink-0"
          onMouseDown={handleVerticalMouseDown}
        />

        {/* Right Panel - Editor & Results */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col bg-neutral-950"
        >
          {/* Top - Editor */}
          <div
            style={{ height: `${topHeight}%` }}
            className="overflow-hidden flex flex-col border-b border-white/[0.08]"
          >
            <div className="px-4 py-3 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
              <span className="text-sm font-semibold text-neutral-200">
                Python Editor
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(question.starterCode || "")}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05] text-sm transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={loading || !code.trim()}
                  className="px-4 py-1.5 rounded-lg bg-[#D4FF4F] text-neutral-950 text-sm font-semibold hover:shadow-[0_0_20px_-5px_rgba(212,255,79,0.4)] transition-shadow disabled:opacity-50"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </button>
                <button
                  onClick={submitSolution}
                  disabled={loading || !code.trim()}
                  className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="# Write your Python code here..."
                className="w-full h-full p-4 bg-neutral-900 text-neutral-100 font-mono text-sm rounded-lg border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#D4FF4F]/50 resize-none placeholder-neutral-500"
                spellCheck="false"
                style={{ minHeight: "100%" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleRunCode();
                  }
                }}
              />
            </div>
          </div>

          {/* Horizontal Divider */}
          <div
            ref={horizontalDividerRef}
            onMouseDown={handleHorizontalMouseDown}
            className="h-1 bg-white/[0.08] hover:bg-[#D4FF4F] cursor-row-resize transition-colors flex-shrink-0"
          />

          {/* Bottom - Results */}
          <div
            style={{ height: `${100 - topHeight}%` }}
            className="overflow-hidden flex flex-col"
          >
            <div className="px-4 py-3 bg-white/[0.02] border-b border-white/[0.08] flex-shrink-0">
              <span className="text-sm font-semibold text-neutral-200">
                Execution Result
              </span>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-neutral-950">
              {submissionResult && (
                <div
                  className={`mb-4 p-4 rounded-lg border ${submissionResult.isCorrect
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-red-500/10 border-red-500/20"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {submissionResult.isCorrect ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="font-semibold text-green-300">
                          Accepted! 🎉
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="font-semibold text-red-300">
                          Wrong Answer
                        </span>
                      </>
                    )}
                  </div>
                  {submissionResult.error && (
                    <p className="text-sm text-red-300 font-mono">
                      {submissionResult.error}
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="font-semibold text-red-300">Error</span>
                  </div>
                  <p className="text-sm text-red-300 font-mono">{error}</p>
                </div>
              )}

              {resultOutput && !error && (
                <div>
                  <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
                    <pre className="whitespace-pre-wrap p-4 font-mono text-sm text-neutral-100 bg-neutral-900">
                      {resultOutput}
                    </pre>
                  </div>
                </div>
              )}

              {!resultOutput && !error && !submissionResult && (
                <div className="flex items-center justify-center h-full text-neutral-600">
                  <p>Run your code to see results here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
