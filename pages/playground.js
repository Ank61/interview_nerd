import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code2,
  GraduationCap,
  Target,
  ArrowRight,
  BookOpen,
  User,
  Settings,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export default function PlaygroundMode() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

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
        <title>JavaScript Playground - Choose Your Mode | Interview Nerd</title>
        <meta name="description" content="Choose between Path Learning and Testing modes for JavaScript practice" />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100">
                  <BookOpen size={24} className="text-yellow-600" />
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
                <span className="text-gray-900 font-medium">JavaScript Practice</span>
              </nav>
            </div>

            {/* Right side - Actions */}
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

      {/* Main Content */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                Choose Your Practice Mode
              </h2>
              <p className="text-xl text-gradient-to-br from-yellow-600 via-orange-600 to-red-600 max-w-3xl mx-auto leading-relaxed">
                Select how you want to practice JavaScript. Path Learning offers structured progression,
                while Testing Mode lets you practice freely.
              </p>
            </motion.div>

            {/* Mode Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Path Learning Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-yellow-100 bg-white overflow-hidden relative"
                  onClick={() => router.push("/js-practice/path-learning")}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-yellow-500 shadow-xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <GraduationCap size={48} className="text-white" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
                      Learn Concepts
                    </CardTitle>
                    <CardDescription className="text-center text-base text-gray-600">
                      Structured learning with progressive topics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Master JavaScript step-by-step through carefully organized topics. Track your progress and build expertise systematically.
                    </p>

                    <div className="space-y-3 bg-yellow-50/50 rounded-xl p-4 border border-yellow-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center mt-0.5">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Arrays & Strings</p>
                          <p className="text-xs text-gray-600">Master fundamental data structures</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center mt-0.5">
                          <TrendingUp size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Algorithms</p>
                          <p className="text-xs text-gray-600">Learn sorting, searching, and more</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center mt-0.5">
                          <Sparkles size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Advanced Concepts</p>
                          <p className="text-xs text-gray-600">Trees, graphs, and dynamic programming</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/js-practice/path-learning");
                      }}
                    >
                      Concepts
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Testing Mode Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-orange-100 bg-white overflow-hidden relative"
                  onClick={() => router.push("/js-practice/testing")}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-orange-500 shadow-xl"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Target size={48} className="text-white" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
                      Practice Questions
                    </CardTitle>
                    <CardDescription className="text-center text-base text-gray-600">
                      Free practice with all questions available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Practice any question at any time. Perfect for testing your skills and preparing for interviews without restrictions.
                    </p>

                    <div className="space-y-3 bg-orange-50/50 rounded-xl p-4 border border-orange-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center mt-0.5">
                          <Code2 size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Full Access</p>
                          <p className="text-xs text-gray-600">All questions from beginner to advanced</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center mt-0.5">
                          <Zap size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">No Restrictions</p>
                          <p className="text-xs text-gray-600">No topic requirements or prerequisites</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center mt-0.5">
                          <TrendingUp size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Your Pace</p>
                          <p className="text-xs text-gray-600">Practice at your own speed and style</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/js-practice/testing");
                      }}
                    >
                      Questions
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect, useRef } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Separator } from "@/components/ui/separator";
// import {
//   Play,
//   RotateCcw,
//   Lightbulb,
//   Eye,
//   Clock,
//   Code2,
//   CheckCircle,
//   XCircle,
//   Timer,
//   ChevronLeft,
//   Zap,
//   Home,
//   User,
//   Settings,
//   ChevronDown,
//   ArrowRight,
//   MonitorCog,
//   DatabaseZap,
//   Workflow,
//   FileCode2,
//   Target,
//   Award,
//   ChevronRight,
//   GraduationCap,
//   Database,
//   Table,
//   BookOpen,
//   EyeOff,
// } from "lucide-react";
// import {
//   languageConfig,
//   playgroundQuestions,
// } from "@/data/playgroundQuestions";
// import { AdaptiveAlgorithm, playgroundAdaptive } from "@/lib/adaptiveAlgorithm";
// import CodeEditor from "@/components/playground/CodeEditor";

// export default function CodePlayground() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

//   // Playground state
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [code, setCode] = useState("");
//   const [userCode, setUserCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [isRunning, setIsRunning] = useState(false);
//   const [error, setError] = useState(null)
//   const [testResults, setTestResults] = useState([]);
//   const [startTime, setStartTime] = useState(null);
//   const [timeSpent, setTimeSpent] = useState(0);
//   const [attempts, setAttempts] = useState(0);
//   const [hintsUsed, setHintsUsed] = useState(0);
//   const [showHint, setShowHint] = useState(false);
//   const [showSolution, setShowSolution] = useState(false);
//   const [activeTab, setActiveTab] = useState("beginner");
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [submissionResult, setSubmissionResult] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");

//   const timerRef = useRef(null);
//   const codeEditorRef = useRef(null);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleLogout = async () => {
//     await signOut({ callbackUrl: "/" });
//   };

//   // Remove authentication redirect - playground is now public

//   // Initialize playground on mount
//   useEffect(() => {
//     if (session?.user?.id) {
//       playgroundAdaptive.initializeSession(session.user.id);
//     }
//     // Auto-select first beginner question if none selected
//     if (!currentQuestion) {
//       const beginnerQuestions = playgroundQuestions.beginner || [];
//       if (beginnerQuestions.length > 0) {
//         selectQuestion(beginnerQuestions[0]);
//       }
//     }
//   }, [session, currentQuestion]);

//   // Timer for tracking time spent
//   useEffect(() => {
//     if (startTime) {
//       timerRef.current = setInterval(() => {
//         setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
//       }, 1000);
//     } else {
//       clearInterval(timerRef.current);
//     }

//     return () => clearInterval(timerRef.current);
//   }, [startTime]);

//   // Select a question to solve
//   const selectQuestion = (question) => {
//     setSelectedQuestion(question);
//     setCode(question.starterCode || "");
//     setOutput("");
//     setError("");
//     setShowHint(false);
//     setShowSolution(false);
//     setTestResults([]);
//     setSubmissionResult(null);
//   };

//   // Execute JavaScript code
//   const submitSolution = async () => {
//     if (!selectedQuestion || !code.trim()) return;

//     setIsSubmitting(true);
//     try {
//       const response = await fetch("/api/playground/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code,
//           questionId: selectedQuestion.id,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         const allTestsPassed = data.testResults.every((test) => test.passed);

//         setSubmissionResult({
//           isCorrect: allTestsPassed,
//           testResults: data.testResults,
//           output: data.output || "",
//           userCode: code,
//         });

//         // Award points for completing the challenge if all tests passed
//         if (allTestsPassed && session?.user?.email) {
//           await fetch("/api/gamification/award-points", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               email: session.user.email,
//               points: 10,
//               reason: `Completed ${selectedQuestion.title}`,
//             }),
//           });
//         }
//       } else {
//         setSubmissionResult({
//           isCorrect: false,
//           error: data.error,
//           userCode: code,
//         });
//       }
//     } catch (err) {
//       setSubmissionResult({
//         isCorrect: false,
//         error: "Failed to execute code",
//         userCode: code,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const runTests = async () => {
//     if (!selectedQuestion || !code.trim()) return;

//     setIsRunning(true);
//     setError("");
//     setTestResults([]);

//     try {
//       const response = await fetch("/api/playground/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           code,
//           questionId: selectedQuestion.id,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setTestResults(data.testResults);
//         setOutput(data.output || "");

//         // Check if all tests passed for gamification
//         const allTestsPassed = data.testResults.every((test) => test.passed);
//         if (allTestsPassed && session?.user?.email) {
//           // Award points for completing the challenge
//           await fetch("/api/gamification/award-points", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               email: session.user.email,
//               points: 10,
//               reason: `Completed ${selectedQuestion.title}`,
//             }),
//           });
//         }
//       } else {
//         setError(data.error);
//       }
//     } catch (err) {
//       setError("Failed to execute code");
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   // Handle question completion
//   const handleQuestionCompleted = async (success) => {
//     if (!selectedQuestion) return;

//     // Skip gamification if no session (public access)
//     if (!session?.user?.id) {
//       let feedbackMessage = success
//         ? `🎉 Congratulations! All tests passed!`
//         : `Keep trying! You can do it.`;
//       setOutput((prev) => prev + "\n\n" + feedbackMessage);
//       return;
//     }

//     const userMetrics = {
//       timeSpent,
//       attempts,
//       hintsUsed,
//       success,
//       finalCode: code,
//     };

//     const questionData = {
//       ...selectedQuestion,
//       language: "javascript",
//     };

//     // Record performance with adaptive algorithm
//     const performance = playgroundAdaptive.recordCompletion(
//       questionData,
//       userMetrics,
//       session.user.id
//     );

//     // Send completion data to backend for gamification
//     try {
//       const response = await fetch("/api/playground/complete", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           questionId: selectedQuestion.id,
//           language: selectedLanguage,
//           difficulty: selectedQuestion.difficulty,
//           timeSpent,
//           attempts,
//           hintsUsed,
//           success,
//           codeQuality: assessCodeQuality(code),
//           tags: selectedQuestion.tags,
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         // Show gamification feedback
//         let feedbackMessage = success
//           ? `🎉 Congratulations! All tests passed!\n+${result.xpGained} XP earned!`
//           : `Keep trying! +${result.xpGained} XP for the attempt.`;

//         if (result.leveledUp) {
//           feedbackMessage += `\n🆙 Level Up! You're now level ${result.newLevel}!`;
//         }

//         if (result.badgesEarned && result.badgesEarned.length > 0) {
//           feedbackMessage += `\n🏆 New badges earned: ${result.badgesEarned
//             .map((b) => b.name)
//             .join(", ")}`;
//         }

//         setOutput((prev) => prev + "\n\n" + feedbackMessage);
//       }
//     } catch (error) {
//       console.error("Failed to record completion:", error);
//     }
//   };

//   // Assess code quality (client-side version)
//   const assessCodeQuality = (code) => {
//     let score = 100;

//     // Deduct points for poor practices
//     if (code.includes("var ")) score -= 10;
//     if (code.split("\n").length > 50) score -= 15;
//     if (!code.includes("//") && !code.includes("/*")) score -= 5;
//     if (code.includes("console.log") && code.split("console.log").length > 3)
//       score -= 10;

//     // Add points for good practices
//     if (code.includes("const ") || code.includes("let ")) score += 5;
//     if (code.includes("//") || code.includes("/*")) score += 5;
//     if (code.includes("try") && code.includes("catch")) score += 10;

//     return Math.max(0, Math.min(100, score));
//   };

//   // Reset current question
//   const resetQuestion = () => {
//     if (selectedQuestion) {
//       setCode(selectedQuestion.starterCode || "");
//       setOutput("");
//       setError("");
//       setTestResults([]);
//       setAttempts(0);
//       setHintsUsed(0);
//       setShowHint(false);
//       setShowSolution(false);
//       setStartTime(Date.now());
//     }
//   };

//   // Show hint
//   const showHintHandler = () => {
//     setShowHint(true);
//     setHintsUsed((prev) => prev + 1);
//   };

//   // Format time display
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   // Get difficulty color
//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "easy":
//         return "bg-green-100 text-green-800";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "hard":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Remove session check - playground is now public

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
//         <nav className="w-full px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div
//               className="flex items-center space-x-3 cursor-pointer"
//               onClick={() => router.push("/")}
//             >
//               <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100">
//                 <Code2 size={24} className="text-yellow-600" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">
//                   Interview Nerd
//                 </h1>
//                 <p className="text-sm text-gray-500 hidden sm:block">
//                   JavaScript Playground
//                 </p>
//               </div>
//             </div>

//             {/* Right side - Actions */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <Timer className="w-4 h-4" />
//                 <span>{formatTime(timeSpent)}</span>
//                 <span className="mx-2">•</span>
//                 <span>Attempts: {attempts}</span>
//               </div>

//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <User className="w-5 h-5 text-gray-600" />
//               </button>

//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <Settings className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <div className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-4">
//             {/* Practice Questions */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-lg">
//                   <Code2 className="w-5 h-5" />
//                   Practice Questions
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Tabs
//                   value={activeTab}
//                   onValueChange={setActiveTab}
//                   className="w-full"
//                 >
//                   <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger
//                       value="beginner"
//                       className="flex items-center gap-1"
//                     >
//                       <Zap className="w-4 h-4" />
//                       Beginner
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="advanced"
//                       className="flex items-center gap-1"
//                     >
//                       <Zap className="w-4 h-4" />
//                       Advanced
//                     </TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="beginner" className="mt-4">
//                     <div className="space-y-2">
//                       {(playgroundQuestions.beginner || []).map((question) => (
//                         <div
//                           key={question.id}
//                           className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedQuestion?.id === question.id
//                             ? "border-yellow-500 bg-yellow-50"
//                             : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                             }`}
//                           onClick={() => selectQuestion(question)}
//                         >
//                           <div className="flex items-center justify-between mb-1">
//                             <span className="text-sm font-medium text-gray-900">
//                               {question.title}
//                             </span>
//                             <Badge
//                               className={getDifficultyColor(
//                                 question.difficulty
//                               )}
//                             >
//                               {question.difficulty}
//                             </Badge>
//                           </div>
//                           <p className="text-xs text-gray-600 line-clamp-2">
//                             {question.description}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </TabsContent>

//                   <TabsContent value="advanced" className="mt-4">
//                     <div className="space-y-2">
//                       {(playgroundQuestions.advanced || []).map((question) => (
//                         <div
//                           key={question.id}
//                           className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedQuestion?.id === question.id
//                             ? "border-yellow-500 bg-yellow-50"
//                             : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                             }`}
//                           onClick={() => selectQuestion(question)}
//                         >
//                           <div className="flex items-center justify-between mb-1">
//                             <span className="text-sm font-medium text-gray-900">
//                               {question.title}
//                             </span>
//                             <Badge
//                               className={getDifficultyColor(
//                                 question.difficulty
//                               )}
//                             >
//                               {question.difficulty}
//                             </Badge>
//                           </div>
//                           <p className="text-xs text-gray-600 line-clamp-2">
//                             {question.description}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3 space-y-4">
//             {/* Question Details */}
//             {selectedQuestion && (
//               <Card>
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle className="flex items-center gap-2">
//                       <Code2 className="w-5 h-5" />
//                       {selectedQuestion.title}
//                     </CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Badge
//                         className={getDifficultyColor(
//                           selectedQuestion.difficulty
//                         )}
//                       >
//                         {selectedQuestion.difficulty}
//                       </Badge>
//                     </div>
//                     <p className="text-gray-700">
//                       {selectedQuestion.description}
//                     </p>

//                     {selectedQuestion.examples && (
//                       <div className="mb-4">
//                         <h4 className="font-medium text-gray-900 mb-2">
//                           Examples:
//                         </h4>
//                         {selectedQuestion.examples.map((example, index) => (
//                           <div
//                             key={index}
//                             className="bg-gray-50 p-3 rounded mb-2"
//                           >
//                             <div className="text-sm">
//                               <div>
//                                 <strong>Input:</strong> {example.input}
//                               </div>
//                               <div>
//                                 <strong>Output:</strong> {example.output}
//                               </div>
//                               {example.explanation && (
//                                 <div className="text-gray-600 mt-1">
//                                   {example.explanation}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     <div className="flex items-center gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={showHintHandler}
//                         disabled={showHint}
//                         className="flex items-center gap-1"
//                       >
//                         <Lightbulb className="w-4 h-4" />
//                         {showHint ? "Hint Shown" : "Show Hint"}
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setShowSolution(!showSolution)}
//                         className="flex items-center gap-1"
//                       >
//                         <Eye className="w-4 h-4" />
//                         {showSolution ? "Hide Solution" : "Show Solution"}
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={resetQuestion}
//                         className="flex items-center gap-1"
//                       >
//                         <RotateCcw className="w-4 h-4" />
//                         Reset
//                       </Button>
//                     </div>

//                     {/* Hints */}
//                     {showHint && selectedQuestion.hints && (
//                       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//                         <p className="text-sm text-yellow-800">
//                           <strong>Hints:</strong>
//                         </p>
//                         <ul className="text-yellow-700 text-sm space-y-1 mt-1">
//                           {selectedQuestion.hints.map((hint, index) => (
//                             <li key={index}>• {hint}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {/* Solution */}
//                     {showSolution && (
//                       <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                         <p className="text-sm text-green-800 mb-2">
//                           <strong>Solution:</strong>
//                         </p>
//                         <code className="text-sm font-mono bg-white p-2 rounded border block text-gray-900">
//                           {selectedQuestion.solution}
//                         </code>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Code Editor */}
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <CardTitle>Code Editor</CardTitle>
//                     <div className="flex items-center gap-2">
//                       <Label
//                         htmlFor="language-select"
//                         className="text-sm font-medium"
//                       >
//                         Language:
//                       </Label>
//                       <select
//                         id="language-select"
//                         value={selectedLanguage}
//                         onChange={(e) => setSelectedLanguage(e.target.value)}
//                         className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//                       >
//                         <option value="javascript">JavaScript</option>
//                         <option value="python">Python</option>
//                         <option value="typescript">TypeScript</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={resetQuestion}
//                       className="flex items-center gap-1"
//                     >
//                       <RotateCcw className="w-4 h-4" />
//                       Reset
//                     </Button>
//                     <Button
//                       onClick={runTests}
//                       disabled={isRunning || !code.trim()}
//                       className="flex items-center gap-2"
//                     >
//                       {isRunning ? (
//                         <Clock className="w-4 h-4 animate-spin" />
//                       ) : (
//                         <Play className="w-4 h-4" />
//                       )}
//                       {isRunning ? "Running..." : "Run Tests"}
//                     </Button>
//                     {selectedQuestion && (
//                       <Button
//                         onClick={submitSolution}
//                         disabled={isSubmitting || !code.trim()}
//                         className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
//                       >
//                         <CheckCircle className="w-4 h-4" />
//                         {isSubmitting ? "Checking..." : "Submit Solution"}
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-64">
//                   <CodeEditor
//                     code={code}
//                     onChange={setCode}
//                     language={selectedLanguage}
//                     onRun={runTests}
//                     className="h-full"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Press Ctrl+Enter (Cmd+Enter on Mac) to run code
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Results */}
//             {(output || testResults.length > 0) && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     Results
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {output && (
//                     <div className="mb-4">
//                       <h4 className="font-medium text-gray-900 mb-2">
//                         Console Output:
//                       </h4>
//                       <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm whitespace-pre-wrap">
//                         {output}
//                       </pre>
//                     </div>
//                   )}

//                   {testResults.length > 0 && (
//                     <div>
//                       <h4 className="font-medium text-gray-900 mb-2">
//                         Test Results:
//                       </h4>
//                       <div className="space-y-2">
//                         {testResults.map((test, index) => (
//                           <div
//                             key={index}
//                             className={`p-3 rounded border ${test.passed
//                               ? "bg-green-50 border-green-200"
//                               : "bg-red-50 border-red-200"
//                               }`}
//                           >
//                             <div className="flex items-center gap-2 mb-1">
//                               {test.passed ? (
//                                 <CheckCircle className="w-4 h-4 text-green-600" />
//                               ) : (
//                                 <XCircle className="w-4 h-4 text-red-600" />
//                               )}
//                               <span
//                                 className={`font-medium ${test.passed
//                                   ? "text-green-800"
//                                   : "text-red-800"
//                                   }`}
//                               >
//                                 Test {index + 1}:{" "}
//                                 {test.passed ? "PASSED" : "FAILED"}
//                               </span>
//                             </div>
//                             {!test.passed && (
//                               <div className="text-sm text-red-700 ml-6">
//                                 <div>
//                                   Expected: {JSON.stringify(test.expected)}
//                                 </div>
//                                 <div>Actual: {JSON.stringify(test.actual)}</div>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             )}

//             {/* Submission Results */}
//             {submissionResult && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     {submissionResult.isCorrect ? (
//                       <CheckCircle className="w-5 h-5 text-green-600" />
//                     ) : (
//                       <XCircle className="w-5 h-5 text-red-600" />
//                     )}
//                     {submissionResult.isCorrect
//                       ? "Solution Correct!"
//                       : "Solution Incorrect"}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {submissionResult.isCorrect ? (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                       <h4 className="text-green-800 font-semibold mb-2">
//                         🎉 Congratulations!
//                       </h4>
//                       <p className="text-green-700 text-sm mb-3">
//                         Your JavaScript solution passes all test cases!
//                       </p>
//                       <div className="text-sm text-gray-600">
//                         <strong>Tests Passed:</strong>{" "}
//                         {submissionResult.testResults?.filter((t) => t.passed)
//                           .length}{" "}
//                         / {submissionResult.testResults?.length}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {submissionResult.error ? (
//                         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                           <h4 className="text-red-800 font-semibold mb-2">
//                             Execution Error
//                           </h4>
//                           <p className="text-red-700 text-sm font-mono">
//                             {submissionResult.error}
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                           <h4 className="text-red-800 font-semibold mb-2">
//                             Some Tests Failed
//                           </h4>
//                           <p className="text-red-700 text-sm mb-3">
//                             Your solution doesn&apos;t pass all test cases. Review the
//                             failing tests below.
//                           </p>
//                           <div className="text-sm text-gray-600">
//                             <strong>Tests Passed:</strong>{" "}
//                             {submissionResult.testResults?.filter((t) => t.passed)
//                               .length}{" "}
//                             / {submissionResult.testResults?.length}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             )}

//             {/* Test Results */}
//             {testResults.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <CheckCircle className="w-5 h-5" />
//                     Test Results
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {testResults.map((test, index) => (
//                       <div
//                         key={index}
//                         className={`p-3 rounded-lg border ${test.passed
//                           ? "bg-green-50 border-green-200"
//                           : "bg-red-50 border-red-200"
//                           }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="font-medium">
//                             Test {index + 1}
//                           </span>
//                           <span
//                             className={`text-sm ${test.passed ? "text-green-600" : "text-red-600"
//                               }`}
//                           >
//                             {test.passed ? "✓ Passed" : "✗ Failed"}
//                           </span>
//                         </div>
//                         {test.input && (
//                           <div className="mt-2 text-sm text-gray-600">
//                             <strong>Input:</strong> {test.input}
//                           </div>
//                         )}
//                         <div className="mt-1 text-sm text-gray-600">
//                           <strong>Expected:</strong> {test.expected}
//                         </div>
//                         <div className="mt-1 text-sm text-gray-600">
//                           <strong>Got:</strong> {test.actual}
//                         </div>
//                         {test.error && (
//                           <div className="mt-2 text-sm text-red-600">
//                             <strong>Error:</strong> {test.error}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {!selectedQuestion && (
//               <Card>
//                 <CardContent className="text-center py-12">
//                   <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     Select a Question
//                   </h3>
//                   <p className="text-gray-600">
//                     Choose a JavaScript coding challenge from the sidebar to
//                     start practicing.
//                   </p>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
