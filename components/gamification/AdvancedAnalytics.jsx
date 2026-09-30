import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Calendar,
  Brain,
  Zap,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
  Star
} from 'lucide-react';

const AdvancedAnalytics = ({ compact = false }) => {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (session?.user?.id) {
      fetchAnalytics();
    }
  }, [session, timeframe]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gamification/analytics/${session.user.id}?timeframe=${timeframe}`);
      const data = await response.json();
      
      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Advanced Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Advanced Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No analytics data available yet.</p>
            <p className="text-sm">Complete more activities to see insights!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">
                {Math.round(analytics.performance.overallAccuracy * 100)}%
              </p>
              <p className="text-xs text-brand">Accuracy</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">
                {analytics.overview.dailyAverage}
              </p>
              <p className="text-xs text-green-700">Daily Avg</p>
            </div>
          </div>

          {/* Top Performance */}
          {analytics.performance.strongestTopics?.[0] && (
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Strongest Topic</span>
              </div>
              <p className="text-sm text-yellow-800">
                {analytics.performance.strongestTopics[0].topic} • 
                {Math.round(analytics.performance.strongestTopics[0].accuracy * 100)}%
              </p>
            </div>
          )}

          {/* Risk Alert */}
          {analytics.predictions.riskFactors?.length > 0 && (
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-900">Attention Needed</span>
              </div>
              <p className="text-sm text-red-800">
                {analytics.predictions.riskFactors[0].description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          Advanced Analytics
        </CardTitle>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            {['overview', 'performance', 'learning', 'engagement', 'predictions'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="capitalize"
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Activity className="w-8 h-8 text-brand mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">{analytics.overview.questionsAnswered}</p>
                <p className="text-sm text-brand">Questions Answered</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">{Math.round(analytics.overview.totalTimeSpent / 60)}h</p>
                <p className="text-sm text-green-700">Time Spent</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-900">{analytics.overview.dailyAverage}</p>
                <p className="text-sm text-purple-700">Daily Average</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-900">{analytics.overview.currentStreak}</p>
                <p className="text-sm text-orange-700">Current Streak</p>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Performance Highlights</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Overall Accuracy</span>
                    <Badge variant={analytics.performance.overallAccuracy > 0.8 ? 'default' : 'secondary'}>
                      {Math.round(analytics.performance.overallAccuracy * 100)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Session Length</span>
                    <span className="text-sm font-medium">
                      {Math.round(analytics.overview.averageSessionTime)} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Consistency Score</span>
                    <Badge variant={analytics.learning.consistencyScore > 0.7 ? 'default' : 'secondary'}>
                      {Math.round(analytics.learning.consistencyScore * 100)}%
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Learning Progress</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Current Level</span>
                    <Badge variant="outline">{analytics.overview.currentLevel}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Total XP</span>
                    <span className="text-sm font-medium">{analytics.overview.totalXP}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Learning Velocity</span>
                    <span className="text-sm font-medium">
                      {Math.round(analytics.learning.learningVelocity)} XP/day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-brand" />
              Performance Analysis
            </h4>

            {/* Topic Performance */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Topic Performance</h5>
              <div className="space-y-2">
                {analytics.performance.topicPerformance.slice(0, 5).map((topic, index) => (
                  <div key={topic.topic} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-800">
                        {index + 1}
                      </div>
                      <span className="font-medium">{topic.topic}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        {topic.questionsAnswered} questions
                      </span>
                      <Badge variant={topic.accuracy > 0.8 ? 'default' : topic.accuracy > 0.6 ? 'secondary' : 'destructive'}>
                        {Math.round(topic.accuracy * 100)}%
                      </Badge>
                      {topic.improvement > 0 && (
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          <span className="text-xs">+{Math.round(topic.improvement * 100)}%</span>
                        </div>
                      )}
                      {topic.improvement < 0 && (
                        <div className="flex items-center gap-1 text-red-600">
                          <TrendingDown className="w-3 h-3" />
                          <span className="text-xs">{Math.round(topic.improvement * 100)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Analysis */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Difficulty Breakdown</h5>
              <div className="grid grid-cols-3 gap-4">
                {analytics.performance.difficultyPerformance.map((diff) => (
                  <div key={diff.difficulty} className="text-center p-4 border border-gray-200 rounded-lg">
                    <h6 className="font-medium capitalize mb-2">{diff.difficulty}</h6>
                    <p className="text-2xl font-bold mb-1">
                      {Math.round(diff.accuracy * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">
                      {diff.questionsAnswered} questions
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  Strongest Topics
                </h5>
                <div className="space-y-2">
                  {analytics.performance.strongestTopics.map((topic, index) => (
                    <div key={topic.topic} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-900">{topic.topic}</span>
                      <Badge variant="outline" className="border-green-300 text-green-800">
                        {Math.round(topic.accuracy * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  Areas for Improvement
                </h5>
                <div className="space-y-2">
                  {analytics.performance.weakestTopics.map((topic, index) => (
                    <div key={topic.topic} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-orange-900">{topic.topic}</span>
                      <Badge variant="outline" className="border-orange-300 text-orange-800">
                        {Math.round(topic.accuracy * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-600" />
              Learning Analytics
            </h4>

            {/* Study Patterns */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Study Patterns</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h6 className="font-medium mb-2">Preferred Study Time</h6>
                  <p className="text-2xl font-bold text-purple-600 capitalize">
                    {analytics.learning.studyPatterns.preferredStudyTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    Peak hour: {analytics.learning.studyPatterns.peakHour}:00
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h6 className="font-medium mb-2">Most Active Day</h6>
                  <p className="text-2xl font-bold text-purple-600">
                    {analytics.learning.studyPatterns.peakDay}
                  </p>
                  <p className="text-sm text-gray-600">
                    Consistency: {Math.round(analytics.learning.consistencyScore * 100)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Milestones */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Learning Milestones</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analytics.learning.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900 capitalize">
                        {milestone.type} {milestone.value}
                      </p>
                      <p className="text-sm text-green-700">Achieved</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Retention */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Knowledge Retention</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-900">
                    {Math.round(analytics.learning.retentionAnalysis.retentionRate * 100)}%
                  </p>
                  <p className="text-sm text-brand">Retention Rate</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-900">
                    {analytics.learning.retentionAnalysis.masteredQuestions}
                  </p>
                  <p className="text-sm text-green-700">Mastered Questions</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-900">
                    {analytics.learning.retentionAnalysis.totalReviews}
                  </p>
                  <p className="text-sm text-purple-700">Total Reviews</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'engagement' && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" />
              Engagement Metrics
            </h4>

            {/* Session Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Calendar className="w-8 h-8 text-brand mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">{analytics.engagement.totalSessions}</p>
                <p className="text-sm text-brand">Total Sessions</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">{analytics.engagement.averageSessionLength}</p>
                <p className="text-sm text-green-700">Avg Session (min)</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-900">{analytics.engagement.engagementScore}</p>
                <p className="text-sm text-purple-700">Engagement Score</p>
              </div>
            </div>

            {/* Peak Hours */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Peak Activity Hours</h5>
              <div className="grid grid-cols-3 gap-4">
                {analytics.engagement.peakHours.map((peak, index) => (
                  <div key={index} className="text-center p-3 border border-gray-200 rounded-lg">
                    <p className="font-bold">{peak.hour}:00</p>
                    <p className="text-sm text-gray-600">{peak.count} activities</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Information */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Streak Analysis</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <span className="font-medium">Current Streak</span>
                  </div>
                  <p className="text-3xl font-bold text-orange-600">
                    {analytics.engagement.streakData.current} days
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium">Longest Streak</span>
                  </div>
                  <p className="text-3xl font-bold text-yellow-600">
                    {analytics.engagement.streakData.longest} days
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand" />
              Predictive Insights
            </h4>

            {/* Level Progression */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-3">Level Progression Forecast</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-brand">Current Level</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {analytics.predictions.levelProgression.currentLevel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-brand">XP Needed</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {analytics.predictions.levelProgression.xpNeeded}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-brand">Days to Next Level</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {analytics.predictions.levelProgression.daysToNextLevel}
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            {analytics.predictions.riskFactors?.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Risk Factors
                </h5>
                <div className="space-y-3">
                  {analytics.predictions.riskFactors.map((risk, index) => (
                    <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={risk.severity === 'high' ? 'destructive' : 'secondary'}>
                          {risk.severity}
                        </Badge>
                        <span className="font-medium text-red-900 capitalize">
                          {risk.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-red-800">{risk.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analytics.predictions.recommendations?.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Recommendations
                </h5>
                <div className="space-y-2">
                  {analytics.predictions.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-800">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mastery Predictions */}
            {analytics.predictions.masteryPredictions?.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Mastery Timeline</h5>
                <div className="space-y-2">
                  {analytics.predictions.masteryPredictions.slice(0, 5).map((prediction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="font-medium">{prediction.topic}</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">{prediction.daysToMastery} days</p>
                        <p className="text-xs text-gray-600">
                          {prediction.questionsNeeded} questions needed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalytics;
