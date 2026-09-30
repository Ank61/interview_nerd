import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  User,
  Settings,
  ChevronRight,
  Database,
  Edit3,
  Calculator,
  Type,
  Calendar,
  GitBranch,
  Layers,
  Globe,
  Terminal,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { mongoQuestions } from "@/data/mongoDatasets";
import { useMongoProgress } from "@/hooks/useMongoProgress";

export default function MongoDBPathLearning() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { progress, getCategoryProgress } = useMongoProgress();

  // useEffect(() => {
  //     if (status === "unauthenticated") {
  //         router.push("/auth/login");
  //     }
  // }, [status, router]);

  // MongoDB operation categories with keywords
  const operationCategories = {
    "Query Operations": {
      keywords: ["find", "findOne", "count", "distinct"],
      description: "Basic query operations: find, findOne, countDocuments, distinct",
      icon: Filter,
      color: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      iconColor: "text-brand",
    },
    "Aggregation Pipeline": {
      keywords: ["aggregate", "$group", "$match", "$project", "$sort", "$limit"],
      description: "Aggregation: $group, $match, $project, $sort, $limit, $skip",
      icon: Database,
      color: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconColor: "text-purple-700",
    },
    "Write Operations": {
      keywords: ["insert", "update", "delete", "replace", "$addToSet", "$pull", "$inc", "$mul"],
      description: "insertOne, insertMany, updateOne, updateMany, replaceOne, deleteMany, $addToSet, $pull",
      icon: Edit3,
      color: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      iconColor: "text-green-700",
    },
    "Arithmetic Operations": {
      keywords: ["$add", "$subtract", "$multiply", "$divide"],
      description: "$add, $subtract, $multiply, $divide",
      icon: Calculator,
      color: "from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-700",
    },
    "String Operations": {
      keywords: ["$concat", "$split", "$toUpper", "$toLower", "$size"],
      description: "$concat, $split, $toUpper, $toLower, $size",
      icon: Type,
      color: "from-pink-50 to-pink-100",
      borderColor: "border-pink-200",
      iconColor: "text-pink-700",
    },
    "Date Operations": {
      keywords: ["$year", "$month", "$dayOfWeek", "Date"],
      description: "$year, $month, $dayOfWeek with date calculations",
      icon: Calendar,
      color: "from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-200",
      iconColor: "text-indigo-700",
    },
    "Conditional Operations": {
      keywords: ["$cond", "$ifNull", "$switch"],
      description: "$cond, $ifNull, $switch with complex logic",
      icon: GitBranch,
      color: "from-red-50 to-red-100",
      borderColor: "border-red-200",
      iconColor: "text-red-700",
    },
    "Array Operations": {
      keywords: ["$map", "$filter", "$reduce", "$unwind"],
      description: "$map, $filter, $reduce with transformations",
      icon: Layers,
      color: "from-teal-50 to-teal-100",
      borderColor: "border-teal-200",
      iconColor: "text-teal-700",
    },
    "System Variables": {
      keywords: ["$$NOW", "$$ROOT", "$$CURRENT"],
      description: "$$NOW, $$ROOT, $$CURRENT",
      icon: Terminal,
      color: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      iconColor: "text-orange-700",
    },
    "Geospatial": {
      keywords: ["$geoNear", "$geoWithin", "$centerSphere", "coordinates"],
      description: "$geoNear, $geoWithin, $centerSphere",
      icon: Globe,
      color: "from-cyan-50 to-cyan-100",
      borderColor: "border-cyan-200",
      iconColor: "text-cyan-700",
    },
    "Administrative": {
      keywords: ["stats", "explain", "createIndex", "getIndexes"],
      description: "stats(), explain(), createIndex(), getIndexes()",
      icon: Settings,
      color: "from-gray-50 to-gray-100",
      borderColor: "border-gray-200",
      iconColor: "text-gray-700",
    },
  };

  // Categorize questions by operation type
  const allQuestions = [
    ...mongoQuestions.beginner,
    ...mongoQuestions.advanced,
    ...(mongoQuestions.expert || []),
  ];

  const categories = {};

  // Initialize categories
  Object.keys(operationCategories).forEach((catName) => {
    categories[catName] = {
      name: catName,
      ...operationCategories[catName],
      questions: [],
      Easy: 0,
      Medium: 0,
      Hard: 0,
      Expert: 0,
    };
  });

  // Categorize each question
  allQuestions.forEach((question) => {
    const solution = question.solution.toLowerCase();
    const title = question.title.toLowerCase();
    const hint = (question.hint || "").toLowerCase();

    let categorized = false;

    // Check each category's keywords
    for (const [catName, catInfo] of Object.entries(operationCategories)) {
      const matchesKeyword = catInfo.keywords.some(
        (keyword) =>
          solution.includes(keyword.toLowerCase()) ||
          title.includes(keyword.toLowerCase()) ||
          hint.includes(keyword.toLowerCase())
      );

      if (matchesKeyword) {
        categories[catName].questions.push(question);
        categories[catName][question.difficulty]++;
        categorized = true;
        break; // Only add to first matching category
      }
    }

    // If no category matched, add to Query Operations as default
    if (!categorized) {
      categories["Query Operations"].questions.push(question);
      categories["Query Operations"][question.difficulty]++;
    }
  });

  // Filter out empty categories and sort by question count
  const categoryList = Object.values(categories)
    .filter((cat) => cat.questions.length > 0)
    .sort((a, b) => b.questions.length - a.questions.length);


  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex items-center justify-center">
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
        <title>MongoDB Path Learning - Interview Nerd</title>
        <meta
          name="description"
          content="Learn MongoDB step by step with structured categories"
        />
      </Head>

      {/* Header */}
      <header className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                  <BookOpen size={24} className="text-green-600" />
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
                  onClick={() => router.push("/mongodb-practice")}
                  className="hover:text-gray-700 transition-colors"
                >
                  MongoDB Practice
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MongoDB Learning Path
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master MongoDB concepts step by step. Choose a category to start
            your learning journey.
          </p>
        </motion.div>
        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choose Your Learning Path
          </h2>
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
                    className="border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() =>
                      router.push(
                        `/mongodb-practice/path-learning/${encodeURIComponent(
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
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} border ${category.borderColor} flex items-center justify-center`}
                          >
                            <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {category.questions.length} question
                              {category.questions.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Category Description */}
                      <p className="text-xs text-gray-600 mb-3">
                        {category.description}
                      </p>

                      {/* Difficulty Breakdown */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {category.Easy > 0 && (
                            <Badge className="text-xs font-medium border text-green-600 bg-green-50 border-green-200">
                              {category.Easy} Easy
                            </Badge>
                          )}
                          {category.Medium > 0 && (
                            <Badge className="text-xs font-medium border text-yellow-600 bg-yellow-50 border-yellow-200">
                              {category.Medium} Medium
                            </Badge>
                          )}
                          {category.Hard > 0 && (
                            <Badge className="text-xs font-medium border text-red-600 bg-red-50 border-red-200">
                              {category.Hard} Hard
                            </Badge>
                          )}
                          {category.Expert > 0 && (
                            <Badge className="text-xs font-medium border text-purple-600 bg-purple-50 border-purple-200">
                              {category.Expert} Expert
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
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
