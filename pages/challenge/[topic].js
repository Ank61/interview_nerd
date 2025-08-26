import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Loader2,
  CheckCircle,
  XCircle,
  Save,
  Clock,
  Target,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/header";

export default function ChallengePage() {
  const router = useRouter();
  const { topic } = router.query;
  const { data: session } = useSession();
  const { toast } = useToast();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSaving] = useState(false);
  const [results, setResults] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState("");
  const [autoSaving, setAutoSaving] = useState(false);

  useEffect(() => {
    if (topic) {
      fetchChallenge();
    }
  }, [topic]);

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

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (
        Object.keys(answers).length > 0 &&
        !challenge?.userProgress?.completed
      ) {
        saveProgress();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [answers]);

  const fetchChallenge = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/gamification/challenges/daily?topic=${encodeURIComponent(topic)}`
      );
      const data = await response.json();

      if (data.success) {
        setChallenge(data.data);
        // Initialize answers with saved progress or empty answers
        const initialAnswers = {};
        data.data.questions.forEach((q, index) => {
          initialAnswers[index] =
            data.data.userProgress?.answers?.[index] || "";
        });
        setAnswers(initialAnswers);

        if (data.data.userProgress?.completed) {
          setResults({
            score: 100,
            isCompleted: true,
            results: data.data.questions.map((q) => ({
              questionId: q._id,
              isCorrect: true,
              userAnswer: q.correctAnswer,
              correctAnswer: q.correctAnswer,
            })),
          });
        }
      } else {
        throw new Error(data.message || "Failed to load challenge");
      }
    } catch (error) {
      console.error("Error fetching challenge:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load challenge",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async () => {
    if (!challenge || autoSaving) return;

    try {
      setAutoSaving(true);
      const response = await fetch(
        "/api/gamification/challenges/save-progress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            challengeId: challenge._id,
            topic,
            answers,
            currentQuestionIndex,
          }),
        }
      );

      const data = await response.json();
      if (!data.success) {
        console.error("Failed to save progress:", data.message);
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const submitChallenge = async () => {
    if (!challenge || submitting) return;

    const answerArray = Object.values(answers);
    if (answerArray.some((a) => !a?.trim())) {
      toast({
        title: "Incomplete",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const response = await fetch("/api/gamification/challenges/daily", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId: challenge._id,
          answers: answerArray,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.data);
        setChallenge((prev) => ({
          ...prev,
          userProgress: {
            ...prev.userProgress,
            completed: true,
            progress: 100,
          },
        }));

        toast({
          title: data.data.isCompleted
            ? "Challenge Completed! 🎉"
            : "Challenge Submitted",
          description: data.data.isCompleted
            ? `+${challenge.xpReward} XP earned!`
            : `You scored ${data.data.score}%. Try again tomorrow!`,
        });
      } else {
        throw new Error(data.message || "Failed to submit challenge");
      }
    } catch (error) {
      console.error("Error submitting challenge:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit challenge",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
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
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
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
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
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
                We couldnt load the challenge. Please try again later.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  const totalQuestions = challenge.questions?.length || 0;
  const answeredQuestions = Object.values(answers).filter((a) =>
    a?.trim()
  ).length;
  const progress =
    totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  const isCompleted = challenge.userProgress?.completed;
  const streak = challenge.userProgress?.streak || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto max-w-6xl p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              disabled={submitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {topic}
            </Button>

            <div className="flex items-center space-x-3">
              {autoSaving && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  <Save className="mr-1 h-3 w-3" />
                  Auto-saving...
                </Badge>
              )}
              {timeLeft && !isCompleted && (
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-700 border-amber-200"
                >
                  <Clock className="mr-1 h-3 w-3" />
                  {timeLeft} left
                </Badge>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Daily {topic.charAt(0).toUpperCase() + topic.slice(1)} Challenge
            </h1>
            <p className="text-lg text-muted-foreground">
              {isCompleted
                ? "You've completed today's challenge! 🎉"
                : `Answer ${totalQuestions} questions to earn ${challenge.xpReward} XP`}
            </p>
          </div>

          {/* Challenge Stats */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">
                      Progress: {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-muted-foreground">
                      {answeredQuestions}/{totalQuestions} answered
                    </span>
                  </div>
                </div>

                {streak > 0 && (
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                    <Flame className="mr-1 h-3 w-3" />
                    {streak} day streak
                  </Badge>
                )}
              </div>

              <Progress value={progress} className="mt-3 h-2" />
            </CardHeader>
          </Card>

          {isCompleted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="text-center">
                <CardHeader className="py-12">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6">
                    <Award className="h-10 w-10 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-600 mb-2">
                    Challenge Completed!
                  </CardTitle>
                  <CardDescription className="text-lg mb-6">
                    Youve earned {challenge.xpReward} XP for completing this
                    challenge.
                  </CardDescription>

                  {streak > 1 && (
                    <div className="inline-flex items-center justify-center rounded-full bg-amber-100 px-6 py-2 text-sm font-medium text-amber-800 mb-6">
                      <Flame className="mr-2 h-4 w-4" />
                      {streak} day streak!
                    </div>
                  )}

                  <div className="flex justify-center space-x-4">
                    <Button asChild size="lg">
                      <Link href={`/category/${topic.toLowerCase()}`}>
                        Continue Learning
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => router.push("/dashboard")}
                    >
                      View Dashboard
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Questions */}
              <AnimatePresence mode="wait">
                {challenge.questions?.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            Question {index + 1}
                          </CardTitle>
                          <Badge
                            variant={
                              answers[index]?.trim() ? "default" : "secondary"
                            }
                          >
                            {answers[index]?.trim() ? "Answered" : "Pending"}
                          </Badge>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {question.question}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          placeholder="Type your answer here..."
                          value={answers[index] || ""}
                          onChange={(e) =>
                            handleAnswerChange(index, e.target.value)
                          }
                          className="min-h-[120px] resize-none"
                        />
                        <div className="mt-2 text-xs text-muted-foreground">
                          {answers[index]?.length || 0} characters
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Submit Button */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {answeredQuestions === totalQuestions
                        ? "All questions answered! Ready to submit."
                        : `${
                            totalQuestions - answeredQuestions
                          } questions remaining`}
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={saveProgress}
                        disabled={
                          autoSaving || Object.keys(answers).length === 0
                        }
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {autoSaving ? "Saving..." : "Save Progress"}
                      </Button>

                      <Button
                        onClick={submitChallenge}
                        disabled={
                          answeredQuestions !== totalQuestions || submitting
                        }
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Challenge
                            <CheckCircle className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
