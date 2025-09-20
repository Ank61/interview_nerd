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
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState({
    beginner: 1,
    advanced: 1
  });
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [isLoadingSolved, setIsLoadingSolved] = useState(true);
  const questionsPerPage = 5; // Number of questions to show per page

  // Separate questions by difficulty
  const beginnerQuestions = pythonQuestions.beginner || [];
  const advancedQuestions = pythonQuestions.advanced || [];

  const getCurrentQuestions = (questions, difficulty) => {
    const indexOfLastQuestion = currentPage[difficulty] * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    return questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  };

  const paginate = (difficulty, pageNumber) => {
    setCurrentPage(prev => ({
      ...prev,
      [difficulty]: pageNumber
    }));
  };

  const totalBeginnerPages = Math.ceil(beginnerQuestions.length / questionsPerPage);
  const totalAdvancedPages = Math.ceil(advancedQuestions.length / questionsPerPage);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (status === "loading") return;
    // if (!session) {
    //   router.push("/auth/login");
    //   return;
    // }

    // Load initial code
    setCode("");
  }, [session, status, router]);

  const executeCode = async () => {
    if (!code.trim()) return;

    setLoading(true);
    try {
      const rawResult = await executor.execute(code);

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
    setSubmissionResult(null);
  };

  const resetCode = () => {
    if (selectedQuestion) {
      setCode(selectedQuestion.starterCode || "");
    } else {
      setCode("");
    }
    setResult(null);
    setShowHint(false);
    setShowSolution(false);
    setSubmissionResult(null);
  };

  const submitSolution = async () => {
    if (!selectedQuestion || !code.trim()) return;

    setIsSubmitting(true);
    try {
      const executionResult = await executor.execute(code);

      if (executionResult.success) {
        const userOutput = executionResult.output.trim();
        const expectedOutput = selectedQuestion.expectedOutput.trim();

        // Normalize outputs for comparison
        const normalizeOutput = (output) => {
          return output
            .replace(/\s+/g, ' ')
            .replace(/'/g, '"')
            .replace(/\[\s+/g, '[')
            .replace(/\s+\]/g, ']')
            .replace(/\{\s+/g, '{')
            .replace(/\s+\}/g, '}')
            .trim();
        };

        const normalizedUserOutput = normalizeOutput(userOutput);
        const normalizedExpectedOutput = normalizeOutput(expectedOutput);

        const isCorrect = normalizedUserOutput === normalizedExpectedOutput;

        // Mark as solved if correct and user is logged in
        if (isCorrect && session) {
          await markQuestionAsSolved(selectedQuestion);
        }

        setSubmissionResult({
          isCorrect,
          userOutput,
          expectedOutput: selectedQuestion.expectedOutput,
          executionResult
        });
      } else {
        setSubmissionResult({
          isCorrect: false,
          error: executionResult.error,
          code: code,
        });
      }
    } catch (error) {
      console.error('Error executing code:', error);
      setSubmissionResult({
        isCorrect: false,
        error: 'An error occurred while executing your code',
        code: code,
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

  const markQuestionAsSolved = async (question) => {
    if (!session) {
      console.log('⚠️ [Frontend] User not logged in, skipping mark as solved');
      return;
    }

    try {
      console.log('📝 [Frontend] Marking question as solved:', question.id);
      const response = await fetch('/api/questions/solved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: question.id,
          difficulty: question.difficulty?.toLowerCase() || 'medium',
          category: question.category || 'Python',
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        console.log('✅ [Frontend] Successfully marked question as solved:', data);
        // Refresh the solved questions list
        await fetchSolvedQuestions();
      } else {
        console.error('❌ [Frontend] Failed to mark question as solved:', data.message);
      }
    } catch (error) {
      console.error('❌ [Frontend] Error in markQuestionAsSolved:', error);
    }
  };

  const fetchSolvedQuestions = async () => {
    if (status === 'authenticated') {
      try {
        console.log('🔍 [Frontend] Fetching solved questions...');
        const response = await fetch('/api/questions/solved');
        const data = await response.json();

        if (data.success) {
          console.log('✅ [Frontend] Fetched solved questions:', data.solvedQuestions);
          setSolvedQuestions(data.solvedQuestions || []);
        } else {
          console.error('❌ [Frontend] Error fetching solved questions:', data.message);
        }
      } catch (error) {
        console.error('❌ [Frontend] Error in fetchSolvedQuestions:', error);
      } finally {
        setIsLoadingSolved(false);
      }
    } else {
      setIsLoadingSolved(false);
    }
  };

  useEffect(() => {
    const fetchSolvedQuestions = async () => {
      if (status === 'authenticated') {
        try {
          console.log('🔍 [Frontend] Fetching solved questions...');
          const response = await fetch('/api/questions/solved');
          const data = await response.json();

          if (data.success) {
            console.log('✅ [Frontend] Fetched solved questions:', data.solvedQuestions);
            setSolvedQuestions(data.solvedQuestions || []);
          } else {
            console.error('❌ [Frontend] Error fetching solved questions:', data.message);
          }
        } catch (error) {
          console.error('❌ [Frontend] Error in fetchSolvedQuestions:', error);
        } finally {
          setIsLoadingSolved(false);
        }
      } else {
        setIsLoadingSolved(false);
      }
    };

    fetchSolvedQuestions();
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const SolvedQuestionsPanel = () => {
    if (status !== 'authenticated' || isLoadingSolved) return null;

    const userSolvedIds = solvedQuestions.map(q => q.questionId);
    const allQuestions = [...beginnerQuestions, ...advancedQuestions];
    const solved = allQuestions.filter(q => userSolvedIds.includes(q.id));

    if (solved.length === 0) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Solved Questions
          </CardTitle>
          <CardDescription>
            {solved.length} problem{solved.length !== 1 ? 's' : ''} solved
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {solved.map((question) => (
              <div
                key={question.id}
                className="p-3 border rounded-lg bg-green-50 border-green-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-green-900">
                      {question.title}
                    </h4>
                    <p className="text-sm text-green-700">{question.category}</p>
                    <Badge variant="outline" className="mt-2 bg-green-100 text-green-800 border-green-200">
                      {question.difficulty}
                    </Badge>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const QuestionItem = ({ question, isActive }) => {
    const isSolved = solvedQuestions.some(q => q.questionId === question.id);

    return (
      <div
        className={`p-3 border rounded-lg cursor-pointer transition-colors ${isActive
          ? "border-yellow-500 bg-yellow-50"
          : isSolved
            ? "border-green-200 bg-green-50 hover:border-green-300"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        onClick={() => loadQuestion(question)}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
            {isSolved && <CheckCircle className="w-4 h-4 text-green-500" />}
            {question.title}
          </span>
          <Badge className={getDifficultyColor(question.difficulty)}>
            {question.difficulty}
          </Badge>
        </div>
        <p className="text-xs text-gray-600">
          {question.category}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push("/")}
            >
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
          <div className="lg:col-span-1 space-y-4">
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
                    <div className="space-y-2 mb-4">
                      {getCurrentQuestions(beginnerQuestions, 'beginner').map((question) => (
                        <QuestionItem
                          key={question.id}
                          question={question}
                          isActive={selectedQuestion?.id === question.id}
                        />
                      ))}
                    </div>
                    {/* Pagination */}
                    {totalBeginnerPages > 1 && (
                      <div className="flex justify-between items-center mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => paginate('beginner', Math.max(1, currentPage.beginner - 1))}
                          disabled={currentPage.beginner === 1}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        <span className="text-sm text-gray-600">
                          Page {currentPage.beginner} of {totalBeginnerPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => paginate('beginner', Math.min(totalBeginnerPages, currentPage.beginner + 1))}
                          disabled={currentPage.beginner === totalBeginnerPages}
                          className="flex items-center gap-1"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-4">
                    <div className="space-y-2 mb-4">
                      {getCurrentQuestions(advancedQuestions, 'advanced').map((question) => (
                        <QuestionItem
                          key={question.id}
                          question={question}
                          isActive={selectedQuestion?.id === question.id}
                        />
                      ))}
                    </div>
                    {/* Pagination */}
                    {totalAdvancedPages > 1 && (
                      <div className="flex justify-between items-center mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => paginate('advanced', Math.max(1, currentPage.advanced - 1))}
                          disabled={currentPage.advanced === 1}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        <span className="text-sm text-gray-600">
                          Page {currentPage.advanced} of {totalAdvancedPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => paginate('advanced', Math.min(totalAdvancedPages, currentPage.advanced + 1))}
                          disabled={currentPage.advanced === totalAdvancedPages}
                          className="flex items-center gap-1"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
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
                    <p className="text-gray-700">
                      {selectedQuestion.description}
                    </p>

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
            <Card className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <FileCode2 className="w-5 h-5" />
                    Code Editor
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                      className="flex items-center gap-1"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHint ? 'Hide Hint' : 'Hint'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSolution(!showSolution)}
                      className="flex items-center gap-1"
                      disabled={!selectedQuestion?.solution}
                    >
                      <Eye className="w-4 h-4" />
                      {showSolution ? 'Hide Solution' : 'Solution'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4">
                <Textarea
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono min-h-[calc(100%-40px)] w-full h-full resize-none"
                  placeholder="Write your Python code here..."
                />
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="w-full flex items-center justify-between">
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
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={executeCode}
                      disabled={loading || !code.trim()}
                      className="flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {loading ? 'Executing...' : 'Run'}
                    </Button>
                    {selectedQuestion && (
                      <Button
                        onClick={submitSolution}
                        disabled={isSubmitting || !code.trim()}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {isSubmitting ? 'Checking...' : 'Submit'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardFooter>
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
                        Your solution produces the correct output!
                      </p>
                      <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                        {submissionResult.userOutput}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {submissionResult.error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="text-red-800 font-semibold mb-2">
                            Execution Error
                          </h4>
                          <p className="text-red-700 text-sm font-mono">
                            {submissionResult.error}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <h4 className="text-red-800 font-semibold mb-2">
                              Output Mismatch
                            </h4>
                            <p className="text-red-700 text-sm mb-3">
                              Your output doesn&apos;t match the expected result.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-semibold text-gray-700 mb-2">Your Output:</h5>
                              <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                                {submissionResult.userOutput || "(no output)"}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-gray-700 mb-2">Expected Output:</h5>
                              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                                {submissionResult.expectedOutput}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Execution Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {result.success ? (
                      <Play className="w-5 h-5 text-blue-600" />
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
        {/* <SolvedQuestionsPanel /> */}
      </div>
    </div>
  );
}
