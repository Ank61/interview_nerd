import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Flame, Zap, Award, CheckCircle, Clock, Target, ArrowRight, Calendar, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

export default function MCQDailyChallenge({ className = '' }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (session) {
      fetchChallenge();
    }
  }, [session]);

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
      const response = await fetch('/api/gamification/daily-challenge');
      const data = await response.json();
      
      if (data.success) {
        setChallenge(data.data);
        // Find the first unanswered question
        const firstUnanswered = data.data.questions.findIndex(q => q.userAnswer === -1);
        if (firstUnanswered !== -1) {
          setCurrentQuestionIndex(firstUnanswered);
        }
      } else {
        throw new Error(data.error || 'Failed to load challenge');
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

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer || submitting) return;

    try {
      setSubmitting(true);
      const response = await fetch('/api/gamification/daily-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submit_answer',
          questionIndex: currentQuestionIndex,
          answer: parseInt(selectedAnswer),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update local challenge state
        const updatedChallenge = { ...challenge };
        updatedChallenge.questions[currentQuestionIndex].userAnswer = parseInt(selectedAnswer);
        updatedChallenge.questions[currentQuestionIndex].isCorrect = data.isCorrect;
        updatedChallenge.score = data.score;
        updatedChallenge.completedQuestions = data.completedQuestions;
        updatedChallenge.isCompleted = data.isCompleted;
        
        setChallenge(updatedChallenge);
        setShowExplanation(true);

        // Show result toast
        toast({
          title: data.isCorrect ? 'Correct!' : 'Incorrect',
          description: data.isCorrect 
            ? 'Great job! You got it right.' 
            : `The correct answer was option ${data.correctAnswer + 1}.`,
          variant: data.isCorrect ? 'default' : 'destructive',
        });

        if (data.isCompleted) {
          toast({
            title: 'Challenge Completed!',
            description: `You scored ${data.score}/5. Great work!`,
            variant: 'default',
          });
        }
      } else {
        throw new Error(data.error || 'Failed to submit answer');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit answer',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer('');
    
    // Find next unanswered question
    const nextUnanswered = challenge.questions.findIndex((q, index) => 
      index > currentQuestionIndex && q.userAnswer === -1
    );
    
    if (nextUnanswered !== -1) {
      setCurrentQuestionIndex(nextUnanswered);
    }
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
    return null;
  }

  const currentQuestion = challenge.questions[currentQuestionIndex];
  const progress = (challenge.completedQuestions / challenge.totalQuestions) * 100;
  const isCompleted = challenge.isCompleted;
  const streak = challenge.streak || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`${className} border-l-4 hover:shadow-md transition-shadow`}
        style={{
          borderLeftColor: isCompleted ? '#10b981' : '#3b82f6',
          backgroundColor: '#111113',
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: isCompleted ? '#dcfce7' : '#dbeafe'
                }}
              >
                {isCompleted ? (
                  <Award className="h-5 w-5 text-green-600" />
                ) : (
                  <Brain className="h-5 w-5 text-brand" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Daily MCQ Challenge
                  {streak > 0 && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      <Flame className="mr-1 h-3 w-3" />
                      {streak}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  {isCompleted 
                    ? `Completed! Score: ${challenge.score}/5 (+${challenge.score * 10} XP)` 
                    : `Question ${challenge.completedQuestions + 1} of ${challenge.totalQuestions}`}
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
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
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
                You scored {challenge.score}/5 and earned {challenge.score * 10} XP!
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {currentQuestion.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      {currentQuestion.question}
                    </h3>
                    
                    <RadioGroup 
                      value={selectedAnswer} 
                      onValueChange={setSelectedAnswer}
                      disabled={showExplanation}
                    >
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={index.toString()} 
                            id={`option-${index}`}
                            className={showExplanation ? (
                              index === currentQuestion.correctAnswer ? 'border-green-500' :
                              index === currentQuestion.userAnswer ? 'border-red-500' : ''
                            ) : ''}
                          />
                          <Label 
                            htmlFor={`option-${index}`} 
                            className={`flex-1 cursor-pointer p-2 rounded ${
                              showExplanation ? (
                                index === currentQuestion.correctAnswer ? 'bg-green-50 text-green-800' :
                                index === currentQuestion.userAnswer && index !== currentQuestion.correctAnswer ? 'bg-red-50 text-red-800' : ''
                              ) : ''
                            }`}
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                      <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                      <p className="text-sm text-blue-800">{currentQuestion.explanation}</p>
                    </motion.div>
                  )}

                  <div className="flex gap-2">
                    {!showExplanation ? (
                      <Button 
                        onClick={handleAnswerSubmit}
                        disabled={!selectedAnswer || submitting}
                        className="flex-1"
                      >
                        {submitting ? 'Submitting...' : 'Submit Answer'}
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNextQuestion}
                        className="flex-1"
                        disabled={challenge.completedQuestions >= challenge.totalQuestions}
                      >
                        {challenge.completedQuestions >= challenge.totalQuestions ? 'Completed!' : 'Next Question'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
