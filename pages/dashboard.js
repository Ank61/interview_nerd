import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Header from "@/components/header";
import GamificationDashboard from "@/components/gamification/GamificationDashboard";
import ActiveChallenge from "@/components/gamification/ActiveChallenge";
import TopicsProgressChart from "@/components/gamification/TopicsProgressChart";
import PlaygroundStats from "@/components/gamification/PlaygroundStats";
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
  Code,
  Play,
} from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recentActivity, setRecentActivity] = useState([]);
  const [studyStats, setStudyStats] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent activity and study stats
      const [activityRes, statsRes] = await Promise.all([
        fetch(`/api/user/activity/${session.user.id}`),
        fetch(`/api/user/stats/${session.user.id}`),
      ]);

      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setRecentActivity(activityData.activities || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStudyStats(statsData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 bg-gray-200 rounded-lg"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {session.user.name}! 👋
                </h1>
                <p className="text-gray-600 mt-2">
                  Ready to level up your interview skills today?
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/playground")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                <Code className="w-4 h-4" />
                Code Playground
              </button>
              <button
                onClick={() => router.push("/category/Javascript")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Learning
              </button>
            </div>
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
              {/* Hero Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700">Total XP</p>
                          <p className="text-3xl font-bold text-blue-900">1,250</p>
                        </div>
                        <div className="p-3 bg-blue-200 rounded-full">
                          <TrendingUp className="w-6 h-6 text-blue-700" />
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
                          <p className="text-sm font-medium text-green-700">Current Streak</p>
                          <p className="text-3xl font-bold text-green-900">7 days</p>
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
                          <p className="text-sm font-medium text-purple-700">Questions Solved</p>
                          <p className="text-3xl font-bold text-purple-900">42</p>
                        </div>
                        <div className="p-3 bg-purple-200 rounded-full">
                          <BookOpen className="w-6 h-6 text-purple-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-700">Current Level</p>
                          <p className="text-3xl font-bold text-orange-900">12</p>
                        </div>
                        <div className="p-3 bg-orange-200 rounded-full">
                          <Target className="w-6 h-6 text-orange-700" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <GamificationDashboard />
                  </motion.div>

                  {/* Enhanced Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Card className="shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                            Learning Paths
                          </CardTitle>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            9 Topics Available
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          Choose your focus area and start mastering interview concepts
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {[
                            { name: "JavaScript", icon: "🟨", questions: 52, color: "yellow", path: "/category/Javascript" },
                            { name: "React", icon: "⚛️", questions: 40, color: "blue", path: "/category/React" },
                            { name: "Node.js", icon: "🟢", questions: 52, color: "green", path: "/category/Node" },
                            { name: "SQL", icon: "🗄️", questions: 45, color: "purple", path: "/category/SQL" },
                            { name: "TypeScript", icon: "🔷", questions: 38, color: "indigo", path: "/category/Typescript" },
                            { name: "Next.js", icon: "▲", questions: 35, color: "gray", path: "/category/Next" },
                            { name: "AWS S3", icon: "☁️", questions: 28, color: "orange", path: "/category/AWS S3" },
                            { name: "OOP", icon: "🏗️", questions: 32, color: "pink", path: "/category/OOP" }
                          ].map((topic, index) => (
                            <motion.button
                              key={topic.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => router.push(topic.path)}
                              className={`p-4 bg-${topic.color}-50 border border-${topic.color}-200 rounded-xl hover:bg-${topic.color}-100 transition-all duration-200 text-left group shadow-sm hover:shadow-md`}
                            >
                              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                                {topic.icon}
                              </div>
                              <div className="font-semibold text-gray-900 mb-1">
                                {topic.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {topic.questions} questions
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                Click to start →
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <PlaygroundStats userId={session?.user?.id} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <ActiveChallenge topic="Javascript" />
                  </motion.div>

                  {/* Recent Activity */}
                  {recentActivity.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <Card className="shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-green-600" />
                            Recent Activity
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {recentActivity.slice(0, 5).map((activity, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                                className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all duration-200"
                              >
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {activity.description}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {activity.timestamp}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Quick Stats Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-indigo-900">
                          <Calendar className="w-5 h-5" />
                          This Week
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-indigo-700">Questions Solved</span>
                            <span className="font-bold text-indigo-900">12</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-indigo-700">XP Gained</span>
                            <span className="font-bold text-indigo-900">+340</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-indigo-700">Topics Explored</span>
                            <span className="font-bold text-indigo-900">3</span>
                          </div>
                          <div className="pt-2 border-t border-indigo-200">
                            <div className="text-center">
                              <p className="text-sm text-indigo-600 mb-1">Weekly Goal Progress</p>
                              <div className="w-full bg-indigo-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                              </div>
                              <p className="text-xs text-indigo-500 mt-1">75% Complete</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
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
                          <p className="text-2xl font-bold text-emerald-900">68%</p>
                          <p className="text-sm text-emerald-700">Overall Progress</p>
                        </div>
                      </div>
                      <div className="w-full bg-emerald-200 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "68%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full"
                        ></motion.div>
                      </div>
                      <p className="text-sm text-emerald-600 mt-2">Great progress! Keep it up!</p>
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
                          <p className="text-2xl font-bold text-blue-900">5/9</p>
                          <p className="text-sm text-blue-700">Topics Mastered</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-3 rounded-full ${
                              i < 5 ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-blue-200"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <p className="text-sm text-blue-600 mt-2">4 more topics to go!</p>
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
                  <GamificationDashboard />
                  
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
                        <div className="text-4xl font-bold text-orange-600 mb-2">7 Days</div>
                        <p className="text-gray-600">Current streak - Keep it going!</p>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div key={i} className="text-center">
                            <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
                              i < 7 ? "bg-orange-500 text-white" : "bg-gray-200"
                            }`}>
                              {i < 7 ? "🔥" : ""}
                            </div>
                            <div className="text-xs text-gray-500">
                              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
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
                        <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
                        <div className="text-sm text-purple-700 font-medium">Accuracy Rate</div>
                        <div className="text-xs text-purple-500 mt-1">Last 30 days</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">2.3h</div>
                        <div className="text-sm text-green-700 font-medium">Study Time</div>
                        <div className="text-xs text-green-500 mt-1">This week</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                        <div className="text-sm text-blue-700 font-medium">Total Questions</div>
                        <div className="text-xs text-blue-500 mt-1">All time</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                        <div className="text-3xl font-bold text-orange-600 mb-2">#23</div>
                        <div className="text-sm text-orange-700 font-medium">Global Rank</div>
                        <div className="text-xs text-orange-500 mt-1">This month</div>
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
