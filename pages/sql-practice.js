import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Database,
  Table,
  BookOpen,
  Lightbulb,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Home,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Zap,
  User,
  Settings,
  ArrowRight,
  ChevronDown,
  MonitorCog,
  DatabaseZap,
  Workflow,
  FileCode2,
  Target,
  Award,
} from "lucide-react";
import SQLExecutor from "@/lib/sqlExecutor";
import { sqlDatasets, sqlQuestions } from "@/data/sqlDatasets";
import { motion } from "framer-motion";

export default function SQLPractice() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sqlExecutor] = useState(() => new SQLExecutor());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State management
  const [selectedDataset, setSelectedDataset] = useState("employees");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSchema, setShowSchema] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState("beginner");
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Separate questions by difficulty
  const beginnerQuestions = sqlQuestions.filter((q) => q.difficulty === "easy");
  const advancedQuestions = sqlQuestions.filter(
    (q) => q.difficulty === "medium" || q.difficulty === "hard"
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    const loadInitialDataset = async () => {
      try {
        await sqlExecutor.loadDataset(selectedDataset);
        setQuery("SELECT * FROM employees LIMIT 5;");
      } catch (error) {
        console.error("Failed to load initial dataset:", error);
        setError(`Failed to load dataset: ${error.message}`);
      }
    };
    
    if (status !== "loading") {
      loadInitialDataset();
    }
  }, [status, selectedDataset, sqlExecutor]);


  const handleDatasetChange = async (datasetName) => {
    setSelectedDataset(datasetName);
    setLoading(true);
    try {
      await sqlExecutor.loadDataset(datasetName);
      setQuery("");
      setResult(null);
      setError("");
      setSelectedQuestion(null);
      setShowHint(false);
      setShowSolution(false);
      setSubmissionResult(null);
    } catch (error) {
      setError(`Failed to load dataset: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const executeQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

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

  const loadQuestion = (question) => {
    setSelectedQuestion(question);
    setQuery("");
    setResult(null);
    setShowHint(false);
    setShowSolution(false);
    setSubmissionResult(null);

    // Load the appropriate dataset if different
    if (question.dataset !== selectedDataset) {
      handleDatasetChange(question.dataset);
    }
  };

  const resetQuery = () => {
    setQuery("");
    setResult(null);
    setShowHint(false);
    setShowSolution(false);
    setSubmissionResult(null);
  };

  const submitSolution = async () => {
    if (!selectedQuestion || !query.trim()) return;

    setIsSubmitting(true);
    try {
      const executionResult = sqlExecutor.execute(query);

      if (executionResult.success) {
        // For SQL, we'll compare the user's query result with expected result
        const userResult = executionResult.data;
        const expectedQuery = selectedQuestion.expectedQuery;

        // Execute the expected query to compare results
        const expectedResult = sqlExecutor.execute(expectedQuery);

        if (expectedResult.success) {
          const expectedData = expectedResult.data;

          // Compare results - basic comparison of first 10 rows
          const isCorrect = JSON.stringify(userResult.slice(0, 10)) === JSON.stringify(expectedData.slice(0, 10));

          setSubmissionResult({
            isCorrect,
            userResult,
            expectedData,
            userQuery: query,
            expectedQuery,
            executionResult,
          });
        } else {
          setSubmissionResult({
            isCorrect: false,
            error: "Could not execute expected query for comparison",
            executionResult,
          });
        }
      } else {
        setSubmissionResult({
          isCorrect: false,
          error: executionResult.error,
          executionResult,
        });
      }
    } catch (error) {
      setSubmissionResult({
        isCorrect: false,
        error: error.message,
        executionResult: null,
      });
    }
    setIsSubmitting(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>SQL Practice - Interview Nerd</title>
        <meta name="description" content="Practice SQL queries with real datasets" />
        <script src="https://sql.js.org/dist/sql-wasm.js" async></script>
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <Database size={24} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Interview Nerd
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  SQL Practice
                </p>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Dataset:</span>
                <select
                  value={selectedDataset}
                  onChange={(e) => handleDatasetChange(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.entries(sqlDatasets).map(([key, dataset]) => (
                    <option key={key} value={key}>
                      {dataset.name.charAt(0).toUpperCase() + dataset.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Dataset Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Database className="w-5 h-5" />
                  Dataset Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    {sqlDatasets[selectedDataset]?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {sqlDatasets[selectedDataset]?.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSchema(!showSchema)}
                      className="flex items-center gap-1"
                    >
                      {showSchema ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                      {showSchema ? "Hide" : "Show"} Schema
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schema */}
            {showSchema && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Table className="w-5 h-5" />
                    Tables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(
                      sqlDatasets[selectedDataset]?.tables || {}
                    ).map(([tableName, table]) => (
                      <div
                        key={tableName}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">
                          {tableName}
                        </h4>
                        <div className="space-y-1">
                          {table.columns.map((column, index) => (
                            <div
                              key={index}
                              className="text-xs text-gray-600 font-mono"
                            >
                              {column}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Practice Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5" />
                  Practice Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="beginner"
                      className="flex items-center gap-1"
                    >
                      <GraduationCap className="w-4 h-4" />
                      Beginner
                    </TabsTrigger>
                    <TabsTrigger
                      value="advanced"
                      className="flex items-center gap-1"
                    >
                      <Zap className="w-4 h-4" />
                      Advanced
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="beginner" className="mt-4">
                    <div className="space-y-2">
                      {beginnerQuestions.map((question, index) => (
                        <div
                          key={question.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedQuestion?.id === question.id
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => loadQuestion(question)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {question.title}
                            </span>
                            <Badge
                              className={getDifficultyColor(
                                question.difficulty
                              )}
                            >
                              {question.difficulty}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">
                            {question.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-4">
                    <div className="space-y-2">
                      {advancedQuestions.map((question, index) => (
                        <div
                          key={question.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedQuestion?.id === question.id
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => loadQuestion(question)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {question.title}
                            </span>
                            <Badge
                              className={getDifficultyColor(
                                question.difficulty
                              )}
                            >
                              {question.difficulty}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">
                            {question.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Question Details */}
            {selectedQuestion && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {selectedQuestion.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={getDifficultyColor(
                          selectedQuestion.difficulty
                        )}
                      >
                        {selectedQuestion.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {selectedQuestion.category}
                      </Badge>
                      <Badge variant="outline">
                        {selectedQuestion.dataset}
                      </Badge>
                    </div>
                    <p className="text-gray-700">{selectedQuestion.question}</p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowHint(!showHint)}
                        className="flex items-center gap-1"
                      >
                        <Lightbulb className="w-4 h-4" />
                        {showHint ? "Hide" : "Show"} Hint
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSolution(!showSolution)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        {showSolution ? "Hide" : "Show"} Solution
                      </Button>
                    </div>

                    {showHint && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          <strong>Hint:</strong> {selectedQuestion.hint}
                        </p>
                      </div>
                    )}

                    {showSolution && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800 mb-2">
                          <strong>Expected Solution:</strong>
                        </p>
                        <code className="text-sm font-mono bg-white p-2 rounded border block text-gray-900">
                          {selectedQuestion.expectedQuery}
                        </code>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SQL Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>SQL Query Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetQuery}
                      className="flex items-center gap-1"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                    <Button
                      onClick={executeQuery}
                      disabled={loading || !query.trim()}
                      className="flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {loading ? "Executing..." : "Execute Query"}
                    </Button>
                    {selectedQuestion && (
                      <Button
                        onClick={submitSolution}
                        disabled={isSubmitting || !query.trim()}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {isSubmitting ? "Checking..." : "Submit Solution"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your SQL query here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-900 placeholder-gray-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      executeQuery();
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Press Ctrl+Enter (Cmd+Enter on Mac) to execute query
                </p>
              </CardContent>
            </Card>

            {/* Submission Results */}
            {submissionResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {submissionResult.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    {submissionResult.isCorrect ? "Solution Correct!" : "Solution Incorrect"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submissionResult.isCorrect ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="text-green-800 font-semibold mb-2">
                        🎉 Congratulations!
                      </h4>
                      <p className="text-green-700 text-sm mb-3">
                        Your SQL query produces the correct results!
                      </p>
                      <div className="text-sm text-gray-600">
                        <strong>Your Query:</strong>
                        <code className="block bg-white p-2 rounded mt-1 font-mono text-gray-900">
                          {submissionResult.userQuery}
                        </code>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissionResult.error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="text-red-800 font-semibold mb-2">
                            Query Error
                          </h4>
                          <p className="text-red-700 text-sm font-mono">
                            {submissionResult.error}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <h4 className="text-red-800 font-semibold mb-2">
                              Results Don&apos;t Match
                            </h4>
                            <p className="text-red-700 text-sm mb-3">
                              Your query results don&apos;t match the expected output.
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-semibold text-gray-700 mb-2">Your Query:</h5>
                              <code className="text-sm font-mono bg-gray-100 p-2 rounded block text-gray-900">
                                {submissionResult.userQuery}
                              </code>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-gray-700 mb-2">Expected Query:</h5>
                              <code className="text-sm font-mono bg-gray-100 p-2 rounded block text-gray-900">
                                {submissionResult.expectedQuery}
                              </code>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Query Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {result.success ? (
                      <Play className="w-5 h-5 text-blue-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    Query Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.success ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          {result.rowCount} row
                          {result.rowCount !== 1 ? "s" : ""} returned
                        </p>
                      </div>
                      {result.data.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-50">
                              <tr>
                                {result.columns.map((column, index) => (
                                  <th
                                    key={index}
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                                  >
                                    {column}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {result.data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50">
                                  {result.columns.map((column, colIndex) => (
                                    <td
                                      key={colIndex}
                                      className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200"
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
                      ) : (
                        <p className="text-gray-500 text-center py-8">
                          No data returned
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="text-red-800 font-semibold mb-2">
                        Query Error
                      </h4>
                      <p className="text-red-700 text-sm font-mono">
                        {result.error}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
