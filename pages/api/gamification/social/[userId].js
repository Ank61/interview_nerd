import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";

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
      
      if (action === 'friends') {
        return await getFriends(req, res, userId);
      } else if (action === 'friend-requests') {
        return await getFriendRequests(req, res, userId);
      } else if (action === 'leaderboard-friends') {
        return await getFriendsLeaderboard(req, res, userId);
      } else if (action === 'achievements-feed') {
        return await getAchievementsFeed(req, res, userId);
      } else if (action === 'search-users') {
        return await searchUsers(req, res, userId);
      } else {
        return res.status(400).json({ error: 'Invalid action parameter' });
      }
    } catch (error) {
      console.error('Error in social GET:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { action } = req.query;
      
      if (action === 'send-friend-request') {
        return await sendFriendRequest(req, res, userId);
      } else if (action === 'accept-friend-request') {
        return await acceptFriendRequest(req, res, userId);
      } else if (action === 'decline-friend-request') {
        return await declineFriendRequest(req, res, userId);
      } else if (action === 'remove-friend') {
        return await removeFriend(req, res, userId);
      } else if (action === 'share-achievement') {
        return await shareAchievement(req, res, userId);
      } else {
        return res.status(400).json({ error: 'Invalid action parameter' });
      }
    } catch (error) {
      console.error('Error in social POST:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getFriends(req, res, userId) {
  const user = await User.findById(userId)
    .populate('gamificationData.social.friends', 'name email image gamificationData.level gamificationData.xp gamificationData.streaks')
    .lean();
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const friends = user.gamificationData?.social?.friends || [];
  const friendsWithStats = friends.map(friend => ({
    id: friend._id,
    name: friend.name,
    email: friend.email,
    image: friend.image,
    level: friend.gamificationData?.level || 1,
    xp: friend.gamificationData?.xp || 0,
    currentStreak: friend.gamificationData?.streaks?.current || 0,
    isOnline: isUserOnline(friend._id) // You'd implement this based on your online tracking
  }));

  res.status(200).json({
    success: true,
    friends: friendsWithStats
  });
}

async function getFriendRequests(req, res, userId) {
  const user = await User.findById(userId)
    .populate('gamificationData.social.friendRequests.from', 'name email image gamificationData.level')
    .lean();
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const friendRequests = user.gamificationData?.social?.friendRequests || [];
  const requestsWithDetails = friendRequests.map(request => ({
    id: request._id,
    from: {
      id: request.from._id,
      name: request.from.name,
      email: request.from.email,
      image: request.from.image,
      level: request.from.gamificationData?.level || 1
    },
    sentAt: request.sentAt,
    message: request.message
  }));

  res.status(200).json({
    success: true,
    friendRequests: requestsWithDetails
  });
}

async function getFriendsLeaderboard(req, res, userId) {
  const user = await User.findById(userId)
    .populate('gamificationData.social.friends', 'name image gamificationData')
    .lean();
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const friends = user.gamificationData?.social?.friends || [];
  
  // Include the user themselves in the leaderboard
  const allUsers = [
    {
      _id: user._id,
      name: user.name,
      image: user.image,
      gamificationData: user.gamificationData
    },
    ...friends
  ];

  // Create leaderboard entries
  const leaderboard = allUsers.map(friend => ({
    id: friend._id,
    name: friend.name,
    image: friend.image,
    level: friend.gamificationData?.level || 1,
    xp: friend.gamificationData?.xp || 0,
    currentStreak: friend.gamificationData?.streaks?.current || 0,
    totalQuestions: friend.gamificationData?.stats?.totalQuestions || 0,
    accuracy: friend.gamificationData?.stats?.accuracy || 0,
    isCurrentUser: friend._id.toString() === userId
  }));

  // Sort by XP (descending)
  leaderboard.sort((a, b) => b.xp - a.xp);

  // Add rankings
  leaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  res.status(200).json({
    success: true,
    leaderboard
  });
}

async function getAchievementsFeed(req, res, userId) {
  const { limit = 20 } = req.query;
  
  const user = await User.findById(userId)
    .populate('gamificationData.social.friends', '_id')
    .lean();
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const friendIds = user.gamificationData?.social?.friends?.map(f => f._id) || [];
  const allUserIds = [userId, ...friendIds];

  // Get recent achievements from friends and user
  const users = await User.find({ 
    _id: { $in: allUserIds },
    'gamificationData.social.sharedAchievements': { $exists: true, $ne: [] }
  })
  .select('name image gamificationData.social.sharedAchievements')
  .lean();

  const achievements = [];
  
  users.forEach(user => {
    const sharedAchievements = user.gamificationData?.social?.sharedAchievements || [];
    sharedAchievements.forEach(achievement => {
      achievements.push({
        id: achievement._id,
        user: {
          id: user._id,
          name: user.name,
          image: user.image
        },
        type: achievement.type,
        title: achievement.title,
        description: achievement.description,
        badge: achievement.badge,
        xpEarned: achievement.xpEarned,
        sharedAt: achievement.sharedAt,
        likes: achievement.likes || [],
        comments: achievement.comments || []
      });
    });
  });

  // Sort by shared date (most recent first)
  achievements.sort((a, b) => new Date(b.sharedAt) - new Date(a.sharedAt));

  res.status(200).json({
    success: true,
    achievements: achievements.slice(0, parseInt(limit))
  });
}

async function searchUsers(req, res, userId) {
  const { query, limit = 10 } = req.query;
  
  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }

  const users = await User.find({
    _id: { $ne: userId }, // Exclude current user
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  })
  .select('name email image gamificationData.level gamificationData.xp')
  .limit(parseInt(limit))
  .lean();

  const currentUser = await User.findById(userId).select('gamificationData.social.friends').lean();
  const friendIds = currentUser?.gamificationData?.social?.friends?.map(f => f.toString()) || [];

  const searchResults = users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    level: user.gamificationData?.level || 1,
    xp: user.gamificationData?.xp || 0,
    isFriend: friendIds.includes(user._id.toString())
  }));

  res.status(200).json({
    success: true,
    users: searchResults
  });
}

async function sendFriendRequest(req, res, userId) {
  const { targetUserId, message } = req.body;
  
  if (!targetUserId) {
    return res.status(400).json({ error: 'Target user ID is required' });
  }

  if (targetUserId === userId) {
    return res.status(400).json({ error: 'Cannot send friend request to yourself' });
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findById(userId),
    User.findById(targetUserId)
  ]);

  if (!currentUser || !targetUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Initialize social data if it doesn't exist
  if (!targetUser.gamificationData) targetUser.gamificationData = {};
  if (!targetUser.gamificationData.social) targetUser.gamificationData.social = {};
  if (!targetUser.gamificationData.social.friendRequests) targetUser.gamificationData.social.friendRequests = [];

  // Check if already friends
  const currentUserFriends = currentUser.gamificationData?.social?.friends || [];
  if (currentUserFriends.some(friendId => friendId.toString() === targetUserId)) {
    return res.status(400).json({ error: 'Already friends with this user' });
  }

  // Check if request already exists
  const existingRequest = targetUser.gamificationData.social.friendRequests.find(
    req => req.from.toString() === userId
  );
  
  if (existingRequest) {
    return res.status(400).json({ error: 'Friend request already sent' });
  }

  // Add friend request
  targetUser.gamificationData.social.friendRequests.push({
    from: userId,
    message: message || '',
    sentAt: new Date()
  });

  targetUser.markModified('gamificationData.social');
  await targetUser.save();

  res.status(200).json({
    success: true,
    message: 'Friend request sent successfully'
  });
}

async function acceptFriendRequest(req, res, userId) {
  const { requestId } = req.body;
  
  if (!requestId) {
    return res.status(400).json({ error: 'Request ID is required' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Initialize social data if it doesn't exist
  if (!user.gamificationData) user.gamificationData = {};
  if (!user.gamificationData.social) user.gamificationData.social = {};
  if (!user.gamificationData.social.friendRequests) user.gamificationData.social.friendRequests = [];
  if (!user.gamificationData.social.friends) user.gamificationData.social.friends = [];

  // Find and remove the friend request
  const requestIndex = user.gamificationData.social.friendRequests.findIndex(
    req => req._id.toString() === requestId
  );
  
  if (requestIndex === -1) {
    return res.status(404).json({ error: 'Friend request not found' });
  }

  const friendRequest = user.gamificationData.social.friendRequests[requestIndex];
  const friendId = friendRequest.from;

  // Remove the request
  user.gamificationData.social.friendRequests.splice(requestIndex, 1);

  // Add to friends list
  user.gamificationData.social.friends.push(friendId);

  // Add current user to the friend's friends list
  const friend = await User.findById(friendId);
  if (friend) {
    if (!friend.gamificationData) friend.gamificationData = {};
    if (!friend.gamificationData.social) friend.gamificationData.social = {};
    if (!friend.gamificationData.social.friends) friend.gamificationData.social.friends = [];
    
    friend.gamificationData.social.friends.push(userId);
    friend.markModified('gamificationData.social');
    await friend.save();
  }

  user.markModified('gamificationData.social');
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Friend request accepted'
  });
}

async function declineFriendRequest(req, res, userId) {
  const { requestId } = req.body;
  
  if (!requestId) {
    return res.status(400).json({ error: 'Request ID is required' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!user.gamificationData?.social?.friendRequests) {
    return res.status(404).json({ error: 'Friend request not found' });
  }

  // Find and remove the friend request
  const requestIndex = user.gamificationData.social.friendRequests.findIndex(
    req => req._id.toString() === requestId
  );
  
  if (requestIndex === -1) {
    return res.status(404).json({ error: 'Friend request not found' });
  }

  user.gamificationData.social.friendRequests.splice(requestIndex, 1);
  user.markModified('gamificationData.social');
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Friend request declined'
  });
}

async function removeFriend(req, res, userId) {
  const { friendId } = req.body;
  
  if (!friendId) {
    return res.status(400).json({ error: 'Friend ID is required' });
  }

  const [user, friend] = await Promise.all([
    User.findById(userId),
    User.findById(friendId)
  ]);

  if (!user || !friend) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove from current user's friends list
  if (user.gamificationData?.social?.friends) {
    user.gamificationData.social.friends = user.gamificationData.social.friends.filter(
      id => id.toString() !== friendId
    );
    user.markModified('gamificationData.social');
    await user.save();
  }

  // Remove from friend's friends list
  if (friend.gamificationData?.social?.friends) {
    friend.gamificationData.social.friends = friend.gamificationData.social.friends.filter(
      id => id.toString() !== userId
    );
    friend.markModified('gamificationData.social');
    await friend.save();
  }

  res.status(200).json({
    success: true,
    message: 'Friend removed successfully'
  });
}

async function shareAchievement(req, res, userId) {
  const { achievementType, title, description, badge, xpEarned } = req.body;
  
  if (!achievementType || !title) {
    return res.status(400).json({ error: 'Achievement type and title are required' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Initialize social data if it doesn't exist
  if (!user.gamificationData) user.gamificationData = {};
  if (!user.gamificationData.social) user.gamificationData.social = {};
  if (!user.gamificationData.social.sharedAchievements) user.gamificationData.social.sharedAchievements = [];

  // Add shared achievement
  const sharedAchievement = {
    type: achievementType,
    title,
    description: description || '',
    badge: badge || null,
    xpEarned: xpEarned || 0,
    sharedAt: new Date(),
    likes: [],
    comments: []
  };

  user.gamificationData.social.sharedAchievements.unshift(sharedAchievement);

  // Keep only last 50 shared achievements
  if (user.gamificationData.social.sharedAchievements.length > 50) {
    user.gamificationData.social.sharedAchievements = user.gamificationData.social.sharedAchievements.slice(0, 50);
  }

  user.markModified('gamificationData.social');
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Achievement shared successfully',
    achievement: sharedAchievement
  });
}

// Helper function to check if user is online (implement based on your needs)
function isUserOnline(userId) {
  // This would typically check against a Redis cache or similar
  // For now, return false as placeholder
  return false;
}
