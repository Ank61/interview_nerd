import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Zap, Flame, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Progress } from '../ui/progress';
import { useToast } from '../ui/use-toast';

export default function DailyChallenge({ topic, className = '', onComplete }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (session) {
      fetchChallenge();
    }
  }, [session, topic]);

  const fetchChallenge = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gamification/challenges/daily?topic=${encodeURIComponent(topic)}`);
      const data = await response.json();
      
      if (data.success) {
        setChallenge(data.data);
        // Initialize selected answers
        const initialAnswers = {};
        data.data.questions.forEach((q, i) => {
          initialAnswers[i] = '';
        });
        setSelectedAnswers(initialAnswers);
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

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const submitChallenge = async () => {
    if (!challenge || submitting) return;
    
    const answers = Object.values(selectedAnswers);
    if (answers.some(a => !a)) {
      toast({
        title: 'Incomplete',
        description: 'Please answer all questions before submitting.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/gamification/challenges/daily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          challengeId: challenge._id,
          answers: answers
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
        setShowResults(true);
        
        // Show success toast with XP earned
        toast({
          title: data.data.isCompleted ? 'Challenge Completed! 🎉' : 'Challenge Submitted',
          description: data.data.isCompleted 
            ? `+${challenge.xpReward} XP earned! ${data.data.streakMessage || ''}`
            : `You scored ${data.data.score}%. Try again tomorrow!`,
        });

        // Refresh challenge data to update progress
        await fetchChallenge();
        
        // Notify parent component if challenge was completed
        if (data.data.isCompleted && onComplete) {
          onComplete(data.data);
        }
      } else {
        throw new Error(data.message || 'Failed to submit challenge');
      }
    } catch (error) {
      console.error('Error submitting challenge:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit challenge',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetChallenge = () => {
    setShowResults(false);
    setResults(null);
    const initialAnswers = {};
    challenge.questions.forEach((_, i) => {
      initialAnswers[i] = '';
    });
    setSelectedAnswers(initialAnswers);
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 w-full animate-pulse rounded bg-muted/50" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!challenge) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Daily Challenge</CardTitle>
          <CardDescription>Failed to load challenge. Please try again later.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const allAnswered = Object.values(selectedAnswers).every(Boolean);
  const progress = challenge.userProgress?.progress || 0;
  const isCompleted = challenge.userProgress?.completed;
  const streak = challenge.userProgress?.streak || 0;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Daily {topic.charAt(0).toUpperCase() + topic.slice(1)} Challenge
            </CardTitle>
            <CardDescription className="mt-1">
              {isCompleted 
                ? 'You&apos;ve completed today&apos;s challenge! 🎉' 
                : 'Complete the challenge to earn XP and maintain your streak.'}
            </CardDescription>
          </div>
          {streak > 0 && (
            <div className="flex items-center space-x-1 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              <Flame className="h-4 w-4" />
              <span>{streak} day{streak !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        
        <div className="pt-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="mt-1 h-2" />
        </div>
      </CardHeader>

      {!isCompleted && (
        <CardContent>
          {showResults ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {results.score}%
                </div>
                <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                  {results.isCompleted 
                    ? 'Challenge completed! You earned XP.'
                    : 'Good effort! Try again tomorrow to improve your score.'}
                </p>
                {results.streakMessage && (
                  <div className="mt-2 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                    <Flame className="mr-1 h-3 w-3" />
                    {results.streakMessage}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {challenge.questions.map((question, qIndex) => {
                  const result = results.results.find(r => 
                    r.questionId === question._id.toString()
                  );
                  const isCorrect = result?.isCorrect;
                  
                  return (
                    <div key={qIndex} className="space-y-2">
                      <div className="flex items-start">
                        <span className="mr-2 font-medium">{qIndex + 1}.</span>
                        <div>
                          <p className="font-medium">{question.question}</p>
                          <div className="mt-2 space-y-2">
                            {question.options.map((option, oIndex) => {
                              const isSelected = selectedAnswers[qIndex] === option;
                              const isCorrectAnswer = option === question.correctAnswer;
                              
                              let className = 'block w-full p-2 text-sm rounded border';
                              
                              if (showResults) {
                                if (isCorrectAnswer) {
                                  className += ' bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
                                } else if (isSelected && !isCorrect) {
                                  className += ' bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
                                }
                              } else {
                                className += ' hover:bg-muted/50';
                              }
                              
                              if (isSelected) {
                                className += ' bg-muted';
                              }
                              
                              return (
                                <div key={oIndex} className="relative">
                                  <div 
                                    className={className}
                                    onClick={() => !showResults && handleAnswerSelect(qIndex, option)}
                                  >
                                    {option}
                                  </div>
                                  {showResults && isSelected && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                      {isCorrect ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          
                          {showResults && !isCorrect && (
                            <div className="mt-2 rounded bg-amber-50 p-2 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                              <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={resetChallenge}
                  disabled={submitting}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {challenge.questions.map((question, qIndex) => (
                  <div key={qIndex} className="space-y-2">
                    <div className="flex items-start">
                      <span className="mr-2 font-medium">{qIndex + 1}.</span>
                      <div>
                        <p className="font-medium">{question.question}</p>
                        <div className="mt-2 space-y-2">
                          {question.options?.map((option, oIndex) => (
                            <div 
                              key={oIndex}
                              className={`block w-full cursor-pointer rounded border p-2 text-sm transition-colors ${
                                selectedAnswers[qIndex] === option 
                                  ? 'bg-primary/10 border-primary' 
                                  : 'hover:bg-muted/50 border-border'
                              }`}
                              onClick={() => handleAnswerSelect(qIndex, option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>+{challenge.xpReward} XP</span>
                  {challenge.userProgress?.streak > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex items-center">
                        <Flame className="mr-1 h-3.5 w-3.5 text-amber-500" />
                        <span>+{challenge.streakBonus * challenge.userProgress.streak} streak bonus</span>
                      </div>
                    </>
                  )}
                </div>
                
                <Button 
                  onClick={submitChallenge}
                  disabled={!allAnswered || submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Challenge'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      )}
      
      {isCompleted && (
        <CardContent className="pt-0">
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
            {challenge.userProgress?.streak > 1 && (
              <div className="mt-2 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                <Flame className="mr-1 h-3 w-3" />
                {challenge.userProgress.streak} day streak!
              </div>
            )}
            <p className="mt-3 text-xs text-green-600 dark:text-green-400">
              Come back tomorrow for a new challenge!
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
