import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import { nodeMCQs, reactMCQs, jsMCQs, tsMCQs, sqlMCQs, oopMCQs, mongodbMCQs } from "@/data/mcqDatasets";

// XP Values for different actions
export const XP_VALUES = {
  FIRST_ATTEMPT_CORRECT: 10,
  SECOND_ATTEMPT_CORRECT: 5,
  THIRD_ATTEMPT_CORRECT: 3,
  DAILY_CHALLENGE_COMPLETE: 15,
  WEEK_STREAK: 25,
  TOPIC_COMPLETE: 50,
  PERFECT_MOCK_INTERVIEW: 100,
  ARTICLE_READ: 5,
  FIRST_QUESTION: 20,
};

// Level thresholds
export const LEVEL_THRESHOLDS = {
  1: 0,     // Beginner
  2: 100,   // Novice
  3: 300,   // Learner
  4: 600,   // Practitioner
  5: 1000,  // Skilled
  6: 1500,  // Expert
  7: 2200,  // Master
  8: 3000,  // Guru
  9: 4000,  // Legend
  10: 5500, // Interview Ninja
};

// Badge definitions
export const BADGE_DEFINITIONS = {
  // Learning Badges
  FIRST_STEPS: {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first question',
    category: 'learning',
    rarity: 'common',
    icon: '🎯',
    condition: (user, activity) => {
      return user.gamification.stats.totalQuestionsAnswered >= 1;
    }
  },
  PERFECT_SCORE: {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Get 10 questions right in a row',
    category: 'learning',
    rarity: 'rare',
    icon: '💯',
    condition: (user, activity) => {
      // Check for 10 consecutive correct answers
      return activity.type === 'question_answered' && activity.consecutiveCorrect >= 10;
    }
  },
  JAVASCRIPT_NINJA: {
    id: 'javascript_ninja',
    name: 'JavaScript Ninja',
    description: 'Master all JavaScript questions',
    category: 'learning',
    rarity: 'epic',
    icon: '🥷',
    condition: (user, activity) => {
      const jsMastery = user.gamification.stats.topicMastery.find(t => t.topic === 'Javascript');
      return jsMastery && jsMastery.masteryLevel >= 90;
    }
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Answer 5 questions under 30 seconds each',
    category: 'learning',
    rarity: 'rare',
    icon: '⚡',
    condition: (user, activity) => {
      return activity.type === 'speed_achievement' && activity.fastAnswers >= 5;
    }
  },
  ACCURACY_EXPERT: {
    id: 'accuracy_expert',
    name: 'Accuracy Expert',
    description: 'Maintain 90%+ accuracy over 50 questions',
    category: 'learning',
    rarity: 'epic',
    icon: '🎯',
    condition: (user, activity) => {
      return user.gamification.stats.totalQuestionsAnswered >= 50 &&
        user.gamification.stats.accuracy >= 90;
    }
  },

  // Streak Badges
  GETTING_STARTED: {
    id: 'getting_started',
    name: 'Getting Started',
    description: 'Maintain a 3-day streak',
    category: 'streak',
    rarity: 'common',
    icon: '🔥',
    condition: (user, activity) => {
      return user.gamification.streaks.current >= 3;
    }
  },
  CONSISTENT_LEARNER: {
    id: 'consistent_learner',
    name: 'Consistent Learner',
    description: 'Maintain a 7-day streak',
    category: 'streak',
    rarity: 'rare',
    icon: '🌟',
    condition: (user, activity) => {
      return user.gamification.streaks.current >= 7;
    }
  },
  DEDICATED_STUDENT: {
    id: 'dedicated_student',
    name: 'Dedicated Student',
    description: 'Maintain a 14-day streak',
    category: 'streak',
    rarity: 'epic',
    icon: '💎',
    condition: (user, activity) => {
      return user.gamification.streaks.current >= 14;
    }
  },
  STUDY_CHAMPION: {
    id: 'study_champion',
    name: 'Study Champion',
    description: 'Maintain a 30-day streak',
    category: 'streak',
    rarity: 'legendary',
    icon: '👑',
    condition: (user, activity) => {
      return user.gamification.streaks.current >= 30;
    }
  },

  // Challenge Badges
  WEEKEND_WARRIOR: {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    description: 'Complete weekend challenges',
    category: 'challenge',
    rarity: 'rare',
    icon: '🚀',
    condition: (user, activity) => {
      return activity.type === 'weekend_challenge_complete';
    }
  },
  NIGHT_OWL: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Study sessions after 10 PM',
    category: 'challenge',
    rarity: 'common',
    icon: '🌙',
    condition: (user, activity) => {
      return activity.type === 'late_study_session';
    }
  },
  EARLY_BIRD: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Study sessions before 7 AM',
    category: 'challenge',
    rarity: 'common',
    icon: '🌅',
    condition: (user, activity) => {
      return activity.type === 'early_study_session';
    }
  },
};

// Daily Challenge Types
export const DAILY_CHALLENGES = {
  ACCURACY_DAY: {
    id: 'accuracy_day',
    type: 'accuracy',
    name: 'Accuracy Day',
    description: 'Answer 10 questions with 100% accuracy',
    target: 10,
    xpReward: 50,
  },
  SPEED_ROUND: {
    id: 'speed_round',
    type: 'speed',
    name: 'Speed Round',
    description: 'Complete 15 questions in under 10 minutes',
    target: 15,
    xpReward: 40,
  },
  TOPIC_FOCUS: {
    id: 'topic_focus',
    type: 'topic',
    name: 'Topic Focus',
    description: 'Master 5 questions from a specific topic',
    target: 5,
    xpReward: 30,
  },
  REVIEW_DAY: {
    id: 'review_day',
    type: 'review',
    name: 'Review Day',
    description: 'Revisit 10 previously incorrect answers',
    target: 10,
    xpReward: 35,
  },
};

class GamificationEngine {
  // Calculate level from XP
  static calculateLevel(xp) {
    const levels = Object.entries(LEVEL_THRESHOLDS).reverse();
    for (const [level, threshold] of levels) {
      if (xp >= threshold) {
        return parseInt(level);
      }
    }
    return 1;
  }

  // Get XP needed for next level
  static getXPForNextLevel(currentXP) {
    const currentLevel = this.calculateLevel(currentXP);
    const nextLevel = currentLevel + 1;
    return LEVEL_THRESHOLDS[nextLevel] || null;
  }

  // Award XP and handle level ups
  static async awardXP(userId, points, reason) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      const oldLevel = this.calculateLevel(user.gamification.xp);
      user.gamification.xp += points;
      const newLevel = this.calculateLevel(user.gamification.xp);

      // Update level if leveled up
      if (newLevel > oldLevel) {
        user.gamification.level = newLevel;
        await this.handleLevelUp(userId, newLevel);
      }

      // Update weekly/monthly XP for leaderboards
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Reset weekly XP if it's a new week
      if (user.gamification.leaderboards.lastWeeklyReset < startOfWeek) {
        user.gamification.leaderboards.weeklyXP = points;
        user.gamification.leaderboards.lastWeeklyReset = startOfWeek;
      } else {
        user.gamification.leaderboards.weeklyXP += points;
      }

      // Reset monthly XP if it's a new month
      if (user.gamification.leaderboards.lastMonthlyReset < startOfMonth) {
        user.gamification.leaderboards.monthlyXP = points;
        user.gamification.leaderboards.lastMonthlyReset = startOfMonth;
      } else {
        user.gamification.leaderboards.monthlyXP += points;
      }

      await user.save();

      return {
        xp: user.gamification.xp,
        level: user.gamification.level,
        levelUp: newLevel > oldLevel,
        pointsAwarded: points,
        reason
      };
    } catch (error) {
      console.error('Error awarding XP:', error);
      throw error;
    }
  }

  // Handle level up rewards
  static async handleLevelUp(userId, newLevel) {
    try {
      const user = await User.findById(userId);

      // Award level up badge
      const levelBadge = {
        id: `level_${newLevel}`,
        name: `Level ${newLevel}`,
        description: `Reached level ${newLevel}`,
        category: 'milestone',
        rarity: newLevel >= 8 ? 'legendary' : newLevel >= 5 ? 'epic' : 'rare',
        icon: '⭐',
      };

      await this.awardBadge(userId, levelBadge);

      // Level-specific rewards
      const rewards = {
        3: { freezeTokens: 1, message: 'Unlocked advanced questions!' },
        5: { freezeTokens: 2, message: 'Unlocked system design questions!' },
        7: { freezeTokens: 3, message: 'Unlocked company-specific questions!' },
        10: { freezeTokens: 5, message: 'You are now an Interview Ninja! 🥷' },
      };

      if (rewards[newLevel]) {
        user.gamification.streaks.freezeTokens += rewards[newLevel].freezeTokens;
        await user.save();
      }

      return rewards[newLevel] || null;
    } catch (error) {
      console.error('Error handling level up:', error);
      throw error;
    }
  }

  // Check and award badges
  static async checkBadges(userId, activity) {
    try {
      const user = await User.findById(userId);
      const newBadges = [];

      for (const [key, badge] of Object.entries(BADGE_DEFINITIONS)) {
        // Check if user already has this badge
        const hasBadge = user.gamification.badges.some(b => b.id === badge.id);

        if (!hasBadge && badge.condition(user, activity)) {
          await this.awardBadge(userId, badge);
          newBadges.push(badge);
        }
      }

      return newBadges;
    } catch (error) {
      console.error('Error checking badges:', error);
      throw error;
    }
  }

  // Award a badge
  static async awardBadge(userId, badge) {
    try {
      const user = await User.findById(userId);

      user.gamification.badges.push({
        id: badge.id,
        name: badge.name,
        description: badge.description,
        category: badge.category,
        rarity: badge.rarity,
        icon: badge.icon,
        earnedAt: new Date(),
      });

      await user.save();
      return badge;
    } catch (error) {
      console.error('Error awarding badge:', error);
      throw error;
    }
  }

  // Update streak
  static async updateStreak(userId) {
    try {
      const user = await User.findById(userId);
      const today = new Date().toDateString();
      const lastActivity = user.gamification.streaks.lastActivity?.toDateString();

      // If already counted today, return current streak
      if (lastActivity === today) {
        return user.gamification.streaks;
      }

      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (lastActivity === yesterday) {
        // Continue streak
        user.gamification.streaks.current += 1;
      } else if (lastActivity !== today) {
        // Reset streak if more than a day has passed
        user.gamification.streaks.current = 1;
      }

      // Update longest streak
      user.gamification.streaks.longest = Math.max(
        user.gamification.streaks.longest,
        user.gamification.streaks.current
      );

      user.gamification.streaks.lastActivity = new Date();
      await user.save();

      // Check for streak badges
      await this.checkBadges(userId, {
        type: 'streak_updated',
        streak: user.gamification.streaks.current
      });

      // Award XP for streak milestones
      if (user.gamification.streaks.current % 7 === 0) {
        await this.awardXP(userId, XP_VALUES.WEEK_STREAK, 'Weekly streak milestone');
      }

      return user.gamification.streaks;
    } catch (error) {
      console.error('Error updating streak:', error);
      throw error;
    }
  }

  // Process question answer
  static async processQuestionAnswer(userId, questionData) {
    try {
      const user = await User.findById(userId);
      const { isCorrect, attempts, timeSpent, topic } = questionData;

      // Update stats
      user.gamification.stats.totalQuestionsAnswered += 1;
      if (isCorrect) {
        user.gamification.stats.correctAnswers += 1;
      }

      // Recalculate accuracy
      user.gamification.stats.accuracy =
        (user.gamification.stats.correctAnswers / user.gamification.stats.totalQuestionsAnswered) * 100;

      // Update topic mastery
      let topicMastery = user.gamification.stats.topicMastery.find(t => t.topic === topic);
      if (!topicMastery) {
        topicMastery = { topic, masteryLevel: 0, questionsCompleted: 0, accuracy: 0 };
        user.gamification.stats.topicMastery.push(topicMastery);
      }

      topicMastery.questionsCompleted += 1;
      if (isCorrect) {
        topicMastery.accuracy = ((topicMastery.accuracy * (topicMastery.questionsCompleted - 1)) + 100) / topicMastery.questionsCompleted;
      } else {
        topicMastery.accuracy = (topicMastery.accuracy * (topicMastery.questionsCompleted - 1)) / topicMastery.questionsCompleted;
      }

      // Award XP based on attempts
      let xpAwarded = 0;
      if (isCorrect) {
        if (attempts === 1) {
          xpAwarded = XP_VALUES.FIRST_ATTEMPT_CORRECT;
        } else if (attempts === 2) {
          xpAwarded = XP_VALUES.SECOND_ATTEMPT_CORRECT;
        } else {
          xpAwarded = XP_VALUES.THIRD_ATTEMPT_CORRECT;
        }
      }

      await user.save();

      // Award XP and update streak
      let xpResult = null;
      if (xpAwarded > 0) {
        xpResult = await this.awardXP(userId, xpAwarded, `Correct answer (${attempts} attempts)`);
      }

      const streakResult = await this.updateStreak(userId);

      // Check for badges
      const activity = {
        type: 'question_answered',
        isCorrect,
        attempts,
        timeSpent,
        topic,
        totalAnswered: user.gamification.stats.totalQuestionsAnswered,
        accuracy: user.gamification.stats.accuracy,
      };

      const newBadges = await this.checkBadges(userId, activity);

      return {
        xp: xpResult,
        streak: streakResult,
        badges: newBadges,
        stats: user.gamification.stats,
      };
    } catch (error) {
      console.error('Error processing question answer:', error);
      throw error;
    }
  }

  // Generate daily challenge
  static generateDailyChallenge() {
    // Combine all specified MCQ datasets
    const allMCQs = [
      ...nodeMCQs,
      ...reactMCQs,
      ...jsMCQs,
      ...tsMCQs,
      ...sqlMCQs,
      ...oopMCQs,
      ...mongodbMCQs
    ];

    // Get 5 random questions from the combined dataset
    const getRandomQuestions = (count) => {
      const shuffled = [...allMCQs].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(count, shuffled.length));
    };

    const challengeQuestions = getRandomQuestions(5);

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return {
      type: 'mcq_challenge',
      title: 'Daily MCQ Challenge',
      description: 'Test your knowledge with these 5 random questions',
      questions: challengeQuestions,
      xpReward: 50,
      expiresAt: tomorrow,
      completed: false,
      progress: 0,
      total: challengeQuestions.length
    };
  }

  // Update daily challenge progress
  static async updateChallengeProgress(userId, challengeType, progress = 1) {
    try {
      const user = await User.findById(userId);
      const challenge = user.gamification.challenges.daily.current;

      if (!challenge || challenge.type !== challengeType || challenge.completed) {
        return null;
      }

      challenge.progress += progress;

      if (challenge.progress >= challenge.total) {
        challenge.completed = true;
        user.gamification.challenges.daily.completedToday = true;
        user.gamification.challenges.daily.streak += 1;

        // Award XP for challenge completion
        await this.awardXP(userId, challenge.xpReward, 'Daily challenge completed');

        // Check for challenge badges
        await this.checkBadges(userId, { type: 'daily_challenge_complete' });
      }

      await user.save();
      return challenge;
    } catch (error) {
      console.error('Error updating challenge progress:', error);
      throw error;
    }
  }

  // Get user's gamification data
  static async getUserGamificationData(userId) {
    try {
      await dbConnect();
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      const currentLevel = user.gamification.level || 1;
      const currentXP = user.gamification.xp || 0;
      const nextLevelXP = this.getXPForNextLevel(currentXP);
      const currentLevelXP = LEVEL_THRESHOLDS[currentLevel] || 0;

      // Ensure stats have default values
      const stats = {
        totalQuestionsAnswered: user.gamification.stats?.totalQuestionsAnswered || 0,
        correctAnswers: user.gamification.stats?.correctAnswers || 0,
        accuracy: user.gamification.stats?.accuracy || 0,
        totalStudyTime: user.gamification.stats?.totalStudyTime || 0,
        topicMastery: user.gamification.stats?.topicMastery || [],
        averageTimePerQuestion: user.gamification.stats?.averageTimePerQuestion || 0,
        fastestAnswer: user.gamification.stats?.fastestAnswer || 0,
        longestStreak: user.gamification.stats?.longestStreak || 0,
      };

      // Ensure streaks have default values
      const streaks = {
        current: user.gamification.streaks?.current || 0,
        longest: user.gamification.streaks?.longest || 0,
        lastActivity: user.gamification.streaks?.lastActivity || null,
        freezeTokens: user.gamification.streaks?.freezeTokens || 0,
      };

      // Ensure leaderboards have default values
      const leaderboards = {
        weeklyRank: user.gamification.leaderboards?.weeklyRank || null,
        monthlyRank: user.gamification.leaderboards?.monthlyRank || null,
        allTimeRank: user.gamification.leaderboards?.allTimeRank || null,
        weeklyXP: user.gamification.leaderboards?.weeklyXP || 0,
        monthlyXP: user.gamification.leaderboards?.monthlyXP || 0,
      };

      return {
        xp: currentXP,
        level: currentLevel,
        nextLevelXP,
        currentLevelXP,
        progressToNextLevel: nextLevelXP ? ((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100,
        streaks,
        badges: user.gamification.badges || [],
        stats,
        challenges: user.gamification.challenges || { daily: { current: null, completedToday: false, streak: 0 } },
        leaderboards,
      };
    } catch (error) {
      console.error('Error getting user gamification data:', error);
      throw error;
    }
  }
}

export default GamificationEngine;
