import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, CheckCircle, Zap } from 'lucide-react';

const ChallengeCard = ({ 
  challenge, 
  timeRemaining = null,
  onStart = null 
}) => {
  if (!challenge) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
        <div className="text-center py-4">
          <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No active challenge</p>
        </div>
      </div>
    );
  }

  const progressPercentage = (challenge.progress / challenge.target) * 100;
  const isCompleted = challenge.completed;
  const isExpired = timeRemaining && timeRemaining <= 0;

  const getChallengeIcon = (type) => {
    switch (type) {
      case 'accuracy': return '🎯';
      case 'speed': return '⚡';
      case 'topic': return '📚';
      case 'review': return '🔄';
      default: return '🎯';
    }
  };

  const getChallengeColor = (type) => {
    switch (type) {
      case 'accuracy': return 'from-green-50 to-emerald-50 border-green-200';
      case 'speed': return 'from-yellow-50 to-orange-50 border-yellow-200';
      case 'topic': return 'from-blue-50 to-indigo-50 border-blue-200';
      case 'review': return 'from-purple-50 to-pink-50 border-purple-200';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const formatTimeRemaining = (seconds) => {
    if (seconds <= 0) return 'Expired';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <motion.div 
      className={`bg-gradient-to-r ${getChallengeColor(challenge.type)} rounded-xl p-4 border`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getChallengeIcon(challenge.type)}</div>
          <div>
            <h4 className="font-semibold text-gray-900">{challenge.name}</h4>
            <p className="text-sm text-gray-600">{challenge.description}</p>
          </div>
        </div>

        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full"
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-700">Complete!</span>
          </motion.div>
        )}

        {!isCompleted && timeRemaining && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            isExpired ? 'bg-red-100' : 'bg-orange-100'
          }`}>
            <Clock className={`w-3 h-3 ${isExpired ? 'text-red-600' : 'text-orange-600'}`} />
            <span className={`text-xs font-medium ${
              isExpired ? 'text-red-700' : 'text-orange-700'
            }`}>
              {formatTimeRemaining(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">
            {challenge.progress}/{challenge.target}
          </span>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-2"
        />
        
        <div className="text-xs text-gray-500 text-right">
          {Math.round(progressPercentage)}% Complete
        </div>
      </div>

      {/* Reward */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>Reward: {challenge.xpReward} XP</span>
        </div>

        {!isCompleted && !isExpired && onStart && (
          <button
            onClick={onStart}
            className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Start Challenge
          </button>
        )}
      </div>

      {/* Completion Animation */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-10 rounded-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6, times: [0, 0.6, 1] }}
            className="text-4xl"
          >
            🎉
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChallengeCard;
