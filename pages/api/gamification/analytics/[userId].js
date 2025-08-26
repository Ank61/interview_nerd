import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import InterviewQuestion from "../../../../models/InterviewQuestion";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { userId } = req.query;
  
  // Authorization check
  if (session.user.id !== userId && session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'GET') {
    try {
      await connectDB();
      
      const { timeframe = '30d' } = req.query;
      const analytics = await generateAdvancedAnalytics(userId, timeframe);
      
      res.status(200).json({
        success: true,
        analytics
      });
    } catch (error) {
      console.error('Error generating analytics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function generateAdvancedAnalytics(userId, timeframe) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const timeframeDays = getTimeframeDays(timeframe);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframeDays);

  const analytics = {
    overview: await generateOverviewAnalytics(user, startDate),
    performance: await generatePerformanceAnalytics(user, startDate),
    learning: await generateLearningAnalytics(user, startDate),
    engagement: await generateEngagementAnalytics(user, startDate),
    predictions: await generatePredictiveAnalytics(user),
    comparisons: await generateComparisonAnalytics(user, startDate)
  };

  return analytics;
}

function getTimeframeDays(timeframe) {
  const timeframes = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
    '1y': 365
  };
  return timeframes[timeframe] || 30;
}

async function generateOverviewAnalytics(user, startDate) {
  const gamificationData = user.gamificationData || {};
  const recentActivity = gamificationData.recentActivity || [];
  
  // Filter recent activity by timeframe
  const filteredActivity = recentActivity.filter(
    activity => new Date(activity.timestamp) >= startDate
  );

  const totalSessions = filteredActivity.length;
  const totalTimeSpent = filteredActivity.reduce((sum, activity) => 
    sum + (activity.timeSpent || 0), 0
  );
  
  const questionsAnswered = filteredActivity.filter(
    activity => activity.type === 'question_answered'
  ).length;

  const averageSessionTime = totalSessions > 0 ? totalTimeSpent / totalSessions : 0;
  const dailyAverage = questionsAnswered / Math.max(1, 
    Math.ceil((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  return {
    totalSessions,
    totalTimeSpent: Math.round(totalTimeSpent),
    questionsAnswered,
    averageSessionTime: Math.round(averageSessionTime),
    dailyAverage: Math.round(dailyAverage * 10) / 10,
    currentLevel: gamificationData.level || 1,
    totalXP: gamificationData.xp || 0,
    currentStreak: gamificationData.streaks?.current || 0
  };
}

async function generatePerformanceAnalytics(user, startDate) {
  const gamificationData = user.gamificationData || {};
  const stats = gamificationData.stats || {};
  const topicMastery = stats.topicMastery || {};
  
  // Calculate performance trends
  const recentActivity = gamificationData.recentActivity || [];
  const filteredActivity = recentActivity.filter(
    activity => new Date(activity.timestamp) >= startDate && 
    activity.type === 'question_answered'
  );

  // Group by day for trend analysis
  const dailyPerformance = {};
  filteredActivity.forEach(activity => {
    const date = new Date(activity.timestamp).toDateString();
    if (!dailyPerformance[date]) {
      dailyPerformance[date] = { correct: 0, total: 0 };
    }
    dailyPerformance[date].total++;
    if (activity.correct) {
      dailyPerformance[date].correct++;
    }
  });

  const performanceTrend = Object.entries(dailyPerformance)
    .map(([date, data]) => ({
      date,
      accuracy: data.total > 0 ? data.correct / data.total : 0,
      questionsAnswered: data.total
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Topic-wise performance
  const topicPerformance = Object.entries(topicMastery).map(([topic, data]) => ({
    topic,
    accuracy: data.accuracy || 0,
    questionsAnswered: data.questionsAnswered || 0,
    averageTime: data.averageTime || 0,
    improvement: calculateImprovement(data.recentScores || [])
  }));

  // Difficulty analysis
  const difficultyStats = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  };

  filteredActivity.forEach(activity => {
    const difficulty = activity.difficulty || 'medium';
    if (difficultyStats[difficulty]) {
      difficultyStats[difficulty].total++;
      if (activity.correct) {
        difficultyStats[difficulty].correct++;
      }
    }
  });

  const difficultyPerformance = Object.entries(difficultyStats).map(([difficulty, data]) => ({
    difficulty,
    accuracy: data.total > 0 ? data.correct / data.total : 0,
    questionsAnswered: data.total
  }));

  return {
    overallAccuracy: stats.accuracy || 0,
    performanceTrend,
    topicPerformance: topicPerformance.sort((a, b) => b.accuracy - a.accuracy),
    difficultyPerformance,
    strongestTopics: topicPerformance
      .filter(t => t.questionsAnswered >= 5)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 3),
    weakestTopics: topicPerformance
      .filter(t => t.questionsAnswered >= 5)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3)
  };
}

async function generateLearningAnalytics(user, startDate) {
  const gamificationData = user.gamificationData || {};
  const recentActivity = gamificationData.recentActivity || [];
  
  const filteredActivity = recentActivity.filter(
    activity => new Date(activity.timestamp) >= startDate
  );

  // Learning velocity (XP gained over time)
  const dailyXP = {};
  filteredActivity.forEach(activity => {
    if (activity.xpGained) {
      const date = new Date(activity.timestamp).toDateString();
      dailyXP[date] = (dailyXP[date] || 0) + activity.xpGained;
    }
  });

  const xpTrend = Object.entries(dailyXP)
    .map(([date, xp]) => ({ date, xp }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Study patterns
  const studyPatterns = analyzeStudyPatterns(filteredActivity);
  
  // Learning milestones
  const milestones = calculateLearningMilestones(user, filteredActivity);
  
  // Knowledge retention (based on spaced repetition data)
  const retentionAnalysis = analyzeKnowledgeRetention(user);

  return {
    xpTrend,
    studyPatterns,
    milestones,
    retentionAnalysis,
    learningVelocity: calculateLearningVelocity(xpTrend),
    consistencyScore: calculateConsistencyScore(filteredActivity)
  };
}

async function generateEngagementAnalytics(user, startDate) {
  const gamificationData = user.gamificationData || {};
  const recentActivity = gamificationData.recentActivity || [];
  
  const filteredActivity = recentActivity.filter(
    activity => new Date(activity.timestamp) >= startDate
  );

  // Session analysis
  const sessions = groupActivitiesIntoSessions(filteredActivity);
  const averageSessionLength = sessions.length > 0 
    ? sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length 
    : 0;

  // Engagement patterns
  const hourlyActivity = Array(24).fill(0);
  const dailyActivity = {};
  
  filteredActivity.forEach(activity => {
    const hour = new Date(activity.timestamp).getHours();
    const day = new Date(activity.timestamp).getDay();
    hourlyActivity[hour]++;
    dailyActivity[day] = (dailyActivity[day] || 0) + 1;
  });

  const peakHours = hourlyActivity
    .map((count, hour) => ({ hour, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  // Streak analysis
  const streakData = gamificationData.streaks || {};
  const streakHistory = calculateStreakHistory(recentActivity, startDate);

  return {
    totalSessions: sessions.length,
    averageSessionLength: Math.round(averageSessionLength),
    longestSession: Math.max(...sessions.map(s => s.duration), 0),
    peakHours,
    dailyActivity,
    streakData: {
      current: streakData.current || 0,
      longest: streakData.longest || 0,
      history: streakHistory
    },
    engagementScore: calculateEngagementScore(sessions, streakData)
  };
}

async function generatePredictiveAnalytics(user) {
  const gamificationData = user.gamificationData || {};
  const stats = gamificationData.stats || {};
  const recentActivity = gamificationData.recentActivity || [];
  
  // Predict next level achievement
  const currentXP = gamificationData.xp || 0;
  const currentLevel = gamificationData.level || 1;
  const xpForNextLevel = currentLevel * 100;
  const xpNeeded = xpForNextLevel - (currentXP % xpForNextLevel);
  
  // Calculate average XP per day from recent activity
  const recentXPGains = recentActivity
    .filter(activity => activity.xpGained && activity.timestamp > Date.now() - (7 * 24 * 60 * 60 * 1000))
    .map(activity => activity.xpGained);
  
  const avgXPPerDay = recentXPGains.length > 0 
    ? recentXPGains.reduce((sum, xp) => sum + xp, 0) / 7 
    : 10;

  const daysToNextLevel = Math.ceil(xpNeeded / Math.max(avgXPPerDay, 1));

  // Predict mastery timeline for weak topics
  const topicMastery = stats.topicMastery || {};
  const masteryPredictions = Object.entries(topicMastery)
    .filter(([_, data]) => data.accuracy < 0.8)
    .map(([topic, data]) => {
      const questionsNeeded = Math.ceil((0.8 - data.accuracy) * 20); // Estimate
      const daysToMastery = Math.ceil(questionsNeeded / Math.max(avgXPPerDay / 10, 1));
      return { topic, questionsNeeded, daysToMastery };
    });

  // Risk analysis
  const riskFactors = analyzeRiskFactors(user);

  return {
    levelProgression: {
      currentLevel,
      nextLevel: currentLevel + 1,
      xpNeeded,
      daysToNextLevel,
      confidence: Math.min(recentXPGains.length / 7, 1) // Confidence based on recent activity
    },
    masteryPredictions: masteryPredictions.sort((a, b) => a.daysToMastery - b.daysToMastery),
    riskFactors,
    recommendations: generatePredictiveRecommendations(user, riskFactors)
  };
}

async function generateComparisonAnalytics(user, startDate) {
  // Get aggregated data for comparison (this would typically come from a separate analytics collection)
  const userStats = user.gamificationData?.stats || {};
  
  // Mock comparison data (in real implementation, this would query aggregated user data)
  const globalAverages = {
    accuracy: 0.72,
    questionsPerDay: 8.5,
    streakLength: 5.2,
    level: 6.8,
    sessionLength: 25.4
  };

  const userMetrics = {
    accuracy: userStats.accuracy || 0,
    questionsPerDay: calculateQuestionsPerDay(user, startDate),
    streakLength: user.gamificationData?.streaks?.current || 0,
    level: user.gamificationData?.level || 1,
    sessionLength: calculateAverageSessionLength(user, startDate)
  };

  const comparisons = Object.entries(userMetrics).map(([metric, value]) => ({
    metric,
    userValue: value,
    globalAverage: globalAverages[metric],
    percentile: calculatePercentile(value, globalAverages[metric]),
    status: value > globalAverages[metric] ? 'above' : value === globalAverages[metric] ? 'average' : 'below'
  }));

  return {
    comparisons,
    overallRanking: calculateOverallRanking(userMetrics, globalAverages),
    improvementAreas: comparisons
      .filter(c => c.status === 'below')
      .sort((a, b) => a.percentile - b.percentile)
  };
}

// Helper functions
function calculateImprovement(recentScores) {
  if (recentScores.length < 2) return 0;
  const recent = recentScores.slice(-5);
  const older = recentScores.slice(-10, -5);
  if (older.length === 0) return 0;
  
  const recentAvg = recent.reduce((sum, score) => sum + score, 0) / recent.length;
  const olderAvg = older.reduce((sum, score) => sum + score, 0) / older.length;
  
  return recentAvg - olderAvg;
}

function analyzeStudyPatterns(activities) {
  const hourCounts = Array(24).fill(0);
  const dayCounts = Array(7).fill(0);
  
  activities.forEach(activity => {
    const date = new Date(activity.timestamp);
    hourCounts[date.getHours()]++;
    dayCounts[date.getDay()]++;
  });

  const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
  const peakDay = dayCounts.indexOf(Math.max(...dayCounts));
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return {
    peakHour,
    peakDay: dayNames[peakDay],
    hourlyDistribution: hourCounts,
    dailyDistribution: dayCounts,
    preferredStudyTime: peakHour < 12 ? 'morning' : peakHour < 18 ? 'afternoon' : 'evening'
  };
}

function calculateLearningMilestones(user, activities) {
  const milestones = [];
  const gamificationData = user.gamificationData || {};
  
  // Level milestones
  const currentLevel = gamificationData.level || 1;
  if (currentLevel >= 5) milestones.push({ type: 'level', value: 5, achieved: true });
  if (currentLevel >= 10) milestones.push({ type: 'level', value: 10, achieved: true });
  if (currentLevel >= 15) milestones.push({ type: 'level', value: 15, achieved: true });
  
  // Streak milestones
  const longestStreak = gamificationData.streaks?.longest || 0;
  if (longestStreak >= 7) milestones.push({ type: 'streak', value: 7, achieved: true });
  if (longestStreak >= 30) milestones.push({ type: 'streak', value: 30, achieved: true });
  
  // Question milestones
  const totalQuestions = gamificationData.stats?.totalQuestions || 0;
  if (totalQuestions >= 100) milestones.push({ type: 'questions', value: 100, achieved: true });
  if (totalQuestions >= 500) milestones.push({ type: 'questions', value: 500, achieved: true });
  
  return milestones;
}

function analyzeKnowledgeRetention(user) {
  const spacedRepetitionData = user.gamificationData?.spacedRepetition?.questions || [];
  
  if (spacedRepetitionData.length === 0) {
    return { retentionRate: 0, totalReviews: 0, masteredQuestions: 0 };
  }

  const totalReviews = spacedRepetitionData.reduce((sum, q) => 
    sum + (q.spacedRepetition?.repetitionCount || 0), 0
  );
  
  const masteredQuestions = spacedRepetitionData.filter(q => 
    (q.spacedRepetition?.repetitionCount || 0) >= 5 && 
    (q.spacedRepetition?.easinessFactor || 0) >= 2.5
  ).length;

  const retentionRate = spacedRepetitionData.length > 0 
    ? masteredQuestions / spacedRepetitionData.length 
    : 0;

  return {
    retentionRate,
    totalReviews,
    masteredQuestions,
    totalTrackedQuestions: spacedRepetitionData.length
  };
}

function calculateLearningVelocity(xpTrend) {
  if (xpTrend.length < 2) return 0;
  
  const recentXP = xpTrend.slice(-7); // Last 7 days
  const totalXP = recentXP.reduce((sum, day) => sum + day.xp, 0);
  
  return totalXP / recentXP.length;
}

function calculateConsistencyScore(activities) {
  if (activities.length === 0) return 0;
  
  const dailyActivity = {};
  activities.forEach(activity => {
    const date = new Date(activity.timestamp).toDateString();
    dailyActivity[date] = (dailyActivity[date] || 0) + 1;
  });

  const activeDays = Object.keys(dailyActivity).length;
  const totalDays = Math.ceil((Date.now() - new Date(activities[0].timestamp)) / (1000 * 60 * 60 * 24));
  
  return Math.min(activeDays / Math.max(totalDays, 1), 1);
}

function groupActivitiesIntoSessions(activities) {
  if (activities.length === 0) return [];
  
  const sessions = [];
  let currentSession = { start: activities[0].timestamp, activities: [activities[0]] };
  
  for (let i = 1; i < activities.length; i++) {
    const timeDiff = new Date(activities[i].timestamp) - new Date(activities[i-1].timestamp);
    
    if (timeDiff <= 30 * 60 * 1000) { // 30 minutes gap
      currentSession.activities.push(activities[i]);
    } else {
      currentSession.end = activities[i-1].timestamp;
      currentSession.duration = (new Date(currentSession.end) - new Date(currentSession.start)) / (1000 * 60);
      sessions.push(currentSession);
      currentSession = { start: activities[i].timestamp, activities: [activities[i]] };
    }
  }
  
  // Add the last session
  currentSession.end = activities[activities.length - 1].timestamp;
  currentSession.duration = (new Date(currentSession.end) - new Date(currentSession.start)) / (1000 * 60);
  sessions.push(currentSession);
  
  return sessions;
}

function calculateStreakHistory(activities, startDate) {
  const dailyActivity = {};
  activities.forEach(activity => {
    const date = new Date(activity.timestamp).toDateString();
    dailyActivity[date] = true;
  });

  const history = [];
  const currentDate = new Date(startDate);
  const endDate = new Date();
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toDateString();
    history.push({
      date: dateStr,
      active: !!dailyActivity[dateStr]
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return history;
}

function calculateEngagementScore(sessions, streakData) {
  const sessionScore = Math.min(sessions.length / 30, 1) * 30; // Max 30 points for sessions
  const streakScore = Math.min((streakData.current || 0) / 30, 1) * 40; // Max 40 points for streak
  const consistencyScore = sessions.length > 0 ? 30 : 0; // 30 points for having any sessions
  
  return Math.round(sessionScore + streakScore + consistencyScore);
}

function analyzeRiskFactors(user) {
  const risks = [];
  const gamificationData = user.gamificationData || {};
  const recentActivity = gamificationData.recentActivity || [];
  
  // Check for declining activity
  const recentDays = recentActivity.filter(a => 
    new Date(a.timestamp) > Date.now() - (7 * 24 * 60 * 60 * 1000)
  ).length;
  
  if (recentDays < 3) {
    risks.push({
      type: 'low_activity',
      severity: 'high',
      description: 'Activity has decreased significantly in the past week'
    });
  }
  
  // Check for broken streak
  const currentStreak = gamificationData.streaks?.current || 0;
  if (currentStreak === 0 && (gamificationData.streaks?.longest || 0) > 7) {
    risks.push({
      type: 'broken_streak',
      severity: 'medium',
      description: 'Long streak was recently broken'
    });
  }
  
  // Check for low accuracy
  const accuracy = gamificationData.stats?.accuracy || 0;
  if (accuracy < 0.5) {
    risks.push({
      type: 'low_accuracy',
      severity: 'high',
      description: 'Overall accuracy is below 50%'
    });
  }
  
  return risks;
}

function generatePredictiveRecommendations(user, riskFactors) {
  const recommendations = [];
  
  riskFactors.forEach(risk => {
    switch (risk.type) {
      case 'low_activity':
        recommendations.push('Set daily reminders to maintain consistent study habits');
        break;
      case 'broken_streak':
        recommendations.push('Focus on rebuilding your study streak with small daily goals');
        break;
      case 'low_accuracy':
        recommendations.push('Review fundamental concepts and practice easier questions first');
        break;
    }
  });
  
  return recommendations;
}

function calculateQuestionsPerDay(user, startDate) {
  const activities = user.gamificationData?.recentActivity || [];
  const questionActivities = activities.filter(a => 
    a.type === 'question_answered' && new Date(a.timestamp) >= startDate
  );
  
  const days = Math.max(1, Math.ceil((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  return questionActivities.length / days;
}

function calculateAverageSessionLength(user, startDate) {
  const activities = user.gamificationData?.recentActivity || [];
  const filteredActivities = activities.filter(a => new Date(a.timestamp) >= startDate);
  const sessions = groupActivitiesIntoSessions(filteredActivities);
  
  return sessions.length > 0 
    ? sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length 
    : 0;
}

function calculatePercentile(userValue, globalAverage) {
  // Simplified percentile calculation
  const ratio = userValue / globalAverage;
  if (ratio >= 1.5) return 90;
  if (ratio >= 1.2) return 75;
  if (ratio >= 1.0) return 50;
  if (ratio >= 0.8) return 25;
  return 10;
}

function calculateOverallRanking(userMetrics, globalAverages) {
  const scores = Object.entries(userMetrics).map(([metric, value]) => {
    const globalAvg = globalAverages[metric];
    return value / globalAvg;
  });
  
  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  if (averageScore >= 1.3) return 'top_10';
  if (averageScore >= 1.1) return 'top_25';
  if (averageScore >= 0.9) return 'average';
  if (averageScore >= 0.7) return 'below_average';
  return 'needs_improvement';
}
