import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Zap, 
  Trophy, 
  Target, 
  Calendar, 
  Users, 
  Brain,
  Star,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  CheckCircle,
  Award,
  TrendingUp,
  BookOpen
} from 'lucide-react';

const GamificationOnboarding = ({ 
  isVisible, 
  onComplete, 
  onSkip,
  userLevel = 1 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const onboardingSteps = [
    {
      id: 'welcome',
      title: 'Welcome to Gamified Learning!',
      description: 'Transform your interview preparation into an engaging journey with our comprehensive gamification system.',
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      content: (
        <div className="text-center space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 Why Gamification?</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>• <strong>Stay Motivated:</strong> Earn XP and level up as you learn</li>
              <li>• <strong>Track Progress:</strong> Visual feedback on your improvement</li>
              <li>• <strong>Build Habits:</strong> Daily streaks and challenges</li>
              <li>• <strong>Compete & Connect:</strong> Leaderboards and social features</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'xp-levels',
      title: 'XP & Leveling System',
      description: 'Earn Experience Points (XP) for every learning activity and level up to unlock new features.',
      icon: <Zap className="w-12 h-12 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How to Earn XP:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Answer Question: <strong>10 XP</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-500" />
                <span>Study Topic: <strong>5 XP</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                <span>Daily Challenge: <strong>25 XP</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>Daily Login: <strong>5 XP</strong></span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Your Current Progress:</h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {userLevel}
              </div>
              <div className="flex-1">
                <p className="font-medium">Level {userLevel}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">67/100 XP to next level</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'streaks-challenges',
      title: 'Streaks & Daily Challenges',
      description: 'Build consistent learning habits with daily streaks and complete challenges for bonus rewards.',
      icon: <Calendar className="w-12 h-12 text-orange-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">🔥 Daily Streaks</h4>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  7
                </div>
                <p className="text-xs text-orange-700 mt-1">Current</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  15
                </div>
                <p className="text-xs text-gray-600 mt-1">Best</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <p className="text-xs text-blue-700 mt-1">Freeze</p>
              </div>
            </div>
            <p className="text-sm text-orange-800">
              Study daily to maintain your streak! Use freeze tokens to protect your streak on busy days.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">🎯 Daily Challenges</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="text-sm">Answer 5 JavaScript questions</span>
                <Badge variant="outline">3/5</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="text-sm">Maintain 80% accuracy</span>
                <Badge variant="default">Complete</Badge>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'badges-achievements',
      title: 'Badges & Achievements',
      description: 'Unlock special badges and achievements as you reach important milestones in your learning journey.',
      icon: <Award className="w-12 h-12 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-center">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h5 className="font-semibold text-yellow-900">First Steps</h5>
                <p className="text-xs text-yellow-700">Answer your first question</p>
                <Badge variant="outline" className="mt-2 border-yellow-300 text-yellow-800">Earned</Badge>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <div className="text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h5 className="font-semibold text-blue-900">Sharp Shooter</h5>
                <p className="text-xs text-blue-700">90% accuracy streak</p>
                <Badge variant="secondary" className="mt-2">In Progress</Badge>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">🏆 Achievement Categories</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>• Learning Milestones</div>
              <div>• Accuracy Achievements</div>
              <div>• Streak Rewards</div>
              <div>• Social Badges</div>
              <div>• Topic Mastery</div>
              <div>• Special Events</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'social-features',
      title: 'Social & Competition',
      description: 'Connect with other learners, compete on leaderboards, and share your achievements.',
      icon: <Users className="w-12 h-12 text-green-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-3">👥 Social Features</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm">Add friends and study together</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">Compete on weekly leaderboards</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Share achievements on social media</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">🏆 Leaderboards</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>1. Alex Chen</span>
                <span className="font-semibold">2,450 XP</span>
              </div>
              <div className="flex justify-between">
                <span>2. Sarah Kim</span>
                <span className="font-semibold">2,380 XP</span>
              </div>
              <div className="flex justify-between bg-yellow-100 px-2 py-1 rounded">
                <span>3. You</span>
                <span className="font-semibold">2,250 XP</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-features',
      title: 'AI-Powered Learning',
      description: 'Get personalized recommendations, spaced repetition, and advanced analytics to optimize your learning.',
      icon: <Brain className="w-12 h-12 text-indigo-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-3">🤖 AI Features</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Smart Recommendations</p>
                  <p className="text-xs text-gray-600">AI suggests questions based on your weak areas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Spaced Repetition</p>
                  <p className="text-xs text-gray-600">Review questions at optimal intervals for retention</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Advanced Analytics</p>
                  <p className="text-xs text-gray-600">Detailed insights into your learning patterns</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">📊 Your Learning Insights</h4>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div>
                <p className="font-bold text-blue-600">85%</p>
                <p className="text-xs text-gray-600">Accuracy</p>
              </div>
              <div>
                <p className="font-bold text-green-600">JavaScript</p>
                <p className="text-xs text-gray-600">Strongest</p>
              </div>
              <div>
                <p className="font-bold text-orange-600">React</p>
                <p className="text-xs text-gray-600">Focus Area</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'getting-started',
      title: 'Ready to Start!',
      description: 'You\'re all set to begin your gamified learning journey. Here are some quick tips to get started.',
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">🚀 Quick Start Tips</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <p className="text-sm">Start with a daily challenge to earn bonus XP</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <p className="text-sm">Answer questions consistently to build your streak</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <p className="text-sm">Check your dashboard regularly for AI recommendations</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <p className="text-sm">Add friends to compete and stay motivated</p>
              </div>
            </div>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">🎯 Your First Goal</h4>
            <p className="text-sm text-yellow-800">
              Complete todays daily challenge to earn <strong>25 XP</strong> and unlock your first achievement!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    onComplete();
  };

  const currentStepData = onboardingSteps[currentStep];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {currentStepData.icon}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                  <p className="text-blue-100">{currentStepData.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
                <span>{Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-blue-800 bg-opacity-30 rounded-full h-2">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStepData.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button variant="ghost" onClick={onSkip}>
                  Skip Tutorial
                </Button>
                
                {currentStep === onboardingSteps.length - 1 ? (
                  <Button
                    onClick={completeOnboarding}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Learning!
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GamificationOnboarding;
