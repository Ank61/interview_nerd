import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  RotateCcw,
  BookOpen,
  Lightbulb,
  CheckCircle,
  XCircle,
  User,
  Settings,
} from "lucide-react";
import PythonExecutor from "@/lib/pythonExecutor";
import { pythonQuestions } from "@/data/pythonDatasets";
import { usePythonProgress } from "@/hooks/usePythonProgress";

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Question Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested question could not be found.
          </p>
          <Button onClick={() => router.push("/python-practice/path-learning")}>
            Back to Practice
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{question.title} - Python Practice | Interview Nerd</title>
        <meta name="description" content="Practice Python coding" />
      </Head>

      {/* Header - Match SQL page styling */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <div>
                  <h1 className="hidden lg:block text-xl font-bold text-gray-900">
                    Interview Nerd
                  </h1>
                </div>
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
                  onClick={() => router.push("/python-practice")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Python Practice
                </button>
                <span>/</span>
                <button
                  onClick={() => router.push("/python-practice/testing")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Questions
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {question.title}
                </span>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
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

      {/* Main Content - Split Panes */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden">
        {/* Left Panel - Question Description */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="bg-white border-r border-gray-200 overflow-y-auto"
        >
          <div className="p-6">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {question.id}. {question.title}
              </h1>
              <div className="flex items-center gap-3">
                <Badge
                  className={`text-xs font-medium border ${getDifficultyColor(
                    question.difficulty
                  )}`}
                >
                  {question.difficulty.charAt(0).toUpperCase() +
                    question.difficulty.slice(1)}
                </Badge>
                <span className="text-sm text-gray-600">
                  {question.category}
                </span>
                {isCompleted && (
                  <Badge className="text-xs font-medium border text-green-600 bg-green-50 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>

            {/* Question Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {question.description}
              </p>
            </div>

            {/* Expected Output */}
            {question.expectedOutput && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Expected Output
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono text-gray-900">
                    {String(question.expectedOutput)}
                  </pre>
                </div>
              </div>
            )}

            {/* Hint & Solution */}
            <div className="space-y-3">
              {question.hints && question.hints.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className="w-full justify-start border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {showHint ? "Hide" : "Show"} Hint
                  </Button>
                  {showHint && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <ul className="list-disc pl-5 space-y-2">
                        {question.hints.map((hint, idx) => (
                          <li key={idx} className="text-sm text-yellow-800">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50"
                  >
                    {showSolution ? "Hide" : "Show"} Solution
                  </Button>
                  {showSolution && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-800 mb-2">
                        <strong>Expected Solution:</strong>
                      </p>
                      <code className="text-sm font-mono bg-white p-3 rounded border border-green-200 block text-gray-900 whitespace-pre-wrap">
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
          className="w-1 bg-gray-200 hover:bg-indigo-400 cursor-col-resize transition-colors flex-shrink-0"
          onMouseDown={handleVerticalMouseDown}
        />

        {/* Right Panel - Editor & Results */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col bg-white"
        >
          {/* Top - Editor */}
          <div
            style={{ height: `${topHeight}%` }}
            className="overflow-hidden flex flex-col border-b border-gray-200"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <span className="text-sm font-semibold text-gray-700">
                Python Editor
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCode(question.starterCode || "")}
                  className="text-gray-600"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={handleRunCode}
                  disabled={loading || !code.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </Button>
                <Button
                  size="sm"
                  onClick={submitSolution}
                  disabled={loading || !code.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="# Write your Python code here..."
                className="w-full min-h-full p-4 bg-gray-50 text-gray-900 font-mono text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder-gray-400"
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
            className="h-1 bg-gray-200 hover:bg-indigo-400 cursor-row-resize transition-colors flex-shrink-0"
          />

          {/* Bottom - Results */}
          <div
            style={{ height: `${100 - topHeight}%` }}
            className="overflow-hidden flex flex-col"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
              <span className="text-sm font-semibold text-gray-700">
                Execution Result
              </span>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-white">
              {submissionResult && (
                <div
                  className={`mb-4 p-4 rounded-lg border ${submissionResult.isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {submissionResult.isCorrect ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">
                          Accepted! 🎉
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-800">
                          Wrong Answer
                        </span>
                      </>
                    )}
                  </div>
                  {submissionResult.error && (
                    <p className="text-sm text-red-700 font-mono">
                      {submissionResult.error}
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Error</span>
                  </div>
                  <p className="text-sm text-red-700 font-mono">{error}</p>
                </div>
              )}

              {resultOutput && !error && (
                <div>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <pre className="whitespace-pre-wrap p-4 font-mono text-sm text-gray-900 bg-white">
                      {resultOutput}
                    </pre>
                  </div>
                </div>
              )}

              {!resultOutput && !error && !submissionResult && (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>Run your code to see results here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
