import GamificationEngine from '@/lib/gamification';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get or generate daily challenge for user
        const user = await User.findById(session.user.id);
        let challenge = user.gamification.challenges.daily.current;

        // Check if challenge is expired or doesn't exist
        const now = new Date();
        if (!challenge || (challenge.expiresAt && new Date(challenge.expiresAt) < now)) {
          // Generate new daily challenge
          challenge = GamificationEngine.generateDailyChallenge();
          
          // Reset daily completion status
          user.gamification.challenges.daily.current = challenge;
          user.gamification.challenges.daily.completedToday = false;
          
          await user.save();
        }

        return res.status(200).json(challenge);

      case 'POST':
        const { action } = req.body;
        
        if (action === 'complete') {
          // Mark challenge as completed
          const user = await User.findById(session.user.id);
          const challenge = user.gamification.challenges.daily.current;
          
          if (challenge && !challenge.completed) {
            challenge.completed = true;
            challenge.progress = challenge.target;
            user.gamification.challenges.daily.completedToday = true;
            user.gamification.challenges.daily.streak += 1;

            // Award XP
            await GamificationEngine.awardXP(
              session.user.id, 
              challenge.xpReward, 
              'Daily challenge completed'
            );

            await user.save();
          }

          return res.status(200).json({ success: true, challenge });
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
