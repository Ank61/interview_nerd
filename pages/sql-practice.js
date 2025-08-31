import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import SQLExecutor from "../lib/sqlExecutor";
import { sqlDatasets, sqlQuestions } from "../data/sqlDatasets";

export default function SQLPractice() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sqlExecutor] = useState(() => new SQLExecutor());

  // State management
  const [selectedDataset, setSelectedDataset] = useState("employees");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSchema, setShowSchema] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState("beginner");

  // Separate questions by difficulty
  const beginnerQuestions = sqlQuestions.filter((q) => q.difficulty === "easy");
  const advancedQuestions = sqlQuestions.filter(
    (q) => q.difficulty === "medium" || q.difficulty === "hard"
  );

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
      return;
    }

    // Load initial dataset
    try {
      sqlExecutor.loadDataset(selectedDataset);
      setQuery("SELECT * FROM employees LIMIT 5;");
    } catch (error) {
      console.error("Failed to load dataset:", error);
    }
  }, [session, status, router, selectedDataset, sqlExecutor]);

  const handleDatasetChange = (datasetName) => {
    setSelectedDataset(datasetName);
    setSelectedQuestion(null);
    setShowHint(false);
    setShowSolution(false);
    setResult(null);

    try {
      sqlExecutor.loadDataset(datasetName);
      // Set a default query for the new dataset
      const firstTable = Object.keys(sqlDatasets[datasetName].tables)[0];
      setQuery(`SELECT * FROM ${firstTable} LIMIT 5;`);
    } catch (error) {
      console.error("Failed to load dataset:", error);
    }
  };

  const executeQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const result = sqlExecutor.execute(query);
      setResult(result);
    } catch (error) {
      setResult({
        success: false,
        error: error.message,
        query: query,
      });
    }
    setLoading(false);
  };

  const loadQuestion = (question) => {
    setSelectedQuestion(question);
    setQuery("");
    setResult(null);
    setShowHint(false);
    setShowSolution(false);

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
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
              <div className="flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  SQL Practice
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Dataset:</span>
              <select
                value={selectedDataset}
                onChange={(e) => handleDatasetChange(e.target.value)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(sqlDatasets).map(([key, dataset]) => (
                  <option key={key} value={key}>
                    {dataset.name.charAt(0).toUpperCase() +
                      dataset.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

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

            {/* Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
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
