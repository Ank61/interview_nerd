import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

import QuestionFeedback from "../../../models/QuestionFeedback";
import InterviewQuestion from "../../../models/InterviewQuestion";
import User from "../../../models/User";
import dbConnect from "../../../lib/mongodb";
import { withStreakTracking } from "../../../middleware/streakMiddleware";

async function handler(req, res) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ success: false, message: "Please log in first" });
  }

  await dbConnect();

  try {
    const userId = session.user.id;

    switch (method) {
      case "POST":
        const { questionId, isCorrect, userAnswer, timeSpent } = req.body;

        if (!questionId || isCorrect === undefined || !userAnswer) {
          return res.status(400).json({
            success: false,
            message: "Question ID, user answer, and correctness are required",
          });
        }

        // Get the question to get its topic and difficulty
        const question = await InterviewQuestion.findById(questionId);
        if (!question) {
          return res.status(404).json({
            success: false,
            message: "Question not found",
          });
        }

        // Record the feedback
        const feedback = await QuestionFeedback.recordFeedback(
          userId,
          question,
          userAnswer,
          isCorrect,
          {
            timeSpent,
            // You can add more metadata here like device, IP, etc.
            // device: req.headers['user-agent'],
            // ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress
          }
        );

        // Update user's streak
        const user = await User.findById(userId);
        await user.updateStreak();

        return res.status(200).json({
          success: true,
          data: feedback,
        });

      case "GET":
        // Get feedback for a specific question
        const { questionId: qId } = req.query;

        if (!qId) {
          return res.status(400).json({
            success: false,
            message: "Question ID is required",
          });
        }

        const userFeedback = await QuestionFeedback.findOne({
          user: userId,
          question: qId,
        });

        return res.status(200).json({
          success: true,
          data: userFeedback,
        });

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({
          success: false,
          message: `Method ${method} not allowed`,
        });
    }
  } catch (error) {
    console.error("Question feedback error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error processing question feedback",
    });
  }
}

export default withStreakTracking(handler);
