import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import clientPromise from "@/lib/mongodb-adapter";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const client = await clientPromise;
    const db = client.db("interview_nerd");
    const usersCollection = db.collection("users");
    const activitiesCollection = db.collection("activities");

    const { timeframe = '30', type = 'overview' } = req.query;
    const userId = session.user.id;

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeframe));

    // Get user data
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let analyticsData = {};

    if (type === 'overview' || type === 'all') {
      // Performance Overview
      const playgroundActivities = await activitiesCollection.find({
        userId: new ObjectId(userId),
        type: 'playground_completion',
        timestamp: { $gte: startDate, $lte: endDate }
      }).toArray();

      // Calculate performance metrics
      const totalAttempts = playgroundActivities.length;
      const successfulAttempts = playgroundActivities.filter(a => a.data.success).length;
      const successRate = totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

      // Time analysis
      const timeData = playgroundActivities.map(a => a.data.timeSpent).filter(t => t);
      const averageTime = timeData.length > 0 ? timeData.reduce((a, b) => a + b, 0) / timeData.length : 0;
      const minTime = timeData.length > 0 ? Math.min(...timeData) : 0;
      const maxTime = timeData.length > 0 ? Math.max(...timeData) : 0;

      // Language breakdown
      const languageStats = {};
      playgroundActivities.forEach(activity => {
        const lang = activity.data.language;
        if (!languageStats[lang]) {
          languageStats[lang] = { attempts: 0, successes: 0, totalTime: 0 };
        }
        languageStats[lang].attempts++;
        if (activity.data.success) languageStats[lang].successes++;
        if (activity.data.timeSpent) languageStats[lang].totalTime += activity.data.timeSpent;
      });

      // Difficulty progression
      const difficultyStats = {};
      playgroundActivities.forEach(activity => {
        const diff = activity.data.difficulty;
        if (!difficultyStats[diff]) {
          difficultyStats[diff] = { attempts: 0, successes: 0, averageTime: 0 };
        }
        difficultyStats[diff].attempts++;
        if (activity.data.success) difficultyStats[diff].successes++;
      });

      analyticsData.overview = {
        totalAttempts,
        successfulAttempts,
        successRate: Math.round(successRate * 100) / 100,
        averageTime: Math.round(averageTime),
        minTime: Math.round(minTime),
        maxTime: Math.round(maxTime),
        languageStats,
        difficultyStats,
        timeframe: parseInt(timeframe)
      };
    }

    if (type === 'trends' || type === 'all') {
      // Daily performance trends
      const dailyStats = {};
      const activities = await activitiesCollection.find({
        userId: new ObjectId(userId),
        type: 'playground_completion',
        timestamp: { $gte: startDate, $lte: endDate }
      }).sort({ timestamp: 1 }).toArray();

      activities.forEach(activity => {
        const date = activity.timestamp.toISOString().split('T')[0];
        if (!dailyStats[date]) {
          dailyStats[date] = { attempts: 0, successes: 0, totalTime: 0, xpGained: 0 };
        }
        dailyStats[date].attempts++;
        if (activity.data.success) dailyStats[date].successes++;
        if (activity.data.timeSpent) dailyStats[date].totalTime += activity.data.timeSpent;
        if (activity.data.xpGained) dailyStats[date].xpGained += activity.data.xpGained;
      });

      // Fill missing dates with zeros
      const trendData = [];
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const stats = dailyStats[dateStr] || { attempts: 0, successes: 0, totalTime: 0, xpGained: 0 };
        trendData.push({
          date: dateStr,
          ...stats,
          successRate: stats.attempts > 0 ? (stats.successes / stats.attempts) * 100 : 0
        });
      }

      analyticsData.trends = {
        daily: trendData,
        timeframe: parseInt(timeframe)
      };
    }

    if (type === 'skills' || type === 'all') {
      // Skill analysis based on question tags
      const skillStats = {};
      const activities = await activitiesCollection.find({
        userId: new ObjectId(userId),
        type: 'playground_completion',
        timestamp: { $gte: startDate, $lte: endDate }
      }).toArray();

      activities.forEach(activity => {
        const tags = activity.data.tags || [];
        tags.forEach(tag => {
          if (!skillStats[tag]) {
            skillStats[tag] = { attempts: 0, successes: 0, totalTime: 0, lastAttempt: null };
          }
          skillStats[tag].attempts++;
          if (activity.data.success) skillStats[tag].successes++;
          if (activity.data.timeSpent) skillStats[tag].totalTime += activity.data.timeSpent;
          skillStats[tag].lastAttempt = activity.timestamp;
        });
      });

      // Calculate skill levels and recommendations
      const skillAnalysis = Object.entries(skillStats).map(([skill, stats]) => {
        const successRate = stats.attempts > 0 ? (stats.successes / stats.attempts) * 100 : 0;
        const averageTime = stats.attempts > 0 ? stats.totalTime / stats.attempts : 0;
        
        let level = 'Beginner';
        if (successRate >= 80 && stats.attempts >= 5) level = 'Advanced';
        else if (successRate >= 60 && stats.attempts >= 3) level = 'Intermediate';

        let recommendation = 'Keep practicing';
        if (successRate < 50) recommendation = 'Focus on fundamentals';
        else if (successRate >= 80) recommendation = 'Try harder problems';

        return {
          skill,
          level,
          successRate: Math.round(successRate * 100) / 100,
          attempts: stats.attempts,
          successes: stats.successes,
          averageTime: Math.round(averageTime),
          lastAttempt: stats.lastAttempt,
          recommendation
        };
      }).sort((a, b) => b.attempts - a.attempts);

      analyticsData.skills = {
        analysis: skillAnalysis,
        totalSkills: skillAnalysis.length,
        masteredSkills: skillAnalysis.filter(s => s.level === 'Advanced').length,
        timeframe: parseInt(timeframe)
      };
    }

    if (type === 'comparison' || type === 'all') {
      // Compare with other users
      const allUsers = await usersCollection.find({
        'playgroundStats.totalQuestions': { $gt: 0 }
      }).toArray();

      const userStats = user.playgroundStats || {};
      const userSuccessRate = userStats.successRate || 0;
      const userTotalQuestions = userStats.totalQuestions || 0;
      const userAverageTime = userStats.averageTime || 0;

      // Calculate percentiles
      const successRates = allUsers.map(u => u.playgroundStats?.successRate || 0).sort((a, b) => a - b);
      const totalQuestions = allUsers.map(u => u.playgroundStats?.totalQuestions || 0).sort((a, b) => a - b);
      const averageTimes = allUsers.map(u => u.playgroundStats?.averageTime || 0).filter(t => t > 0).sort((a, b) => a - b);

      const getPercentile = (value, array) => {
        const index = array.findIndex(v => v >= value);
        return index === -1 ? 100 : Math.round((index / array.length) * 100);
      };

      analyticsData.comparison = {
        successRatePercentile: getPercentile(userSuccessRate, successRates),
        questionsPercentile: getPercentile(userTotalQuestions, totalQuestions),
        speedPercentile: averageTimes.length > 0 ? 100 - getPercentile(userAverageTime, averageTimes) : 50,
        totalUsers: allUsers.length,
        userRank: allUsers.sort((a, b) => 
          (b.playgroundStats?.totalQuestions || 0) - (a.playgroundStats?.totalQuestions || 0)
        ).findIndex(u => u._id.toString() === userId) + 1
      };
    }

    if (type === 'recommendations' || type === 'all') {
      // AI-powered recommendations
      const recentActivities = await activitiesCollection.find({
        userId: new ObjectId(userId),
        type: 'playground_completion',
        timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }).sort({ timestamp: -1 }).limit(10).toArray();

      const recommendations = [];

      // Analyze recent performance
      const recentSuccessRate = recentActivities.length > 0 ? 
        (recentActivities.filter(a => a.data.success).length / recentActivities.length) * 100 : 0;

      if (recentSuccessRate < 50) {
        recommendations.push({
          type: 'difficulty',
          title: 'Try Easier Problems',
          description: 'Your recent success rate is low. Consider practicing easier problems to build confidence.',
          priority: 'high'
        });
      } else if (recentSuccessRate > 80) {
        recommendations.push({
          type: 'difficulty',
          title: 'Challenge Yourself',
          description: 'You\'re doing great! Try harder problems to continue growing.',
          priority: 'medium'
        });
      }

      // Language recommendations
      const languagePerformance = {};
      recentActivities.forEach(a => {
        const lang = a.data.language;
        if (!languagePerformance[lang]) languagePerformance[lang] = { attempts: 0, successes: 0 };
        languagePerformance[lang].attempts++;
        if (a.data.success) languagePerformance[lang].successes++;
      });

      Object.entries(languagePerformance).forEach(([lang, perf]) => {
        const rate = (perf.successes / perf.attempts) * 100;
        if (rate < 60 && perf.attempts >= 3) {
          recommendations.push({
            type: 'language',
            title: `Improve ${lang} Skills`,
            description: `Your ${lang} success rate is ${Math.round(rate)}%. Consider reviewing fundamentals.`,
            priority: 'medium'
          });
        }
      });

      // Time-based recommendations
      const recentTimes = recentActivities.map(a => a.data.timeSpent).filter(t => t);
      if (recentTimes.length > 0) {
        const avgTime = recentTimes.reduce((a, b) => a + b, 0) / recentTimes.length;
        if (avgTime > 600) { // 10 minutes
          recommendations.push({
            type: 'efficiency',
            title: 'Work on Speed',
            description: 'Your average solving time is high. Practice more to improve efficiency.',
            priority: 'low'
          });
        }
      }

      analyticsData.recommendations = recommendations;
    }

    res.status(200).json({
      success: true,
      analytics: analyticsData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analytics data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
