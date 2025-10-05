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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  GraduationCap,
  Zap,
  User,
  Settings,
  BookOpen,
  Target,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function PythonPractice() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Removed authentication check - playground is now public

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Python Practice - Interview Nerd</title>
        <meta
          name="description"
          content="Practice Python programming with interactive exercises"
        />
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                  <Code2 size={24} className="text-blue-600" />
                </div>
                <div>
                  <h1 className="hidden lg:block text-xl font-bold text-gray-900">
                    Interview Nerd
                  </h1>
                </div>
              </div>

              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  Python Practice
                </span>
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Python Practice
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master Python programming with our interactive exercises and
            challenges.
          </p>
        </motion.div>

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
              className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-blue-100 bg-white overflow-hidden relative"
              onClick={() => router.push("/python-practice/path-learning")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    className="p-6 rounded-2xl bg-blue-500 shadow-xl"
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
                  Learn Python step by step through carefully organized topics.
                  Track your progress and build expertise systematically.
                </p>
                <div className="space-y-3 bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Fundamentals
                      </p>
                      <p className="text-xs text-gray-600">
                        Syntax, variables, control flow, functions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                      <TrendingUp size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Data Structures
                      </p>
                      <p className="text-xs text-gray-600">
                        Lists, dicts, sets, tuples, comprehensions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Advanced Concepts
                      </p>
                      <p className="text-xs text-gray-600">
                        OOP, modules, error handling, file I/O
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/python-practice/path-learning");
                  }}
                >
                  Concepts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testing Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group"
          >
            <Card
              className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-purple-100 bg-white overflow-hidden relative"
              onClick={() => router.push("/python-practice/testing")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    className="p-6 rounded-2xl bg-purple-500 shadow-xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Zap size={48} className="text-white" />
                  </motion.div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
                  Practice Questions
                </CardTitle>
                <CardDescription className="text-center text-base text-gray-600">
                  Practice any question without restrictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <p className="text-gray-700 text-center leading-relaxed">
                  Challenge yourself with practice tests that simulate
                  real-world scenarios and interview questions.
                </p>
                <div className="space-y-3 bg-purple-50/50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                      <Code2 size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Full Access
                      </p>
                      <p className="text-xs text-gray-600">
                        Practice questions from beginner to advanced
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                      <Zap size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        No Restrictions
                      </p>
                      <p className="text-xs text-gray-600">
                        Solve any question in any order
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mt-0.5">
                      <Target size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Your Pace
                      </p>
                      <p className="text-xs text-gray-600">
                        Focus on areas you want to strengthen
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/python-practice/testing");
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
  );
}
// import { useState, useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Code2, GraduationCap, Zap, User, Settings, BookOpen, Target, ArrowRight } from "lucide-react";

// export default function PythonPractice() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/login");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//           <p className="text-white font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Python Practice - Interview Nerd</title>
//         <meta name="description" content="Practice Python programming with interactive exercises" />
//       </Head>

//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-8">
//               <div
//                 className="flex items-center space-x-3 cursor-pointer"
//                 onClick={() => router.push("/")}
//               >
//                 <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
//                   <Code2 size={24} className="text-blue-600" />
//                 </div>
//                 <div>
//                   <h1 className="hidden lg:block text-xl font-bold text-gray-900">
//                     Interview Nerd
//                   </h1>
//                 </div>
//               </div>

//               <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
//                 <button onClick={() => router.push("/")} className="hover:text-gray-700 transition-colors">
//                   Home
//                 </button>
//                 <span>/</span>
//                 <span className="text-gray-900 font-medium">Python Practice</span>
//               </nav>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <User size={20} className="text-gray-600" />
//               </button>
//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <Settings size={20} className="text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-12 text-center"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Python Practice</h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Master Python programming with our interactive exercises and challenges.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//           {/* Path Learning Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             whileHover={{ scale: 1.02, y: -5 }}
//             className="group"
//           >
//             <Card
//               className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-blue-100 bg-white overflow-hidden relative"
//               onClick={() => router.push("/python-practice/path-learning")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <CardHeader className="pb-6 relative z-10">
//                 <div className="flex items-center justify-center mb-6">
//                   <motion.div
//                     className="p-6 rounded-2xl bg-blue-500 shadow-xl"
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <GraduationCap size={48} className="text-white" />
//                   </motion.div>
//                 </div>
//                 <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
//                   Learn Concepts
//                 </CardTitle>
//                 <CardDescription className="text-center text-base text-gray-600">
//                   Structured learning with progressive topics
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6 relative z-10">
//                 <p className="text-gray-700 text-center leading-relaxed">
//                   Learn Python step by step through carefully organized topics. Track your progress and build expertise systematically.
//                 </p>
//                 <Button
//                   className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     router.push("/python-practice/path-learning");
//                   }}
//                 >
//                   Concepts
//                   <ArrowRight className="ml-2 w-5 h-5" />
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Testing Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             whileHover={{ scale: 1.02, y: -5 }}
//             className="group"
//           >
//             <Card
//               className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-purple-100 bg-white overflow-hidden relative"
//               onClick={() => router.push("/python-practice/testing")}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <CardHeader className="pb-6 relative z-10">
//                 <div className="flex items-center justify-center mb-6">
//                   <motion.div
//                     className="p-6 rounded-2xl bg-purple-500 shadow-xl"
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <Zap size={48} className="text-white" />
//                   </motion.div>
//                 </div>
//                 <CardTitle className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-2">
//                   Practice Questions
//                 </CardTitle>
//                 <CardDescription className="text-center text-base text-gray-600">
//                   Practice any question without restrictions
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6 relative z-10">
//                 <p className="text-gray-700 text-center leading-relaxed">
//                   Challenge yourself with practice tests that simulate real-world scenarios and interview questions.
//                 </p>
//                 <Button
//                   className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     router.push("/python-practice/testing");
//                   }}
//                 >
//                   Questions
//                   <ArrowRight className="ml-2 w-5 h-5" />
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
