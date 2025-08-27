import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  RotateCcw,
  Lightbulb,
  Eye,
  Clock,
  Target,
  TrendingUp,
  Code,
  CheckCircle,
  XCircle,
  Timer,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  languageConfigs,
  playgroundQuestions,
} from "@/data/playgroundQuestions";
import { AdaptiveAlgorithm, playgroundAdaptive } from "@/lib/adaptiveAlgorithm";
import CodeEditor from "@/components/playground/CodeEditor";

export default function CodePlayground() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [questionMode, setQuestionMode] = useState(true);

  const timerRef = useRef(null);
  const codeEditorRef = useRef(null);

  // Initialize playground on mount
  useEffect(() => {
    if (session?.user?.id && questionMode) {
      playgroundAdaptive.initializeSession(session.user.id);
      loadUserStats();
      loadRecommendation();
    }
  }, [session, questionMode]);

  // Timer for tracking time spent
  useEffect(() => {
    if (startTime) {
      timerRef.current = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [startTime]);

  // Load user statistics
  const loadUserStats = () => {
    const stats = playgroundAdaptive.getStats(selectedLanguage);
    setUserStats(stats);
  };

  // Load AI recommendation
  const loadRecommendation = () => {
    const questions = playgroundQuestions[selectedLanguage] || [];
    const rec = playgroundAdaptive.getRecommendation(
      selectedLanguage,
      questions.map((q) => ({ ...q, language: selectedLanguage }))
    );
    setRecommendation(rec);

    if (rec.recommendedQuestion && !currentQuestion) {
      selectQuestion(rec.recommendedQuestion);
    }
  };

  // Select a question to solve
  const selectQuestion = (question) => {
    setCurrentQuestion(question);
    setUserCode(question.starterCode || "");
    setOutput("");
    setTestResults([]);
    setStartTime(Date.now());
    setTimeSpent(0);
    setAttempts(0);
    setHintsUsed(0);
    setShowHint(false);
    setShowSolution(false);
  };

  // Run user code
  const runCode = async () => {
    if (!currentQuestion || !userCode.trim()) return;

    setIsRunning(true);
    setAttempts((prev) => prev + 1);

    try {
      // Simulate code execution (in real implementation, use a sandboxed environment)
      const results = await executeCode(userCode, currentQuestion);
      setOutput(results.output);
      setTestResults(results.testResults);

      // Check if all tests passed
      const allPassed = results.testResults.every((test) => test.passed);
      if (allPassed) {
        handleQuestionCompleted(true);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setTestResults([]);
    }

    setIsRunning(false);
  };

  // Execute code based on current mode
  const executeCode = async () => {
    if (!userCode.trim()) return;

    setIsRunning(true);
    setOutput(questionMode ? "Running tests..." : "Executing code...");

    try {
      const response = await fetch("/api/playground/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: userCode,
          language: selectedLanguage,
          testCases: questionMode ? currentQuestion?.testCases : [],
          compilerMode: !questionMode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Execution failed");
      }

      setTestResults(data.results || []);
      setOutput(data.output);

      // Only record completion in question mode
      if (questionMode && currentQuestion && data.results) {
        const passedCount = data.results.filter((r) => r.passed).length;
        const totalCount = data.results.length;

        if (passedCount === totalCount) {
          await handleQuestionCompleted(true);
        }
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setTestResults([]);
    } finally {
      setIsRunning(false);
    }
  };

  // Handle question completion
  const handleQuestionCompleted = async (success) => {
    if (!session?.user?.id || !currentQuestion) return;

    const userMetrics = {
      timeSpent,
      attempts,
      hintsUsed,
      success,
      finalCode: userCode,
    };

    const questionData = {
      ...currentQuestion,
      language: selectedLanguage,
    };

    // Record performance with adaptive algorithm
    const performance = playgroundAdaptive.recordCompletion(
      questionData,
      userMetrics,
      session.user.id
    );

    // Send completion data to backend for gamification
    try {
      const response = await fetch("/api/playground/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          language: selectedLanguage,
          difficulty: currentQuestion.difficulty,
          timeSpent,
          attempts,
          hintsUsed,
          success,
          codeQuality: assessCodeQuality(userCode),
          tags: currentQuestion.tags,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Show gamification feedback
        let feedbackMessage = success
          ? `🎉 Congratulations! All tests passed!\n+${result.xpGained} XP earned!`
          : `Keep trying! +${result.xpGained} XP for the attempt.`;

        if (result.leveledUp) {
          feedbackMessage += `\n🆙 Level Up! You're now level ${result.newLevel}!`;
        }

        if (result.badgesEarned && result.badgesEarned.length > 0) {
          feedbackMessage += `\n🏆 New badges earned: ${result.badgesEarned
            .map((b) => b.name)
            .join(", ")}`;
        }

        setOutput((prev) => prev + "\n\n" + feedbackMessage);
      }
    } catch (error) {
      console.error("Failed to record completion:", error);
    }

    // Update stats and get new recommendation
    loadUserStats();
    loadRecommendation();
  };

  // Assess code quality (client-side version)
  const assessCodeQuality = (code) => {
    let score = 100;

    // Deduct points for poor practices
    if (code.includes("var ")) score -= 10;
    if (code.split("\n").length > 50) score -= 15;
    if (!code.includes("//") && !code.includes("/*")) score -= 5;
    if (code.includes("console.log") && code.split("console.log").length > 3)
      score -= 10;

    // Add points for good practices
    if (code.includes("const ") || code.includes("let ")) score += 5;
    if (code.includes("//") || code.includes("/*")) score += 5;
    if (code.includes("try") && code.includes("catch")) score += 10;

    return Math.max(0, Math.min(100, score));
  };

  // Reset current question
  const resetQuestion = () => {
    if (currentQuestion) {
      setUserCode(currentQuestion.starterCode || "");
      setOutput("");
      setTestResults([]);
      setAttempts(0);
      setHintsUsed(0);
      setShowHint(false);
      setShowSolution(false);
      setStartTime(Date.now());
    }
  };

  // Show hint
  const showHintHandler = () => {
    setShowHint(true);
    setHintsUsed((prev) => prev + 1);
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get difficulty color
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

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Please log in to access the Code Playground.
            </p>
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">
              Code Playground
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Question Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Question Mode</span>
              <button
                onClick={() => setQuestionMode(!questionMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  questionMode ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    questionMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">Compiler Mode</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1">
              {Object.entries(languageConfigs).map(([key, config]) => (
                <Button
                  key={key}
                  variant={selectedLanguage === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setSelectedLanguage(key);
                    if (questionMode) loadRecommendation();
                  }}
                  className={
                    selectedLanguage === key
                      ? "bg-blue-600 text-white"
                      : "text-gray-600"
                  }
                >
                  {config.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Conditional Sidebar - Only show in Question Mode */}
        {questionMode && (
          <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Questions
              </h3>
              <div className="space-y-2">
                {(playgroundQuestions[selectedLanguage] || []).map(
                  (question) => (
                    <div
                      key={question.id}
                      className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                        currentQuestion?.id === question.id
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => selectQuestion(question)}
                    >
                      <div className="font-medium truncate">
                        {question.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-xs ${
                            question.difficulty === "easy"
                              ? "bg-green-100 text-green-700"
                              : question.difficulty === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Expanded */}
        <div className="flex-1 flex flex-col">
          {(questionMode && currentQuestion) || !questionMode ? (
            <>
              {/* Conditional Question Header - Only show in Question Mode */}
              {questionMode && currentQuestion && (
                <div className="bg-white border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {currentQuestion.title}
                      </h2>
                      <Badge
                        className={`text-xs ${
                          currentQuestion.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : currentQuestion.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{formatTime(timeSpent)}</span>
                      <span>Attempts: {attempts}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {currentQuestion.description}
                  </p>
                </div>
              )}

              {/* Compiler Mode Header */}
              {!questionMode && (
                <div className="bg-white border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {languageConfigs[selectedLanguage]?.name} Compiler
                    </h2>
                    <div className="text-sm text-gray-600">
                      Write and execute{" "}
                      {languageConfigs[selectedLanguage]?.name} code
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded Code Editor & Output */}
              <div className="flex-1 flex">
                {/* Large Code Editor */}
                <div className="flex-1 flex flex-col">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {languageConfigs[selectedLanguage]?.name} Editor
                    </span>
                    {questionMode && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={showHintHandler}
                        >
                          <Lightbulb className="w-4 h-4 mr-1" />
                          Hint
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={resetQuestion}
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Reset
                        </Button>
                      </div>
                    )}
                  </div>

                  <CodeEditor
                    code={userCode}
                    onChange={setUserCode}
                    language={selectedLanguage}
                    onRun={executeCode}
                    className="flex-1"
                  />

                  {/* Run Button */}
                  <div className="bg-gray-100 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={executeCode}
                        disabled={isRunning || !userCode.trim()}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isRunning ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            {questionMode ? "Run Tests" : "Execute Code"}
                          </>
                        )}
                      </Button>
                      <span className="text-sm text-gray-600">
                        Press Ctrl+Enter to run
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compact Output Panel */}
                <div className="w-80 bg-gray-900 text-white flex flex-col">
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <span className="text-sm font-medium">Output</span>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto">
                    {output && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Console Output:
                        </h4>
                        <pre className="text-sm text-green-400 whitespace-pre-wrap">
                          {output}
                        </pre>
                      </div>
                    )}

                    {testResults.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Test Results:
                        </h4>
                        <div className="space-y-2">
                          {testResults.map((test) => (
                            <div
                              key={test.id}
                              className={`p-2 rounded text-sm ${
                                test.passed
                                  ? "bg-green-900 text-green-200"
                                  : "bg-red-900 text-red-200"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {test.passed ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <XCircle className="w-4 h-4" />
                                )}
                                Test {test.id + 1}:{" "}
                                {test.passed ? "PASSED" : "FAILED"}
                              </div>
                              {!test.passed && (
                                <div className="mt-1 text-xs">
                                  <div>
                                    Expected: {JSON.stringify(test.expected)}
                                  </div>
                                  <div>
                                    Actual: {JSON.stringify(test.actual)}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hint/Solution Panel */}
              <AnimatePresence>
                {(showHint || showSolution) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="bg-yellow-50 border-t border-yellow-200 overflow-hidden"
                  >
                    <div className="p-4">
                      {showHint && (
                        <div className="mb-4">
                          <h4 className="font-medium text-yellow-800 mb-2">
                            💡 Hint:
                          </h4>
                          <p className="text-yellow-700 text-sm">
                            Try using the {currentQuestion.tags[0]} approach.
                            Consider the time complexity:{" "}
                            {currentQuestion.timeComplexity}
                          </p>
                        </div>
                      )}

                      {showSolution && (
                        <div>
                          <h4 className="font-medium text-yellow-800 mb-2">
                            ✅ Solution:
                          </h4>
                          <pre className="bg-yellow-100 p-3 rounded text-sm overflow-x-auto">
                            <code>{currentQuestion.solution}</code>
                          </pre>
                        </div>
                      )}

                      <div className="flex gap-2 mt-3">
                        {!showSolution && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowSolution(true)}
                          >
                            Show Solution
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowHint(false);
                            setShowSolution(false);
                          }}
                        >
                          Hide
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a Question
                </h3>
                <p className="text-gray-600">
                  Choose a coding challenge from the sidebar to start.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
