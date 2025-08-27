import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { db } = await connectDB();
    const { language } = req.query;

    // Find user
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get playground activities
    const activities = await db
      .collection("activities")
      .find({
        userId: user._id,
        type: "playground_completion",
        ...(language && { "data.language": language }),
      })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    // Calculate statistics
    const stats = {
      totalAttempts: activities.length,
      totalCompleted: activities.filter((a) => a.data.success).length,
      successRate:
        activities.length > 0
          ? Math.round(
              (activities.filter((a) => a.data.success).length /
                activities.length) *
                100
            )
          : 0,
      averageTime:
        activities.length > 0
          ? Math.round(
              activities.reduce((sum, a) => sum + a.data.timeSpent, 0) /
                activities.length
            )
          : 0,
      totalXPEarned: activities.reduce(
        (sum, a) => sum + (a.data.xpGained || 0),
        0
      ),
      languageBreakdown: {},
      difficultyBreakdown: { easy: 0, medium: 0, hard: 0 },
      recentActivity: activities.slice(0, 10),
      skillLevels: user.playgroundStats || {},
    };

    // Language breakdown
    activities.forEach((activity) => {
      const lang = activity.data.language;
      if (!stats.languageBreakdown[lang]) {
        stats.languageBreakdown[lang] = {
          attempts: 0,
          completed: 0,
          successRate: 0,
          averageTime: 0,
          xpEarned: 0,
        };
      }

      stats.languageBreakdown[lang].attempts++;
      if (activity.data.success) {
        stats.languageBreakdown[lang].completed++;
      }
      stats.languageBreakdown[lang].xpEarned += activity.data.xpGained || 0;
    });

    // Calculate success rates and average times for each language
    Object.keys(stats.languageBreakdown).forEach((lang) => {
      const langActivities = activities.filter((a) => a.data.language === lang);
      const langStats = stats.languageBreakdown[lang];

      langStats.successRate =
        langStats.attempts > 0
          ? Math.round((langStats.completed / langStats.attempts) * 100)
          : 0;

      langStats.averageTime =
        langActivities.length > 0
          ? Math.round(
              langActivities.reduce((sum, a) => sum + a.data.timeSpent, 0) /
                langActivities.length
            )
          : 0;
    });

    // Difficulty breakdown
    activities.forEach((activity) => {
      const difficulty = activity.data.difficulty;
      if (stats.difficultyBreakdown[difficulty] !== undefined) {
        stats.difficultyBreakdown[difficulty]++;
      }
    });

    // Performance trend (last 10 activities)
    const recentActivities = activities.slice(0, 10);
    stats.recentTrend =
      recentActivities.length >= 3
        ? this.calculateTrend(recentActivities)
        : "insufficient_data";

    res.status(200).json(stats);
  } catch (error) {
    console.error("Playground stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function calculateTrend(activities) {
  if (activities.length < 3) return "insufficient_data";

  const recent = activities.slice(0, Math.floor(activities.length / 2));
  const older = activities.slice(Math.floor(activities.length / 2));

  const recentSuccess =
    recent.filter((a) => a.data.success).length / recent.length;
  const olderSuccess =
    older.filter((a) => a.data.success).length / older.length;

  const difference = recentSuccess - olderSuccess;

  if (difference > 0.2) return "improving";
  if (difference < -0.2) return "declining";
  return "stable";
}
