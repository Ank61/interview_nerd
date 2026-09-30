import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, BookOpen, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopicsProgressChart = ({ userId }) => {
  const [topicsData, setTopicsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Topic configurations with colors and icons
  const topicConfig = {
    Javascript: { 
      color: '#FFF59A', 
      darkColor: '#e4bc40', 
      textColor: '#745b10',
      icon: '🟨',
      totalConcepts: 85 // Approximate based on typical JS concepts
    },
    React: { 
      color: '#BFFCFF', 
      darkColor: '#12365F', 
      textColor: '#12365F',
      icon: '⚛️',
      totalConcepts: 70
    },
    Node: { 
      color: '#BAF7DB', 
      darkColor: '#0E5835', 
      textColor: '#0E5835',
      icon: '🟢',
      totalConcepts: 65
    },
    Typescript: { 
      color: '#E8F4FD', 
      darkColor: '#1E40AF', 
      textColor: '#1E40AF',
      icon: '🔷',
      totalConcepts: 60
    },
    SQL: { 
      color: '#F3E8FF', 
      darkColor: '#7C3AED', 
      textColor: '#7C3AED',
      icon: '🗄️',
      totalConcepts: 55
    },
    Next: { 
      color: '#E1E1E1', 
      darkColor: '#5D5D5D', 
      textColor: '#5D5D5D',
      icon: '▲',
      totalConcepts: 50
    },
    'AWS S3': { 
      color: '#FEF3C7', 
      darkColor: '#D97706', 
      textColor: '#D97706',
      icon: '☁️',
      totalConcepts: 40
    },
    RabbitMQ: { 
      color: '#ECFDF5', 
      darkColor: '#059669', 
      textColor: '#059669',
      icon: '🐰',
      totalConcepts: 35
    },
    OOP: { 
      color: '#FDF2F8', 
      darkColor: '#BE185D', 
      textColor: '#BE185D',
      icon: '🏗️',
      totalConcepts: 45
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTopicsProgress();
    }
  }, [userId]);

  const fetchTopicsProgress = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/learned-topic?userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        const learnedTopics = data.learnedPrepareTopics || [];
        
        // Group learned topics by category and count them
        const topicCounts = {};
        learnedTopics.forEach(item => {
          const topic = item.topic;
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });

        // Calculate percentages and create chart data
        const chartData = Object.entries(topicCounts)
          .map(([topic, learnedCount]) => {
            const config = topicConfig[topic];
            const totalConcepts = config?.totalConcepts || 50;
            const percentage = Math.min((learnedCount / totalConcepts) * 100, 100);
            
            return {
              topic,
              learnedCount,
              totalConcepts,
              percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal
              config: config || {
                color: '#17171a',
                darkColor: '#6B7280',
                textColor: '#dddde1',
                icon: '📚'
              }
            };
          })
          .sort((a, b) => b.learnedCount - a.learnedCount) // Sort by learned count
          .slice(0, 5); // Take top 5

        setTopicsData(chartData);
      }
    } catch (error) {
      console.error('Error fetching topics progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Learning Progress by Topic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex justify-between mb-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (topicsData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Learning Progress by Topic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Start learning topics to see your progress!</p>
            <p className="text-sm text-gray-400 mt-2">
              Mark concepts as learned to track your journey
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Learning Progress by Topic
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Top 5 topics with most learned concepts
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topicsData.map((item, index) => (
            <motion.div
              key={item.topic}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Topic Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{item.config.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.topic}</h4>
                    <p className="text-sm text-gray-500">
                      {item.learnedCount} of {item.totalConcepts} concepts
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: item.config.textColor }}
                  >
                    {item.percentage}%
                  </div>
                  {index === 0 && (
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <Award className="w-3 h-3" />
                      Top Progress
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div 
                  className="w-full rounded-full h-4 border border-gray-200"
                  style={{ backgroundColor: '#111113' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ 
                      backgroundColor: item.config.darkColor,
                      boxShadow: `0 2px 4px ${item.config.darkColor}20`
                    }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ 
                        duration: 1.5, 
                        delay: index * 0.2 + 0.5,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>

                {/* Progress indicator */}
                {item.percentage > 10 && (
                  <div 
                    className="absolute top-0 h-4 flex items-center justify-center text-xs font-semibold text-white"
                    style={{ width: `${item.percentage}%` }}
                  >
                    {item.percentage}%
                  </div>
                )}
              </div>

              {/* Milestone indicators */}
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>0%</span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.percentage >= 50 ? 'Halfway there!' : 'Keep going!'}
                </span>
                <span>100%</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 pt-6 border-t border-gray-100"
        >
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-brand">
                {topicsData.reduce((sum, item) => sum + item.learnedCount, 0)}
              </div>
              <div className="text-sm text-brand font-medium">
                Total Concepts Learned
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(topicsData.reduce((sum, item) => sum + item.percentage, 0) / topicsData.length)}%
              </div>
              <div className="text-sm text-green-700 font-medium">
                Average Progress
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default TopicsProgressChart;
