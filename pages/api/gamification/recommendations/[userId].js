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
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const recommendations = await generatePersonalizedRecommendations(user);
      
      res.status(200).json({
        success: true,
        recommendations
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function generatePersonalizedRecommendations(user) {
  const recommendations = {
    weakAreas: [],
    suggestedQuestions: [],
    learningPath: [],
    studyPlan: null,
    motivationalTips: []
  };

  // Analyze user's performance patterns
  const performanceAnalysis = analyzeUserPerformance(user);
  
  // Generate weak area recommendations
  recommendations.weakAreas = await identifyWeakAreas(user, performanceAnalysis);
  
  // Suggest specific questions based on weak areas
  recommendations.suggestedQuestions = await suggestQuestionsForWeakAreas(
    recommendations.weakAreas, 
    user.completedQuestions || []
  );
  
  // Create personalized learning path
  recommendations.learningPath = generateLearningPath(user, performanceAnalysis);
  
  // Generate study plan based on user's activity patterns
  recommendations.studyPlan = generateStudyPlan(user, performanceAnalysis);
  
  // Add motivational tips based on current streak and performance
  recommendations.motivationalTips = generateMotivationalTips(user);

  return recommendations;
}

function analyzeUserPerformance(user) {
  const gamificationData = user.gamificationData || {};
  const stats = gamificationData.stats || {};
  
  return {
    totalQuestions: stats.totalQuestions || 0,
    accuracy: stats.accuracy || 0,
    averageTimePerQuestion: stats.averageTimePerQuestion || 0,
    currentStreak: gamificationData.streaks?.current || 0,
    longestStreak: gamificationData.streaks?.longest || 0,
    level: gamificationData.level || 1,
    xp: gamificationData.xp || 0,
    topicMastery: stats.topicMastery || {},
    recentActivity: gamificationData.recentActivity || [],
    studyPatterns: analyzeStudyPatterns(user)
  };
}

function analyzeStudyPatterns(user) {
  const recentActivity = user.gamificationData?.recentActivity || [];
  const patterns = {
    preferredStudyTime: 'morning', // Default
    averageSessionLength: 30, // minutes
    consistencyScore: 0.5,
    preferredTopics: []
  };

  if (recentActivity.length > 0) {
    // Analyze study time preferences
    const studyHours = recentActivity.map(activity => {
      const hour = new Date(activity.timestamp).getHours();
      return hour;
    });
    
    const hourCounts = studyHours.reduce((acc, hour) => {
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});
    
    const mostActiveHour = Object.keys(hourCounts).reduce((a, b) => 
      hourCounts[a] > hourCounts[b] ? a : b
    );
    
    if (mostActiveHour >= 6 && mostActiveHour < 12) {
      patterns.preferredStudyTime = 'morning';
    } else if (mostActiveHour >= 12 && mostActiveHour < 18) {
      patterns.preferredStudyTime = 'afternoon';
    } else {
      patterns.preferredStudyTime = 'evening';
    }
    
    // Calculate consistency score based on daily activity
    const dailyActivity = {};
    recentActivity.forEach(activity => {
      const date = new Date(activity.timestamp).toDateString();
      dailyActivity[date] = (dailyActivity[date] || 0) + 1;
    });
    
    const activeDays = Object.keys(dailyActivity).length;
    const totalDays = Math.min(30, Math.ceil((Date.now() - new Date(recentActivity[0].timestamp)) / (1000 * 60 * 60 * 24)));
    patterns.consistencyScore = activeDays / Math.max(totalDays, 1);
  }

  return patterns;
}

async function identifyWeakAreas(user, performanceAnalysis) {
  const weakAreas = [];
  const topicMastery = performanceAnalysis.topicMastery;
  
  // Identify topics with low mastery scores
  for (const [topic, mastery] of Object.entries(topicMastery)) {
    if (mastery.accuracy < 0.6 || mastery.questionsAnswered < 5) {
      weakAreas.push({
        topic,
        reason: mastery.accuracy < 0.6 ? 'low_accuracy' : 'insufficient_practice',
        accuracy: mastery.accuracy,
        questionsAnswered: mastery.questionsAnswered,
        priority: mastery.accuracy < 0.4 ? 'high' : 'medium'
      });
    }
  }
  
  // Sort by priority and accuracy
  weakAreas.sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (b.priority === 'high' && a.priority !== 'high') return 1;
    return a.accuracy - b.accuracy;
  });
  
  return weakAreas.slice(0, 3); // Return top 3 weak areas
}

async function suggestQuestionsForWeakAreas(weakAreas, completedQuestions) {
  const suggestions = [];
  
  for (const weakArea of weakAreas) {
    try {
      const questions = await InterviewQuestion.find({
        category: weakArea.topic,
        _id: { $nin: completedQuestions }
      })
      .sort({ difficulty: 1 }) // Start with easier questions
      .limit(5);
      
      suggestions.push({
        topic: weakArea.topic,
        reason: `Improve ${weakArea.topic} skills`,
        questions: questions.map(q => ({
          id: q._id,
          question: q.question,
          difficulty: q.difficulty,
          tags: q.tags
        }))
      });
    } catch (error) {
      console.error(`Error fetching questions for ${weakArea.topic}:`, error);
    }
  }
  
  return suggestions;
}

function generateLearningPath(user, performanceAnalysis) {
  const learningPath = [];
  const level = performanceAnalysis.level;
  
  // Beginner path (levels 1-5)
  if (level <= 5) {
    learningPath.push(
      {
        phase: 'Foundation Building',
        description: 'Master the basics across all topics',
        goals: [
          'Complete 50 beginner questions',
          'Achieve 70% accuracy',
          'Learn fundamental concepts'
        ],
        estimatedTime: '2-3 weeks'
      },
      {
        phase: 'Skill Development',
        description: 'Focus on your chosen specialization',
        goals: [
          'Deep dive into 2-3 preferred topics',
          'Complete intermediate questions',
          'Maintain daily streak'
        ],
        estimatedTime: '3-4 weeks'
      }
    );
  }
  // Intermediate path (levels 6-12)
  else if (level <= 12) {
    learningPath.push(
      {
        phase: 'Specialization',
        description: 'Become expert in your strong areas',
        goals: [
          'Achieve 85% accuracy in strong topics',
          'Complete advanced questions',
          'Help others in community'
        ],
        estimatedTime: '4-5 weeks'
      },
      {
        phase: 'Weak Area Improvement',
        description: 'Address knowledge gaps',
        goals: [
          'Improve weak areas to 70% accuracy',
          'Complete mixed difficulty challenges',
          'Maintain consistent practice'
        ],
        estimatedTime: '3-4 weeks'
      }
    );
  }
  // Advanced path (levels 13+)
  else {
    learningPath.push(
      {
        phase: 'Mastery & Teaching',
        description: 'Achieve mastery and help others',
        goals: [
          'Maintain 90%+ accuracy across all topics',
          'Create content and explanations',
          'Mentor other learners'
        ],
        estimatedTime: 'Ongoing'
      }
    );
  }
  
  return learningPath;
}

function generateStudyPlan(user, performanceAnalysis) {
  const patterns = performanceAnalysis.studyPatterns;
  const level = performanceAnalysis.level;
  
  // Base recommendations on user's patterns and level
  const dailyQuestions = Math.max(5, Math.min(20, level * 2));
  const sessionLength = patterns.averageSessionLength || 30;
  
  return {
    dailyGoal: {
      questions: dailyQuestions,
      timeMinutes: sessionLength,
      xpTarget: dailyQuestions * 10
    },
    weeklyGoal: {
      questions: dailyQuestions * 7,
      streakTarget: 7,
      newTopicsToExplore: 1
    },
    optimalStudyTime: patterns.preferredStudyTime,
    recommendedBreaks: sessionLength > 45 ? '10 minutes every 45 minutes' : 'As needed',
    focusAreas: performanceAnalysis.topicMastery ? 
      Object.keys(performanceAnalysis.topicMastery)
        .sort((a, b) => performanceAnalysis.topicMastery[a].accuracy - performanceAnalysis.topicMastery[b].accuracy)
        .slice(0, 3) : []
  };
}

function generateMotivationalTips(user) {
  const tips = [];
  const gamificationData = user.gamificationData || {};
  const currentStreak = gamificationData.streaks?.current || 0;
  const level = gamificationData.level || 1;
  const xp = gamificationData.xp || 0;
  
  // Streak-based tips
  if (currentStreak === 0) {
    tips.push({
      type: 'streak',
      message: "Start your learning journey today! Even 5 minutes of practice can make a difference.",
      action: "Answer 3 questions to begin your streak"
    });
  } else if (currentStreak < 7) {
    tips.push({
      type: 'streak',
      message: `Great start! You're on a ${currentStreak}-day streak. Keep the momentum going!`,
      action: "Complete today's practice to extend your streak"
    });
  } else {
    tips.push({
      type: 'streak',
      message: `Amazing ${currentStreak}-day streak! You're building a strong learning habit.`,
      action: "Challenge yourself with harder questions today"
    });
  }
  
  // Level-based tips
  const xpToNextLevel = (level * 100) - (xp % (level * 100));
  tips.push({
    type: 'progress',
    message: `You're ${xpToNextLevel} XP away from level ${level + 1}!`,
    action: `Answer ${Math.ceil(xpToNextLevel / 10)} more questions to level up`
  });
  
  // Performance-based tips
  const stats = gamificationData.stats || {};
  if (stats.accuracy && stats.accuracy > 0.8) {
    tips.push({
      type: 'performance',
      message: `Excellent ${Math.round(stats.accuracy * 100)}% accuracy! You're mastering the concepts.`,
      action: "Try some advanced questions to challenge yourself"
    });
  } else if (stats.accuracy && stats.accuracy < 0.6) {
    tips.push({
      type: 'performance',
      message: "Focus on understanding concepts rather than speed. Quality over quantity!",
      action: "Review explanations carefully and practice similar questions"
    });
  }
  
  return tips.slice(0, 3); // Return top 3 tips
}
