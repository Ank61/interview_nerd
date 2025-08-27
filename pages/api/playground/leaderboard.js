import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import clientPromise from "@/lib/mongodb-adapter";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const client = await clientPromise;
    const db = client.db("interview_nerd");
    const usersCollection = db.collection("users");

    const { timeframe = 'all', language = 'all', limit = 50 } = req.query;

    // Build aggregation pipeline
    const pipeline = [
      {
        $match: {
          'playgroundStats.totalQuestions': { $gt: 0 }
        }
      }
    ];

    // Add time-based filtering for recent activity
    if (timeframe !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (timeframe) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'year':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        pipeline.push({
          $match: {
            'playgroundStats.lastActivity': { $gte: startDate }
          }
        });
      }
    }

    // Project fields and calculate scores
    pipeline.push({
      $project: {
        name: 1,
        email: 1,
        image: 1,
        level: 1,
        xp: 1,
        playgroundStats: 1,
        // Calculate overall score based on multiple factors
        overallScore: {
          $add: [
            { $multiply: ['$playgroundStats.totalQuestions', 10] },
            { $multiply: ['$playgroundStats.successRate', 2] },
            { $multiply: ['$xp', 0.1] },
            { $multiply: ['$level', 50] }
          ]
        },
        // Language-specific scores
        javascriptScore: {
          $multiply: [
            { $ifNull: ['$playgroundStats.languageBreakdown.javascript.solved', 0] },
            10
          ]
        },
        typescriptScore: {
          $multiply: [
            { $ifNull: ['$playgroundStats.languageBreakdown.typescript.solved', 0] },
            10
          ]
        },
        pythonScore: {
          $multiply: [
            { $ifNull: ['$playgroundStats.languageBreakdown.python.solved', 0] },
            10
          ]
        }
      }
    });

    // Sort based on language preference or overall score
    let sortField = 'overallScore';
    if (language === 'javascript') sortField = 'javascriptScore';
    else if (language === 'typescript') sortField = 'typescriptScore';
    else if (language === 'python') sortField = 'pythonScore';

    pipeline.push({
      $sort: { [sortField]: -1, 'playgroundStats.successRate': -1 }
    });

    pipeline.push({
      $limit: parseInt(limit)
    });

    // Add rank field
    pipeline.push({
      $group: {
        _id: null,
        users: { $push: '$$ROOT' }
      }
    });

    pipeline.push({
      $unwind: { path: '$users', includeArrayIndex: 'rank' }
    });

    pipeline.push({
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$users',
            { rank: { $add: ['$rank', 1] } }
          ]
        }
      }
    });

    const leaderboard = await usersCollection.aggregate(pipeline).toArray();

    // Find current user's position
    const currentUserRank = leaderboard.findIndex(user => 
      user._id.toString() === session.user.id
    ) + 1;

    // Get additional stats
    const totalUsers = await usersCollection.countDocuments({
      'playgroundStats.totalQuestions': { $gt: 0 }
    });

    const topPerformers = leaderboard.slice(0, 10).map(user => ({
      rank: user.rank,
      name: user.name,
      email: user.email,
      image: user.image,
      level: user.level || 1,
      xp: user.xp || 0,
      totalQuestions: user.playgroundStats?.totalQuestions || 0,
      successRate: user.playgroundStats?.successRate || 0,
      averageTime: user.playgroundStats?.averageTime || 0,
      languageBreakdown: user.playgroundStats?.languageBreakdown || {},
      score: language === 'all' ? user.overallScore : user[`${language}Score`] || 0,
      lastActivity: user.playgroundStats?.lastActivity
    }));

    // Get current user's full stats if not in top 10
    let currentUserStats = null;
    if (currentUserRank > 10) {
      const currentUser = leaderboard.find(user => 
        user._id.toString() === session.user.id
      );
      
      if (currentUser) {
        currentUserStats = {
          rank: currentUser.rank,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image,
          level: currentUser.level || 1,
          xp: currentUser.xp || 0,
          totalQuestions: currentUser.playgroundStats?.totalQuestions || 0,
          successRate: currentUser.playgroundStats?.successRate || 0,
          averageTime: currentUser.playgroundStats?.averageTime || 0,
          languageBreakdown: currentUser.playgroundStats?.languageBreakdown || {},
          score: language === 'all' ? currentUser.overallScore : currentUser[`${language}Score`] || 0,
          lastActivity: currentUser.playgroundStats?.lastActivity
        };
      }
    }

    res.status(200).json({
      success: true,
      leaderboard: topPerformers,
      currentUser: currentUserStats,
      currentUserRank: currentUserRank || null,
      totalUsers,
      filters: {
        timeframe,
        language,
        limit: parseInt(limit)
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch leaderboard data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
