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

        // Generate recent activity from user data
        const activities = [];

        // Add recent completed questions
        const recentQuestions = user.progress.completedQuestions
          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
          .slice(0, 10);

        recentQuestions.forEach((question) => {
          activities.push({
            type: "question_completed",
            description: `Completed a question with ${question.score}% score`,
            timestamp: new Date(question.completedAt).toLocaleDateString(),
            data: question,
          });
        });

        // Add recent badges
        const recentBadges = user.gamification.badges
          .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
          .slice(0, 5);

        recentBadges.forEach((badge) => {
          activities.push({
            type: "badge_earned",
            description: `Earned "${badge.name}" badge`,
            timestamp: new Date(badge.earnedAt).toLocaleDateString(),
            data: badge,
          });
        });

        // Add study sessions
        const recentSessions = user.progress.studySessions
          .sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate))
          .slice(0, 5);

        recentSessions.forEach((session) => {
          activities.push({
            type: "study_session",
            description: `Studied ${session.topic} for ${session.duration} minutes`,
            timestamp: new Date(session.sessionDate).toLocaleDateString(),
            data: session,
          });
        });

        // Sort all activities by timestamp
        activities.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        return res.status(200).json({
          activities: activities.slice(0, 20),
        });

      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("User activity API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
