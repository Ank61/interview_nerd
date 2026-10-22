import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Play, RotateCcw, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import SQLExecutor from "@/lib/sqlExecutor";
import { sqlDatasets, sqlQuestions } from "@/data/sqlDatasets";
import { useSQLProgress } from "@/hooks/useSQLProgress";
import { PageShell, SiteNav, mono } from "@/components/landing/shared";

export default function SQLQuestionPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [sqlExecutor] = useState(() => new SQLExecutor());
  const { saveProgress, isQuestionCompleted } = useSQLProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  // Refs for resizable panels
  const containerRef = useRef(null);
  const verticalDividerRef = useRef(null);
  const horizontalDividerRef = useRef(null);
  const textareaRef = useRef(null);

  // State
  const [question, setQuestion] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Panel sizes
  const [leftWidth, setLeftWidth] = useState(40); // percentage
  const [topHeight, setTopHeight] = useState(50); // percentage

  useEffect(() => {
    if (id) {
      const foundQuestion = sqlQuestions.find((q) => q.id === parseInt(id));
      if (foundQuestion) {
        setQuestion(foundQuestion);
        loadDataset(foundQuestion.dataset);
        setIsCompleted(isQuestionCompleted(foundQuestion.id.toString()));
      }
    }
  }, [id, isQuestionCompleted]);

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(
        100,
        textareaRef.current.scrollHeight,
      )}px`;
    }
  }, [query]);

  const loadDataset = async (datasetName) => {
    try {
      await sqlExecutor.loadDataset(datasetName);
    } catch (error) {
      console.error("Failed to load dataset:", error);
      // setError(`Failed to load dataset: ${error.message}`);
    }
  };

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

  const executeQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSubmissionResult(null);

    try {
      const queryResult = sqlExecutor.execute(query);
      if (queryResult.success) {
        setResult(queryResult);
      } else {
        setError(queryResult.error);
        setResult(null);
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const submitSolution = async () => {
    if (!question || !query.trim()) return;

    setLoading(true);
    try {
      const executionResult = sqlExecutor.execute(query);

      if (executionResult.success) {
        const userResult = executionResult.data;
        const expectedQuery = question.expectedQuery;
        const expectedResult = sqlExecutor.execute(expectedQuery);

        if (expectedResult.success) {
          const expectedData = expectedResult.data;
          const isCorrect =
            JSON.stringify(userResult.slice(0, 10)) ===
            JSON.stringify(expectedData.slice(0, 10));

          setSubmissionResult({
            isCorrect,
            userResult,
            expectedData,
            userQuery: query,
            expectedQuery,
          });

          // Save progress
          if (isCorrect) {
            await saveProgress(
              question.id.toString(),
              question.category,
              question.difficulty,
              query,
              true,
            );
            setIsCompleted(true);
          }
        } else {
          setSubmissionResult({
            isCorrect: false,
            error: "Could not execute expected query for comparison",
          });
        }
      } else {
        setSubmissionResult({
          isCorrect: false,
          error: executionResult.error,
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
        <title>{question.title} - SQL Practice | Interview Nerd</title>
        <meta name="description" content="Practice SQL queries" />
        <script src="https://sql.js.org/dist/sql-wasm.js" async></script>
      </Head>

      <SiteNav
        crumbs={[
          { label: "Topics", href: "/#categories" },
          { label: "SQL Practice", href: "/sql-practice" },
          { label: "Questions", href: "/sql-practice/testing" },
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
            {/* Back Button & Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-neutral-50 mb-2">
                {question.id}. {question.title}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className={`${mono.className} rounded-full border px-3 py-1 text-[11px] ${getDifficultyColor(
                    question.difficulty,
                  )}`}
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
                {question.question}
              </p>
            </div>

            {/* Schema */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-300 mb-3 flex items-center gap-2">
                Database Schema
              </h3>
              <div className="space-y-3">
                {Object.entries(
                  sqlDatasets[question.dataset]?.tables || {},
                ).map(([tableName, table]) => (
                  <div
                    key={tableName}
                    className="rounded-lg p-4 border border-white/[0.08] bg-white/[0.02]"
                  >
                    <h4 className="font-semibold text-neutral-200 mb-2 flex items-center gap-2">
                      {tableName}
                    </h4>
                    <div className="space-y-1">
                      {table.columns.map((column, index) => (
                        <div
                          key={index}
                          className="text-sm text-neutral-100 font-mono px-3 py-1.5 rounded border border-white/[0.08] bg-neutral-950"
                        >
                          {column}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint & Solution */}
            <div className="space-y-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="w-full flex items-center justify-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-500/20 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? "Hide" : "Show"} Hint
              </button>
              {showHint && (
                <div className="rounded-lg p-4 border border-yellow-500/20 bg-yellow-500/10">
                  <p className="text-sm text-yellow-200">
                    <strong>💡 Hint:</strong> {question.hint}
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full flex items-center justify-start gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300 hover:bg-green-500/20 transition-colors"
              >
                {showSolution ? "Hide" : "Show"} Solution
              </button>
              {showSolution && (
                <div className="rounded-lg p-4 border border-green-500/20 bg-green-500/10">
                  <p className="text-sm text-green-200 mb-2">
                    <strong>Expected Solution:</strong>
                  </p>
                  <code className="text-sm font-mono p-3 rounded border border-green-500/20 block text-neutral-100 bg-neutral-950">
                    {question.expectedQuery}
                  </code>
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
                SQL Editor
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuery("")}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05] text-sm transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </button>
                <button
                  onClick={executeQuery}
                  disabled={loading || !query.trim()}
                  className="px-4 py-1.5 rounded-lg bg-[#D4FF4F] text-neutral-950 text-sm font-semibold hover:shadow-[0_0_20px_-5px_rgba(212,255,79,0.4)] transition-shadow disabled:opacity-50"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </button>
                <button
                  onClick={submitSolution}
                  disabled={loading || !query.trim()}
                  className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 h-full">
              <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="-- Write your SQL query here..."
                className="w-full h-full p-4 bg-neutral-900 text-neutral-100 font-mono text-sm rounded-lg border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#D4FF4F]/50 resize-none placeholder-neutral-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    executeQuery();
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
                Query Result
              </span>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-neutral-950">
              {submissionResult && (
                <div
                  className={`mb-4 p-4 rounded-lg border ${
                    submissionResult.isCorrect
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

              {result && result.data.length > 0 && (
                <div>
                  <p className="text-sm text-neutral-400 mb-3">
                    {result.rowCount} row{result.rowCount !== 1 ? "s" : ""}{" "}
                    returned
                  </p>
                  <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
                    <table className="w-full text-sm">
                      <thead className="bg-white/[0.02]">
                        <tr>
                          {result.columns.map((column, index) => (
                            <th
                              key={index}
                              className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider border-b border-white/[0.08]"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.08]">
                        {result.data.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-white/[0.02]">
                            {result.columns.map((column, colIndex) => (
                              <td
                                key={colIndex}
                                className="px-4 py-3 text-neutral-100"
                              >
                                {row[column] === null ? (
                                  <span className="text-neutral-500 italic">
                                    NULL
                                  </span>
                                ) : (
                                  String(row[column])
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {!result && !error && !submissionResult && (
                <div className="flex items-center justify-center h-full text-neutral-600">
                  <p>Run your query to see results here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
