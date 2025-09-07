import GamificationEngine from '@/lib/gamification';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getUniqueDailyMCQQuestions } from '@/data/mcqDatasets';
import dbConnect from '@/lib/mongodb';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await dbConnect();

    switch (req.method) {
      case 'GET':
        // Get or generate daily MCQ challenge for user
        const user = await User.findById(session.user.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const today = new Date().toISOString().split('T')[0];
        const mcqChallenge = user.gamification.challenges.daily.mcqChallenge;

        // Check if we need to generate a new challenge for today
        const needsNewChallenge = !mcqChallenge || 
          !mcqChallenge.startedAt || 
          mcqChallenge.startedAt.toISOString().split('T')[0] !== today;

        if (needsNewChallenge) {
          // Get user's answered MCQ questions to ensure uniqueness
          const answeredQuestionIds = user.gamification.challenges.daily.answeredMCQQuestions || [];
          
          // Generate new unique daily MCQ challenge
          const dailyQuestions = getUniqueDailyMCQQuestions(answeredQuestionIds, 5);
          
          // If no questions available, return empty challenge
          if (dailyQuestions.length === 0) {
            return res.status(200).json({ 
              success: true, 
              data: {
                questions: [],
                score: 0,
                totalQuestions: 0,
                completedQuestions: 0,
                isCompleted: true,
                streak: user.gamification.challenges.daily.streak,
                startedAt: null,
                completedAt: null,
                noQuestionsLeft: true,
                message: "Congratulations! You've answered all available MCQ questions. Check back later for new questions!"
              }
            });
          }
          
          // Reset MCQ challenge data
          user.gamification.challenges.daily.mcqChallenge = {
            questions: dailyQuestions.map(q => ({
              questionId: q.id,
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              userAnswer: -1,
              isCorrect: false,
              category: q.category,
              difficulty: q.difficulty,
              explanation: q.explanation
            })),
            score: 0,
            totalQuestions: dailyQuestions.length,
            completedQuestions: 0,
            startedAt: new Date(),
            completedAt: null
          };

          // Reset daily completion status
          user.gamification.challenges.daily.completedToday = false;
          
          await user.save();
        }

        const challengeData = {
          questions: user.gamification.challenges.daily.mcqChallenge.questions,
          score: user.gamification.challenges.daily.mcqChallenge.score,
          totalQuestions: user.gamification.challenges.daily.mcqChallenge.totalQuestions,
          completedQuestions: user.gamification.challenges.daily.mcqChallenge.completedQuestions,
          isCompleted: user.gamification.challenges.daily.completedToday,
          streak: user.gamification.challenges.daily.streak,
          startedAt: user.gamification.challenges.daily.mcqChallenge.startedAt,
          completedAt: user.gamification.challenges.daily.mcqChallenge.completedAt
        };

        return res.status(200).json({ success: true, data: challengeData });

      case 'POST':
        const { action, questionIndex, answer } = req.body;
        
        if (action === 'submit_answer') {
          const user = await User.findById(session.user.id);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

          const mcqChallenge = user.gamification.challenges.daily.mcqChallenge;
          
          if (!mcqChallenge || questionIndex < 0 || questionIndex >= mcqChallenge.questions.length) {
            return res.status(400).json({ error: 'Invalid question index' });
          }

          const question = mcqChallenge.questions[questionIndex];
          
          // Check if question is already answered
          if (question.userAnswer !== -1) {
            return res.status(400).json({ error: 'Question already answered' });
          }

          // Update question with user's answer
          question.userAnswer = answer;
          question.isCorrect = answer === question.correctAnswer;
          question.answeredAt = new Date();

          // Update challenge progress
          mcqChallenge.completedQuestions += 1;
          if (question.isCorrect) {
            mcqChallenge.score += 1;
          }

          // Add question to answered questions list
          if (!user.gamification.challenges.daily.answeredMCQQuestions) {
            user.gamification.challenges.daily.answeredMCQQuestions = [];
          }
          
          if (!user.gamification.challenges.daily.answeredMCQQuestions.includes(question.questionId)) {
            user.gamification.challenges.daily.answeredMCQQuestions.push(question.questionId);
          }

          // Check if challenge is completed
          if (mcqChallenge.completedQuestions === mcqChallenge.totalQuestions) {
            mcqChallenge.completedAt = new Date();
            user.gamification.challenges.daily.completedToday = true;
            user.gamification.challenges.daily.streak += 1;

            // Award XP based on score
            const xpReward = mcqChallenge.score * 10; // 10 XP per correct answer
            await GamificationEngine.awardXP(
              session.user.id, 
              xpReward, 
              `Daily MCQ challenge completed (${mcqChallenge.score}/${mcqChallenge.totalQuestions} correct)`
            );

            // Update streak
            await GamificationEngine.updateStreak(session.user.id);
          }

          await user.save();

          return res.status(200).json({ 
            success: true, 
            isCorrect: question.isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            score: mcqChallenge.score,
            completedQuestions: mcqChallenge.completedQuestions,
            isCompleted: mcqChallenge.completedQuestions === mcqChallenge.totalQuestions
          });
        }

        return res.status(400).json({ error: 'Invalid action' });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Daily challenge API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
