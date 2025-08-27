import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Clock, 
  Target,
  Users,
  Calendar,
  Filter,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Leaderboard = () => {
  const { data: session } = useSession();
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [error, setError] = useState(null);

  const timeframes = [
    { value: 'all', label: 'All Time', icon: '∞' },
    { value: 'year', label: 'This Year', icon: '📅' },
    { value: 'month', label: 'This Month', icon: '📊' },
    { value: 'week', label: 'This Week', icon: '⚡' }
  ];

  const languages = [
    { value: 'all', label: 'All Languages', icon: '🌐', color: 'bg-gray-500' },
    { value: 'javascript', label: 'JavaScript', icon: '🟨', color: 'bg-yellow-500' },
    { value: 'typescript', label: 'TypeScript', icon: '🔷', color: 'bg-blue-500' },
    { value: 'python', label: 'Python', icon: '🐍', color: 'bg-green-500' }
  ];

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/playground/leaderboard?timeframe=${selectedTimeframe}&language=${selectedLanguage}&limit=50`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      
      const data = await response.json();
      setLeaderboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchLeaderboard();
    }
  }, [session, selectedTimeframe, selectedLanguage]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatLastActivity = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const activity = new Date(date);
    const diffInHours = Math.floor((now - activity) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-red-500 mb-4">Error loading leaderboard: {error}</div>
          <Button onClick={fetchLeaderboard} variant="outline">
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
            <Trophy className="w-6 h-6 text-yellow-500" />
            Playground Leaderboard
          </h2>
          <p className="text-gray-600 mt-1">
            Compete with other developers and track your progress
          </p>
        </div>
        <Button onClick={fetchLeaderboard} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Timeframe:</span>
              <div className="flex gap-1">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe.value}
                    size="sm"
                    variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                    onClick={() => setSelectedTimeframe(timeframe.value)}
                    className="text-xs"
                  >
                    <span className="mr-1">{timeframe.icon}</span>
                    {timeframe.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Language:</span>
              <div className="flex gap-1">
                {languages.map((language) => (
                  <Button
                    key={language.value}
                    size="sm"
                    variant={selectedLanguage === language.value ? "default" : "outline"}
                    onClick={() => setSelectedLanguage(language.value)}
                    className="text-xs"
                  >
                    <span className="mr-1">{language.icon}</span>
                    {language.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      {leaderboardData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{leaderboardData.totalUsers}</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">#{leaderboardData.currentUserRank || 'N/A'}</div>
                  <div className="text-sm text-gray-600">Your Rank</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {leaderboardData.currentUser?.totalQuestions || 0}
                  </div>
                  <div className="text-sm text-gray-600">Questions Solved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            <AnimatePresence>
              {leaderboardData?.leaderboard.map((user, index) => (
                <motion.div
                  key={user.email}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                    user.email === session?.user?.email ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {user.name}
                        {user.email === session?.user?.email && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">Level {user.level}</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-gray-900">{user.totalQuestions}</div>
                      <div className="text-gray-500">Solved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">{user.successRate}%</div>
                      <div className="text-gray-500">Success</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">{formatTime(user.averageTime)}</div>
                      <div className="text-gray-500">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900">{Math.round(user.score)}</div>
                      <div className="text-gray-500">Score</div>
                    </div>
                  </div>

                  {/* Last Activity */}
                  <div className="text-xs text-gray-400 w-16 text-right">
                    {formatLastActivity(user.lastActivity)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Current User Stats (if not in top 10) */}
      {leaderboardData?.currentUser && leaderboardData.currentUserRank > 10 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-center w-12">
                <span className="text-lg font-bold text-blue-600">
                  #{leaderboardData.currentUserRank}
                </span>
              </div>
              
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={leaderboardData.currentUser.image} alt={leaderboardData.currentUser.name} />
                  <AvatarFallback>{leaderboardData.currentUser.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">{leaderboardData.currentUser.name}</div>
                  <div className="text-sm text-gray-500">Level {leaderboardData.currentUser.level}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-gray-900">{leaderboardData.currentUser.totalQuestions}</div>
                  <div className="text-gray-500">Solved</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{leaderboardData.currentUser.successRate}%</div>
                  <div className="text-gray-500">Success</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{Math.round(leaderboardData.currentUser.score)}</div>
                  <div className="text-gray-500">Score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Leaderboard;
