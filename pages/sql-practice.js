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
  Database,
  GraduationCap,
  Target,
  ArrowRight,
  BookOpen,
  User,
  Settings,
  Sparkles,
  TrendingUp,
  Lock,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function SQLPracticeMode() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>SQL Practice - Choose Your Mode | Interview Nerd</title>
        <meta name="description" content="Choose between Path Learning and Testing modes for SQL practice" />
      </Head>

      {/* Header - Same as category/[slug].js */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50">
                  <BookOpen size={24} className="text-indigo-600" />
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
                <span className="text-gray-900 font-medium">SQL Practice</span>
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

      {/* Main Content - Theme from index.js */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Choose Your Practice Mode
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select how you want to practice SQL. Path Learning offers structured progression,
              while Testing Mode lets you practice freely.
            </p>
          </motion.div>

          {/* Mode Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Path Learning Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card
                className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-green-400 bg-gradient-to-br from-white to-green-50/30 overflow-hidden relative"
                onClick={() => router.push("/sql-practice/path-learning")}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity"></div>

                <CardHeader className="pb-6">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <GraduationCap size={56} className="text-white" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-3xl text-center font-bold text-gray-900 mb-2">
                    Path Learning
                  </CardTitle>
                  <CardDescription className="text-center text-lg text-gray-600">
                    Structured learning with progressive levels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 text-center leading-relaxed">
                    Master SQL step-by-step through carefully designed levels. Complete each level to unlock the next and track your progress.
                  </p>

                  <div className="space-y-4 bg-white/50 rounded-xl p-5 border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Beginner Level</p>
                        <p className="text-sm text-gray-600">Learn basic SELECT, WHERE, and ORDER BY</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mt-0.5">
                        <TrendingUp size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Intermediate Level</p>
                        <p className="text-sm text-gray-600">Master JOINs and GROUP BY operations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
                        <Sparkles size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Advanced Level</p>
                        <p className="text-sm text-gray-600">Complex queries and subqueries</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/sql-practice/path-learning");
                    }}
                  >
                    Start Path Learning
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testing Mode Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card
                className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-orange-400 bg-gradient-to-br from-white to-orange-50/30 overflow-hidden relative"
                onClick={() => router.push("/sql-practice/testing")}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-3xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity"></div>

                <CardHeader className="pb-6">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-xl"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Target size={56} className="text-white" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-3xl text-center font-bold text-gray-900 mb-2">
                    Testing Mode
                  </CardTitle>
                  <CardDescription className="text-center text-lg text-gray-600">
                    Free practice with all questions available
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 text-center leading-relaxed">
                    Practice any question at any time. Perfect for testing your skills and preparing for interviews without restrictions.
                  </p>

                  <div className="space-y-4 bg-white/50 rounded-xl p-5 border border-orange-100">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                        <Database size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Full Access</p>
                        <p className="text-sm text-gray-600">All questions from beginner to advanced</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-0.5">
                        <Lock size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">No Restrictions</p>
                        <p className="text-sm text-gray-600">No level requirements or prerequisites</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                        <TrendingUp size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Your Pace</p>
                        <p className="text-sm text-gray-600">Practice at your own speed and style</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/sql-practice/testing");
                    }}
                  >
                    Start Testing
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Not sure which mode to choose?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Start with <strong className="text-green-700">Path Learning</strong> if youre new to SQL and want guided progression.
                  Choose <strong className="text-orange-700">Testing Mode</strong> if you want to practice specific topics or prepare for interviews.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Database, GraduationCap, Target, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";

// export default function SQLPracticeMode() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/login");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Head>
//         <title>SQL Practice - Choose Your Mode | Interview Nerd</title>
//         <meta name="description" content="Choose between Path Learning and Testing modes for SQL practice" />
//       </Head>

//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 shadow-sm">
//         <nav className="w-full px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div
//               className="flex items-center space-x-3 cursor-pointer"
//               onClick={() => router.push("/")}
//             >
//               <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
//                 <Database size={24} className="text-blue-600" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">
//                   Interview Nerd
//                 </h1>
//                 <p className="text-sm text-gray-500 hidden sm:block">
//                   SQL Practice
//                 </p>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-5xl mx-auto">
//           {/* Title Section */}
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Choose Your Practice Mode
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Select how you want to practice SQL. Path Learning offers structured progression,
//               while Testing lets you practice freely.
//             </p>
//           </div>

//           {/* Mode Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Path Learning Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-500"
//                 onClick={() => router.push("/sql-practice/path-learning")}
//               >
//                 <CardHeader>
//                   <div className="flex items-center justify-center mb-4">
//                     <div className="p-4 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
//                       <GraduationCap size={48} className="text-green-600" />
//                     </div>
//                   </div>
//                   <CardTitle className="text-2xl text-center">Path Learning</CardTitle>
//                   <CardDescription className="text-center text-base">
//                     Structured learning with progressive levels
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <p className="text-gray-600 text-center">
//                       Master SQL step-by-step through carefully designed levels. Complete each level to unlock the next.
//                     </p>

//                     <div className="space-y-2">
//                       <div className="flex items-start gap-2">
//                         <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
//                         <p className="text-sm text-gray-700">
//                           <strong>Beginner Level:</strong> Learn basic SELECT, WHERE, and ORDER BY
//                         </p>
//                       </div>
//                       <div className="flex items-start gap-2">
//                         <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
//                         <p className="text-sm text-gray-700">
//                           <strong>Intermediate Level:</strong> Master JOINs and GROUP BY
//                         </p>
//                       </div>
//                       <div className="flex items-start gap-2">
//                         <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
//                         <p className="text-sm text-gray-700">
//                           <strong>Advanced Level:</strong> Complex queries and subqueries
//                         </p>
//                       </div>
//                     </div>

//                     <Button
//                       className="w-full mt-6 bg-green-600 hover:bg-green-700"
//                       onClick={() => router.push("/sql-practice/path-learning")}
//                     >
//                       Start Path Learning
//                       <ArrowRight className="ml-2 w-4 h-4" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Testing Mode Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-orange-500"
//                 onClick={() => router.push("/sql-practice/testing")}
//               >
//                 <CardHeader>
//                   <div className="flex items-center justify-center mb-4">
//                     <div className="p-4 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
//                       <Target size={48} className="text-orange-600" />
//                     </div>
//                   </div>
//                   <CardTitle className="text-2xl text-center">Testing Mode</CardTitle>
//                   <CardDescription className="text-center text-base">
//                     Free practice with all questions available
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <p className="text-gray-600 text-center">
//                       Practice any question at any time. Perfect for testing your skills and preparing for interviews.
//                     </p>

//                     <div className="space-y-2">
//                       <div className="flex items-start gap-2">
//                         <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
//                         <p className="text-sm text-gray-700">
//                           Access all questions from beginner to advanced
//                         </p>
//                       </div>
//                       <div className="flex items-start gap-2">
//                         <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
//                         <p className="text-sm text-gray-700">
//                           No restrictions or level requirements
//                         </p>
//                       </div>
//                       <div className="flex items-start gap-2">
//                         <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
//                         <p className="text-sm text-gray-700">
//                           Practice at your own pace
//                         </p>
//                       </div>
//                     </div>

//                     <Button
//                       className="w-full mt-6 bg-orange-600 hover:bg-orange-700"
//                       onClick={() => router.push("/sql-practice/testing")}
//                     >
//                       Start Testing
//                       <ArrowRight className="ml-2 w-4 h-4" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>

//           {/* Info Section */}
//           <div className="mt-12 text-center">
//             <p className="text-gray-600">
//               Not sure which mode to choose? Start with <strong>Path Learning</strong> if you're new to SQL,
//               or jump into <strong>Testing Mode</strong> if you want to practice specific topics.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// // import { useState, useEffect } from "react";
// // import { useSession } from "next-auth/react";
// // import { useRouter } from "next/router";
// // import Head from "next/head";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// //   CardDescription,
// //   CardFooter,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Separator } from "@/components/ui/separator";
// // import {
// //   Play,
// //   Database,
// //   Table,
// //   BookOpen,
// //   Lightbulb,
// //   CheckCircle,
// //   XCircle,
// //   Eye,
// //   EyeOff,
// //   RotateCcw,
// //   Home,
// //   ChevronLeft,
// //   ChevronRight,
// //   GraduationCap,
// //   Zap,
// //   User,
// //   Settings,
// //   ArrowRight,
// //   ChevronDown,
// //   MonitorCog,
// //   DatabaseZap,
// //   Workflow,
// //   FileCode2,
// //   Target,
// //   Award,
// // } from "lucide-react";
// // import SQLExecutor from "@/lib/sqlExecutor";
// // import { sqlDatasets, sqlQuestions } from "@/data/sqlDatasets";
// // import { motion } from "framer-motion";

// // export default function SQLPractice() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();
// //   const [sqlExecutor] = useState(() => new SQLExecutor());
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   // State management
// //   const [selectedDataset, setSelectedDataset] = useState("employees");
// //   const [query, setQuery] = useState("");
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [showSchema, setShowSchema] = useState(true);
// //   const [selectedQuestion, setSelectedQuestion] = useState(null);
// //   const [showHint, setShowHint] = useState(false);
// //   const [showSolution, setShowSolution] = useState(false);
// //   const [activeTab, setActiveTab] = useState("beginner");
// //   const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
// //   const [submissionResult, setSubmissionResult] = useState(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   // Separate questions by difficulty
// //   const beginnerQuestions = sqlQuestions.filter((q) => q.difficulty === "easy");
// //   const advancedQuestions = sqlQuestions.filter(
// //     (q) => q.difficulty === "medium" || q.difficulty === "hard"
// //   );

// //   const toggleMobileMenu = () => {
// //     setIsMobileMenuOpen(!isMobileMenuOpen);
// //   };

// //   const handleLogout = async () => {
// //     await signOut({ callbackUrl: "/" });
// //   };

// //   useEffect(() => {
// //     if (status === "unauthenticated") {
// //       router.push("/auth/login");
// //     }
// //   }, [status, router]);

// //   useEffect(() => {
// //     const loadInitialDataset = async () => {
// //       try {
// //         await sqlExecutor.loadDataset(selectedDataset);
// //         setQuery("SELECT * FROM employees LIMIT 5;");
// //       } catch (error) {
// //         console.error("Failed to load initial dataset:", error);
// //         setError(`Failed to load dataset: ${error.message}`);
// //       }
// //     };

// //     if (status !== "loading") {
// //       loadInitialDataset();
// //     }
// //   }, [status, selectedDataset, sqlExecutor]);


// //   const handleDatasetChange = async (datasetName) => {
// //     setSelectedDataset(datasetName);
// //     setLoading(true);
// //     try {
// //       await sqlExecutor.loadDataset(datasetName);
// //       setQuery("");
// //       setResult(null);
// //       setError("");
// //       setSelectedQuestion(null);
// //       setShowHint(false);
// //       setShowSolution(false);
// //       setSubmissionResult(null);
// //     } catch (error) {
// //       setError(`Failed to load dataset: ${error.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const executeQuery = async () => {
// //     if (!query.trim()) return;

// //     setLoading(true);
// //     setError("");

// //     try {
// //       const queryResult = sqlExecutor.execute(query);

// //       if (queryResult.success) {
// //         setResult(queryResult);
// //       } else {
// //         setError(queryResult.error);
// //         setResult(null);
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //       setResult(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadQuestion = (question) => {
// //     setSelectedQuestion(question);
// //     setQuery("");
// //     setResult(null);
// //     setShowHint(false);
// //     setShowSolution(false);
// //     setSubmissionResult(null);

// //     // Load the appropriate dataset if different
// //     if (question.dataset !== selectedDataset) {
// //       handleDatasetChange(question.dataset);
// //     }
// //   };

// //   const resetQuery = () => {
// //     setQuery("");
// //     setResult(null);
// //     setShowHint(false);
// //     setShowSolution(false);
// //     setSubmissionResult(null);
// //   };

// //   const submitSolution = async () => {
// //     if (!selectedQuestion || !query.trim()) return;

// //     setIsSubmitting(true);
// //     try {
// //       const executionResult = sqlExecutor.execute(query);

// //       if (executionResult.success) {
// //         // For SQL, we'll compare the user's query result with expected result
// //         const userResult = executionResult.data;
// //         const expectedQuery = selectedQuestion.expectedQuery;

// //         // Execute the expected query to compare results
// //         const expectedResult = sqlExecutor.execute(expectedQuery);

// //         if (expectedResult.success) {
// //           const expectedData = expectedResult.data;

// //           // Compare results - basic comparison of first 10 rows
// //           const isCorrect = JSON.stringify(userResult.slice(0, 10)) === JSON.stringify(expectedData.slice(0, 10));

// //           setSubmissionResult({
// //             isCorrect,
// //             userResult,
// //             expectedData,
// //             userQuery: query,
// //             expectedQuery,
// //             executionResult,
// //           });
// //         } else {
// //           setSubmissionResult({
// //             isCorrect: false,
// //             error: "Could not execute expected query for comparison",
// //             executionResult,
// //           });
// //         }
// //       } else {
// //         setSubmissionResult({
// //           isCorrect: false,
// //           error: executionResult.error,
// //           executionResult,
// //         });
// //       }
// //     } catch (error) {
// //       setSubmissionResult({
// //         isCorrect: false,
// //         error: error.message,
// //         executionResult: null,
// //       });
// //     }
// //     setIsSubmitting(false);
// //   };

// //   const getDifficultyColor = (difficulty) => {
// //     switch (difficulty) {
// //       case "easy":
// //         return "bg-green-100 text-green-800";
// //       case "medium":
// //         return "bg-yellow-100 text-yellow-800";
// //       case "hard":
// //         return "bg-red-100 text-red-800";
// //       default:
// //         return "bg-gray-100 text-gray-800";
// //     }
// //   };

// //   if (status === "loading") {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-lg">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Head>
// //         <title>SQL Practice - Interview Nerd</title>
// //         <meta name="description" content="Practice SQL queries with real datasets" />
// //         <script src="https://sql.js.org/dist/sql-wasm.js" async></script>
// //       </Head>

// //       {/* Header */}
// //       <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
// //         <nav className="w-full px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16">
// //             <div
// //               className="flex items-center space-x-3 cursor-pointer"
// //               onClick={() => router.push("/")}
// //             >
// //               <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
// //                 <Database size={24} className="text-blue-600" />
// //               </div>
// //               <div>
// //                 <h1 className="text-xl font-bold text-gray-900">
// //                   Interview Nerd
// //                 </h1>
// //                 <p className="text-sm text-gray-500 hidden sm:block">
// //                   SQL Practice
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Right side - Actions */}
// //             <div className="flex items-center space-x-4">
// //               <div className="flex items-center gap-2">
// //                 <span className="text-sm text-gray-600">Dataset:</span>
// //                 <select
// //                   value={selectedDataset}
// //                   onChange={(e) => handleDatasetChange(e.target.value)}
// //                   className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 >
// //                   {Object.entries(sqlDatasets).map(([key, dataset]) => (
// //                     <option key={key} value={key}>
// //                       {dataset.name.charAt(0).toUpperCase() + dataset.name.slice(1)}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
// //                 <User className="w-5 h-5 text-gray-600" />
// //               </button>

// //               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
// //                 <Settings className="w-5 h-5 text-gray-600" />
// //               </button>
// //             </div>
// //           </div>
// //         </nav>
// //       </header>

// //       <div className="container mx-auto px-4 py-6">
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// //           {/* Sidebar */}
// //           <div className="lg:col-span-1 space-y-4">
// //             {/* Dataset Info */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2 text-lg">
// //                   <Database className="w-5 h-5" />
// //                   Dataset Info
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-2">
// //                   <h3 className="font-semibold text-gray-900">
// //                     {sqlDatasets[selectedDataset]?.name}
// //                   </h3>
// //                   <p className="text-sm text-gray-600">
// //                     {sqlDatasets[selectedDataset]?.description}
// //                   </p>
// //                   <div className="flex items-center gap-2 mt-3">
// //                     <Button
// //                       variant="outline"
// //                       size="sm"
// //                       onClick={() => setShowSchema(!showSchema)}
// //                       className="flex items-center gap-1"
// //                     >
// //                       {showSchema ? (
// //                         <EyeOff className="w-4 h-4" />
// //                       ) : (
// //                         <Eye className="w-4 h-4" />
// //                       )}
// //                       {showSchema ? "Hide" : "Show"} Schema
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Schema */}
// //             {showSchema && (
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2 text-lg">
// //                     <Table className="w-5 h-5" />
// //                     Tables
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="space-y-3">
// //                     {Object.entries(
// //                       sqlDatasets[selectedDataset]?.tables || {}
// //                     ).map(([tableName, table]) => (
// //                       <div
// //                         key={tableName}
// //                         className="border border-gray-200 rounded-lg p-3"
// //                       >
// //                         <h4 className="font-semibold text-sm text-gray-900 mb-2">
// //                           {tableName}
// //                         </h4>
// //                         <div className="space-y-1">
// //                           {table.columns.map((column, index) => (
// //                             <div
// //                               key={index}
// //                               className="text-xs text-gray-600 font-mono"
// //                             >
// //                               {column}
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             )}

// //             {/* Practice Questions */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2 text-lg">
// //                   <BookOpen className="w-5 h-5" />
// //                   Practice Questions
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <Tabs
// //                   value={activeTab}
// //                   onValueChange={setActiveTab}
// //                   className="w-full"
// //                 >
// //                   <TabsList className="grid w-full grid-cols-2">
// //                     <TabsTrigger
// //                       value="beginner"
// //                       className="flex items-center gap-1"
// //                     >
// //                       <GraduationCap className="w-4 h-4" />
// //                       Beginner
// //                     </TabsTrigger>
// //                     <TabsTrigger
// //                       value="advanced"
// //                       className="flex items-center gap-1"
// //                     >
// //                       <Zap className="w-4 h-4" />
// //                       Advanced
// //                     </TabsTrigger>
// //                   </TabsList>

// //                   <TabsContent value="beginner" className="mt-4">
// //                     <div className="space-y-2">
// //                       {beginnerQuestions.map((question, index) => (
// //                         <div
// //                           key={question.id}
// //                           className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedQuestion?.id === question.id
// //                               ? "border-green-500 bg-green-50"
// //                               : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
// //                             }`}
// //                           onClick={() => loadQuestion(question)}
// //                         >
// //                           <div className="flex items-center justify-between mb-1">
// //                             <span className="text-sm font-medium text-gray-900">
// //                               {question.title}
// //                             </span>
// //                             <Badge
// //                               className={getDifficultyColor(
// //                                 question.difficulty
// //                               )}
// //                             >
// //                               {question.difficulty}
// //                             </Badge>
// //                           </div>
// //                           <p className="text-xs text-gray-600">
// //                             {question.category}
// //                           </p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </TabsContent>

// //                   <TabsContent value="advanced" className="mt-4">
// //                     <div className="space-y-2">
// //                       {advancedQuestions.map((question, index) => (
// //                         <div
// //                           key={question.id}
// //                           className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedQuestion?.id === question.id
// //                               ? "border-orange-500 bg-orange-50"
// //                               : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
// //                             }`}
// //                           onClick={() => loadQuestion(question)}
// //                         >
// //                           <div className="flex items-center justify-between mb-1">
// //                             <span className="text-sm font-medium text-gray-900">
// //                               {question.title}
// //                             </span>
// //                             <Badge
// //                               className={getDifficultyColor(
// //                                 question.difficulty
// //                               )}
// //                             >
// //                               {question.difficulty}
// //                             </Badge>
// //                           </div>
// //                           <p className="text-xs text-gray-600">
// //                             {question.category}
// //                           </p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </TabsContent>
// //                 </Tabs>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Main Content */}
// //           <div className="lg:col-span-3 space-y-4">
// //             {/* Question Details */}
// //             {selectedQuestion && (
// //               <Card>
// //                 <CardHeader>
// //                   <div className="flex items-center justify-between">
// //                     <CardTitle className="flex items-center gap-2">
// //                       <BookOpen className="w-5 h-5" />
// //                       {selectedQuestion.title}
// //                     </CardTitle>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="space-y-4">
// //                     <div className="flex items-center gap-2">
// //                       <Badge
// //                         className={getDifficultyColor(
// //                           selectedQuestion.difficulty
// //                         )}
// //                       >
// //                         {selectedQuestion.difficulty}
// //                       </Badge>
// //                       <Badge variant="outline">
// //                         {selectedQuestion.category}
// //                       </Badge>
// //                       <Badge variant="outline">
// //                         {selectedQuestion.dataset}
// //                       </Badge>
// //                     </div>
// //                     <p className="text-gray-700">{selectedQuestion.question}</p>

// //                     <div className="flex items-center gap-2">
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         onClick={() => setShowHint(!showHint)}
// //                         className="flex items-center gap-1"
// //                       >
// //                         <Lightbulb className="w-4 h-4" />
// //                         {showHint ? "Hide" : "Show"} Hint
// //                       </Button>
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         onClick={() => setShowSolution(!showSolution)}
// //                         className="flex items-center gap-1"
// //                       >
// //                         <Eye className="w-4 h-4" />
// //                         {showSolution ? "Hide" : "Show"} Solution
// //                       </Button>
// //                     </div>

// //                     {showHint && (
// //                       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
// //                         <p className="text-sm text-yellow-800">
// //                           <strong>Hint:</strong> {selectedQuestion.hint}
// //                         </p>
// //                       </div>
// //                     )}

// //                     {showSolution && (
// //                       <div className="bg-green-50 border border-green-200 rounded-lg p-3">
// //                         <p className="text-sm text-green-800 mb-2">
// //                           <strong>Expected Solution:</strong>
// //                         </p>
// //                         <code className="text-sm font-mono bg-white p-2 rounded border block text-gray-900">
// //                           {selectedQuestion.expectedQuery}
// //                         </code>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             )}

// //             {/* SQL Editor */}
// //             <Card>
// //               <CardHeader>
// //                 <div className="flex items-center justify-between">
// //                   <CardTitle>SQL Query Editor</CardTitle>
// //                   <div className="flex items-center gap-2">
// //                     <Button
// //                       variant="outline"
// //                       size="sm"
// //                       onClick={resetQuery}
// //                       className="flex items-center gap-1"
// //                     >
// //                       <RotateCcw className="w-4 h-4" />
// //                       Reset
// //                     </Button>
// //                     <Button
// //                       onClick={executeQuery}
// //                       disabled={loading || !query.trim()}
// //                       className="flex items-center gap-2"
// //                     >
// //                       <Play className="w-4 h-4" />
// //                       {loading ? "Executing..." : "Execute Query"}
// //                     </Button>
// //                     {selectedQuestion && (
// //                       <Button
// //                         onClick={submitSolution}
// //                         disabled={isSubmitting || !query.trim()}
// //                         className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
// //                       >
// //                         <CheckCircle className="w-4 h-4" />
// //                         {isSubmitting ? "Checking..." : "Submit Solution"}
// //                       </Button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </CardHeader>
// //               <CardContent>
// //                 <textarea
// //                   value={query}
// //                   onChange={(e) => setQuery(e.target.value)}
// //                   placeholder="Enter your SQL query here..."
// //                   className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-900 placeholder-gray-500"
// //                   onKeyDown={(e) => {
// //                     if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
// //                       e.preventDefault();
// //                       executeQuery();
// //                     }
// //                   }}
// //                 />
// //                 <p className="text-xs text-gray-500 mt-2">
// //                   Press Ctrl+Enter (Cmd+Enter on Mac) to execute query
// //                 </p>
// //               </CardContent>
// //             </Card>

// //             {/* Submission Results */}
// //             {submissionResult && (
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2">
// //                     {submissionResult.isCorrect ? (
// //                       <CheckCircle className="w-5 h-5 text-green-600" />
// //                     ) : (
// //                       <XCircle className="w-5 h-5 text-red-600" />
// //                     )}
// //                     {submissionResult.isCorrect ? "Solution Correct!" : "Solution Incorrect"}
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {submissionResult.isCorrect ? (
// //                     <div className="bg-green-50 border border-green-200 rounded-lg p-4">
// //                       <h4 className="text-green-800 font-semibold mb-2">
// //                         🎉 Congratulations!
// //                       </h4>
// //                       <p className="text-green-700 text-sm mb-3">
// //                         Your SQL query produces the correct results!
// //                       </p>
// //                       <div className="text-sm text-gray-600">
// //                         <strong>Your Query:</strong>
// //                         <code className="block bg-white p-2 rounded mt-1 font-mono text-gray-900">
// //                           {submissionResult.userQuery}
// //                         </code>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <div className="space-y-4">
// //                       {submissionResult.error ? (
// //                         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
// //                           <h4 className="text-red-800 font-semibold mb-2">
// //                             Query Error
// //                           </h4>
// //                           <p className="text-red-700 text-sm font-mono">
// //                             {submissionResult.error}
// //                           </p>
// //                         </div>
// //                       ) : (
// //                         <div>
// //                           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
// //                             <h4 className="text-red-800 font-semibold mb-2">
// //                               Results Don&apos;t Match
// //                             </h4>
// //                             <p className="text-red-700 text-sm mb-3">
// //                               Your query results don&apos;t match the expected output.
// //                             </p>
// //                           </div>

// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                             <div>
// //                               <h5 className="text-sm font-semibold text-gray-700 mb-2">Your Query:</h5>
// //                               <code className="text-sm font-mono bg-gray-100 p-2 rounded block text-gray-900">
// //                                 {submissionResult.userQuery}
// //                               </code>
// //                             </div>
// //                             <div>
// //                               <h5 className="text-sm font-semibold text-gray-700 mb-2">Expected Query:</h5>
// //                               <code className="text-sm font-mono bg-gray-100 p-2 rounded block text-gray-900">
// //                                 {submissionResult.expectedQuery}
// //                               </code>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             )}

// //             {/* Query Results */}
// //             {result && (
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2">
// //                     {result.success ? (
// //                       <Play className="w-5 h-5 text-blue-600" />
// //                     ) : (
// //                       <XCircle className="w-5 h-5 text-red-600" />
// //                     )}
// //                     Query Results
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {result.success ? (
// //                     <div className="space-y-4">
// //                       <div className="flex items-center justify-between">
// //                         <p className="text-sm text-gray-600">
// //                           {result.rowCount} row
// //                           {result.rowCount !== 1 ? "s" : ""} returned
// //                         </p>
// //                       </div>
// //                       {result.data.length > 0 ? (
// //                         <div className="overflow-x-auto">
// //                           <table className="min-w-full border border-gray-200 rounded-lg">
// //                             <thead className="bg-gray-50">
// //                               <tr>
// //                                 {result.columns.map((column, index) => (
// //                                   <th
// //                                     key={index}
// //                                     className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
// //                                   >
// //                                     {column}
// //                                   </th>
// //                                 ))}
// //                               </tr>
// //                             </thead>
// //                             <tbody className="bg-white divide-y divide-gray-200">
// //                               {result.data.map((row, rowIndex) => (
// //                                 <tr key={rowIndex} className="hover:bg-gray-50">
// //                                   {result.columns.map((column, colIndex) => (
// //                                     <td
// //                                       key={colIndex}
// //                                       className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200"
// //                                     >
// //                                       {row[column] === null ? (
// //                                         <span className="text-gray-400 italic">
// //                                           NULL
// //                                         </span>
// //                                       ) : (
// //                                         String(row[column])
// //                                       )}
// //                                     </td>
// //                                   ))}
// //                                 </tr>
// //                               ))}
// //                             </tbody>
// //                           </table>
// //                         </div>
// //                       ) : (
// //                         <p className="text-gray-500 text-center py-8">
// //                           No data returned
// //                         </p>
// //                       )}
// //                     </div>
// //                   ) : (
// //                     <div className="bg-red-50 border border-red-200 rounded-lg p-4">
// //                       <h4 className="text-red-800 font-semibold mb-2">
// //                         Query Error
// //                       </h4>
// //                       <p className="text-red-700 text-sm font-mono">
// //                         {result.error}
// //                       </p>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
