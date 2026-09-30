import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Flame, Zap, Award, CheckCircle, Clock, Target, ArrowRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getThemeColors } from '@/lib/themeUtils';


export default function ActiveChallenge({ topic, className = '' }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
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
    }, 60000);

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

  const handleStartChallenge = () => {
    router.push(`/challenge/${topic}`);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`${className} border-l-4 border-l-blue-500`}>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
              <div className="space-y-2">
                <div className="h-5 w-32 animate-pulse rounded bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded bg-muted" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!challenge) {
    return null; // Don't show anything when there's no challenge
  }

  const progress = challenge.userProgress?.progress || 0;
  const isCompleted = challenge.userProgress?.completed;
  const streak = challenge.userProgress?.streak || 0;
  const questionsCount = challenge.questions?.length || 0;
  
  // Get theme colors for the current topic
  const themeColors = getThemeColors(topic);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`${className} border-l-4 hover:shadow-md transition-shadow`}
        style={{
          borderLeftColor: isCompleted ? '#10b981' : themeColors.bg,
          backgroundColor: '#111113',
          borderColor: themeColors.border
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: isCompleted ? '#dcfce7' : themeColors.light
                }}
              >
                {isCompleted ? (
                  <Award className="h-5 w-5 text-green-600" />
                ) : (
                  <Target className="h-5 w-5" style={{ color: themeColors.text }} />
                )}
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Daily Challenge
                  {streak > 0 && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      <Flame className="mr-1 h-3 w-3" />
                      {streak}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isCompleted 
                    ? `Completed! +${challenge.xpReward} XP earned` 
                    : `${questionsCount} questions • ${challenge.xpReward} XP`}
                </CardDescription>
              </div>
            </div>
            
            {!isCompleted && timeLeft && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Clock className="mr-1 h-3 w-3" />
                {timeLeft}
              </Badge>
            )}
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
              style={{
                backgroundColor: isCompleted ? '#dcfce7' : themeColors.light
              }}
            />
          </div>
        </CardHeader>

        <CardContent>
          {isCompleted ? (
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-center border border-green-200"
            >
              <div className="flex items-center justify-center space-x-2 text-green-700 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Challenge Completed!</span>
              </div>
              <p className="text-sm text-green-600 mb-3">
                Great job! Youve earned {challenge.xpReward} XP today.
              </p>
              {streak > 1 && (
                <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  <Flame className="mr-1 h-3 w-3" />
                  {streak} day streak!
                </div>
              )}
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span>Earn {challenge.xpReward} XP</span>
                </div>
                <div className="text-muted-foreground">
                  {questionsCount} questions
                </div>
              </div>
              
              <Button 
                onClick={handleStartChallenge}
                className="w-full text-white"
                style={{
                  background: `linear-gradient(to right, ${themeColors.bg}, ${themeColors.text})`,
                  borderColor: themeColors.border
                }}
                size="lg"
              >
                Start Challenge
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
