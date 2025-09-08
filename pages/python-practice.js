import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
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
  FileCode2,
  BookOpen,
  Lightbulb,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Home,
  GraduationCap,
  Zap,
  User,
  Settings,
  ChevronDown,
  ArrowRight,
  MonitorCog,
  DatabaseZap,
  Workflow,
  Database,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
  Table,
} from "lucide-react";
import { pythonQuestions, pythonConcepts } from "../data/pythonDatasets";
import PythonExecutor from "../lib/pythonExecutor";

export default function PythonPractice() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [executor] = useState(() => new PythonExecutor());

  // State management
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState("beginner");

  // Separate questions by difficulty
  const beginnerQuestions = pythonQuestions.beginner || [];
  const advancedQuestions = pythonQuestions.advanced || [];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
      return;
    }

    // Load initial code
    setCode("# Write your Python code here\nprint('Hello, World!')");
  }, [session, status, router]);

  const executeCode = async () => {
    if (!code.trim()) return;

    setLoading(true);
    try {
      const rawResult = executor.execute(code);

      if (rawResult.success) {
        setResult({
          success: true,
          output: rawResult.output || "Code executed successfully (no output)",
          code,
        });
      } else {
        setResult({
          success: false,
          error: rawResult.error,
          code,
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: error.message,
        code,
      });
    }
    setLoading(false);
  };

  const loadQuestion = (question) => {
    setSelectedQuestion(question);
    setCode(question.starterCode || "");
    setResult(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const resetCode = () => {
    if (selectedQuestion) {
      setCode(selectedQuestion.starterCode || "");
    } else {
      setCode("# Write your Python code here\nprint('Hello, World!')");
    }
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
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100">
                <FileCode2 size={24} className="text-yellow-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Interview Nerd
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Python Practice
                </p>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
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
            {/* Python Concepts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileCode2 className="w-5 h-5" />
                  Python Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Practice Python programming with interactive code execution
                  </p>
                  <div className="space-y-2 mt-4">
                    {Object.entries(pythonConcepts).slice(0, 6).map(([key, concept]) => (
                      <div
                        key={key}
                        className="text-xs p-2 rounded-md bg-gray-50 border border-gray-200"
                      >
                        <div className="font-medium text-gray-900">{concept.title}</div>
                        <div className="text-gray-600 mt-1">{concept.description}</div>
                      </div>
                    ))}
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
                              ? "border-yellow-500 bg-yellow-50"
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
                    </div>
                    <p className="text-gray-700">{selectedQuestion.description}</p>

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

                    {showHint && selectedQuestion.hints && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          <strong>Hints:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-yellow-800 text-sm mt-2">
                          {selectedQuestion.hints.map((hint, index) => (
                            <li key={index}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {showSolution && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800 mb-2">
                          <strong>Expected Solution:</strong>
                        </p>
                        <code className="text-sm font-mono bg-white p-2 rounded border block text-gray-900 whitespace-pre-wrap">
                          {selectedQuestion.solution}
                        </code>
                        {selectedQuestion.expectedOutput && (
                          <div className="mt-3">
                            <p className="text-sm text-green-800 mb-1">
                              <strong>Expected Output:</strong>
                            </p>
                            <code className="text-sm font-mono bg-white p-2 rounded border block text-gray-900">
                              {selectedQuestion.expectedOutput}
                            </code>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Python Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Python Code Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetCode}
                      className="flex items-center gap-1"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                    <Button
                      onClick={executeCode}
                      disabled={loading || !code.trim()}
                      className="flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {loading ? "Executing..." : "Execute Code"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your Python code here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none bg-white text-gray-900 placeholder-gray-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      executeCode();
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Press Ctrl+Enter (Cmd+Enter on Mac) to execute code
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
                    Execution Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.success ? (
                    <div className="space-y-4">
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                        {result.output}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="text-red-800 font-semibold mb-2">
                        Execution Error
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
