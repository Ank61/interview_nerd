import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Header from "@/components/header";
import TopicsProgressChart from "@/components/gamification/TopicsProgressChart";
import MCQDailyChallenge from "@/components/gamification/MCQDailyChallenge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  BarChart3,
  ArrowLeft,
  Trophy,
  Zap,
  CheckCircle,
  Home,
  User,
  Settings,
} from "lucide-react";

export default function Dashboard({
  initialRecentActivity = [],
  initialStudyStats = null,
  initialGamificationData = null,
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recentActivity, setRecentActivity] = useState(initialRecentActivity);
  const [studyStats, setStudyStats] = useState(initialStudyStats);
  const [gamificationData, setGamificationData] = useState(
    initialGamificationData
  );
  const [loading, setLoading] = useState(!initialStudyStats);
  const [topicsToShow, setTopicsToShow] = useState(6);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Calculate topics to show based on screen size
  useEffect(() => {
    const updateTopicsToShow = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setTopicsToShow(4); // 2x2 grid on mobile
      } else if (width <= 1024) {
        setTopicsToShow(6); // 3x2 grid on tablet
      } else {
        setTopicsToShow(8); // 4x2 grid on desktop
      }
    };

    updateTopicsToShow();
    window.addEventListener("resize", updateTopicsToShow);
    return () => window.removeEventListener("resize", updateTopicsToShow);
  }, []);

  // Only fetch data if not provided as props
  useEffect(() => {
    if (session?.user?.id && !initialStudyStats) {
      fetchDashboardData();
    }
  }, [session, initialStudyStats]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [activityRes, statsRes, gamificationRes] = await Promise.all([
        fetch(`/api/user/activity/${session.user.id}`),
        fetch(`/api/user/stats/${session.user.id}`),
        fetch(`/api/gamification/${session.user.id}`),
      ]);

      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setRecentActivity(activityData.activities || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStudyStats(statsData);
      }

      if (gamificationRes.ok) {
        const gamificationData = await gamificationRes.json();
        setGamificationData(gamificationData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Calculate derived values from API data
  const questionsAnswered = studyStats?.questionsAnswered || 0;
  const currentStreak = studyStats?.currentStreak || 0;
  const currentLevel = studyStats?.level || 1;
  const weeklyXP = studyStats?.weeklyXP || 0;
  const accuracy = studyStats?.accuracy || 0;
  const totalStudyTime = studyStats?.totalStudyTime || 0;
  const totalQuestions = studyStats?.questionsAnswered || 0;
  const weeklyRank = studyStats?.weeklyRank || 0;
  const topicStats = studyStats?.topicStats || [];
  const totalTopics = 8; // Based on available categories
  const masteredTopics = topicStats.filter(
    (topic) => topic.mastery >= 80
  ).length;
  const overallProgress =
    totalTopics > 0 ? Math.round((masteredTopics / totalTopics) * 100) : 0;

  // Weekly goal calculation (based on questions answered this week)
  const weeklyGoal = 20;
  const weeklyProgress = Math.min((questionsAnswered / weeklyGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header matching category page structure */}
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
                <span className="text-gray-900 font-medium">Dashboard</span>
              </nav>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/category/Javascript")}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transition-all duration-200"
              >
                <BookOpen size={16} />
                <span>Start Learning</span>
              </button>

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
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {session.user.name}! 👋
            </h2>
            <p className="text-gray-600">
              Ready to level up your interview skills today?
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700">
                            Questions Solved
                          </p>
                          <p className="text-3xl font-bold text-blue-900">
                            {questionsAnswered}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-200 rounded-full">
                          <BookOpen className="w-6 h-6 text-blue-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-700">
                            Current Streak
                          </p>
                          <p className="text-3xl font-bold text-green-900">
                            {currentStreak} days
                          </p>
                        </div>
                        <div className="p-3 bg-green-200 rounded-full">
                          <Target className="w-6 h-6 text-green-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-700">
                            Current Level
                          </p>
                          <p className="text-3xl font-bold text-purple-900">
                            {currentLevel}
                          </p>
                        </div>
                        <div className="p-3 bg-purple-200 rounded-full">
                          <Trophy className="w-6 h-6 text-purple-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Learning Paths */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card className="shadow-lg h-fit">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                          Learning Paths
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-2">
                          Choose your focus area and start mastering interview
                          concepts
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          {[
                            {
                              name: "JavaScript",
                              icon: "",
                              questions: 52,
                              path: "/category/Javascript",
                            },
                            {
                              name: "React",
                              icon: "",
                              questions: 40,
                              path: "/category/React",
                            },
                            {
                              name: "Node.js",
                              icon: "",
                              questions: 52,
                              path: "/category/Node",
                            },
                            {
                              name: "SQL",
                              icon: "",
                              questions: 45,
                              path: "/category/SQL",
                            },
                            {
                              name: "TypeScript",
                              icon: "",
                              questions: 38,
                              path: "/category/Typescript",
                            },
                            {
                              name: "Next.js",
                              icon: "",
                              questions: 35,
                              path: "/category/Next",
                            },
                            {
                              name: "AWS S3",
                              icon: "",
                              questions: 28,
                              path: "/category/AWS S3",
                            },
                            {
                              name: "OOP",
                              icon: "",
                              questions: 32,
                              path: "/category/OOP",
                            },
                          ]
                            .slice(0, topicsToShow)
                            .map((topic, index) => (
                              <motion.button
                                key={topic.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.5 + index * 0.05,
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push(topic.path)}
                                className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200 text-left group shadow-sm hover:shadow-md"
                              >
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                                  {topic.icon}
                                </div>
                                <div className="font-semibold text-gray-900 text-sm mb-1">
                                  {topic.name}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {topic.questions} questions
                                </div>
                              </motion.button>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Daily MCQ Challenge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <MCQDailyChallenge />
                  </motion.div>

                  {/* This Week Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-indigo-900">
                          <Calendar className="w-5 h-5" />
                          This Week
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-indigo-700">
                              Questions Solved
                            </span>
                            <span className="font-bold text-indigo-900">
                              {studyStats?.recentPerformance
                                ?.questionsAnswered || 0}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-indigo-700">
                              Topics Explored
                            </span>
                            <span className="font-bold text-indigo-900">
                              {studyStats?.studyPatterns?.favoriteTopics
                                ?.length || 0}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-indigo-200">
                            <div className="text-center">
                              <p className="text-sm text-indigo-600 mb-2">
                                Weekly Goal
                              </p>
                              <div className="w-full bg-indigo-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${weeklyProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-indigo-500 mt-1">
                                {Math.round(weeklyProgress)}% Complete
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Recent Activity */}
                  {recentActivity.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Card className="shadow-lg">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-green-600" />
                            Recent Activity
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {recentActivity
                              .slice(0, 5)
                              .map((activity, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 truncate">
                                      {activity.description}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {activity.timestamp}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-8">
              {/* Progress Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-200 rounded-full">
                          <BookOpen className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-900">
                            {overallProgress}%
                          </p>
                          <p className="text-sm text-emerald-700">
                            Overall Progress
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-emerald-200 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${overallProgress}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full"
                        ></motion.div>
                      </div>
                      <p className="text-sm text-emerald-600 mt-2">
                        {overallProgress > 50
                          ? "Great progress! Keep it up!"
                          : "Keep learning to improve your progress!"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-200 rounded-full">
                          <Target className="w-6 h-6 text-blue-700" />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-900">
                            {masteredTopics}/{totalTopics}
                          </p>
                          <p className="text-sm text-blue-700">
                            Topics Mastered
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {Array.from({ length: totalTopics }).map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-3 rounded-full ${
                              i < masteredTopics
                                ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                                : "bg-blue-200"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <p className="text-sm text-blue-600 mt-2">
                        {totalTopics - masteredTopics} more topics to go!
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Main Progress Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  {/* Learning Streak Visualization */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        Learning Streak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-orange-600 mb-2">
                          {currentStreak} Days
                        </div>
                        <p className="text-gray-600">
                          {currentStreak > 0
                            ? "Current streak - Keep it going!"
                            : "Start your learning streak today!"}
                        </p>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div key={i} className="text-center">
                            <div
                              className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
                                i < Math.min(currentStreak, 7)
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              {i < Math.min(currentStreak, 7) ? "" : ""}
                            </div>
                            <div className="text-xs text-gray-500">
                              {
                                [
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Fri",
                                  "Sat",
                                  "Sun",
                                ][i]
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <TopicsProgressChart userId={session?.user?.id} />
                </motion.div>
              </div>

              {/* Detailed Progress Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      Detailed Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {Math.round(accuracy)}%
                        </div>
                        <div className="text-sm text-purple-700 font-medium">
                          Accuracy Rate
                        </div>
                        <div className="text-xs text-purple-500 mt-1">
                          Last 30 days
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {Math.round(totalStudyTime / 60)}h
                        </div>
                        <div className="text-sm text-green-700 font-medium">
                          Study Time
                        </div>
                        <div className="text-xs text-green-500 mt-1">
                          Total time
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {totalQuestions}
                        </div>
                        <div className="text-sm text-blue-700 font-medium">
                          Total Questions
                        </div>
                        <div className="text-xs text-blue-500 mt-1">
                          All time
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          #{weeklyRank || "N/A"}
                        </div>
                        <div className="text-sm text-orange-700 font-medium">
                          Weekly Rank
                        </div>
                        <div className="text-xs text-orange-500 mt-1">
                          This week
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
