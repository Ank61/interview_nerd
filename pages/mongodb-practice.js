import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
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
  Database,
  Play,
  Home,
  BookOpen,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Clock,
  Code,
  FileText,
  User,
  Eye,
  EyeOff,
  Menu,
  X,
  XCircle,
  LogOut,
  Settings,
} from "lucide-react";
import MongoExecutor from "../lib/mongoExecutor";
import { mongoDatasets, mongoQuestions } from "../data/mongoDatasets";

export default function MongoDBPractice() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  // State management
  const [selectedDataset, setSelectedDataset] = useState("ecommerce");
  const [query, setQuery] = useState("db.products.find()");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState("beginner");
  const [showSchema, setShowSchema] = useState(true);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mongoExecutor = new MongoExecutor();

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

  const handleDatasetChange = (datasetName) => {
    setSelectedDataset(datasetName);
    setQuery(
      `db.${Object.keys(mongoDatasets[datasetName].collections)[0]}.find()`
    );
    setResult(null);
    setError("");
    setSelectedQuestion(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const executeQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const queryResult = mongoExecutor.executeQuery(selectedDataset, query);

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

  const selectQuestion = (question) => {
    setSelectedQuestion(question);
    setQuery(`db.${question.collection}.find()`);
    setResult(null);
    setError("");
    setShowHint(false);
    setShowSolution(false);
    setSubmissionResult(null);

    if (question.dataset !== selectedDataset) {
      setSelectedDataset(question.dataset);
    }
  };

  const submitSolution = async () => {
    if (!selectedQuestion || !query.trim()) return;

    setIsSubmitting(true);
    try {
      const executionResult = mongoExecutor.executeQuery(selectedDataset, query);
      
      if (executionResult.success) {
        // For MongoDB, we'll compare the user's query result with expected result
        const userResult = executionResult.result;
        const expectedQuery = selectedQuestion.solution;
        
        // Execute the expected query to compare results
        const expectedResult = mongoExecutor.executeQuery(selectedDataset, expectedQuery);
        
        if (expectedResult.success) {
          const expectedData = expectedResult.result;
          
          // Compare results - normalize and compare JSON strings
          const normalizeResult = (result) => {
            if (Array.isArray(result)) {
              return JSON.stringify(result.slice(0, 10).map(item => 
                typeof item === 'object' ? JSON.stringify(item) : item
              ).sort());
            }
            return JSON.stringify(result);
          };
          
          const isCorrect = normalizeResult(userResult) === normalizeResult(expectedData);
          
          setSubmissionResult({
            isCorrect,
            userResult,
            expectedResult: expectedData,
            userQuery: query,
            expectedQuery,
            executionResult
          });
        } else {
          setSubmissionResult({
            isCorrect: false,
            error: "Could not execute expected query for comparison",
            executionResult
          });
        }
      } else {
        setSubmissionResult({
          isCorrect: false,
          error: executionResult.error,
          executionResult
        });
      }
    } catch (error) {
      setSubmissionResult({
        isCorrect: false,
        error: error.message,
        executionResult: null
      });
    }
    setIsSubmitting(false);
  };

  const formatResult = (data) => {
    if (data === null || data === undefined) return "null";
    if (typeof data === "number" || typeof data === "boolean")
      return data.toString();
    if (typeof data === "string") return `"${data}"`;
    return JSON.stringify(data, null, 2);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const currentDataset = mongoDatasets[selectedDataset];

  return (
    <>
      <Head>
        <title>MongoDB Practice - Interview Nerd</title>
        <meta
          name="description"
          content="Practice MongoDB queries and aggregation pipelines"
        />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                <Database size={24} className="text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Interview Nerd
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  MongoDB Practice
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
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {Object.entries(mongoDatasets).map(([key, dataset]) => (
                    <option key={key} value={key}>
                      {dataset.name}
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
                  <FileText className="w-5 h-5" />
                  Dataset Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {currentDataset.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {currentDataset.description}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">
                      Collections:
                    </h5>
                    <div className="space-y-1">
                      {Object.entries(currentDataset.collections).map(
                        ([name, docs]) => (
                          <div
                            key={name}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm font-mono text-blue-600">
                              {name}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {docs.length} docs
                            </Badge>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practice Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5" />
                  Practice Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="beginner">Beginner</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="beginner" className="space-y-2 mt-4">
                    {mongoQuestions.beginner.map((question) => (
                      <div
                        key={question.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedQuestion?.id === question.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => selectQuestion(question)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">
                            {question.title}
                          </h4>
                          <Badge
                            variant={
                              question.difficulty === "Easy"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">
                          {question.question}
                        </p>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-2 mt-4">
                    {mongoQuestions.advanced.map((question) => (
                      <div
                        key={question.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedQuestion?.id === question.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => selectQuestion(question)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">
                            {question.title}
                          </h4>
                          <Badge
                            variant={
                              question.difficulty === "Hard"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">
                          {question.question}
                        </p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Selected Question */}
            {selectedQuestion && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    {selectedQuestion.title}
                    <Badge
                      variant={
                        selectedQuestion.difficulty === "Easy"
                          ? "default"
                          : selectedQuestion.difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {selectedQuestion.difficulty}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {selectedQuestion.question}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                      className="flex items-center gap-1"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSolution(!showSolution)}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {showSolution ? "Hide Solution" : "Show Solution"}
                    </Button>
                  </div>

                  {showHint && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Hint:</strong> {selectedQuestion.hint}
                      </p>
                    </div>
                  )}

                  {showSolution && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 mb-2">
                        <strong>Solution:</strong>
                      </p>
                      <pre className="text-sm font-mono bg-white p-2 rounded border overflow-x-auto">
                        {selectedQuestion.solution}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Query Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  MongoDB Query Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter your MongoDB query here..."
                      className="w-full h-32 p-3 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={executeQuery}
                      disabled={loading || !query.trim()}
                      className="flex items-center gap-2"
                    >
                      {loading ? (
                        <Clock className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
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
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuery("");
                        setResult(null);
                        setError("");
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
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
                        Your MongoDB query produces the correct results!
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Query Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Error</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                )}

                {result && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">
                          Query executed successfully
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Execution time: {result.executionTime.toFixed(2)}ms
                      </div>
                    </div>

                    <div className="bg-gray-50 border rounded-lg">
                      <div className="p-3 border-b bg-gray-100">
                        <span className="text-sm font-medium text-gray-700">
                          Results (
                          {Array.isArray(result.result)
                            ? result.result.length
                            : 1}{" "}
                          documents)
                        </span>
                      </div>
                      <div className="p-4">
                        <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                          {formatResult(result.result)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {!result && !error && !loading && (
                  <div className="text-center py-8 text-gray-500">
                    <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Execute a query to see results here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
