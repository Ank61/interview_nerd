import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import XPProgressBar from './XPProgressBar';
import StreakCounter from './StreakCounter';
import BadgeDisplay from './BadgeDisplay';
import ChallengeCard from './ChallengeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Target, Award, Users } from 'lucide-react';

const GamificationDashboard = ({ compact = false }) => {
  const { data: session } = useSession();
  const [gamificationData, setGamificationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchGamificationData();
    }
  }, [session]);

  const fetchGamificationData = async () => {
    try {
      const response = await fetch(`/api/gamification/${session.user.id}`);
      const data = await response.json();
      setGamificationData(data);
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-24 bg-gray-200 rounded-xl"></div>
        <div className="h-24 bg-gray-200 rounded-xl"></div>
        <div className="h-32 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!gamificationData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load gamification data</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <XPProgressBar
            currentXP={gamificationData.xp}
            level={gamificationData.level}
            nextLevelXP={gamificationData.nextLevelXP}
            currentLevelXP={gamificationData.currentLevelXP}
            progressToNextLevel={gamificationData.progressToNextLevel}
          />
          <StreakCounter
            currentStreak={gamificationData.streaks.current}
            longestStreak={gamificationData.streaks.longest}
            freezeTokens={gamificationData.streaks.freezeTokens}
            lastActivity={gamificationData.streaks.lastActivity}
          />
        </div>
        
        <ChallengeCard
          challenge={gamificationData.challenges.daily.current}
          timeRemaining={calculateTimeRemaining(gamificationData.challenges.daily.current?.expiresAt)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total XP</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {gamificationData.xp?.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {gamificationData.stats?.accuracy ? Math.round(gamificationData.stats.accuracy) : 0}%
                  </p>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Badges</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {gamificationData.badges?.length}
                  </p>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rank</p>
                  <p className="text-2xl font-bold text-gray-900">
                    #{gamificationData.leaderboards?.weeklyRank || 'Unranked'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <XPProgressBar
            currentXP={gamificationData.xp}
            level={gamificationData.level}
            nextLevelXP={gamificationData.nextLevelXP}
            currentLevelXP={gamificationData.currentLevelXP}
            progressToNextLevel={gamificationData.progressToNextLevel}
          />

          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="topics">Topics</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {gamificationData.stats?.totalQuestionsAnswered || 0}
                      </p>
                      <p className="text-sm text-gray-600">Questions Answered</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {gamificationData.stats?.correctAnswers || 0}
                      </p>
                      <p className="text-sm text-gray-600">Correct Answers</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="topics" className="space-y-4">
                  {gamificationData.stats?.topicMastery?.length > 0 ? (
                    gamificationData.stats.topicMastery.map((topic, index) => (
                      <div key={topic.topic} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{topic.topic}</span>
                          <span className="text-sm text-gray-600">
                            {topic.masteryLevel ? Math.round(topic.masteryLevel) : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${topic.masteryLevel || 0}%` }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Start answering questions to see topic mastery progress
                    </p>
                  )}
                </TabsContent>
                
                <TabsContent value="history">
                  <p className="text-gray-500 text-center py-4">
                    Study history coming soon...
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <StreakCounter
            currentStreak={gamificationData.streaks?.current}
            longestStreak={gamificationData.streaks?.longest}
            freezeTokens={gamificationData.streaks?.freezeTokens}
            lastActivity={gamificationData.streaks?.lastActivity}
          />

          <Card>
            <CardHeader>
              <CardTitle>Daily Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <ChallengeCard
                challenge={gamificationData.challenges?.daily?.current}
                timeRemaining={calculateTimeRemaining(gamificationData.challenges?.daily.current?.expiresAt)}
                onStart={() => {
                  // Navigate to appropriate challenge page
                  console.log('Starting challenge...');
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <BadgeDisplay badges={gamificationData.badges} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate time remaining
const calculateTimeRemaining = (expiresAt) => {
  if (!expiresAt) return null;
  
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry - now;
  
  return Math.max(0, Math.floor(diff / 1000)); // Return seconds
};

export default GamificationDashboard;
