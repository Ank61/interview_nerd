import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import InterviewQuestion from "../../../../models/InterviewQuestion";
import { spacedRepetitionEngine } from "../../../../lib/spacedRepetition";

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

  await connectDB();

  if (req.method === 'GET') {
    try {
      const { action } = req.query;
      
      if (action === 'due-questions') {
        return await getDueQuestions(req, res, userId);
      } else if (action === 'stats') {
        return await getSpacedRepetitionStats(req, res, userId);
      } else if (action === 'study-session') {
        return await planStudySession(req, res, userId);
      } else {
        return res.status(400).json({ error: 'Invalid action parameter' });
      }
    } catch (error) {
      console.error('Error in spaced repetition GET:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { action } = req.query;
      
      if (action === 'update-review') {
        return await updateQuestionReview(req, res, userId);
      } else {
        return res.status(400).json({ error: 'Invalid action parameter' });
      }
    } catch (error) {
      console.error('Error in spaced repetition POST:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getDueQuestions(req, res, userId) {
  const { limit = 10 } = req.query;
  
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Get user's question history with spaced repetition data
  const userQuestions = user.gamificationData?.spacedRepetition?.questions || [];
  
  // Get questions due for review
  const dueQuestions = spacedRepetitionEngine.getQuestionsForReview(userQuestions, parseInt(limit));
  
  // Fetch full question details
  const questionIds = dueQuestions.map(q => q.questionId);
  const fullQuestions = await InterviewQuestion.find({ _id: { $in: questionIds } });
  
  // Combine spaced repetition data with question details
  const questionsWithDetails = dueQuestions.map(dueQuestion => {
    const fullQuestion = fullQuestions.find(q => q._id.toString() === dueQuestion.questionId);
    return {
      ...fullQuestion?.toObject(),
      spacedRepetition: dueQuestion.spacedRepetition,
      priority: dueQuestion.priority
    };
  }).filter(q => q._id); // Filter out questions that weren't found
  
  res.status(200).json({
    success: true,
    dueQuestions: questionsWithDetails,
    totalDue: dueQuestions.length
  });
}

async function getSpacedRepetitionStats(req, res, userId) {
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userQuestions = user.gamificationData?.spacedRepetition?.questions || [];
  const stats = spacedRepetitionEngine.getReviewStats(userQuestions);
  
  res.status(200).json({
    success: true,
    stats
  });
}

async function planStudySession(req, res, userId) {
  const { timeMinutes = 30 } = req.query;
  
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userQuestions = user.gamificationData?.spacedRepetition?.questions || [];
  const studyPlan = spacedRepetitionEngine.planStudySession(userQuestions, parseInt(timeMinutes));
  
  // Fetch full question details for recommended questions
  const questionIds = studyPlan.recommendedQuestions.map(q => q.questionId);
  const fullQuestions = await InterviewQuestion.find({ _id: { $in: questionIds } });
  
  const questionsWithDetails = studyPlan.recommendedQuestions.map(recQuestion => {
    const fullQuestion = fullQuestions.find(q => q._id.toString() === recQuestion.questionId);
    return {
      ...fullQuestion?.toObject(),
      spacedRepetition: recQuestion.spacedRepetition,
      priority: recQuestion.priority
    };
  }).filter(q => q._id);
  
  res.status(200).json({
    success: true,
    studyPlan: {
      ...studyPlan,
      recommendedQuestions: questionsWithDetails
    }
  });
}

async function updateQuestionReview(req, res, userId) {
  const { questionId, userResponse } = req.body;
  
  if (!questionId || !userResponse) {
    return res.status(400).json({ error: 'Missing questionId or userResponse' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Initialize spaced repetition data if it doesn't exist
  if (!user.gamificationData) {
    user.gamificationData = {};
  }
  if (!user.gamificationData.spacedRepetition) {
    user.gamificationData.spacedRepetition = { questions: [] };
  }

  // Find existing question data or create new
  let questionData = user.gamificationData.spacedRepetition.questions.find(
    q => q.questionId === questionId
  );

  if (!questionData) {
    // Get question details for difficulty
    const question = await InterviewQuestion.findById(questionId);
    questionData = {
      questionId,
      difficulty: question?.difficulty || 'medium',
      spacedRepetition: {
        repetitionCount: 0,
        easinessFactor: 2.5,
        lastReviewDate: null,
        nextReviewDate: null
      }
    };
    user.gamificationData.spacedRepetition.questions.push(questionData);
  }

  // Calculate next review using spaced repetition algorithm
  const nextReviewData = spacedRepetitionEngine.calculateNextReview(
    questionData.spacedRepetition,
    userResponse
  );

  // Update question data
  questionData.spacedRepetition = {
    ...questionData.spacedRepetition,
    ...nextReviewData
  };

  // Add review history
  if (!questionData.reviewHistory) {
    questionData.reviewHistory = [];
  }
  questionData.reviewHistory.push({
    date: new Date(),
    correct: userResponse.correct,
    responseTime: userResponse.responseTime,
    confidence: userResponse.confidence,
    intervalDays: nextReviewData.intervalDays
  });

  // Keep only last 10 reviews to prevent document bloat
  if (questionData.reviewHistory.length > 10) {
    questionData.reviewHistory = questionData.reviewHistory.slice(-10);
  }

  // Save user data
  user.markModified('gamificationData.spacedRepetition');
  await user.save();

  res.status(200).json({
    success: true,
    nextReview: nextReviewData,
    message: `Next review scheduled for ${nextReviewData.nextReviewDate.toDateString()}`
  });
}
