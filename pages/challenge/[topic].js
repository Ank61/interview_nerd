import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import DailyChallenge from '@/components/gamification/DailyChallenge';

export default function ChallengePage() {
  const router = useRouter();
  const { topic } = router.query;
  const { data: session } = useSession();
  const { toast } = useToast();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (topic) {
      fetchChallenge();
    }
  }, [topic]);

  const fetchChallenge = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/gamification/challenges/daily?topic=${encodeURIComponent(topic)}`
      );
      const data = await response.json();
      
      if (data.success) {
        setChallenge(data.data);
        if (data.data.userProgress?.completed) {
          setResults({
            score: 100,
            isCompleted: true,
            results: data.data.questions.map(q => ({
              questionId: q._id,
              isCorrect: true,
              userAnswer: q.correctAnswer,
              correctAnswer: q.correctAnswer
            }))
          });
        }
      } else {
        throw new Error(data.message || 'Failed to load challenge');
      }
    } catch (error) {
      console.error('Error fetching challenge:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load challenge',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChallengeComplete = (result) => {
    setResults(result);
    // Update the challenge data to reflect completion
    if (challenge) {
      setChallenge(prev => ({
        ...prev,
        userProgress: {
          ...prev.userProgress,
          completed: true,
          progress: 100,
          completedToday: true
        }
      }));
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto max-w-4xl p-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {topic}
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access the daily challenge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/auth/signin">
                Sign In
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl p-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.back()}
          className="mb-6"
          disabled={loading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {topic}
        </Button>
        
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="container mx-auto max-w-4xl p-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {topic}
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Challenge Not Available</CardTitle>
            <CardDescription>
              We couldn't load the challenge. Please try again later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => router.back()}
        className="mb-6"
        disabled={submitting}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {topic}
      </Button>
      
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Daily {topic.charAt(0).toUpperCase() + topic.slice(1)} Challenge
      </h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Challenge Progress</CardTitle>
                <CardDescription>
                  {challenge.userProgress?.completed 
                    ? 'You&apos;ve completed this challenge!' 
                    : 'Complete all questions to earn XP and maintain your streak.'}
                </CardDescription>
              </div>
              {challenge.userProgress?.streak > 0 && (
                <div className="flex items-center space-x-1 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                  <span className="font-medium">{challenge.userProgress.streak} day streak</span>
                </div>
              )}
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{challenge.userProgress?.progress || 0}%</span>
              </div>
              <Progress 
                value={challenge.userProgress?.progress || 0} 
                className="mt-1 h-2" 
              />
            </div>
          </CardHeader>
        </Card>
        
        {!challenge.userProgress?.completed ? (
          <DailyChallenge 
            topic={topic}
            onComplete={handleChallengeComplete}
          />
        ) : (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="mt-4 text-green-600 dark:text-green-400">
                Challenge Completed!
              </CardTitle>
              <CardDescription className="text-lg">
                You&apos;ve earned {challenge.xpReward} XP for completing this challenge.
              </CardDescription>
              
              {challenge.userProgress?.streak > 1 && (
                <div className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-50 px-4 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                  <span className="font-medium">{challenge.userProgress.streak} day streak!</span>
                </div>
              )}
              
              <div className="mt-6">
                <Button asChild>
                  <Link href={`/category/${topic.toLowerCase()}`}>
                    Back to {topic} Questions
                  </Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
