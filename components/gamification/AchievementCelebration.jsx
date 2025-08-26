import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Target, 
  Calendar,
  Award,
  Sparkles,
  X,
  Share2
} from 'lucide-react';

const AchievementCelebration = ({ 
  achievement, 
  isVisible, 
  onClose, 
  onShare 
}) => {
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    if (isVisible && achievement) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: getRandomColor(),
        size: Math.random() * 8 + 4
      }));
      setConfettiPieces(pieces);

      // Auto-close after 8 seconds if not manually closed
      const timer = setTimeout(() => {
        onClose();
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, achievement, onClose]);

  const getRandomColor = () => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getAchievementIcon = (type) => {
    const iconProps = { className: "w-16 h-16 mx-auto mb-4" };
    
    switch (type) {
      case 'level_up':
        return <Crown {...iconProps} className="w-16 h-16 mx-auto mb-4 text-yellow-500" />;
      case 'streak':
        return <Zap {...iconProps} className="w-16 h-16 mx-auto mb-4 text-orange-500" />;
      case 'accuracy':
        return <Target {...iconProps} className="w-16 h-16 mx-auto mb-4 text-green-500" />;
      case 'questions':
        return <Trophy {...iconProps} className="w-16 h-16 mx-auto mb-4 text-blue-500" />;
      case 'badge':
        return <Award {...iconProps} className="w-16 h-16 mx-auto mb-4 text-purple-500" />;
      case 'milestone':
        return <Star {...iconProps} className="w-16 h-16 mx-auto mb-4 text-pink-500" />;
      default:
        return <Sparkles {...iconProps} className="w-16 h-16 mx-auto mb-4 text-indigo-500" />;
    }
  };

  const getAchievementColor = (type) => {
    switch (type) {
      case 'level_up': return 'from-yellow-400 to-orange-500';
      case 'streak': return 'from-orange-400 to-red-500';
      case 'accuracy': return 'from-green-400 to-teal-500';
      case 'questions': return 'from-blue-400 to-indigo-500';
      case 'badge': return 'from-purple-400 to-pink-500';
      case 'milestone': return 'from-pink-400 to-rose-500';
      default: return 'from-indigo-400 to-purple-500';
    }
  };

  const shareAchievement = async (platform) => {
    const shareData = {
      title: achievement.title,
      text: `🎉 I just achieved "${achievement.title}" on Interview Nerd! ${achievement.description}`,
      url: window.location.origin
    };

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
      window.open(twitterUrl, '_blank');
    } else if (platform === 'linkedin') {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
      window.open(linkedinUrl, '_blank');
    }

    if (onShare) {
      onShare(achievement, platform);
    }
    setShowShareOptions(false);
  };

  if (!isVisible || !achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ 
                x: piece.x, 
                y: piece.y, 
                rotate: piece.rotation,
                opacity: 1 
              }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: piece.rotation + 720,
                opacity: 0
              }}
              transition={{ 
                duration: 3,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              className="absolute"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: '2px'
              }}
            />
          ))}
        </div>

        {/* Achievement Card */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ 
            type: "spring", 
            damping: 15, 
            stiffness: 300,
            delay: 0.2 
          }}
          className="relative max-w-md w-full"
        >
          <Card className="overflow-hidden border-0 shadow-2xl">
            {/* Header with gradient background */}
            <div className={`bg-gradient-to-r ${getAchievementColor(achievement.type)} p-6 text-white text-center relative`}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-2 right-2 text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {getAchievementIcon(achievement.type)}
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-2xl font-bold mb-2"
              >
                🎉 Achievement Unlocked!
              </motion.h2>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl font-semibold"
              >
                {achievement.title}
              </motion.h3>
            </div>

            <CardContent className="p-6 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-gray-700 mb-4 text-lg"
              >
                {achievement.description}
              </motion.p>

              {/* Achievement Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="space-y-3 mb-6"
              >
                {achievement.xpEarned && (
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold text-yellow-700">
                      +{achievement.xpEarned} XP Earned!
                    </span>
                  </div>
                )}

                {achievement.badge && (
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <Badge variant="outline" className="border-purple-300 text-purple-800">
                      {achievement.badge.name}
                    </Badge>
                  </div>
                )}

                {achievement.rarity && (
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-pink-600" />
                    <Badge 
                      variant={achievement.rarity === 'legendary' ? 'default' : 'secondary'}
                      className={achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : ''}
                    >
                      {achievement.rarity} Achievement
                    </Badge>
                  </div>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex gap-3 justify-center"
              >
                <Button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Achievement
                </Button>
                
                <Button variant="outline" onClick={onClose}>
                  Continue Learning
                </Button>
              </motion.div>

              {/* Share Options */}
              <AnimatePresence>
                {showShareOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="flex gap-2 justify-center">
                      {navigator.share && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => shareAchievement('native')}
                        >
                          Share
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareAchievement('twitter')}
                        className="text-blue-500 border-blue-300 hover:bg-blue-50"
                      >
                        Twitter
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareAchievement('linkedin')}
                        className="text-blue-700 border-blue-300 hover:bg-blue-50"
                      >
                        LinkedIn
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Achievement Milestone Tracker Component
export const AchievementMilestones = ({ userId, compact = false }) => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchMilestones();
    }
  }, [userId]);

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      // This would fetch from your analytics API
      const response = await fetch(`/api/gamification/analytics/${userId}?timeframe=1y`);
      const data = await response.json();
      
      if (data.success) {
        setMilestones(data.analytics.learning.milestones || []);
      }
    } catch (error) {
      console.error('Error fetching milestones:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingMilestones = [
    { type: 'questions', target: 100, current: 85, title: '100 Questions Answered' },
    { type: 'streak', target: 30, current: 12, title: '30-Day Streak' },
    { type: 'level', target: 10, current: 7, title: 'Reach Level 10' },
    { type: 'accuracy', target: 90, current: 78, title: '90% Accuracy' }
  ];

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-600" />
            Next Milestone
          </h4>
          {upcomingMilestones[0] && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{upcomingMilestones[0].title}</span>
                <span className="text-xs text-gray-600">
                  {upcomingMilestones[0].current}/{upcomingMilestones[0].target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min((upcomingMilestones[0].current / upcomingMilestones[0].target) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          Achievement Milestones
        </h4>
        
        <div className="space-y-4">
          {/* Completed Milestones */}
          {milestones.length > 0 && (
            <div>
              <h5 className="font-medium text-green-900 mb-2">Completed</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
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
          )}

          {/* Upcoming Milestones */}
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Upcoming</h5>
            <div className="space-y-3">
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{milestone.title}</span>
                    <span className="text-sm text-gray-600">
                      {milestone.current}/{milestone.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min((milestone.current / milestone.target) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {milestone.target - milestone.current} more to go!
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCelebration;
