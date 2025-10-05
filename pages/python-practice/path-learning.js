import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  User,
  Settings,
  ChevronRight,
  BookOpen,
  Package,
  FileText,
  AlertTriangle,
  Layers,
  Activity,
  Search,
  Calendar,
  CheckCircle,
  Zap,
  GitBranch,
  Database,
  Repeat,
  List as ListIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { pythonConcepts, pythonQuestions } from "@/data/pythonDatasets";
import { usePythonProgress } from "@/hooks/usePythonProgress";

export default function PythonPathLearning() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { progress, getCategoryProgress } = usePythonProgress();

  // useEffect(() => {
  //     if (status === "unauthenticated") {
  //         router.push("/auth/login");
  //     }
  // }, [status, router]);

  // Get unique categories with question counts
  // Get unique categories with question counts
  const categories = {};

  // First, get all questions from all difficulty levels
  const allQuestions = Object.values(pythonQuestions).flat();

  // Then process each concept from pythonConcepts
  Object.entries(pythonConcepts).forEach(([key, concept]) => {
    const categoryQuestions = allQuestions.filter((q) => q.category === key);

    categories[key] = {
      name: concept.title, // Use the title from pythonConcepts
      questions: categoryQuestions,
      easy: categoryQuestions.filter((q) => q.difficulty === "easy").length,
      medium: categoryQuestions.filter((q) => q.difficulty === "medium").length,
      hard: categoryQuestions.filter((q) => q.difficulty === "hard").length,
    };
  });

  const categoryList = Object.values(categories).sort(
    (a, b) => b.questions.length - a.questions.length
  );

  const getCategoryIcon = (categoryName) => {
    const name = (categoryName || "").toLowerCase();
    if (name.match(/basic|intro|syntax/)) return BookOpen;
    if (name.match(/variable|type|number|string|boolean/)) return Database;
    if (name.match(/list|dict|set|tuple|structure|collection/)) return ListIcon;
    if (name.match(/control|loop|while|for|flow/)) return Repeat;
    if (name.match(/if|else|branch/)) return GitBranch;
    if (name.match(/function|lambda/)) return Code2;
    if (name.match(/class|object|oop/)) return Layers;
    if (name.match(/module|package|import/)) return Package;
    if (name.match(/file|i\/?o/)) return FileText;
    if (name.match(/error|exception/)) return AlertTriangle;
    if (name.match(/algorithm|performance|optimi/)) return Activity;
    if (name.match(/regex|regular|pattern/)) return Search;
    if (name.match(/date|time|datetime/)) return Calendar;
    if (name.match(/test|testing|pytest/)) return CheckCircle;
    if (name.match(/async|concurrent|thread/)) return Zap;
    return BookOpen;
  };

  const getCategoryColor = (category) => {
    const colors = {
      SELECT: "from-blue-50 to-blue-100",
      WHERE: "from-purple-50 to-purple-100",
      JOIN: "from-green-50 to-green-100",
      "GROUP BY": "from-yellow-50 to-yellow-100",
      "ORDER BY": "from-pink-50 to-pink-100",
      DISTINCT: "from-indigo-50 to-indigo-100",
      HAVING: "from-red-50 to-red-100",
      SUBQUERY: "from-teal-50 to-teal-100",
      AGGREGATE: "from-orange-50 to-orange-100",
      CASE: "from-cyan-50 to-cyan-100",
      DATE: "from-lime-50 to-lime-100",
      UNION: "from-fuchsia-50 to-fuchsia-100",
      WINDOW: "from-violet-50 to-violet-100",
    };
    return colors[category] || "from-gray-50 to-gray-100";
  };

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
        <title>Python Path Learning - Interview Nerd</title>
        <meta
          name="description"
          content="Learn Python step by step with structured categories"
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
                  <BookOpen size={24} className="text-blue-600" />
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
                <button
                  onClick={() => router.push("/python-practice")}
                  className="hover:text-gray-700 transition-colors"
                >
                  Python Practice
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">Path Learning</span>
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
            Python Concepts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master Python concepts step by step. Choose a category to start your
            learning journey.
          </p>
        </motion.div>

        <div className="mb-8">
          {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Learning Path</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryList.map((category, index) => {
              const categoryProgress = getCategoryProgress(category.name);
              const completedCount = categoryProgress.total || 0;
              const progressPercent =
                category.questions.length > 0
                  ? (completedCount / category.questions.length) * 100
                  : 0;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() =>
                      router.push(
                        `/python-practice/path-learning/${encodeURIComponent(
                          category.name
                        )}`
                      )
                    }
                  >
                    <CardContent className="p-6">
                      {/* Category Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center`}
                          >
                            {(() => {
                              const Icon = getCategoryIcon(category.name);
                              return (
                                <Icon className="w-6 h-6 text-indigo-600" />
                              );
                            })()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {category.questions.length} question
                              {category.questions.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex gap-2">
                          {category.easy > 0 && (
                            <Badge className="text-xs font-medium border text-green-600 bg-green-50 border-green-200">
                              {category.easy} Easy
                            </Badge>
                          )}
                          {category.medium > 0 && (
                            <Badge className="text-xs font-medium border text-yellow-600 bg-yellow-50 border-yellow-200">
                              {category.medium} Medium
                            </Badge>
                          )}
                          {category.hard > 0 && (
                            <Badge className="text-xs font-medium border text-red-600 bg-red-50 border-red-200">
                              {category.hard} Hard
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(
                              category.name
                            )}`}
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {completedCount} / {category.questions.length}{" "}
                          completed
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
