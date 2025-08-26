import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Medal, Award, TrendingUp, Target, Flame, Zap } from 'lucide-react';

const Leaderboard = ({ compact = false }) => {
  const [leaderboardData, setLeaderboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('weekly');

  useEffect(() => {
    fetchLeaderboard(activeTab);
  }, [activeTab]);

  const fetchLeaderboard = async (type) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gamification/leaderboard?type=${type}&limit=10`);
      const data = await response.json();
      setLeaderboardData(prev => ({ ...prev, [type]: data }));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 2: return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 3: return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      default: return 'bg-white border-gray-100';
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'weekly': return <TrendingUp className="w-4 h-4" />;
      case 'monthly': return <TrendingUp className="w-4 h-4" />;
      case 'alltime': return <Zap className="w-4 h-4" />;
      case 'streak': return <Flame className="w-4 h-4" />;
      case 'accuracy': return <Target className="w-4 h-4" />;
      default: return null;
    }
  };

  const getDisplayValue = (user, type) => {
    switch (type) {
      case 'weekly': return `${user.weeklyXP.toLocaleString()} XP`;
      case 'monthly': return `${user.monthlyXP.toLocaleString()} XP`;
      case 'alltime': return `${user.xp.toLocaleString()} XP`;
      case 'streak': return `${user.streak} days`;
      case 'accuracy': return `${user.accuracy}%`;
      default: return '';
    }
  };

  if (compact) {
    const currentData = leaderboardData[activeTab];
    if (!currentData || loading) {
      return (
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      );
    }

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            {getTabIcon(activeTab)}
            Weekly Leaders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {currentData.leaderboard.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center gap-3 p-2 rounded-lg border ${getRankBg(user.rank)}`}
            >
              <div className="flex items-center gap-2">
                {getRankIcon(user.rank)}
                <Avatar className="w-6 h-6">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-xs">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
              </div>
              <div className="text-sm font-semibold text-gray-700">
                {getDisplayValue(user, activeTab)}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="weekly" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Monthly
            </TabsTrigger>
            <TabsTrigger value="alltime" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              All Time
            </TabsTrigger>
            <TabsTrigger value="streak" className="text-xs">
              <Flame className="w-3 h-3 mr-1" />
              Streak
            </TabsTrigger>
            <TabsTrigger value="accuracy" className="text-xs">
              <Target className="w-3 h-3 mr-1" />
              Accuracy
            </TabsTrigger>
          </TabsList>

          {['weekly', 'monthly', 'alltime', 'streak', 'accuracy'].map(tab => (
            <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : (
                leaderboardData[tab]?.leaderboard?.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-3 rounded-lg border ${getRankBg(user.rank)} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center gap-3">
                      {getRankIcon(user.rank)}
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>
                          {user.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Lv.{user.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>{user.totalQuestions} questions</span>
                        <span>{user.accuracy}% accuracy</span>
                        <span>{user.streak} day streak</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">
                        {getDisplayValue(user, tab)}
                      </div>
                      {tab !== 'alltime' && (
                        <div className="text-xs text-gray-500">
                          {user.xp.toLocaleString()} total XP
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}

              {/* User's rank if not in top 10 */}
              {leaderboardData[tab]?.userRank && leaderboardData[tab]?.userRank > 10 && (
                <div className="border-t pt-3 mt-4">
                  <div className="text-center text-sm text-gray-500 mb-2">
                    Your Rank: #{leaderboardData[tab].userRank}
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
