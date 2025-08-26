import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import DailyChallenge from '@/models/DailyChallenge';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { challengeId, topic, answers, currentQuestionIndex } = req.body;

    if (!challengeId || !topic) {
      return res.status(400).json({ 
        success: false, 
        message: 'Challenge ID and topic are required' 
      });
    }

    await connectToDatabase();

    // Find the challenge
    const challenge = await DailyChallenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ 
        success: false, 
        message: 'Challenge not found' 
      });
    }

    // Update user progress with saved answers
    const userProgressIndex = challenge.userProgress.findIndex(
      up => up.userId.toString() === session.user.id
    );

    if (userProgressIndex >= 0) {
      // Update existing progress
      challenge.userProgress[userProgressIndex].answers = answers;
      challenge.userProgress[userProgressIndex].currentQuestionIndex = currentQuestionIndex || 0;
      challenge.userProgress[userProgressIndex].lastSaved = new Date();
      
      // Calculate progress percentage
      const totalQuestions = challenge.questions.length;
      const answeredQuestions = Object.values(answers).filter(a => a?.trim()).length;
      const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
      
      challenge.userProgress[userProgressIndex].progress = Math.round(progressPercentage);
    } else {
      // Create new progress entry
      const totalQuestions = challenge.questions.length;
      const answeredQuestions = Object.values(answers).filter(a => a?.trim()).length;
      const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
      
      challenge.userProgress.push({
        userId: session.user.id,
        answers,
        currentQuestionIndex: currentQuestionIndex || 0,
        progress: Math.round(progressPercentage),
        completed: false,
        lastSaved: new Date()
      });
    }

    await challenge.save();

    res.status(200).json({
      success: true,
      message: 'Progress saved successfully',
      data: {
        progress: challenge.userProgress.find(up => up.userId.toString() === session.user.id)?.progress || 0
      }
    });

  } catch (error) {
    console.error('Error saving challenge progress:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
