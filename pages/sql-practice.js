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
  CheckCircle,
  Trophy,
  Zap
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
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
        <title>SQL Practice - Choose Your Mode | Interview Nerd</title>
        <meta name="description" content="Choose between Path Learning and Testing modes for SQL practice" />
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                  <BookOpen size={24} className="text-blue-600" />
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

      {/* Main Content - Matching MCQ Page Theme */}
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
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent
 mb-6">
                Choose Your Practice Mode
              </h2>
              <p className="text-xl text-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 max-w-3xl mx-auto leading-relaxed">
                Select how you want to practice SQL. Path Learning offers structured progression,
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
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-indigo-100 bg-white overflow-hidden relative"
                  onClick={() => router.push("/sql-practice/path-learning")}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-indigo-400 shadow-xl"
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
                      Structured learning with progressive levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <p className="text-gray-700 text-center leading-relaxed">
                      Master SQL step-by-step through carefully designed levels. Complete each level to unlock the next and track your progress.
                    </p>

                    <div className="space-y-3 bg-green-50/50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center mt-0.5">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Beginner Level</p>
                          <p className="text-xs text-gray-600">Learn basic SELECT, WHERE, and ORDER BY</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center mt-0.5">
                          <TrendingUp size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Intermediate Level</p>
                          <p className="text-xs text-gray-600">Master JOINs and GROUP BY operations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center mt-0.5">
                          <Sparkles size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Advanced Level</p>
                          <p className="text-xs text-gray-600">Complex queries and subqueries</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/sql-practice/path-learning");
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
                  className="h-full rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-pink-100 bg-white overflow-hidden relative"
                  onClick={() => router.push("/sql-practice/testing")}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-6 relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        className="p-6 rounded-2xl bg-pink-400 shadow-xl"
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
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mt-0.5">
                          <Database size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Full Access</p>
                          <p className="text-xs text-gray-600">All questions from beginner to advanced</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mt-0.5">
                          <Zap size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">No Restrictions</p>
                          <p className="text-xs text-gray-600">No level requirements or prerequisites</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center mt-0.5">
                          <TrendingUp size={14} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Your Pace</p>
                          <p className="text-xs text-gray-600">Practice at your own speed and style</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-5 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/sql-practice/testing");
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