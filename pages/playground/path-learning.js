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
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
    User,
    Settings,
    Lock,
    ChevronRight,
    Trophy,
    Star,
} from "lucide-react";
import { playgroundQuestions } from "@/data/playgroundQuestions";
import CodeEditor from "@/components/playground/CodeEditor";

// Define learning path topics
const learningPath = [
    {
        id: "arrays-strings",
        title: "Arrays & Strings",
        description: "Master fundamental data structures",
        questions: ["js-1", "js-2", "js-3"],
        icon: "📚",
    },
    {
        id: "algorithms",
        title: "Algorithms",
        description: "Learn problem-solving techniques",
        questions: ["js-4"],
        icon: "🧮",
        prerequisite: "arrays-strings",
    },
    {
        id: "advanced",
        title: "Advanced Concepts",
        description: "Trees, graphs, and more",
        questions: ["js-5", "js-6"],
        icon: "🚀",
        prerequisite: "algorithms",
    },
];

export default function PathLearningMode() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // State
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
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [currentTopic, setCurrentTopic] = useState(null);
    const [completedQuestions, setCompletedQuestions] = useState(new Set());
    const [unlockedTopics, setUnlockedTopics] = useState(new Set(["arrays-strings"]));

    const timerRef = useRef(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    // Load progress from localStorage
    useEffect(() => {
        if (session?.user?.email) {
            const savedProgress = localStorage.getItem(`playground-progress-${session.user.email}`);
            if (savedProgress) {
                const { completed, unlocked } = JSON.parse(savedProgress);
                setCompletedQuestions(new Set(completed));
                setUnlockedTopics(new Set(unlocked));
            }
        }
    }, [session]);

    // Save progress to localStorage
    useEffect(() => {
        if (session?.user?.email && completedQuestions.size > 0) {
            localStorage.setItem(
                `playground-progress-${session.user.email}`,
                JSON.stringify({
                    completed: Array.from(completedQuestions),
                    unlocked: Array.from(unlockedTopics),
                })
            );
        }
    }, [completedQuestions, unlockedTopics, session]);

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

    // Get all questions as a flat array
    const getAllQuestions = () => {
        return [...(playgroundQuestions.beginner || []), ...(playgroundQuestions.advanced || [])];
    };

    // Select a topic
    const selectTopic = (topic) => {
        if (!unlockedTopics.has(topic.id)) return;

        setCurrentTopic(topic);
        const allQuestions = getAllQuestions();
        const firstQuestion = allQuestions.find(q => topic.questions.includes(q.id));
        if (firstQuestion) {
            selectQuestion(firstQuestion);
        }
    };

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

    // Check if topic is unlocked
    const isTopicUnlocked = (topic) => {
        if (!topic.prerequisite) return true;

        const prerequisiteTopic = learningPath.find(t => t.id === topic.prerequisite);
        if (!prerequisiteTopic) return true;

        // Check if all questions in prerequisite topic are completed
        return prerequisiteTopic.questions.every(qId => completedQuestions.has(qId));
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

                // Mark question as completed and unlock next topic
                if (allTestsPassed) {
                    const newCompleted = new Set(completedQuestions);
                    newCompleted.add(selectedQuestion.id);
                    setCompletedQuestions(newCompleted);

                    // Check if we should unlock next topic
                    const newUnlocked = new Set(unlockedTopics);
                    learningPath.forEach(topic => {
                        if (isTopicUnlocked(topic)) {
                            newUnlocked.add(topic.id);
                        }
                    });
                    setUnlockedTopics(newUnlocked);

                    // Award points
                    if (session?.user?.email) {
                        await fetch("/api/gamification/award-points", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: session.user.email,
                                points: 15,
                                reason: `Completed ${selectedQuestion.title} in Path Learning`,
                            }),
                        });
                    }
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

    // Calculate topic progress
    const getTopicProgress = (topic) => {
        const completed = topic.questions.filter(qId => completedQuestions.has(qId)).length;
        return (completed / topic.questions.length) * 100;
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
                <title>Path Learning - JavaScript Playground | Interview Nerd</title>
                <meta name="description" content="Structured JavaScript learning path with progressive topics" />
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
                                <span className="text-gray-900 font-medium">Path Learning</span>
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
                    {/* Sidebar - Learning Path */}
                    <div className="lg:col-span-1 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Trophy className="w-5 h-5 text-yellow-600" />
                                    Learning Path
                                </CardTitle>
                                <CardDescription>
                                    Complete topics to unlock new challenges
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {learningPath.map((topic, index) => {
                                    const isUnlocked = unlockedTopics.has(topic.id);
                                    const progress = getTopicProgress(topic);
                                    const isCompleted = progress === 100;
                                    const allQuestions = getAllQuestions();

                                    return (
                                        <div
                                            key={topic.id}
                                            className={`p-4 border rounded-lg transition-all ${isUnlocked
                                                    ? currentTopic?.id === topic.id
                                                        ? "border-yellow-500 bg-yellow-50 cursor-pointer"
                                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
                                                    : "border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed"
                                                }`}
                                            onClick={() => isUnlocked && selectTopic(topic)}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl">{topic.icon}</span>
                                                    <div>
                                                        <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                                                            {topic.title}
                                                            {isCompleted && (
                                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                            )}
                                                            {!isUnlocked && (
                                                                <Lock className="w-4 h-4 text-gray-400" />
                                                            )}
                                                        </h4>
                                                        <p className="text-xs text-gray-600">{topic.description}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {isUnlocked && (
                                                <>
                                                    <Progress value={progress} className="h-2 mb-2" />
                                                    <p className="text-xs text-gray-500">
                                                        {topic.questions.filter(qId => completedQuestions.has(qId)).length} / {topic.questions.length} completed
                                                    </p>
                                                </>
                                            )}

                                            {!isUnlocked && topic.prerequisite && (
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Complete {learningPath.find(t => t.id === topic.prerequisite)?.title} to unlock
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* Current Topic Questions */}
                        {currentTopic && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        {currentTopic.title} Questions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {currentTopic.questions.map((qId) => {
                                        const allQuestions = getAllQuestions();
                                        const question = allQuestions.find(q => q.id === qId);
                                        if (!question) return null;

                                        const isCompleted = completedQuestions.has(qId);

                                        return (
                                            <div
                                                key={qId}
                                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedQuestion?.id === qId
                                                        ? "border-yellow-500 bg-yellow-50"
                                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                    }`}
                                                onClick={() => selectQuestion(question)}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                        {question.title}
                                                        {isCompleted && (
                                                            <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                                                        )}
                                                    </span>
                                                    <Badge className={getDifficultyColor(question.difficulty)}>
                                                        {question.difficulty}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-gray-600 line-clamp-2">
                                                    {question.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-4">
                        {!currentTopic && (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Start Your Learning Journey
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Select a topic from the learning path to begin practicing
                                    </p>
                                    <Button
                                        onClick={() => selectTopic(learningPath[0])}
                                        className="bg-yellow-600 hover:bg-yellow-700"
                                    >
                                        Start with {learningPath[0].title}
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Question Details */}
                        {selectedQuestion && (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Code2 className="w-5 h-5" />
                                            {selectedQuestion.title}
                                            {completedQuestions.has(selectedQuestion.id) && (
                                                <Badge className="bg-green-100 text-green-800">
                                                    Completed
                                                </Badge>
                                            )}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>
                                                {selectedQuestion.difficulty}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-700">{selectedQuestion.description}</p>

                                        {selectedQuestion.examples && (
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                                                {selectedQuestion.examples.map((example, index) => (
                                                    <div key={index} className="bg-gray-50 p-3 rounded mb-2">
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
                        {selectedQuestion && (
                            <Card>
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <CardTitle>Code Editor</CardTitle>
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="language-select" className="text-sm font-medium">
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
                                            <Button
                                                onClick={submitSolution}
                                                disabled={isSubmitting || !code.trim()}
                                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                {isSubmitting ? "Checking..." : "Submit"}
                                            </Button>
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
                        )}

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
                                                Your JavaScript solution passes all test cases! Keep up the great work on your learning path.
                                            </p>
                                            <div className="text-sm text-gray-600">
                                                <strong>Tests Passed:</strong>{" "}
                                                {submissionResult.testResults?.filter((t) => t.passed).length} /{" "}
                                                {submissionResult.testResults?.length}
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
                                                        Your solution doesn&apos;t pass all test cases. Review the failing
                                                        tests below.
                                                    </p>
                                                    <div className="text-sm text-gray-600">
                                                        <strong>Tests Passed:</strong>{" "}
                                                        {submissionResult.testResults?.filter((t) => t.passed).length} /{" "}
                                                        {submissionResult.testResults?.length}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Show test results */}
                                            {submissionResult.testResults &&
                                                submissionResult.testResults.length > 0 && (
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
                                                                    <span className="font-medium">Test {index + 1}</span>
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
                                                                            <strong>Expected:</strong>{" "}
                                                                            {JSON.stringify(test.expected)}
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
                    </div>
                </div>
            </div>
        </div>
    );
}