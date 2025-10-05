import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
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
    Zap,
    User,
    Settings,
    BookOpen,
} from "lucide-react";
import { playgroundQuestions } from "@/data/playgroundQuestions";
import CodeEditor from "@/components/playground/CodeEditor";

export default function TestingMode() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Playground state
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(null);
    const [testResults, setTestResults] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [timeSpent, setTimeSpent] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [activeTab, setActiveTab] = useState("beginner");
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");

    const timerRef = useRef(null);

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/auth/login");
    //     }
    // }, [status, router]);

    // Initialize playground on mount
    useEffect(() => {
        // Auto-select first beginner question if none selected
        if (!selectedQuestion) {
            const beginnerQuestions = playgroundQuestions.beginner || [];
            if (beginnerQuestions.length > 0) {
                selectQuestion(beginnerQuestions[0]);
            }
        }
    }, [selectedQuestion]);

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
        setSelectedQuestion(question);
        setCode(question.starterCode || "");
        setOutput("");
        setError("");
        setShowHint(false);
        setShowSolution(false);
        setTestResults([]);
        setSubmissionResult(null);
        setStartTime(Date.now());
        setAttempts(0);
        setHintsUsed(0);
    };

    // Execute JavaScript code
    const submitSolution = async () => {
        if (!selectedQuestion || !code.trim()) return;

        setIsSubmitting(true);
        setAttempts((prev) => prev + 1);

        try {
            const response = await fetch("/api/playground/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    questionId: selectedQuestion.id,
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

                // Award points for completing the challenge if all tests passed
                if (allTestsPassed && session?.user?.email) {
                    await fetch("/api/gamification/award-points", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: session.user.email,
                            points: 10,
                            reason: `Completed ${selectedQuestion.title}`,
                        }),
                    });
                }
            } else {
                setSubmissionResult({
                    isCorrect: false,
                    error: data.error,
                    userCode: code,
                });
            }
        } catch (err) {
            setSubmissionResult({
                isCorrect: false,
                error: "Failed to execute code",
                userCode: code,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const runTests = async () => {
        if (!selectedQuestion || !code.trim()) return;

        setIsRunning(true);
        setError("");
        setTestResults([]);

        try {
            const response = await fetch("/api/playground/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    questionId: selectedQuestion.id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setTestResults(data.testResults);
                setOutput(data.output || "");
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to execute code");
        } finally {
            setIsRunning(false);
        }
    };

    // Reset current question
    const resetQuestion = () => {
        if (selectedQuestion) {
            setCode(selectedQuestion.starterCode || "");
            setOutput("");
            setError("");
            setTestResults([]);
            setAttempts(0);
            setHintsUsed(0);
            setShowHint(false);
            setShowSolution(false);
            setStartTime(Date.now());
            setSubmissionResult(null);
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

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Practice Questions - JavaScript Playground | Interview Nerd</title>
                <meta name="description" content="Practice JavaScript coding challenges in testing mode" />
            </Head>

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <div
                                className="flex items-center space-x-3 cursor-pointer"
                                onClick={() => router.push("/")}
                            >
                                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100">
                                    <Code2 size={24} className="text-yellow-600" />
                                </div>
                                <div>
                                    <h1 className="hidden lg:block text-xl font-bold text-gray-900">
                                        Interview Nerd
                                    </h1>
                                </div>
                            </div>

                            {/* Breadcrumb */}
                            <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                                <button
                                    onClick={() => router.push("/")}
                                    className="hover:text-gray-700 transition-colors"
                                >
                                    Home
                                </button>
                                <span>/</span>
                                <button
                                    onClick={() => router.push("/playground")}
                                    className="hover:text-gray-700 transition-colors"
                                >
                                    Playground
                                </button>
                                <span>/</span>
                                <span className="text-gray-900 font-medium">Practice Questions</span>
                            </nav>
                        </div>

                        {/* Right side - Actions */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                                <Timer className="w-4 h-4" />
                                <span>{formatTime(timeSpent)}</span>
                                <span className="mx-2">•</span>
                                <span>Attempts: {attempts}</span>
                            </div>

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

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Practice Questions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Code2 className="w-5 h-5" />
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
                                            <Zap className="w-4 h-4" />
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
                                            {(playgroundQuestions.beginner || []).map((question) => (
                                                <div
                                                    key={question.id}
                                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedQuestion?.id === question.id
                                                        ? "border-yellow-500 bg-yellow-50"
                                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                        }`}
                                                    onClick={() => selectQuestion(question)}
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
                                                    <p className="text-xs text-gray-600 line-clamp-2">
                                                        {question.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="advanced" className="mt-4">
                                        <div className="space-y-2">
                                            {(playgroundQuestions.advanced || []).map((question) => (
                                                <div
                                                    key={question.id}
                                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedQuestion?.id === question.id
                                                        ? "border-yellow-500 bg-yellow-50"
                                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                        }`}
                                                    onClick={() => selectQuestion(question)}
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
                                                    <p className="text-xs text-gray-600 line-clamp-2">
                                                        {question.description}
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
                                            <Code2 className="w-5 h-5" />
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
                                        </div>
                                        <p className="text-gray-700">
                                            {selectedQuestion.description}
                                        </p>

                                        {selectedQuestion.examples && (
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-900 mb-2">
                                                    Examples:
                                                </h4>
                                                {selectedQuestion.examples.map((example, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-gray-50 p-3 rounded mb-2"
                                                    >
                                                        <div className="text-sm">
                                                            <div>
                                                                <strong>Input:</strong> {example.input}
                                                            </div>
                                                            <div>
                                                                <strong>Output:</strong> {example.output}
                                                            </div>
                                                            {example.explanation && (
                                                                <div className="text-gray-600 mt-1">
                                                                    {example.explanation}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={showHintHandler}
                                                disabled={showHint}
                                                className="flex items-center gap-1"
                                            >
                                                <Lightbulb className="w-4 h-4" />
                                                {showHint ? "Hint Shown" : "Show Hint"}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowSolution(!showSolution)}
                                                className="flex items-center gap-1"
                                            >
                                                <Eye className="w-4 h-4" />
                                                {showSolution ? "Hide Solution" : "Show Solution"}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={resetQuestion}
                                                className="flex items-center gap-1"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                                Reset
                                            </Button>
                                        </div>

                                        {/* Hints */}
                                        {showHint && selectedQuestion.hints && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                                <p className="text-sm text-yellow-800">
                                                    <strong>Hints:</strong>
                                                </p>
                                                <ul className="text-yellow-700 text-sm space-y-1 mt-1">
                                                    {selectedQuestion.hints.map((hint, index) => (
                                                        <li key={index}>• {hint}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Solution */}
                                        {showSolution && (
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                                <p className="text-sm text-green-800 mb-2">
                                                    <strong>Solution:</strong>
                                                </p>
                                                <pre className="text-sm font-mono bg-white p-2 rounded border overflow-x-auto text-gray-900">
                                                    {selectedQuestion.solution}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Code Editor */}
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <CardTitle>Code Editor</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Label
                                                htmlFor="language-select"
                                                className="text-sm font-medium"
                                            >
                                                Language:
                                            </Label>
                                            <select
                                                id="language-select"
                                                value={selectedLanguage}
                                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            >
                                                <option value="javascript">JavaScript</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={resetQuestion}
                                            className="flex items-center gap-1"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Reset
                                        </Button>
                                        <Button
                                            onClick={runTests}
                                            disabled={isRunning || !code.trim()}
                                            className="flex items-center gap-2"
                                        >
                                            {isRunning ? (
                                                <Clock className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Play className="w-4 h-4" />
                                            )}
                                            {isRunning ? "Running..." : "Run Tests"}
                                        </Button>
                                        {selectedQuestion && (
                                            <Button
                                                onClick={submitSolution}
                                                disabled={isSubmitting || !code.trim()}
                                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                {isSubmitting ? "Checking..." : "Submit"}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CodeEditor
                                    code={code}
                                    onChange={setCode}
                                    language={selectedLanguage}
                                    onRun={runTests}
                                    className="h-full"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Press Ctrl+Enter (Cmd+Enter on Mac) to run code
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
                                        {submissionResult.isCorrect
                                            ? "Solution Correct!"
                                            : "Solution Incorrect"}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {submissionResult.isCorrect ? (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <h4 className="text-green-800 font-semibold mb-2">
                                                🎉 Congratulations!
                                            </h4>
                                            <p className="text-green-700 text-sm mb-3">
                                                Your JavaScript solution passes all test cases!
                                            </p>
                                            <div className="text-sm text-gray-600">
                                                <strong>Tests Passed:</strong>{" "}
                                                {submissionResult.testResults?.filter((t) => t.passed)
                                                    .length}{" "}
                                                / {submissionResult.testResults?.length}
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
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                    <h4 className="text-red-800 font-semibold mb-2">
                                                        Some Tests Failed
                                                    </h4>
                                                    <p className="text-red-700 text-sm mb-3">
                                                        Your solution doesn&apos;t pass all test cases. Review the
                                                        failing tests below.
                                                    </p>
                                                    <div className="text-sm text-gray-600">
                                                        <strong>Tests Passed:</strong>{" "}
                                                        {submissionResult.testResults?.filter((t) => t.passed)
                                                            .length}{" "}
                                                        / {submissionResult.testResults?.length}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Show test results */}
                                            {submissionResult.testResults && submissionResult.testResults.length > 0 && (
                                                <div className="space-y-2 mt-4">
                                                    {submissionResult.testResults.map((test, index) => (
                                                        <div
                                                            key={index}
                                                            className={`p-3 rounded-lg border ${test.passed
                                                                ? "bg-green-50 border-green-200"
                                                                : "bg-red-50 border-red-200"
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-medium">
                                                                    Test {index + 1}
                                                                </span>
                                                                <span
                                                                    className={`text-sm ${test.passed ? "text-green-600" : "text-red-600"
                                                                        }`}
                                                                >
                                                                    {test.passed ? "✓ Passed" : "✗ Failed"}
                                                                </span>
                                                            </div>
                                                            {!test.passed && (
                                                                <>
                                                                    <div className="mt-1 text-sm text-gray-600">
                                                                        <strong>Expected:</strong> {JSON.stringify(test.expected)}
                                                                    </div>
                                                                    <div className="mt-1 text-sm text-gray-600">
                                                                        <strong>Got:</strong> {JSON.stringify(test.actual)}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {!selectedQuestion && (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Select a Question
                                    </h3>
                                    <p className="text-gray-600">
                                        Choose a JavaScript coding challenge from the sidebar to
                                        start practicing.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}