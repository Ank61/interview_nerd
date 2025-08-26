import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { userId } = req.query;

  // Ensure user can only access their own data
  if (session.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    await connectDB();
    switch (req.method) {
      case "GET":
        const user = await User.findById(userId).select(
          "progress gamification"
        );

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Calculate study statistics
        const stats = {
          totalStudyTime: user.gamification.stats.totalStudyTime || 0,
          questionsAnswered:
            user.gamification.stats.totalQuestionsAnswered || 0,
          correctAnswers: user.gamification.stats.correctAnswers || 0,
          accuracy: user.gamification.stats.accuracy || 0,
          currentStreak: user.gamification.streaks.current || 0,
          longestStreak: user.gamification.streaks.longest || 0,
          totalXP: user.gamification.xp || 0,
          level: user.gamification.level || 1,
          badgesEarned: user.gamification.badges.length || 0,

          // Weekly stats
          weeklyXP: user.gamification.leaderboards.weeklyXP || 0,
          weeklyRank: user.gamification.leaderboards.weeklyRank || 0,

          // Topic breakdown
          topicStats: user.gamification.stats.topicMastery || [],

          // Recent performance (last 7 days)
          recentPerformance: calculateRecentPerformance(
            user.progress.completedQuestions
          ),

          // Study patterns
          studyPatterns: calculateStudyPatterns(user.progress.studySessions),
        };

        return res.status(200).json(stats);

      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("User stats API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

function calculateRecentPerformance(completedQuestions) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentQuestions = completedQuestions.filter(
    (q) => new Date(q.completedAt) >= sevenDaysAgo
  );

  if (recentQuestions.length === 0) {
    return {
      questionsAnswered: 0,
      averageScore: 0,
      improvement: 0,
    };
  }

  const totalScore = recentQuestions.reduce(
    (sum, q) => sum + (q.score || 0),
    0
  );
  const averageScore = totalScore / recentQuestions.length;

  // Calculate improvement (compare first half vs second half)
  const midPoint = Math.floor(recentQuestions.length / 2);
  const firstHalf = recentQuestions.slice(0, midPoint);
  const secondHalf = recentQuestions.slice(midPoint);

  let improvement = 0;
  if (firstHalf.length > 0 && secondHalf.length > 0) {
    const firstHalfAvg =
      firstHalf.reduce((sum, q) => sum + (q.score || 0), 0) / firstHalf.length;
    const secondHalfAvg =
      secondHalf.reduce((sum, q) => sum + (q.score || 0), 0) /
      secondHalf.length;
    improvement = secondHalfAvg - firstHalfAvg;
  }

  return {
    questionsAnswered: recentQuestions.length,
    averageScore: Math.round(averageScore),
    improvement: Math.round(improvement),
  };
}

function calculateStudyPatterns(studySessions) {
  if (!studySessions || studySessions.length === 0) {
    return {
      averageSessionLength: 0,
      totalSessions: 0,
      favoriteTopics: [],
      studyTimeByDay: {},
    };
  }

  const totalDuration = studySessions.reduce(
    (sum, session) => sum + (session.duration || 0),
    0
  );
  const averageSessionLength = totalDuration / studySessions.length;

  // Calculate favorite topics
  const topicCounts = {};
  studySessions.forEach((session) => {
    topicCounts[session.topic] = (topicCounts[session.topic] || 0) + 1;
  });

  const favoriteTopics = Object.entries(topicCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([topic, count]) => ({ topic, count }));

  // Calculate study time by day of week
  const studyTimeByDay = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  studySessions.forEach((session) => {
    const dayName = new Date(session.sessionDate).toLocaleDateString("en-US", {
      weekday: "long",
    });
    studyTimeByDay[dayName] += session.duration || 0;
  });

  return {
    averageSessionLength: Math.round(averageSessionLength),
    totalSessions: studySessions.length,
    favoriteTopics,
    studyTimeByDay,
  };
}
