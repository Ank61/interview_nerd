import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Star, Zap } from 'lucide-react';

const XPProgressBar = ({ 
  currentXP, 
  level, 
  nextLevelXP, 
  currentLevelXP, 
  progressToNextLevel,
  animated = true 
}) => {
  const xpForCurrentLevel = currentXP - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;

  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-full text-neutral-950 font-bold bg-brand"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {level}
          </motion.div>
          <div>
            <h3 className="font-semibold text-gray-900">Level {level}</h3>
            <p className="text-sm text-gray-600">
              {nextLevelXP ? `${xpForCurrentLevel}/${xpNeededForNext} XP` : 'Max Level!'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
          <Zap className="w-4 h-4 text-yellow-600" />
          <span className="font-semibold text-yellow-700">{currentXP?.toLocaleString()}</span>
        </div>
      </div>

      {nextLevelXP && (
        <div className="space-y-2">
          <Progress 
            value={progressToNextLevel} 
            className="h-3 bg-gray-200"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Level {level}</span>
            <span>{Math.round(progressToNextLevel)}% to Level {level + 1}</span>
          </div>
        </div>
      )}

      {!nextLevelXP && (
        <div className="flex items-center justify-center py-2">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Maximum Level Reached!</span>
        </div>
      )}
    </motion.div>
  );
};

export default XPProgressBar;
