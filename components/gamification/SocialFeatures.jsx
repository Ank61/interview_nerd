import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar } from '../ui/avatar';
import { 
  Users, 
  UserPlus, 
  Trophy, 
  Heart, 
  MessageCircle, 
  Search,
  Crown,
  Zap,
  Share2,
  Check,
  X,
  Star
} from 'lucide-react';

const SocialFeatures = ({ compact = false }) => {
  const { data: session } = useSession();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsLeaderboard, setFriendsLeaderboard] = useState([]);
  const [achievementsFeed, setAchievementsFeed] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('friends');

  useEffect(() => {
    if (session?.user?.id) {
      fetchSocialData();
    }
  }, [session]);

  const fetchSocialData = async () => {
    try {
      setLoading(true);
      
      const [friendsRes, requestsRes, leaderboardRes, feedRes] = await Promise.all([
        fetch(`/api/gamification/social/${session.user.id}?action=friends`),
        fetch(`/api/gamification/social/${session.user.id}?action=friend-requests`),
        fetch(`/api/gamification/social/${session.user.id}?action=leaderboard-friends`),
        fetch(`/api/gamification/social/${session.user.id}?action=achievements-feed`)
      ]);

      const [friendsData, requestsData, leaderboardData, feedData] = await Promise.all([
        friendsRes.json(),
        requestsRes.json(),
        leaderboardRes.json(),
        feedRes.json()
      ]);

      if (friendsData.success) setFriends(friendsData.friends);
      if (requestsData.success) setFriendRequests(requestsData.friendRequests);
      if (leaderboardData.success) setFriendsLeaderboard(leaderboardData.leaderboard);
      if (feedData.success) setAchievementsFeed(feedData.achievements);
      
    } catch (error) {
      console.error('Error fetching social data:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/gamification/social/${session.user.id}?action=search-users&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.users);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const sendFriendRequest = async (targetUserId) => {
    try {
      const response = await fetch(`/api/gamification/social/${session.user.id}?action=send-friend-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId })
      });

      const data = await response.json();
      if (data.success) {
        // Update search results to reflect sent request
        setSearchResults(prev => prev.map(user => 
          user.id === targetUserId ? { ...user, requestSent: true } : user
        ));
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/gamification/social/${session.user.id}?action=accept-friend-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId })
      });

      const data = await response.json();
      if (data.success) {
        fetchSocialData(); // Refresh all data
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const declineFriendRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/gamification/social/${session.user.id}?action=decline-friend-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId })
      });

      const data = await response.json();
      if (data.success) {
        setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      }
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand" />
            Social Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-brand" />
            Friends & Community
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Friend Requests */}
          {friendRequests.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-brand" />
                <span className="text-sm font-medium text-blue-900">Friend Requests</span>
              </div>
              <Badge variant="default">{friendRequests.length}</Badge>
            </div>
          )}

          {/* Friends Count */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Friends</span>
            </div>
            <Badge variant="outline" className="border-green-300 text-green-800">
              {friends.length}
            </Badge>
          </div>

          {/* Top Friend */}
          {friendsLeaderboard.length > 1 && (
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Top Friend</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <img src={friendsLeaderboard[0]?.image} alt={friendsLeaderboard[0]?.name} />
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-yellow-900">{friendsLeaderboard[0]?.name}</p>
                  <p className="text-xs text-yellow-700">Level {friendsLeaderboard[0]?.level}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-brand" />
          Social Features
        </CardTitle>
        <div className="flex gap-2 mt-4">
          {['friends', 'requests', 'leaderboard', 'feed', 'search'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab === 'requests' && friendRequests.length > 0 && (
                <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                  {friendRequests.length}
                </Badge>
              )}
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'friends' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-brand" />
              Your Friends ({friends.length})
            </h4>
            {friends.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <Avatar className="w-10 h-10">
                      <img src={friend.image} alt={friend.name} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{friend.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline">Level {friend.level}</Badge>
                        <span>{friend.xp} XP</span>
                        {friend.currentStreak > 0 && (
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-orange-500" />
                            <span>{friend.currentStreak}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {friend.isOnline && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No friends yet</p>
                <p className="text-sm">Search for users to add as friends!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-brand" />
              Friend Requests ({friendRequests.length})
            </h4>
            {friendRequests.length > 0 ? (
              friendRequests.map((request) => (
                <div key={request.id} className="flex items-center gap-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <Avatar className="w-10 h-10">
                    <img src={request.from.image} alt={request.from.name} />
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{request.from.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge variant="outline">Level {request.from.level}</Badge>
                      <span>{new Date(request.sentAt).toLocaleDateString()}</span>
                    </div>
                    {request.message && (
                      <p className="text-sm text-gray-700 mt-1">{request.message}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => acceptFriendRequest(request.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => declineFriendRequest(request.id)}
                    >
                      <X className="w-3 h-3 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No pending friend requests</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-600" />
              Friends Leaderboard
            </h4>
            {friendsLeaderboard.length > 0 ? (
              <div className="space-y-3">
                {friendsLeaderboard.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      user.isCurrentUser 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm font-bold">
                      {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                      {index !== 0 && user.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <img src={user.image} alt={user.name} />
                    </Avatar>
                    <div className="flex-1">
                      <p className={`font-medium ${user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                        {user.name} {user.isCurrentUser && '(You)'}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>Level {user.level}</span>
                        <span>{user.xp} XP</span>
                        <span>{Math.round(user.accuracy * 100)}% accuracy</span>
                      </div>
                    </div>
                    {user.currentStreak > 0 && (
                      <div className="flex items-center gap-1 text-orange-600">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">{user.currentStreak}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Add friends to see the leaderboard!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-600" />
              Achievements Feed
            </h4>
            {achievementsFeed.length > 0 ? (
              achievementsFeed.map((achievement) => (
                <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <img src={achievement.user.image} alt={achievement.user.name} />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-gray-900">{achievement.user.name}</p>
                        <Badge variant="outline">{achievement.type}</Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(achievement.sharedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h5 className="font-semibold text-purple-900 mb-1">{achievement.title}</h5>
                      {achievement.description && (
                        <p className="text-sm text-gray-700 mb-2">{achievement.description}</p>
                      )}
                      {achievement.xpEarned > 0 && (
                        <div className="flex items-center gap-1 text-sm text-purple-700">
                          <Zap className="w-3 h-3" />
                          <span>+{achievement.xpEarned} XP</span>
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <button className="flex items-center gap-1 hover:text-red-600">
                          <Heart className="w-4 h-4" />
                          <span>{achievement.likes?.length || 0}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-brand">
                          <MessageCircle className="w-4 h-4" />
                          <span>{achievement.comments?.length || 0}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-600">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No recent achievements from friends</p>
                <p className="text-sm">Add friends to see their achievements!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-green-600" />
              Find Friends
            </h4>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchUsers(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/50 focus:border-transparent"
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="space-y-3">
                {searchResults.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <Avatar className="w-10 h-10">
                      <img src={user.image} alt={user.name} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline">Level {user.level}</Badge>
                        <span>{user.xp} XP</span>
                      </div>
                    </div>
                    {user.isFriend ? (
                      <Badge variant="default">Friends</Badge>
                    ) : user.requestSent ? (
                      <Badge variant="outline">Request Sent</Badge>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => sendFriendRequest(user.id)}
                      >
                        <UserPlus className="w-3 h-3 mr-1" />
                        Add Friend
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No users found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialFeatures;
