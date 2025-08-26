import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Clock, 
  Brain, 
  Calendar, 
  TrendingUp, 
  Target,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Zap,
  RotateCcw
} from 'lucide-react';

const SpacedRepetition = ({ compact = false }) => {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [dueQuestions, setDueQuestions] = useState([]);
  const [studyPlan, setStudyPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (session?.user?.id) {
      fetchSpacedRepetitionData();
    }
  }, [session]);

  const fetchSpacedRepetitionData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats, due questions, and study plan in parallel
      const [statsResponse, dueQuestionsResponse, studyPlanResponse] = await Promise.all([
        fetch(`/api/gamification/spaced-repetition/${session.user.id}?action=stats`),
        fetch(`/api/gamification/spaced-repetition/${session.user.id}?action=due-questions&limit=5`),
        fetch(`/api/gamification/spaced-repetition/${session.user.id}?action=study-session&timeMinutes=30`)
      ]);

      const [statsData, dueQuestionsData, studyPlanData] = await Promise.all([
        statsResponse.json(),
        dueQuestionsResponse.json(),
        studyPlanResponse.json()
      ]);

      if (statsData.success) setStats(statsData.stats);
      if (dueQuestionsData.success) setDueQuestions(dueQuestionsData.dueQuestions);
      if (studyPlanData.success) setStudyPlan(studyPlanData.studyPlan);
      
    } catch (error) {
      console.error('Error fetching spaced repetition data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuestionReview = async (questionId, userResponse) => {
    try {
      const response = await fetch(`/api/gamification/spaced-repetition/${session.user.id}?action=update-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          userResponse
        })
      });

      const data = await response.json();
      if (data.success) {
        // Refresh data after update
        fetchSpacedRepetitionData();
      }
    } catch (error) {
      console.error('Error updating question review:', error);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Spaced Repetition
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

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="w-5 h-5 text-blue-600" />
            Review Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Due Today */}
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-900">Due Today</span>
            </div>
            <Badge variant="destructive">{stats?.dueToday || 0}</Badge>
          </div>

          {/* Due Tomorrow */}
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-900">Due Tomorrow</span>
            </div>
            <Badge variant="outline" className="border-yellow-300 text-yellow-800">
              {stats?.dueTomorrow || 0}
            </Badge>
          </div>

          {/* Mastered */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Mastered</span>
            </div>
            <Badge variant="outline" className="border-green-300 text-green-800">
              {stats?.masteredQuestions || 0}
            </Badge>
          </div>

          {/* Quick Start Button */}
          {(stats?.dueToday || 0) > 0 && (
            <Button 
              className="w-full mt-3" 
              onClick={() => setActiveTab('review')}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Review Session
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600" />
          Spaced Repetition System
        </CardTitle>
        <div className="flex gap-2 mt-4">
          {['overview', 'review', 'schedule', 'progress'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-900">{stats?.dueToday || 0}</p>
                <p className="text-sm text-red-700">Due Today</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-900">{stats?.dueTomorrow || 0}</p>
                <p className="text-sm text-yellow-700">Due Tomorrow</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">{stats?.dueThisWeek || 0}</p>
                <p className="text-sm text-blue-700">This Week</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">{stats?.masteredQuestions || 0}</p>
                <p className="text-sm text-green-700">Mastered</p>
              </div>
            </div>

            {/* Study Plan Preview */}
            {studyPlan && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Recommended Study Session
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700 font-medium">Questions to Review</p>
                    <p className="text-blue-900 text-lg font-bold">
                      {studyPlan.sessionStats.questionsToReview}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Estimated Time</p>
                    <p className="text-blue-900 text-lg font-bold">
                      {studyPlan.sessionStats.estimatedTime} min
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">New Questions</p>
                    <p className="text-blue-900 text-lg font-bold">
                      {studyPlan.sessionStats.newQuestions}
                    </p>
                  </div>
                </div>
                {studyPlan.studyTips?.length > 0 && (
                  <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium mb-1">Study Tip:</p>
                    <p className="text-sm text-blue-800">{studyPlan.studyTips[0]}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'review' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-blue-600" />
              Questions Due for Review
            </h4>
            {dueQuestions.length > 0 ? (
              dueQuestions.map((question, index) => (
                <div key={question._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-1">{question.question}</h5>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline">{question.category}</Badge>
                        <Badge variant={question.difficulty === 'hard' ? 'destructive' : 
                                      question.difficulty === 'medium' ? 'default' : 'secondary'}>
                          {question.difficulty}
                        </Badge>
                        {question.priority > 50 && (
                          <Badge variant="destructive">High Priority</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {question.spacedRepetition && (
                    <div className="text-xs text-gray-500 mb-3">
                      Review #{question.spacedRepetition.repetitionCount + 1} • 
                      Last reviewed: {question.spacedRepetition.lastReviewDate ? 
                        new Date(question.spacedRepetition.lastReviewDate).toLocaleDateString() : 'Never'}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateQuestionReview(question._id, { 
                        correct: true, 
                        confidence: 4, 
                        responseTime: 45 
                      })}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Got it right
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateQuestionReview(question._id, { 
                        correct: false, 
                        confidence: 2, 
                        responseTime: 90 
                      })}
                    >
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Need more practice
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <p>All caught up! No questions due for review.</p>
                <p className="text-sm">Great job staying on top of your studies!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Review Schedule
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p className="font-medium text-red-900">Overdue Reviews</p>
                  <p className="text-sm text-red-700">Questions that should have been reviewed already</p>
                </div>
                <Badge variant="destructive">{stats?.overdue || 0}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-orange-200 rounded-lg bg-orange-50">
                <div>
                  <p className="font-medium text-orange-900">Due Today</p>
                  <p className="text-sm text-orange-700">Questions scheduled for today</p>
                </div>
                <Badge variant="outline" className="border-orange-300 text-orange-800">
                  {stats?.dueToday || 0}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                <div>
                  <p className="font-medium text-yellow-900">Due Tomorrow</p>
                  <p className="text-sm text-yellow-700">Questions coming up tomorrow</p>
                </div>
                <Badge variant="outline" className="border-yellow-300 text-yellow-800">
                  {stats?.dueTomorrow || 0}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg bg-blue-50">
                <div>
                  <p className="font-medium text-blue-900">This Week</p>
                  <p className="text-sm text-blue-700">Questions due in the next 7 days</p>
                </div>
                <Badge variant="outline" className="border-blue-300 text-blue-800">
                  {stats?.dueThisWeek || 0}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Learning Progress
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Total Questions</h5>
                <p className="text-2xl font-bold text-blue-600">{stats?.totalQuestions || 0}</p>
                <p className="text-sm text-gray-600">Questions in your review system</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Mastered Questions</h5>
                <p className="text-2xl font-bold text-green-600">{stats?.masteredQuestions || 0}</p>
                <p className="text-sm text-gray-600">Questions you've mastered</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Average Interval</h5>
                <p className="text-2xl font-bold text-purple-600">{stats?.averageInterval || 0} days</p>
                <p className="text-sm text-gray-600">Average time between reviews</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">New Questions</h5>
                <p className="text-2xl font-bold text-orange-600">{stats?.newQuestions || 0}</p>
                <p className="text-sm text-gray-600">Questions not yet reviewed</p>
              </div>
            </div>
            
            {stats?.masteredQuestions > 0 && stats?.totalQuestions > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-900 mb-2">Mastery Progress</h5>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.round((stats.masteredQuestions / stats.totalQuestions) * 100)}%` 
                    }}
                  ></div>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  {Math.round((stats.masteredQuestions / stats.totalQuestions) * 100)}% of questions mastered
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpacedRepetition;
