import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  RotateCcw,
  ChevronLeft,
  Database,
  Table,
  Lightbulb,
  CheckCircle,
  XCircle,
  BookOpen,
  User,
  Settings,
} from "lucide-react";
import SQLExecutor from "@/lib/sqlExecutor";
import { sqlDatasets, sqlQuestions } from "@/data/sqlDatasets";
import { useSQLProgress } from "@/hooks/useSQLProgress";

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
        textareaRef.current.scrollHeight
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
              true
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

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{question.title} - SQL Practice | Interview Nerd</title>
        <meta name="description" content="Practice SQL queries" />
        <script src="https://sql.js.org/dist/sql-wasm.js" async></script>
      </Head>

      {/* Header - Matching testing.js */}
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
                  onClick={() => router.push("/sql-practice")}
                  className="hover:text-gray-700 transition-colors"
                >
                  SQL Practice
                </button>
                <span>/</span>
                <button
                  onClick={() => router.push("/sql-practice/testing")}
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
            {/* Back Button & Title */}
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
                {question.question}
              </p>
            </div>

            {/* Schema */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Table className="w-4 h-4" />
                Database Schema
              </h3>
              <div className="space-y-3">
                {Object.entries(
                  sqlDatasets[question.dataset]?.tables || {}
                ).map(([tableName, table]) => (
                  <div
                    key={tableName}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4 text-indigo-600" />
                      {tableName}
                    </h4>
                    <div className="space-y-1">
                      {table.columns.map((column, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-700 font-mono bg-white px-3 py-1.5 rounded border border-gray-200"
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
                  <p className="text-sm text-yellow-800">
                    <strong>💡 Hint:</strong> {question.hint}
                  </p>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
                className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50"
              >
                {/* <CheckCircle className="w-4 h-4 mr-2" /> */}
                {showSolution ? "Hide" : "Show"} Solution
              </Button>
              {showSolution && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>Expected Solution:</strong>
                  </p>
                  <code className="text-sm font-mono bg-white p-3 rounded border border-green-200 block text-gray-900">
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
          className="w-1 bg-gray-200 hover:bg-indigo-400 cursor-col-resize transition-colors flex-shrink-0"
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
                SQL Editor
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery("")}
                  className="text-gray-600"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={executeQuery}
                  disabled={loading || !query.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </Button>
                <Button
                  size="sm"
                  onClick={submitSolution}
                  disabled={loading || !query.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 h-full">
              <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="-- Write your SQL query here..."
                className="w-full h-full p-4 bg-gray-50 text-gray-900 font-mono text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder-gray-400"
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
            className="h-1 bg-gray-200 hover:bg-indigo-400 cursor-row-resize transition-colors flex-shrink-0"
          />

          {/* Bottom - Results */}
          <div
            style={{ height: `${100 - topHeight}%` }}
            className="overflow-hidden flex flex-col"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
              <span className="text-sm font-semibold text-gray-700">
                Query Result
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

              {result && result.data.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    {result.rowCount} row{result.rowCount !== 1 ? "s" : ""}{" "}
                    returned
                  </p>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          {result.columns.map((column, index) => (
                            <th
                              key={index}
                              className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {result.data.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-50">
                            {result.columns.map((column, colIndex) => (
                              <td
                                key={colIndex}
                                className="px-4 py-3 text-gray-900"
                              >
                                {row[column] === null ? (
                                  <span className="text-gray-400 italic">
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
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>Run your query to see results here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
