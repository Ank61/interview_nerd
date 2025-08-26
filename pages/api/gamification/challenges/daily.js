import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import DailyChallenge from '../../../../models/DailyChallenge';
import User from '../../../../models/User';
import dbConnect from '../../../../lib/mongodb';
import { withStreakTracking } from '../../../../middleware/streakMiddleware';

async function handler(req, res) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ success: false, message: 'Please log in first' });
  }

  await dbConnect();

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
        const { challengeId, answers } = req.body;
        
        if (!challengeId || !answers || !Array.isArray(answers)) {
          return res.status(400).json({ success: false, message: 'Invalid request data' });
        }

        // Get the challenge
        const currentChallenge = await DailyChallenge.findById(challengeId);
        if (!currentChallenge) {
          return res.status(404).json({ success: false, message: 'Challenge not found' });
        }

        // Check if challenge is for today
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        if (currentChallenge.date.getTime() !== today.getTime()) {
          return res.status(400).json({ success: false, message: 'This challenge has expired' });
        }

        // Get the questions for this challenge
        await currentChallenge.populate('questions');
        
        // Calculate score
        let correctAnswers = 0;
        const results = [];
        
        currentChallenge.questions.forEach((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = question.correctAnswer === userAnswer;
          if (isCorrect) correctAnswers++;
          
          results.push({
            questionId: question._id,
            userAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect
          });
        });
        
        const score = Math.round((correctAnswers / currentChallenge.questions.length) * 100);
        const isCompleted = score >= 70; // 70% or higher to complete
        
        // Update user's challenge progress
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              'gamification.challenges.daily.completed': isCompleted,
              'gamification.challenges.daily.progress': Math.max(
                isCompleted ? 100 : score,
                user.gamification.challenges.daily.progress || 0
              ),
              'gamification.challenges.daily.completedAt': isCompleted ? new Date() : null,
              'gamification.challenges.daily.completedToday': isCompleted
            },
            $inc: {
              'gamification.xp': isCompleted ? currentChallenge.xpReward : 0,
              'gamification.stats.totalQuestionsAnswered': currentChallenge.questions.length,
              'gamification.stats.correctAnswers': correctAnswers
            }
          },
          { new: true }
        );

        // Update streak if challenge was completed
        let streakMessage = '';
        if (isCompleted) {
          const lastActivity = updatedUser.gamification.streaks.lastActivity;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          let newStreak = updatedUser.gamification.streaks.current;
          
          if (!lastActivity || lastActivity < yesterday) {
            // Reset streak if more than a day has passed
            newStreak = 1;
            streakMessage = 'New streak started!';
          } else if (lastActivity < today) {
            // Increment streak if last activity was yesterday
            newStreak++;
            streakMessage = `Streak increased to ${newStreak} days!`;
          }
          
          // Update streak
          await User.findByIdAndUpdate(userId, {
            'gamification.streaks.current': newStreak,
            'gamification.streaks.longest': Math.max(
              newStreak,
              updatedUser.gamification.streaks.longest
            ),
            'gamification.streaks.lastActivity': today
          });
        }

        return res.status(200).json({
          success: true,
          data: {
            score,
            isCompleted,
            results,
            xpEarned: isCompleted ? currentChallenge.xpReward : 0,
            streakMessage: isCompleted ? streakMessage : undefined
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
