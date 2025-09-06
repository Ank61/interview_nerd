import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  RotateCcw,
  Lightbulb,
  Eye,
  Clock,
  Code2,
  CheckCircle,
  XCircle,
  Timer,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  languageConfig,
  playgroundQuestions,
} from "@/data/playgroundQuestions";
import { AdaptiveAlgorithm, playgroundAdaptive } from "@/lib/adaptiveAlgorithm";
import CodeEditor from "@/components/playground/CodeEditor";

export default function CodePlayground() {
  const { data: session } = useSession();
  const router = useRouter();
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
  const [activeTab, setActiveTab] = useState("beginner");

  const timerRef = useRef(null);
  const codeEditorRef = useRef(null);

  // Initialize playground on mount
  useEffect(() => {
    if (session?.user?.id) {
      playgroundAdaptive.initializeSession(session.user.id);
      // Auto-select first beginner question if none selected
      if (!currentQuestion) {
        const beginnerQuestions = playgroundQuestions.beginner || [];
        if (beginnerQuestions.length > 0) {
          selectQuestion(beginnerQuestions[0]);
        }
      }
    }
  }, [session]);

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

  // Execute JavaScript code
  const executeCode = async () => {
    if (!userCode.trim()) return;

    setIsRunning(true);
    setOutput("Running tests...");
    setAttempts((prev) => prev + 1);

    try {
      const response = await fetch("/api/playground/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: userCode,
          language: "javascript",
          testCases: currentQuestion?.testCases || [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Execution failed");
      }

      setTestResults(data.results || []);
      setOutput(data.output);

      // Check if all tests passed
      if (currentQuestion && data.results) {
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
      language: "javascript",
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
          language: "javascript",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-yellow-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                JavaScript Playground
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeSpent)}</span>
            <span className="mx-2">•</span>
            <span>Attempts: {attempts}</span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="border-b border-gray-200 p-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="beginner" className="p-4 space-y-3">
              <h3 className="font-medium text-gray-900 mb-3">Beginner Questions</h3>
              {(playgroundQuestions.beginner || []).map((question) => (
                <Card
                  key={question.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentQuestion?.id === question.id
                      ? "ring-2 ring-yellow-500 bg-yellow-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => selectQuestion(question)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {question.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {question.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {question.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {question.tags?.slice(0, 2).join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="advanced" className="p-4 space-y-3">
              <h3 className="font-medium text-gray-900 mb-3">Advanced Questions</h3>
              {(playgroundQuestions.advanced || []).map((question) => (
                <Card
                  key={question.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentQuestion?.id === question.id
                      ? "ring-2 ring-yellow-500 bg-yellow-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => selectQuestion(question)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {question.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {question.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={
                              question.difficulty === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {question.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {question.tags?.slice(0, 2).join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
          {currentQuestion ? (
            <div className="h-full flex flex-col">
              {/* Question Details */}
              <Card className="m-6 mb-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={
                          currentQuestion.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : currentQuestion.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={showHintHandler}
                        disabled={showHint}
                      >
                        <Lightbulb className="w-4 h-4 mr-1" />
                        {showHint ? "Hint Shown" : "Show Hint"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowSolution(!showSolution)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {showSolution ? "Hide Solution" : "Show Solution"}
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
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{currentQuestion.description}</p>
                  
                  {currentQuestion.examples && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                      {currentQuestion.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded mb-2">
                          <div className="text-sm">
                            <div><strong>Input:</strong> {example.input}</div>
                            <div><strong>Output:</strong> {example.output}</div>
                            {example.explanation && (
                              <div className="text-gray-600 mt-1">{example.explanation}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hints */}
                  {showHint && currentQuestion.hints && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                      <h4 className="font-medium text-yellow-800 mb-2">💡 Hints:</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        {currentQuestion.hints.map((hint, index) => (
                          <li key={index}>• {hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Solution */}
                  {showSolution && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                      <h4 className="font-medium text-blue-800 mb-2">✅ Solution:</h4>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                        <code>{currentQuestion.solution}</code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Code Editor and Results */}
              <div className="flex-1 mx-6 mb-6 flex gap-6">
                {/* Code Editor */}
                <Card className="flex-1 flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">JavaScript Editor</CardTitle>
                      <Button
                        onClick={executeCode}
                        disabled={isRunning || !userCode.trim()}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        {isRunning ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Run Code
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <CodeEditor
                      code={userCode}
                      onChange={setUserCode}
                      language="javascript"
                      onRun={executeCode}
                      className="h-full"
                    />
                  </CardContent>
                </Card>

                {/* Results Panel */}
                <Card className="w-96 flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    {output && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Console Output:</h4>
                        <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm whitespace-pre-wrap">
                          {output}
                        </pre>
                      </div>
                    )}

                    {testResults.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Test Results:</h4>
                        <div className="space-y-2">
                          {testResults.map((test, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded border ${
                                test.passed
                                  ? "bg-green-50 border-green-200"
                                  : "bg-red-50 border-red-200"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {test.passed ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                )}
                                <span className={`font-medium ${
                                  test.passed ? "text-green-800" : "text-red-800"
                                }`}>
                                  Test {index + 1}: {test.passed ? "PASSED" : "FAILED"}
                                </span>
                              </div>
                              {!test.passed && (
                                <div className="text-sm text-red-700 ml-6">
                                  <div>Expected: {JSON.stringify(test.expected)}</div>
                                  <div>Actual: {JSON.stringify(test.actual)}</div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!output && testResults.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <Code2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Run your code to see results</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a Question
                </h3>
                <p className="text-gray-600">
                  Choose a coding challenge from the sidebar to start practicing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
