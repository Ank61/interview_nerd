import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Play,
    RotateCcw,
    Lightbulb,
    CheckCircle,
    XCircle,
    Code2,
    User,
    Settings,
    Clock,
} from "lucide-react";
import { playgroundQuestions } from "@/data/playgroundQuestions";
import { useJSProgress } from "@/hooks/useJSProgress";
import CodeEditor from "@/components/playground/CodeEditor";

export default function JSQuestionPage() {
    const router = useRouter();
    const { id } = router.query;
    const { data: session, status } = useSession();
    const { saveProgress, isQuestionCompleted } = useJSProgress();
    const [isCompleted, setIsCompleted] = useState(false);

    // Refs for resizable panels
    const containerRef = useRef(null);
    const verticalDividerRef = useRef(null);
    const horizontalDividerRef = useRef(null);

    // State
    const [question, setQuestion] = useState(null);
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [testResults, setTestResults] = useState([]);

    // Panel sizes
    const [leftWidth, setLeftWidth] = useState(40); // percentage
    const [topHeight, setTopHeight] = useState(50); // percentage

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/auth/login");
    //     }
    // }, [status, router]);

    useEffect(() => {
        if (id) {
            const allQuestions = [
                ...(playgroundQuestions.beginner || []),
                ...(playgroundQuestions.advanced || [])
            ];
            const foundQuestion = allQuestions.find(q => q.id === id);
            if (foundQuestion) {
                setQuestion(foundQuestion);
                setCode(foundQuestion.starterCode || "");
                setIsCompleted(isQuestionCompleted(foundQuestion.id));
            }
        }
    }, [id, isQuestionCompleted]);

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
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
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
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const executeCode = async () => {
        if (!code.trim() || !question) return;

        setLoading(true);
        setError("");
        setResult(null);
        setTestResults([]);

        try {
            const response = await fetch("/api/playground/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    questionId: question.id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setTestResults(data.testResults);
                setResult({
                    output: data.output || "",
                    testResults: data.testResults,
                });
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to execute code");
        } finally {
            setLoading(false);
        }
    };

    const submitSolution = async () => {
        if (!question || !code.trim()) return;

        setLoading(true);
        setSubmissionResult(null);

        try {
            const response = await fetch("/api/playground/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    questionId: question.id,
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

                // Save progress
                if (allTestsPassed) {
                    await saveProgress(
                        question.id,
                        question.tags || [],
                        question.difficulty,
                        code,
                        true
                    );
                    setIsCompleted(true);

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
                                reason: `Completed ${question.title}`,
                            }),
                        });
                    }
                }
            } else {
                setSubmissionResult({
                    isCorrect: false,
                    error: data.error,
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
            <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 flex items-center justify-center">
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
                <title>{question.title} - JavaScript Practice | Interview Nerd</title>
                <meta name="description" content="Practice JavaScript coding challenges" />
            </Head>

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
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

                            <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                                <button onClick={() => router.push("/")} className="hover:text-gray-700 transition-colors">
                                    Home
                                </button>
                                <span>/</span>
                                <button onClick={() => router.push("/playground")} className="hover:text-gray-700 transition-colors">
                                    JavaScript Practice
                                </button>
                                <span>/</span>
                                <button onClick={() => router.push("/js-practice/testing")} className="hover:text-gray-700 transition-colors">
                                    Questions
                                </button>
                                <span>/</span>
                                <span className="text-gray-900 font-medium">{question.title}</span>
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
                        {/* Title */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {question.id}. {question.title}
                            </h1>
                            <div className="flex items-center gap-3 flex-wrap">
                                <Badge className={`text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                </Badge>
                                {question.tags && question.tags.map((tag, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                        {tag}
                                    </span>
                                ))}
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
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                            <p className="text-gray-700 leading-relaxed">{question.description}</p>
                        </div>

                        {/* Examples */}
                        {question.examples && question.examples.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Examples</h3>
                                <div className="space-y-3">
                                    {question.examples.map((example, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-xs font-semibold text-gray-600">Input:</span>
                                                    <code className="block mt-1 text-sm font-mono bg-white px-3 py-2 rounded border border-gray-200 text-gray-900">
                                                        {example.input}
                                                    </code>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold text-gray-600">Output:</span>
                                                    <code className="block mt-1 text-sm font-mono bg-white px-3 py-2 rounded border border-gray-200 text-gray-900">
                                                        {example.output}
                                                    </code>
                                                </div>
                                                {example.explanation && (
                                                    <div>
                                                        <span className="text-xs font-semibold text-gray-600">Explanation:</span>
                                                        <p className="mt-1 text-sm text-gray-600">{example.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Complexity */}
                        {(question.timeComplexity || question.spaceComplexity) && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Constraints</h3>
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-2">
                                    {question.timeComplexity && (
                                        <div className="text-sm">
                                            <span className="font-semibold text-blue-900">Time Complexity:</span>
                                            <code className="ml-2 text-blue-700">{question.timeComplexity}</code>
                                        </div>
                                    )}
                                    {question.spaceComplexity && (
                                        <div className="text-sm">
                                            <span className="font-semibold text-blue-900">Space Complexity:</span>
                                            <code className="ml-2 text-blue-700">{question.spaceComplexity}</code>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Hint & Solution */}
                        <div className="space-y-3">
                            {question.hints && question.hints.length > 0 && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowHint(!showHint)}
                                        className="w-full justify-start border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                                    >
                                        <Lightbulb className="w-4 h-4 mr-2" />
                                        {showHint ? "Hide" : "Show"} Hints
                                    </Button>
                                    {showHint && (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <p className="text-sm font-semibold text-yellow-800 mb-2">💡 Hints:</p>
                                            <ul className="space-y-1">
                                                {question.hints.map((hint, idx) => (
                                                    <li key={idx} className="text-sm text-yellow-700">• {hint}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowSolution(!showSolution)}
                                className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50"
                            >
                                {showSolution ? "Hide" : "Show"} Solution
                            </Button>
                            {showSolution && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-sm font-semibold text-green-800 mb-2">
                                        Expected Solution:
                                    </p>
                                    <pre className="text-sm font-mono bg-white p-3 rounded border border-green-200 overflow-x-auto text-gray-900 whitespace-pre-wrap">
                                        {question.solution}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div
                    ref={verticalDividerRef}
                    onMouseDown={handleVerticalMouseDown}
                    className="w-1 bg-gray-200 hover:bg-yellow-400 cursor-col-resize transition-colors flex-shrink-0"
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
                            <span className="text-sm font-semibold text-gray-700">JavaScript Code Editor</span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCode(question.starterCode || "")}
                                    className="text-gray-600"
                                >
                                    <RotateCcw className="w-4 h-4 mr-1" />
                                    Reset
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={executeCode}
                                    disabled={loading || !code.trim()}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                                >
                                    {loading ? (
                                        <Clock className="w-4 h-4 mr-1 animate-spin" />
                                    ) : (
                                        <Play className="w-4 h-4 mr-1" />
                                    )}
                                    Run
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={submitSolution}
                                    disabled={loading || !code.trim()}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Submit
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <CodeEditor
                                code={code}
                                onChange={setCode}
                                language="javascript"
                                onRun={executeCode}
                                className="h-full"
                            />
                        </div>
                        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                                Press Ctrl+Enter (Cmd+Enter on Mac) to run code
                            </p>
                        </div>
                    </div>

                    {/* Horizontal Divider */}
                    <div
                        ref={horizontalDividerRef}
                        onMouseDown={handleHorizontalMouseDown}
                        className="h-1 bg-gray-200 hover:bg-yellow-400 cursor-row-resize transition-colors flex-shrink-0"
                    />

                    {/* Bottom - Results */}
                    <div
                        style={{ height: `${100 - topHeight}%` }}
                        className="overflow-hidden flex flex-col"
                    >
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
                            <span className="text-sm font-semibold text-gray-700">Test Results</span>
                        </div>
                        <div className="flex-1 overflow-auto p-4 bg-white">
                            {submissionResult && (
                                <div className={`mb-4 p-4 rounded-lg border ${submissionResult.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {submissionResult.isCorrect ? (
                                            <>
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="font-semibold text-green-800">Accepted! 🎉</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-5 h-5 text-red-600" />
                                                <span className="font-semibold text-red-800">Wrong Answer</span>
                                            </>
                                        )}
                                    </div>
                                    {submissionResult.error && (
                                        <p className="text-sm text-red-700 font-mono">{submissionResult.error}</p>
                                    )}
                                    {submissionResult.isCorrect && (
                                        <p className="text-sm text-green-700">
                                            All test cases passed! You earned 15 XP.
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
                                    <p className="text-sm text-red-700 font-mono whitespace-pre-wrap">{error}</p>
                                </div>
                            )}

                            {testResults.length > 0 && (
                                <div className="space-y-3">
                                    {testResults.map((test, index) => (
                                        <div
                                            key={index}
                                            className={`p-3 rounded-lg border ${test.passed
                                                ? "bg-green-50 border-green-200"
                                                : "bg-red-50 border-red-200"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-sm">
                                                    Test Case {index + 1}
                                                </span>
                                                <span
                                                    className={`text-sm font-semibold ${test.passed ? "text-green-600" : "text-red-600"
                                                        }`}
                                                >
                                                    {test.passed ? "✓ Passed" : "✗ Failed"}
                                                </span>
                                            </div>
                                            {!test.passed && (
                                                <div className="space-y-1 text-sm">
                                                    <div>
                                                        <span className="font-semibold text-gray-700">Expected:</span>
                                                        <code className="ml-2 text-gray-900">{JSON.stringify(test.expected)}</code>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-700">Got:</span>
                                                        <code className="ml-2 text-gray-900">{JSON.stringify(test.actual)}</code>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {result && result.output && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Console Output:</h4>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                                            {result.output}
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {!result && !error && !submissionResult && testResults.length === 0 && (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <p>Run your code to see test results here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}