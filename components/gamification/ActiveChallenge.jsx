import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Flame, Zap, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useToast } from '../ui/use-toast';
import Link from 'next/link';

export default function ActiveChallenge({ topic, className = '' }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (session) {
      fetchChallenge();
    }
  }, [session, topic]);

  useEffect(() => {
    if (!challenge) return;

    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    }, 60000); // Update every minute

    // Initial call
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const diff = endOfDay - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    setTimeLeft(`${hours}h ${minutes}m`);

    return () => clearInterval(timer);
  }, [challenge]);

  const fetchChallenge = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/gamification/challenges/daily?topic=${encodeURIComponent(topic)}`
      );
      const data = await response.json();
      
      if (data.success) {
        setChallenge(data.data);
      } else {
        throw new Error(data.message || 'Failed to load challenge');
      }
    } catch (error) {
      console.error('Error fetching daily challenge:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load daily challenge',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-32 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="mt-4 flex justify-between">
            <div className="h-10 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-24 animate-pulse rounded bg-muted" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!challenge) {
    return null;
  }

  const progress = challenge.userProgress?.progress || 0;
  const isCompleted = challenge.userProgress?.completed;
  const streak = challenge.userProgress?.streak || 0;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Daily Challenge</CardTitle>
          {!isCompleted && timeLeft && (
            <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              {timeLeft} left
            </div>
          )}
        </div>
        <CardDescription>
          {isCompleted 
            ? 'You&apos;ve completed today&apos;s challenge! 🎉' 
            : 'Complete the challenge to earn XP and maintain your streak.'}
        </CardDescription>
        
        <div className="pt-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="mt-1 h-2" />
        </div>
      </CardHeader>

      <CardContent>
        {isCompleted ? (
          <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="mt-3 text-lg font-medium text-green-800 dark:text-green-200">
              Challenge Completed!
            </h4>
            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
              Youve earned {challenge.xpReward} XP for todays challenge.
            </p>
            {streak > 1 && (
              <div className="mt-2 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                <Flame className="mr-1 h-3 w-3" />
                {streak} day streak!
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800/30">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    {challenge.xpReward} XP
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    +{challenge.streakBonus * (streak || 1)} XP streak bonus
                  </p>
                </div>
              </div>
              
              <Button asChild size="sm">
                <Link href={`/challenge/${topic}`}>
                  Start Challenge
                </Link>
              </Button>
            </div>
            
            {streak > 0 && (
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium">
                    {streak} day{streak !== 1 ? 's' : ''} streak
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Complete today to keep it going!
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
