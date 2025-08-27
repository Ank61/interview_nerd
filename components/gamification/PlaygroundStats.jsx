import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  TrendingUp, 
  Clock, 
  Target, 
  Zap, 
  Award,
  Play,
  ChevronRight,
  Brain,
  BarChart3
} from "lucide-react";
import { useRouter } from 'next/router';

const PlaygroundStats = ({ userId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchPlaygroundStats();
    }
  }, [userId]);

  const fetchPlaygroundStats = async () => {
    try {
      const response = await fetch('/api/playground/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching playground stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageIcon = (language) => {
    const icons = {
      javascript: '🟨',
      typescript: '🔷',
      python: '🐍'
    };
    return icons[language] || '💻';
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'yellow',
      typescript: 'blue',
      python: 'green'
    };
    return colors[language] || 'gray';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-600" />
            Code Playground
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats || stats.totalAttempts === 0) {
    return (
      <Card className="shadow-lg border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-600" />
            Code Playground
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Start Your Coding Journey
            </h3>
            <p className="text-gray-600 mb-6">
              Practice coding with AI-powered adaptive difficulty across JavaScript, TypeScript, and Python.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xs text-gray-600">Adaptive AI</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs text-gray-600">Real-time Tests</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-xs text-gray-600">XP & Badges</div>
            </div>
          </div>

          <Button 
            onClick={() => router.push('/playground')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Coding Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-600" />
            Code Playground
          </CardTitle>
          <Badge className="bg-purple-100 text-purple-800">
            {getTrendIcon(stats.recentTrend)} {stats.recentTrend}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.totalCompleted}</p>
                <p className="text-sm text-gray-600">Problems Solved</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.successRate}%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Language Breakdown */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Language Progress
          </h4>
          <div className="space-y-3">
            {Object.entries(stats.languageBreakdown).map(([language, langStats]) => (
              <motion.div
                key={language}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg p-3 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getLanguageIcon(language)}</span>
                    <span className="font-medium text-gray-900 capitalize">{language}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {langStats.completed}/{langStats.attempts}
                    </span>
                    <div className="text-xs text-gray-500">
                      {langStats.successRate}% success
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-${getLanguageColor(language)}-400 to-${getLanguageColor(language)}-600 h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${langStats.successRate}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {stats.recentActivity && stats.recentActivity.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Activity
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {stats.recentActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getLanguageIcon(activity.data.language)}</span>
                      <span className="text-sm text-gray-900">
                        {activity.data.success ? '✅' : '❌'} {activity.data.difficulty} problem
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Zap className="w-3 h-3" />
                      +{activity.data.xpGained}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={() => router.push('/playground')}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Continue Coding
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.push('/playground')}
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-gray-900">{stats.totalXPEarned}</p>
              <p className="text-xs text-gray-600">XP Earned</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{Math.round(stats.averageTime / 60)}m</p>
              <p className="text-xs text-gray-600">Avg Time</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{Object.keys(stats.languageBreakdown).length}</p>
              <p className="text-xs text-gray-600">Languages</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaygroundStats;
