import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, Snowflake } from 'lucide-react';

const StreakCounter = ({ 
  currentStreak, 
  longestStreak, 
  freezeTokens = 0,
  lastActivity 
}) => {
  const isActive = lastActivity && 
    new Date().toDateString() === new Date(lastActivity).toDateString();

  return (
    <motion.div 
      className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isActive ? 'bg-gradient-to-r from-orange-400 to-red-400' : 'bg-gray-300'
            }`}
            animate={isActive ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ 
              duration: 2, 
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse" 
            }}
          >
            <Flame className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500'}`} />
          </motion.div>
          
          <div>
            <h3 className="font-bold text-2xl text-gray-900">{currentStreak}</h3>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>
        </div>

        {freezeTokens > 0 && (
          <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
            <Snowflake className="w-3 h-3 text-brand" />
            <span className="text-xs font-medium text-brand">{freezeTokens}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Best: {longestStreak} days</span>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {isActive ? '🔥 Active Today' : '⏰ Study Today'}
        </div>
      </div>

      {/* Streak Milestones */}
      <div className="mt-3 flex gap-1">
        {[3, 7, 14, 30, 50, 100].map((milestone) => (
          <div
            key={milestone}
            className={`flex-1 h-2 rounded-full ${
              currentStreak >= milestone 
                ? 'bg-gradient-to-r from-orange-400 to-red-400' 
                : 'bg-gray-200'
            }`}
            title={`${milestone} day milestone`}
          />
        ))}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>3</span>
        <span>7</span>
        <span>14</span>
        <span>30</span>
        <span>50</span>
        <span>100</span>
      </div>
    </motion.div>
  );
};

export default StreakCounter;
