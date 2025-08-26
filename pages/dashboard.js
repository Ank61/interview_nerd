import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Header from "@/components/header";
import GamificationDashboard from "@/components/gamification/GamificationDashboard";
import Leaderboard from "@/components/gamification/Leaderboard";
import ActiveChallenge from "@/components/gamification/ActiveChallenge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Target,
  TrendingUp,
  Users,
  Award,
  Calendar,
  Clock,
  BarChart3,
  ArrowLeft,
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
                onClick={() => router.push("/category/Javascript")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Learning
              </button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Progress
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <GamificationDashboard />
                </div>
                <div className="space-y-6">
                  <ActiveChallenge topic="Javascript" />
                </div>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => router.push("/category/Javascript")}
                      className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors text-left"
                    >
                      <div className="text-2xl mb-2">🟨</div>
                      <div className="font-semibold text-gray-900">
                        JavaScript
                      </div>
                      <div className="text-sm text-gray-600">52 questions</div>
                    </button>

                    <button
                      onClick={() => router.push("/category/React")}
                      className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
                    >
                      <div className="text-2xl mb-2">⚛️</div>
                      <div className="font-semibold text-gray-900">React</div>
                      <div className="text-sm text-gray-600">40 questions</div>
                    </button>

                    <button
                      onClick={() => router.push("/category/Node")}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
                    >
                      <div className="text-2xl mb-2">🟢</div>
                      <div className="font-semibold text-gray-900">Node.js</div>
                      <div className="text-sm text-gray-600">52 questions</div>
                    </button>

                    <button
                      onClick={() => router.push("/category/SQL")}
                      className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left"
                    >
                      <div className="text-2xl mb-2">🗄️</div>
                      <div className="font-semibold text-gray-900">SQL</div>
                      <div className="text-sm text-gray-600">45 questions</div>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              {recentActivity.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.slice(0, 5).map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
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
              )}
            </TabsContent>

            <TabsContent value="progress">
              <GamificationDashboard />
            </TabsContent>

            <TabsContent value="leaderboard">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Leaderboard />
                <Card>
                  <CardHeader>
                    <CardTitle>Your Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Weekly XP</span>
                        <span className="text-blue-600 font-bold">#12</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Accuracy</span>
                        <span className="text-green-600 font-bold">#8</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">Streak</span>
                        <span className="text-orange-600 font-bold">#15</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      Complete your first question to start earning badges!
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievement Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">
                            JavaScript Master
                          </span>
                          <span className="text-sm text-gray-500">0/52</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">
                            First Steps
                          </span>
                          <span className="text-sm text-gray-500">0/1</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">
                            Week Warrior
                          </span>
                          <span className="text-sm text-gray-500">0/7</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
