import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export const useGamification = () => {
  const { data: session } = useSession();
  const [notification, setNotification] = useState({
    show: false,
    xpGained: 0,
    reason: '',
    levelUp: false,
    newLevel: null,
    badges: []
  });

  const processQuestionAnswer = useCallback(async (questionData) => {
    if (!session?.user?.id) return null;

    try {
      const response = await fetch(`/api/gamification/${session.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'process_question',
          data: questionData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process question');
      }

      const result = await response.json();

      // Show notification if XP was gained
      if (result.xp && result.xp.pointsAwarded > 0) {
        setNotification({
          show: true,
          xpGained: result.xp.pointsAwarded,
          reason: result.xp.reason,
          levelUp: result.xp.levelUp,
          newLevel: result.xp.level,
          badges: result.badges || []
        });
      }

      return result;
    } catch (error) {
      console.error('Error processing question answer:', error);
      return null;
    }
  }, [session?.user?.id]);

  const awardXP = useCallback(async (points, reason) => {
    if (!session?.user?.id) return null;

    try {
      const response = await fetch(`/api/gamification/${session.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'award_xp',
          data: { points, reason }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to award XP');
      }

      const result = await response.json();

      // Show notification
      setNotification({
        show: true,
        xpGained: result.pointsAwarded,
        reason: result.reason,
        levelUp: result.levelUp,
        newLevel: result.level,
        badges: []
      });

      return result;
    } catch (error) {
      console.error('Error awarding XP:', error);
      return null;
    }
  }, [session?.user?.id]);

  const updateStreak = useCallback(async () => {
    if (!session?.user?.id) return null;

    try {
      const response = await fetch(`/api/gamification/${session.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_streak'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update streak');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating streak:', error);
      return null;
    }
  }, [session?.user?.id]);

  const updateChallengeProgress = useCallback(async (challengeType, progress = 1) => {
    if (!session?.user?.id) return null;

    try {
      const response = await fetch(`/api/gamification/${session.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_challenge',
          data: { challengeType, progress }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update challenge progress');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating challenge progress:', error);
      return null;
    }
  }, [session?.user?.id]);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, show: false }));
  }, []);

  return {
    notification,
    processQuestionAnswer,
    awardXP,
    updateStreak,
    updateChallengeProgress,
    hideNotification
  };
};
