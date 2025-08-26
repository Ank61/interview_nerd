import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ThumbsUp, ThumbsDown, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export default function QuestionFeedback({ questionId, className = '' }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userFeedback, setUserFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  // Load existing feedback if any
  useEffect(() => {
    if (session && questionId) {
      loadUserFeedback();
    }

    // Set up timer to track time spent on question
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000)); // in seconds
    }, 1000);

    return () => clearInterval(timer);
  }, [session, questionId]);

  const loadUserFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/questions/feedback?questionId=${questionId}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setUserFeedback(data.data);
      }
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitFeedback = async (isCorrect) => {
    if (!session) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to provide feedback.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/questions/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          isCorrect,
          userAnswer: isCorrect ? 'correct' : 'incorrect',
          timeSpent
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setUserFeedback(data.data);
        toast({
          title: 'Thank you!',
          description: 'Your feedback has been recorded.',
        });
      } else {
        throw new Error(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit feedback',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If user already provided feedback, show a thank you message
  if (userFeedback) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}>
        {userFeedback.isCorrect ? (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle className="mr-1 h-4 w-4" />
            <span>Thank you for your feedback!</span>
          </div>
        ) : (
          <div className="flex items-center text-amber-600 dark:text-amber-400">
            <XCircle className="mr-1 h-4 w-4" />
            <span>We&apos;ll use this to improve our questions.</span>
          </div>
        )}
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-2 ${className}`}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span className="text-sm text-muted-foreground">Loading feedback options...</span>
      </div>
    );
  }

  // Show feedback buttons
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <p className="text-sm text-muted-foreground">Was this helpful?</p>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => submitFeedback(true)}
          disabled={isSubmitting}
          className="flex items-center space-x-1"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Yes</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => submitFeedback(false)}
          disabled={isSubmitting}
          className="flex items-center space-x-1"
        >
          <ThumbsDown className="h-4 w-4" />
          <span>No</span>
        </Button>
      </div>
    </div>
  );
}
