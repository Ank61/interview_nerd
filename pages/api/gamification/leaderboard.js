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
        const { type = 'weekly', limit = 10 } = req.query;
        
        let sortField;
        let timeFilter = {};
        
        switch (type) {
          case 'weekly':
            sortField = 'gamification.leaderboards.weeklyXP';
            // Filter for users active this week
            const startOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
            timeFilter = {
              'gamification.streaks.lastActivity': { $gte: startOfWeek }
            };
            break;
            
          case 'monthly':
            sortField = 'gamification.leaderboards.monthlyXP';
            // Filter for users active this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            timeFilter = {
              'gamification.streaks.lastActivity': { $gte: startOfMonth }
            };
            break;
            
          case 'alltime':
            sortField = 'gamification.xp';
            break;
            
          case 'streak':
            sortField = 'gamification.streaks.current';
            break;
            
          case 'accuracy':
            sortField = 'gamification.stats.accuracy';
            // Only include users with at least 10 questions answered
            timeFilter = {
              'gamification.stats.totalQuestionsAnswered': { $gte: 10 }
            };
            break;
            
          default:
            return res.status(400).json({ error: 'Invalid leaderboard type' });
        }

        const leaderboard = await User.find(timeFilter)
          .select('name email image gamification.xp gamification.level gamification.streaks gamification.stats gamification.leaderboards')
          .sort({ [sortField]: -1 })
          .limit(parseInt(limit))
          .lean();

        // Add rank and format data
        const formattedLeaderboard = leaderboard.map((user, index) => ({
          rank: index + 1,
          id: user._id,
          name: user.name,
          image: user.image,
          xp: user.gamification.xp,
          level: user.gamification.level,
          streak: user.gamification.streaks.current,
          accuracy: Math.round(user.gamification.stats.accuracy || 0),
          totalQuestions: user.gamification.stats.totalQuestionsAnswered,
          weeklyXP: user.gamification.leaderboards.weeklyXP || 0,
          monthlyXP: user.gamification.leaderboards.monthlyXP || 0,
        }));

        // Get current user's rank if not in top results
        let userRank = null;
        const currentUserInTop = formattedLeaderboard.find(u => u.id.toString() === session.user.id);
        
        if (!currentUserInTop) {
          const allUsers = await User.find(timeFilter)
            .select('_id')
            .sort({ [sortField]: -1 })
            .lean();
            
          userRank = allUsers.findIndex(u => u._id.toString() === session.user.id) + 1;
        }

        return res.status(200).json({
          leaderboard: formattedLeaderboard,
          userRank: currentUserInTop ? currentUserInTop.rank : userRank,
          type,
          total: await User.countDocuments(timeFilter)
        });

      case 'POST':
        // Update leaderboard rankings (called by cron job or admin)
        if (session.user.role !== 'admin') {
          return res.status(403).json({ error: 'Admin access required' });
        }

        await updateLeaderboardRankings();
        return res.status(200).json({ success: true });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Leaderboard API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper function to update all user rankings
async function updateLeaderboardRankings() {
  try {
    // Update weekly rankings
    const weeklyUsers = await User.find({})
      .select('_id gamification.leaderboards.weeklyXP')
      .sort({ 'gamification.leaderboards.weeklyXP': -1 })
      .lean();

    for (let i = 0; i < weeklyUsers.length; i++) {
      await User.findByIdAndUpdate(weeklyUsers[i]._id, {
        'gamification.leaderboards.weeklyRank': i + 1
      });
    }

    // Update monthly rankings
    const monthlyUsers = await User.find({})
      .select('_id gamification.leaderboards.monthlyXP')
      .sort({ 'gamification.leaderboards.monthlyXP': -1 })
      .lean();

    for (let i = 0; i < monthlyUsers.length; i++) {
      await User.findByIdAndUpdate(monthlyUsers[i]._id, {
        'gamification.leaderboards.monthlyRank': i + 1
      });
    }

    // Update all-time rankings
    const allTimeUsers = await User.find({})
      .select('_id gamification.xp')
      .sort({ 'gamification.xp': -1 })
      .lean();

    for (let i = 0; i < allTimeUsers.length; i++) {
      await User.findByIdAndUpdate(allTimeUsers[i]._id, {
        'gamification.leaderboards.allTimeRank': i + 1
      });
    }

    console.log('Leaderboard rankings updated successfully');
  } catch (error) {
    console.error('Error updating leaderboard rankings:', error);
    throw error;
  }
}
