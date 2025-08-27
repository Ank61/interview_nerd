import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Award, 
  Brain,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Lightbulb,
  Calendar,
  Zap,
  Trophy,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const Analytics = () => {
  const { data: session } = useSession();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [error, setError] = useState(null);

  const timeframes = [
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: '365', label: '1 Year' }
  ];

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/playground/analytics?timeframe=${selectedTimeframe}&type=all`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalyticsData(data.analytics);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAnalytics();
    }
  }, [session, selectedTimeframe]);

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0s';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
  };

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-red-500 mb-4">Error loading analytics: {error}</div>
          <Button onClick={fetchAnalytics} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            Playground Analytics
          </h2>
          <p className="text-gray-600 mt-1">
            Detailed insights into your coding performance and progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            {timeframes.map((tf) => (
              <option key={tf.value} value={tf.value}>{tf.label}</option>
            ))}
          </select>
          <Button onClick={fetchAnalytics} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {analyticsData?.overview && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="text-2xl font-bold">{analyticsData.overview.totalAttempts}</div>
                        <div className="text-sm text-gray-600">Total Attempts</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold">{analyticsData.overview.successRate}%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-purple-500" />
                      <div>
                        <div className="text-2xl font-bold">{formatTime(analyticsData.overview.averageTime)}</div>
                        <div className="text-sm text-gray-600">Avg Time</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-8 h-8 text-yellow-500" />
                      <div>
                        <div className="text-2xl font-bold">{formatTime(analyticsData.overview.minTime)}</div>
                        <div className="text-sm text-gray-600">Best Time</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Language Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Language Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analyticsData.overview.languageStats).map(([lang, stats]) => {
                        const successRate = stats.attempts > 0 ? (stats.successes / stats.attempts) * 100 : 0;
                        return (
                          <div key={lang} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium capitalize">{lang}</span>
                              <span className="text-sm text-gray-600">
                                {stats.successes}/{stats.attempts} ({Math.round(successRate)}%)
                              </span>
                            </div>
                            <Progress value={successRate} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Difficulty Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analyticsData.overview.difficultyStats).map(([diff, stats]) => {
                        const successRate = stats.attempts > 0 ? (stats.successes / stats.attempts) * 100 : 0;
                        return (
                          <div key={diff} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium capitalize">{diff}</span>
                              <span className="text-sm text-gray-600">
                                {stats.successes}/{stats.attempts} ({Math.round(successRate)}%)
                              </span>
                            </div>
                            <Progress value={successRate} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          {analyticsData?.trends && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={analyticsData.trends.daily}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        formatter={(value, name) => [
                          name === 'successRate' ? `${value.toFixed(1)}%` : value,
                          name === 'successRate' ? 'Success Rate' : 
                          name === 'attempts' ? 'Attempts' :
                          name === 'xpGained' ? 'XP Gained' : name
                        ]}
                      />
                      <Line type="monotone" dataKey="attempts" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="successRate" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="xpGained" stroke="#F59E0B" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          {analyticsData?.skills && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Brain className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="text-2xl font-bold">{analyticsData.skills.totalSkills}</div>
                        <div className="text-sm text-gray-600">Skills Practiced</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold">{analyticsData.skills.masteredSkills}</div>
                        <div className="text-sm text-gray-600">Skills Mastered</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-8 h-8 text-purple-500" />
                      <div>
                        <div className="text-2xl font-bold">
                          {analyticsData.skills.totalSkills > 0 ? 
                            Math.round((analyticsData.skills.masteredSkills / analyticsData.skills.totalSkills) * 100) : 0}%
                        </div>
                        <div className="text-sm text-gray-600">Mastery Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.skills.analysis.slice(0, 10).map((skill, index) => (
                      <motion.div
                        key={skill.skill}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Badge className={`${getSkillLevelColor(skill.level)} text-white`}>
                              {skill.level}
                            </Badge>
                            <span className="font-medium">{skill.skill}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {skill.recommendation}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-bold">{skill.successRate}%</div>
                            <div className="text-gray-500">Success</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">{skill.attempts}</div>
                            <div className="text-gray-500">Attempts</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">{formatTime(skill.averageTime)}</div>
                            <div className="text-gray-500">Avg Time</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          {analyticsData?.comparison && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="text-2xl font-bold">#{analyticsData.comparison.userRank}</div>
                        <div className="text-sm text-gray-600">Your Rank</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold">{analyticsData.comparison.successRatePercentile}th</div>
                        <div className="text-sm text-gray-600">Success Percentile</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-8 h-8 text-purple-500" />
                      <div>
                        <div className="text-2xl font-bold">{analyticsData.comparison.questionsPercentile}th</div>
                        <div className="text-sm text-gray-600">Questions Percentile</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-8 h-8 text-yellow-500" />
                      <div>
                        <div className="text-2xl font-bold">{analyticsData.comparison.speedPercentile}th</div>
                        <div className="text-sm text-gray-600">Speed Percentile</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Success Rate Percentile</span>
                        <span>{analyticsData.comparison.successRatePercentile}th percentile</span>
                      </div>
                      <Progress value={analyticsData.comparison.successRatePercentile} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Questions Solved Percentile</span>
                        <span>{analyticsData.comparison.questionsPercentile}th percentile</span>
                      </div>
                      <Progress value={analyticsData.comparison.questionsPercentile} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Speed Percentile</span>
                        <span>{analyticsData.comparison.speedPercentile}th percentile</span>
                      </div>
                      <Progress value={analyticsData.comparison.speedPercentile} className="h-3" />
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Youre performing better than {Math.min(analyticsData.comparison.successRatePercentile, analyticsData.comparison.questionsPercentile)}% of users overall!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          {analyticsData?.recommendations && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold">AI-Powered Recommendations</h3>
              </div>
              
              {analyticsData.recommendations.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-gray-500">
                      Keep practicing to get personalized recommendations!
                    </div>
                  </CardContent>
                </Card>
              ) : (
                analyticsData.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-l-4 ${getPriorityColor(rec.priority)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                            <p className="text-gray-600 text-sm">{rec.description}</p>
                          </div>
                          <Badge variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'default' : 'secondary'}>
                            {rec.priority} priority
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
