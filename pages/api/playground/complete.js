import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// import { GamificationEngine } from "@/lib/gamification";
import GamificationEngine from "@/lib/gamification";
import connectDB from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { db } = await connectDB();
    const {
      questionId,
      language,
      difficulty,
      timeSpent,
      attempts,
      hintsUsed,
      success,
      codeQuality,
      tags,
    } = req.body;

    // Find user
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize gamification engine
    const gamification = new GamificationEngine(user);

    // Calculate XP based on playground performance
    let xpGained = 0;
    const baseXP = { easy: 15, medium: 30, hard: 60 }[difficulty] || 15;

    if (success) {
      // Base XP for completion
      xpGained += baseXP;

      // Bonus for efficiency (fewer attempts)
      if (attempts === 1) xpGained += Math.floor(baseXP * 0.5);
      else if (attempts === 2) xpGained += Math.floor(baseXP * 0.3);
      else if (attempts === 3) xpGained += Math.floor(baseXP * 0.1);

      // Bonus for not using hints
      if (hintsUsed === 0) xpGained += Math.floor(baseXP * 0.3);

      // Bonus for code quality
      if (codeQuality >= 90) xpGained += Math.floor(baseXP * 0.4);
      else if (codeQuality >= 80) xpGained += Math.floor(baseXP * 0.2);

      // Time bonus (completed quickly)
      const expectedTime = { easy: 300, medium: 600, hard: 1200 }[difficulty];
      if (timeSpent < expectedTime * 0.7) {
        xpGained += Math.floor(baseXP * 0.3);
      }
    } else {
      // Partial XP for attempt
      xpGained += Math.floor(baseXP * 0.2);
    }

    // Award XP
    await gamification.awardXP(
      xpGained,
      `Playground: ${
        success ? "Completed" : "Attempted"
      } ${difficulty} ${language} problem`
    );

    // Check for coding-specific badges
    const badgesEarned = [];

    // Language-specific badges
    const languageStats = user.playgroundStats?.[language] || {
      completed: 0,
      streak: 0,
    };

    if (success) {
      languageStats.completed = (languageStats.completed || 0) + 1;
      languageStats.streak = (languageStats.streak || 0) + 1;

      // Language mastery badges
      if (languageStats.completed === 5) {
        const badge = await gamification.awardBadge(
          "language_explorer",
          `${language.toUpperCase()}_EXPLORER`,
          {
            description: `Solved 5 ${language} problems`,
            category: "coding",
          }
        );
        if (badge) badgesEarned.push(badge);
      }

      if (languageStats.completed === 15) {
        const badge = await gamification.awardBadge(
          "language_master",
          `${language.toUpperCase()}_MASTER`,
          {
            description: `Solved 15 ${language} problems`,
            category: "coding",
          }
        );
        if (badge) badgesEarned.push(badge);
      }

      // Streak badges
      if (languageStats.streak === 5) {
        const badge = await gamification.awardBadge(
          "coding_streak",
          "HOT_STREAK",
          {
            description: "Solved 5 problems in a row",
            category: "achievement",
          }
        );
        if (badge) badgesEarned.push(badge);
      }

      // Efficiency badges
      if (attempts === 1 && hintsUsed === 0) {
        const badge = await gamification.awardBadge(
          "perfectionist",
          "FIRST_TRY_MASTER",
          {
            description: "Solved problem on first try without hints",
            category: "skill",
          }
        );
        if (badge) badgesEarned.push(badge);
      }

      // Code quality badges
      if (codeQuality >= 95) {
        const badge = await gamification.awardBadge(
          "clean_coder",
          "CLEAN_CODE_CHAMPION",
          {
            description: "Achieved 95%+ code quality",
            category: "skill",
          }
        );
        if (badge) badgesEarned.push(badge);
      }

      // Difficulty-specific badges
      if (difficulty === "hard") {
        const badge = await gamification.awardBadge(
          "hard_problem_solver",
          "HARD_MODE_WARRIOR",
          {
            description: "Solved a hard difficulty problem",
            category: "achievement",
          }
        );
        if (badge) badgesEarned.push(badge);
      }
    } else {
      // Reset streak on failure
      languageStats.streak = 0;
    }

    // Update playground stats
    const playgroundStats = user.playgroundStats || {};
    playgroundStats[language] = languageStats;
    playgroundStats.totalAttempts = (playgroundStats.totalAttempts || 0) + 1;
    if (success) {
      playgroundStats.totalCompleted =
        (playgroundStats.totalCompleted || 0) + 1;
    }

    // Update user document
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          xp: user.xp + xpGained,
          level: gamification.calculateLevel(user.xp + xpGained),
          playgroundStats,
          lastPlaygroundActivity: new Date(),
        },
        $push: {
          badges: { $each: badgesEarned },
        },
      }
    );

    // Create activity log
    await db.collection("activities").insertOne({
      userId: user._id,
      type: "playground_completion",
      data: {
        questionId,
        language,
        difficulty,
        success,
        xpGained,
        timeSpent,
        attempts,
        hintsUsed,
        codeQuality,
        tags,
      },
      timestamp: new Date(),
    });

    // Check for level up
    const newLevel = gamification.calculateLevel(user.xp + xpGained);
    const leveledUp = newLevel > user.level;

    res.status(200).json({
      success: true,
      xpGained,
      newXP: user.xp + xpGained,
      newLevel,
      leveledUp,
      badgesEarned,
      playgroundStats,
    });
  } catch (error) {
    console.error("Playground completion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
