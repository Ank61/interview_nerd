import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Play, RotateCcw, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import { playgroundQuestions } from "@/data/playgroundQuestions";
import { useJSProgress } from "@/hooks/useJSProgress";
import CodeEditor from "@/components/playground/CodeEditor";
import { PageShell, SiteNav, mono } from "@/components/landing/shared";

export default function JSQuestionPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const { saveProgress, isQuestionCompleted } = useJSProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  // Refs for resizable panels
  const containerRef = useRef(null);
  const verticalDividerRef = useRef(null);
  const horizontalDividerRef = useRef(null);

  // State
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [testResults, setTestResults] = useState([]);

  // Panel sizes
  const [leftWidth, setLeftWidth] = useState(40); // percentage
  const [topHeight, setTopHeight] = useState(50); // percentage

  // useEffect(() => {
  //     if (status === "unauthenticated") {
  //         router.push("/auth/login");
  //     }
  // }, [status, router]);

  useEffect(() => {
    if (id) {
      const allQuestions = [
        ...(playgroundQuestions.beginner || []),
        ...(playgroundQuestions.advanced || []),
      ];
      const foundQuestion = allQuestions.find((q) => q.id === id);
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setCode(foundQuestion.starterCode || "");
        setIsCompleted(isQuestionCompleted(foundQuestion.id));
      }
    }
  }, [id, isQuestionCompleted]);

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

  const executeCode = async () => {
    if (!code.trim() || !question) return;

    setLoading(true);
    setError("");
    setResult(null);
    setTestResults([]);

    try {
      const response = await fetch("/api/playground/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          questionId: question.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTestResults(data.testResults);
        setResult({
          output: data.output || "",
          testResults: data.testResults,
        });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to execute code");
    } finally {
      setLoading(false);
    }
  };

  const submitSolution = async () => {
    if (!question || !code.trim()) return;

    setLoading(true);
    setSubmissionResult(null);

    try {
      const response = await fetch("/api/playground/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          questionId: question.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const allTestsPassed = data.testResults.every((test) => test.passed);

        setSubmissionResult({
          isCorrect: allTestsPassed,
          testResults: data.testResults,
          output: data.output || "",
          userCode: code,
        });

        // Save progress
        if (allTestsPassed) {
          await saveProgress(
            question.id,
            question.tags || [],
            question.difficulty,
            code,
            true,
          );
          setIsCompleted(true);

          // Award points
          if (session?.user?.email) {
            await fetch("/api/gamification/award-points", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: session.user.email,
                points: 15,
                reason: `Completed ${question.title}`,
              }),
            });
          }
        }
      } else {
        setSubmissionResult({
          isCorrect: false,
          error: data.error,
        });
      }
    } catch (error) {
      setSubmissionResult({
        isCorrect: false,
        error: error.message,
      });
    }
    setLoading(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-300 bg-green-500/10 border-green-500/20";
      case "medium":
        return "text-yellow-300 bg-yellow-500/10 border-yellow-500/20";
      case "hard":
        return "text-red-300 bg-red-500/10 border-red-500/20";
      default:
        return "text-neutral-300 bg-neutral-500/10 border-neutral-500/20";
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

  return (
    <PageShell>
      <Head>
        <title>{question.title} - JavaScript Practice | Interview Nerd</title>
        <meta
          name="description"
          content="Practice JavaScript coding challenges"
        />
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "JavaScript Practice", href: "/playground" },
          { label: "Questions", href: "/js-practice/testing" },
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
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`${mono.className} rounded-full border px-3 py-1 text-[11px] ${getDifficultyColor(question.difficulty)}`}
                >
                  {question.difficulty.charAt(0).toUpperCase() +
                    question.difficulty.slice(1)}
                </span>
                {question.tags &&
                  question.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/[0.05] text-neutral-400 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
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

            {/* Examples */}
            {question.examples && question.examples.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-neutral-300 mb-3">
                  Examples
                </h3>
                <div className="space-y-3">
                  {question.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg p-4 border border-white/[0.08] bg-white/[0.02]"
                    >
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-semibold text-neutral-500">
                            Input:
                          </span>
                          <code className="block mt-1 text-sm font-mono px-3 py-2 rounded border border-white/[0.08] bg-neutral-950 text-neutral-100">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-neutral-500">
                            Output:
                          </span>
                          <code className="block mt-1 text-sm font-mono px-3 py-2 rounded border border-white/[0.08] bg-neutral-950 text-neutral-100">
                            {example.output}
                          </code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="text-xs font-semibold text-neutral-500">
                              Explanation:
                            </span>
                            <p className="mt-1 text-sm text-neutral-400">
                              {example.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complexity */}
            {(question.timeComplexity || question.spaceComplexity) && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-neutral-300 mb-3">
                  Constraints
                </h3>
                <div className="rounded-lg p-4 border border-white/[0.08] bg-white/[0.02] space-y-2">
                  {question.timeComplexity && (
                    <div className="text-sm">
                      <span className="font-semibold text-neutral-200">
                        Time Complexity:
                      </span>
                      <code className="ml-2 text-[#D4FF4F]">
                        {question.timeComplexity}
                      </code>
                    </div>
                  )}
                  {question.spaceComplexity && (
                    <div className="text-sm">
                      <span className="font-semibold text-neutral-200">
                        Space Complexity:
                      </span>
                      <code className="ml-2 text-[#D4FF4F]">
                        {question.spaceComplexity}
                      </code>
                    </div>
                  )}
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
                    {showHint ? "Hide" : "Show"} Hints
                  </button>
                  {showHint && (
                    <div className="rounded-lg p-4 border border-yellow-500/20 bg-yellow-500/10">
                      <p className="text-sm font-semibold text-yellow-200 mb-2">
                        💡 Hints:
                      </p>
                      <ul className="space-y-1">
                        {question.hints.map((hint, idx) => (
                          <li key={idx} className="text-sm text-yellow-300">
                            • {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

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
                  <pre className="text-sm font-mono p-3 rounded border border-green-500/20 bg-neutral-950 overflow-x-auto text-neutral-100 whitespace-pre-wrap">
                    {question.solution}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div
          ref={verticalDividerRef}
          onMouseDown={handleVerticalMouseDown}
          className="w-1 bg-white/[0.08] hover:bg-[#D4FF4F] cursor-col-resize transition-colors flex-shrink-0"
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
                JavaScript Code Editor
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
                  onClick={executeCode}
                  disabled={loading || !code.trim()}
                  className="px-4 py-1.5 rounded-lg bg-[#D4FF4F] text-neutral-950 text-sm font-semibold hover:shadow-[0_0_20px_-5px_rgba(212,255,79,0.4)] transition-shadow disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent animate-spin mr-1" />
                  ) : (
                    <Play className="w-4 h-4 mr-1" />
                  )}
                  Run
                </button>
                <button
                  onClick={submitSolution}
                  disabled={loading || !code.trim()}
                  className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Submit
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                code={code}
                onChange={setCode}
                language="javascript"
                onRun={executeCode}
                className="h-full"
              />
            </div>
            <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.08]">
              <p className="text-xs text-neutral-500">
                Press Ctrl+Enter (Cmd+Enter on Mac) to run code
              </p>
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
                Test Results
              </span>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-neutral-950">
              {submissionResult && (
                <div
                  className={`mb-4 p-4 rounded-lg border ${submissionResult.isCorrect ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}
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
                  {submissionResult.isCorrect && (
                    <p className="text-sm text-green-300">
                      All test cases passed! You earned 15 XP.
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
                  <p className="text-sm text-red-300 font-mono whitespace-pre-wrap">
                    {error}
                  </p>
                </div>
              )}

              {testResults.length > 0 && (
                <div className="space-y-3">
                  {testResults.map((test, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        test.passed
                          ? "bg-green-500/10 border-green-500/20"
                          : "bg-red-500/10 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-neutral-200">
                          Test Case {index + 1}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            test.passed ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {test.passed ? "✓ Passed" : "✗ Failed"}
                        </span>
                      </div>
                      {!test.passed && (
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="font-semibold text-neutral-300">
                              Expected:
                            </span>
                            <code className="ml-2 text-neutral-100">
                              {JSON.stringify(test.expected)}
                            </code>
                          </div>
                          <div>
                            <span className="font-semibold text-neutral-300">
                              Got:
                            </span>
                            <code className="ml-2 text-neutral-100">
                              {JSON.stringify(test.actual)}
                            </code>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {result && result.output && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-neutral-300 mb-2">
                    Console Output:
                  </h4>
                  <div className="rounded-lg p-4 bg-neutral-900">
                    <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                      {result.output}
                    </pre>
                  </div>
                </div>
              )}

              {!result &&
                !error &&
                !submissionResult &&
                testResults.length === 0 && (
                  <div className="flex items-center justify-center h-full text-neutral-600">
                    <p>Run your code to see test results here</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
