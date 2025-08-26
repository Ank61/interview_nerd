import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/mongodb";
import { withStreakTracking } from "../../../../middleware/streakMiddleware";
import {
  calculateAnswerSimilarity,
  gradeAnswer,
} from "../../../../lib/answerSimilarity";
import { interviewData } from "../../../../data/interviewData";

// Generate a seed based on date and topic for consistent daily questions
function getDailySeed(date, topic) {
  const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
  return `${dateStr}-${topic}`.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

// Seeded random number generator for consistent daily questions
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Get random questions for today's challenge
function getTodaysQuestions(topic, count = 3) {
  const today = new Date();
  const seed = getDailySeed(today, topic);

  // Find questions for the specified topic
  const topicData = interviewData.find(
    (data) => data.topic.toLowerCase() === topic.toLowerCase()
  );

  if (!topicData || !topicData.questions) {
    throw new Error(`No questions found for topic: ${topic}`);
  }

  const questions = topicData.questions;
  const selectedQuestions = [];
  const usedIndices = new Set();

  // Use seeded random to pick consistent questions for the day
  let currentSeed = seed;
  while (selectedQuestions.length < Math.min(count, questions.length)) {
    const randomValue = seededRandom(currentSeed++);
    const index = Math.floor(randomValue * questions.length);

    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      selectedQuestions.push({
        ...questions[index],
        _id: `${topic}-${index}-${today.toISOString().split("T")[0]}`, // Generate consistent ID
      });
    }
  }

  return selectedQuestions;
}

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ success: false, message: "Please log in first" });
  }

  try {
    const userId = session.user.id;

    switch (method) {
      case "GET":
        const { topic } = req.query;

        if (!topic) {
          return res
            .status(400)
            .json({ success: false, message: "Topic is required" });
        }

        // Get today's random questions
        const todaysQuestions = getTodaysQuestions(topic, 3);

        // Get user's progress on daily challenges
        const user = await User.findById(userId);
        const userChallenge = user.gamification?.challenges?.daily || {};

        // Check if user completed today's challenge
        const today = new Date().toISOString().split("T")[0];
        const completedToday =
          userChallenge.lastCompleted &&
          new Date(userChallenge.lastCompleted).toISOString().split("T")[0] ===
            today;

        const response = {
          _id: `daily-${topic}-${today}`,
          date: new Date(),
          topic: topic,
          difficulty: "Mixed",
          xpReward: 50,
          streakBonus: 10,
          questions: todaysQuestions.map((q) => ({
            _id: q._id,
            question: q.question,
            solution: q.solution,
            category: topic,
            difficulty: q.difficulty || "Medium",
            tags: q.tags || [],
          })),
          userProgress: {
            completed: completedToday,
            progress: completedToday ? 100 : 0,
            streak: user.gamification?.streaks?.current || 0,
            completedToday: completedToday,
          },
        };

        return res.status(200).json({ success: true, data: response });

      case "POST":
        // Handle challenge submission
        const { answers, challengeId } = req.body;

        if (!answers || !challengeId) {
          return res
            .status(400)
            .json({ success: false, message: "Missing required fields" });
        }

        // Extract topic from challengeId (format: daily-{topic}-{date})
        const challengeTopic = challengeId.split("-")[1];
        const todaysQuestionsForSubmission = getTodaysQuestions(
          challengeTopic,
          3
        );

        // Evaluate answers using similarity comparison
        const totalQuestions = todaysQuestionsForSubmission.length;
        let totalScore = 0;
        const answerResults = [];

        // Process each answer
        for (let i = 0; i < totalQuestions; i++) {
          const userAnswer = answers[i] || "";
          const question = todaysQuestionsForSubmission[i];
          const referenceAnswer = question.solution || "";

          if (userAnswer.trim().length === 0) {
            answerResults.push({
              questionIndex: i,
              similarity: 0,
              grade: { grade: "F", points: 0, feedback: "No answer provided." },
              userAnswer,
              referenceAnswer,
            });
            continue;
          }

          // Calculate similarity
          const similarity = calculateAnswerSimilarity(
            userAnswer,
            referenceAnswer,
            challengeTopic
          );

          const grade = gradeAnswer(similarity.score);

          answerResults.push({
            questionIndex: i,
            similarity: similarity.score,
            grade,
            userAnswer,
            referenceAnswer,
            breakdown: similarity.breakdown,
          });

          totalScore += grade.points;
        }

        const averageScore = Math.round(totalScore / totalQuestions);
        const correctAnswers = answerResults.filter(
          (r) => r.grade.points >= 70
        ).length;

        // Update user's challenge progress
        const challengeUser = await User.findById(userId);
        if (!challengeUser.gamification) {
          challengeUser.gamification = {};
        }
        if (!challengeUser.gamification.challenges) {
          challengeUser.gamification.challenges = { daily: {} };
        }

        challengeUser.gamification.challenges.daily = {
          ...challengeUser.gamification.challenges.daily,
          completedToday: true,
          lastCompleted: new Date(),
          progress: 100,
          completed: true,
        };

        // Update streak
        const currentDate = new Date();
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);

        const lastActivity = challengeUser.gamification.streaks?.lastActivity;
        let currentStreak = challengeUser.gamification.streaks?.current || 0;

        if (!lastActivity || lastActivity < yesterday) {
          currentStreak = 1; // Start new streak
        } else if (lastActivity.toDateString() === yesterday.toDateString()) {
          currentStreak += 1; // Continue streak
        }

        challengeUser.gamification.streaks = {
          current: currentStreak,
          longest: Math.max(
            challengeUser.gamification.streaks?.longest || 0,
            currentStreak
          ),
          lastActivity: currentDate,
        };

        // Award XP based on performance with streak bonus
        const baseXP = Math.round((50 * averageScore) / 100); // Base 50 XP
        const streakBonus = 10 * currentStreak; // 10 XP per streak day
        const xpEarned = baseXP + streakBonus;
        challengeUser.gamification.xp =
          (challengeUser.gamification.xp || 0) + xpEarned;

        await challengeUser.save();

        return res.status(200).json({
          success: true,
          message: "Challenge completed successfully",
          data: {
            isCompleted: averageScore >= 50, // Pass threshold
            score: averageScore,
            correctCount: correctAnswers,
            totalQuestions,
            streak: currentStreak,
            xpEarned,
            answerResults,
            streakMessage:
              currentStreak > 1 ? `${currentStreak} day streak!` : null,
          },
        });

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res
          .status(405)
          .json({ success: false, message: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("Daily challenge error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error processing daily challenge",
    });
  }
}

export default withStreakTracking(handler);
