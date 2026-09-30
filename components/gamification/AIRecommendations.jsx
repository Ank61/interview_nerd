import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Lightbulb,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Zap
} from 'lucide-react';

const AIRecommendations = ({ compact = false }) => {
  const { data: session } = useSession();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (session?.user?.id) {
      fetchRecommendations();
    }
  }, [session]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gamification/recommendations/${session.user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Recommendations
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

  if (!recommendations) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No recommendations available yet.</p>
            <p className="text-sm">Complete more questions to get personalized insights!</p>
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
            <Brain className="w-5 h-5 text-purple-600" />
            Quick Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Top motivational tip */}
          {recommendations.motivationalTips?.[0] && (
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-purple-900">
                  {recommendations.motivationalTips[0].message}
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  {recommendations.motivationalTips[0].action}
                </p>
              </div>
            </div>
          )}

          {/* Top weak area */}
          {recommendations.weakAreas?.[0] && (
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <Target className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-orange-900">
                  Focus on {recommendations.weakAreas[0].topic}
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  {Math.round(recommendations.weakAreas[0].accuracy * 100)}% accuracy • 
                  {recommendations.weakAreas[0].questionsAnswered} questions completed
                </p>
              </div>
            </div>
          )}

          {/* Study plan highlight */}
          {recommendations.studyPlan && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-900">
                  Daily Goal: {recommendations.studyPlan.dailyGoal.questions} questions
                </p>
                <p className="text-xs text-brand mt-1">
                  Best time: {recommendations.studyPlan.optimalStudyTime}
                </p>
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
          <Brain className="w-6 h-6 text-purple-600" />
          AI-Powered Recommendations
        </CardTitle>
        <div className="flex gap-2 mt-4">
          {['overview', 'weakAreas', 'studyPlan', 'learningPath'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab === 'weakAreas' ? 'Focus Areas' : 
               tab === 'studyPlan' ? 'Study Plan' :
               tab === 'learningPath' ? 'Learning Path' : 'Overview'}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Motivational Tips */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                Motivational Insights
              </h4>
              <div className="space-y-3">
                {recommendations.motivationalTips?.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex-shrink-0">
                      {tip.type === 'streak' && <Zap className="w-5 h-5 text-orange-600" />}
                      {tip.type === 'progress' && <TrendingUp className="w-5 h-5 text-green-600" />}
                      {tip.type === 'performance' && <Target className="w-5 h-5 text-brand" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{tip.message}</p>
                      <p className="text-sm text-gray-600 mt-1">{tip.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-900">
                  {recommendations.weakAreas?.length || 0}
                </p>
                <p className="text-sm text-purple-700">Focus Areas</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-brand mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">
                  {recommendations.suggestedQuestions?.reduce((acc, curr) => acc + curr.questions.length, 0) || 0}
                </p>
                <p className="text-sm text-brand">Suggested Questions</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">
                  {recommendations.learningPath?.length || 0}
                </p>
                <p className="text-sm text-green-700">Learning Phases</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weakAreas' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              Areas for Improvement
            </h4>
            {recommendations.weakAreas?.length > 0 ? (
              recommendations.weakAreas.map((area, index) => (
                <div key={index} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-orange-900">{area.topic}</h5>
                    <Badge variant={area.priority === 'high' ? 'destructive' : 'secondary'}>
                      {area.priority} priority
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Accuracy</p>
                      <p className="text-lg font-semibold text-orange-900">
                        {Math.round(area.accuracy * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Questions Completed</p>
                      <p className="text-lg font-semibold text-orange-900">
                        {area.questionsAnswered}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-orange-700">
                    {area.reason === 'low_accuracy' 
                      ? 'Focus on understanding concepts and reviewing explanations'
                      : 'Practice more questions in this topic to build confidence'
                    }
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <p>Great job! No weak areas identified.</p>
                <p className="text-sm">Keep up the excellent work!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'studyPlan' && recommendations.studyPlan && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand" />
              Personalized Study Plan
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Daily Goals</h5>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• {recommendations.studyPlan.dailyGoal.questions} questions</li>
                    <li>• {recommendations.studyPlan.dailyGoal.timeMinutes} minutes study time</li>
                    <li>• {recommendations.studyPlan.dailyGoal.xpTarget} XP target</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">Weekly Goals</h5>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• {recommendations.studyPlan.weeklyGoal.questions} questions total</li>
                    <li>• {recommendations.studyPlan.weeklyGoal.streakTarget} day streak</li>
                    <li>• Explore {recommendations.studyPlan.weeklyGoal.newTopicsToExplore} new topic</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-900 mb-2">Optimal Schedule</h5>
                  <p className="text-sm text-purple-800 mb-2">
                    <strong>Best study time:</strong> {recommendations.studyPlan.optimalStudyTime}
                  </p>
                  <p className="text-sm text-purple-800">
                    <strong>Recommended breaks:</strong> {recommendations.studyPlan.recommendedBreaks}
                  </p>
                </div>
                
                {recommendations.studyPlan.focusAreas?.length > 0 && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h5 className="font-medium text-orange-900 mb-2">Focus Areas</h5>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.studyPlan.focusAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-orange-800 border-orange-300">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learningPath' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-green-600" />
              Your Learning Journey
            </h4>
            {recommendations.learningPath?.map((phase, index) => (
              <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="font-medium text-green-900">{phase.phase}</h5>
                    <p className="text-sm text-green-700">{phase.estimatedTime}</p>
                  </div>
                </div>
                <p className="text-sm text-green-800 mb-3">{phase.description}</p>
                <div className="space-y-1">
                  {phase.goals.map((goal, goalIndex) => (
                    <div key={goalIndex} className="flex items-center gap-2 text-sm text-green-700">
                      <ChevronRight className="w-3 h-3" />
                      {goal}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
