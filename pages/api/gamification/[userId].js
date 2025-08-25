import GamificationEngine from '@/lib/gamification';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { userId } = req.query;

  // Ensure user can only access their own data or is admin
  if (session.user.id !== userId && session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const gamificationData = await GamificationEngine.getUserGamificationData(userId);
        return res.status(200).json(gamificationData);

      case 'POST':
        const { action, data } = req.body;
        
        switch (action) {
          case 'award_xp':
            const xpResult = await GamificationEngine.awardXP(userId, data.points, data.reason);
            return res.status(200).json(xpResult);

          case 'process_question':
            const questionResult = await GamificationEngine.processQuestionAnswer(userId, data);
            return res.status(200).json(questionResult);

          case 'update_streak':
            const streakResult = await GamificationEngine.updateStreak(userId);
            return res.status(200).json(streakResult);

          case 'update_challenge':
            const challengeResult = await GamificationEngine.updateChallengeProgress(
              userId, 
              data.challengeType, 
              data.progress
            );
            return res.status(200).json(challengeResult);

          default:
            return res.status(400).json({ error: 'Invalid action' });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Gamification API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
