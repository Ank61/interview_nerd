import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import DailyChallenge from '../../../../models/DailyChallenge';
import User from '../../../../models/User';
import dbConnect from '../../../../lib/mongodb';
import { withStreakTracking } from '../../../../middleware/streakMiddleware';
import { calculateAnswerSimilarity, gradeAnswer } from '../../../../lib/answerSimilarity';

async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();
  
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ success: false, message: 'Please log in first' });
  }

  try {
    const userId = session.user.id;

    switch (method) {
      case 'GET':
        const { topic } = req.query;
        
        if (!topic) {
          return res.status(400).json({ success: false, message: 'Topic is required' });
        }

        // Get or create today's challenge for the topic
        const challenge = await DailyChallenge.getOrCreateForToday(topic);
        
        // Populate the questions
        await challenge.populate('questions');
        
        // Get user's progress on this challenge
        const user = await User.findById(userId);
        const userChallenge = user.gamification.challenges.daily;
        
        const response = {
          _id: challenge._id,
          date: challenge.date,
          topic: challenge.topic,
          difficulty: challenge.difficulty,
          xpReward: challenge.xpReward,
          streakBonus: challenge.streakBonus,
          questions: challenge.questions.map(q => ({
            _id: q._id,
            question: q.question,
            options: q.options,
            category: q.category,
            difficulty: q.difficulty,
            tags: q.tags
          })),
          userProgress: {
            completed: userChallenge.completed,
            progress: userChallenge.progress,
            streak: user.gamification.challenges.daily.streak,
            completedToday: user.gamification.challenges.daily.completedToday
          }
        };

        return res.status(200).json({ success: true, data: response });

      case 'POST':
        // Handle challenge submission
        const { answers, challengeId } = req.body;
        
        if (!answers || !challengeId) {
          return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Find the challenge
        const currentChallenge = await DailyChallenge.findById(challengeId);
        if (!currentChallenge) {
          return res.status(404).json({ success: false, message: 'Challenge not found' });
        }

        // Evaluate answers using similarity comparison
        const totalQuestions = currentChallenge.questions.length;
        let totalScore = 0;
        const answerResults = [];
        
        // Process each answer
        for (let i = 0; i < totalQuestions; i++) {
          const userAnswer = answers[i] || '';
          const question = currentChallenge.questions[i];
          const referenceAnswer = question.solution || question.answer || '';
          
          if (userAnswer.trim().length === 0) {
            answerResults.push({
              questionIndex: i,
              similarity: 0,
              grade: { grade: 'F', points: 0, feedback: 'No answer provided.' },
              userAnswer,
              referenceAnswer
            });
            continue;
          }
          
          // Calculate similarity
          const similarity = calculateAnswerSimilarity(
            userAnswer, 
            referenceAnswer, 
            currentChallenge.topic
          );
          
          const grade = gradeAnswer(similarity.score);
          
          answerResults.push({
            questionIndex: i,
            similarity: similarity.score,
            grade,
            userAnswer,
            referenceAnswer,
            breakdown: similarity.breakdown
          });
          
          totalScore += grade.points;
        }
        
        const averageScore = Math.round(totalScore / totalQuestions);
        const correctAnswers = answerResults.filter(r => r.grade.points >= 70).length;

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
          completed: true
        };

        // Update streak
        const today = new Date();
        const yesterday = new Date(today);
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
          longest: Math.max(challengeUser.gamification.streaks?.longest || 0, currentStreak),
          lastActivity: today
        };

        // Award XP based on performance with streak bonus
        const baseXP = Math.round((currentChallenge.xpReward * averageScore) / 100);
        const streakBonus = currentChallenge.streakBonus * currentStreak;
        const xpEarned = baseXP + streakBonus;
        challengeUser.gamification.xp = (challengeUser.gamification.xp || 0) + xpEarned;

        await challengeUser.save();

        return res.status(200).json({
          success: true,
          message: 'Challenge completed successfully',
          data: {
            isCompleted: averageScore >= 50, // Pass threshold
            score: averageScore,
            correctCount: correctAnswers,
            totalQuestions,
            streak: currentStreak,
            xpEarned,
            answerResults,
            streakMessage: currentStreak > 1 ? `${currentStreak} day streak!` : null
          }
        });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Daily challenge error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Error processing daily challenge' 
    });
  }
}

export default withStreakTracking(handler);
