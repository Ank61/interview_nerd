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
  ListChecks,
  Type,
  Table2,
  Hand,
  Layers,
  GitBranch,
  RefreshCw,
  Timer,
  ArrowUpAZ,
  Gauge,
} from "lucide-react";
import { motion } from "framer-motion";
import { playgroundQuestions } from "@/data/playgroundQuestions";
import { useJSProgress } from "@/hooks/useJSProgress";

export default function JSPathLearning() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { progress, getTopicProgress } = useJSProgress();

  // useEffect(() => {
  //     if (status === "unauthenticated") {
  //         router.push("/auth/login");
  //     }
  // }, [status, router]);

  // Get unique topics with question counts
  const topics = {};
  const allQuestions = [
    ...(playgroundQuestions.beginner || []),
    ...(playgroundQuestions.advanced || []),
  ];

  allQuestions.forEach((question) => {
    if (question.tags && question.tags.length > 0) {
      const mainTag = question.tags[0]; // Use first tag as main topic
      if (!topics[mainTag]) {
        topics[mainTag] = {
          name: mainTag,
          questions: [],
          easy: 0,
          medium: 0,
          hard: 0,
        };
      }
      topics[mainTag].questions.push(question);
      topics[mainTag][question.difficulty]++;
    }
  });

  const topicList = Object.values(topics).sort(
    (a, b) => b.questions.length - a.questions.length
  );

  const getTopicIcon = (topic) => {
    switch (topic) {
      case "array":
        return ListChecks;
      case "string":
        return Type;
      case "hash-table":
        return Table2;
      case "two-pointers":
        return Hand;
      case "stack":
        return Layers;
      case "binary-tree":
        return GitBranch;
      case "recursion":
        return RefreshCw;
      case "traversal":
        return GitBranch;
      case "intervals":
        return Timer;
      case "sorting":
        return ArrowUpAZ;
      case "greedy":
        return Gauge;
      default:
        return Code2;
    }
  };

  const getTopicColor = (topic) => {
    const colors = {
      array: "from-blue-50 to-blue-100",
      string: "from-purple-50 to-purple-100",
      "hash-table": "from-green-50 to-green-100",
      "two-pointers": "from-yellow-50 to-yellow-100",
      stack: "from-pink-50 to-pink-100",
      "binary-tree": "from-indigo-50 to-indigo-100",
      recursion: "from-red-50 to-red-100",
      traversal: "from-teal-50 to-teal-100",
      intervals: "from-orange-50 to-orange-100",
      sorting: "from-cyan-50 to-cyan-100",
      greedy: "from-lime-50 to-lime-100",
    };
    return colors[topic] || "from-gray-50 to-gray-100";
  };

  const getTopicDisplayName = (topic) => {
    const displayNames = {
      array: "Arrays",
      string: "Strings",
      "hash-table": "Hash Tables",
      "two-pointers": "Two Pointers",
      stack: "Stack",
      "binary-tree": "Binary Trees",
      recursion: "Recursion",
      traversal: "Tree Traversal",
      intervals: "Intervals",
      sorting: "Sorting",
      greedy: "Greedy Algorithms",
    };
    return (
      displayNames[topic] || topic.charAt(0).toUpperCase() + topic.slice(1)
    );
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
        <title>JavaScript Path Learning - Interview Nerd</title>
        <meta
          name="description"
          content="Learn JavaScript step by step with structured topics"
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
                  JavaScript Practice
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
            JavaScript Learning Path
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master JavaScript concepts step by step. Choose a topic to start
            your learning journey.
          </p>
        </motion.div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choose Your Learning Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicList.map((topic, index) => {
              const topicProgress = getTopicProgress(topic.name);
              const completedCount = topicProgress.total || 0;
              const progressPercent =
                topic.questions.length > 0
                  ? (completedCount / topic.questions.length) * 100
                  : 0;
              return (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="border-2 border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() =>
                      router.push(
                        `/js-practice/path-learning/${encodeURIComponent(
                          topic.name
                        )}`
                      )
                    }
                  >
                    <CardContent className="p-6">
                      {/* Topic Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg bg-yellow-50 border border-yellow-100 flex items-center justify-center`}
                          >
                            {(() => {
                              const Icon = getTopicIcon(topic.name);
                              return (
                                <Icon className="w-6 h-6 text-yellow-600" />
                              );
                            })()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                              {getTopicDisplayName(topic.name)}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {topic.questions.length} question
                              {topic.questions.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex gap-2">
                          {topic.easy > 0 && (
                            <Badge className="text-xs font-medium border text-green-600 bg-green-50 border-green-200">
                              {topic.easy} Easy
                            </Badge>
                          )}
                          {topic.medium > 0 && (
                            <Badge className="text-xs font-medium border text-yellow-600 bg-yellow-50 border-yellow-200">
                              {topic.medium} Medium
                            </Badge>
                          )}
                          {topic.hard > 0 && (
                            <Badge className="text-xs font-medium border text-red-600 bg-red-50 border-red-200">
                              {topic.hard} Hard
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${getTopicColor(
                              topic.name
                            )}`}
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {completedCount} / {topic.questions.length} completed
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
