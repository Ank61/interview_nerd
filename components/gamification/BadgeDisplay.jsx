import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Crown, Gem } from 'lucide-react';

const BadgeDisplay = ({ badges = [], showAll = false, limit = 6 }) => {
  const displayBadges = showAll ? badges : badges.slice(0, limit);
  const recentBadges = badges.filter(badge => 
    new Date() - new Date(badge.earnedAt) < 7 * 24 * 60 * 60 * 1000 // Last 7 days
  );

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-yellow-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'common': return <Award className="w-3 h-3" />;
      case 'rare': return <Star className="w-3 h-3" />;
      case 'epic': return <Gem className="w-3 h-3" />;
      case 'legendary': return <Crown className="w-3 h-3" />;
      default: return <Award className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Recent Achievements */}
      {recentBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="animate-pulse">🎉</span>
            Recent Achievements
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <AnimatePresence>
              {recentBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="relative group cursor-pointer flex-shrink-0"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-white text-2xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                    {badge.icon}
                  </div>
                  
                  {/* New badge indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-neutral-950 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <div className="font-semibold">{badge.name}</div>
                    <div className="text-gray-300">{badge.description}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* All Badges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-700">
            Achievements ({badges.length})
          </h4>
          {badges.length > limit && !showAll && (
            <button className="text-xs text-brand hover:text-brand font-medium">
              View All
            </button>
          )}
        </div>

        <div className="grid grid-cols-6 gap-3">
          <AnimatePresence>
            {displayBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all group-hover:scale-110`}>
                  <span className="text-lg">{badge.icon}</span>
                </div>

                {/* Rarity indicator */}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-white`}>
                  {getRarityIcon(badge.rarity)}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-neutral-950 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div className="font-semibold">{badge.name}</div>
                  <div className="text-gray-300">{badge.description}</div>
                  <div className="text-gray-400 capitalize">{badge.rarity}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty slots */}
          {!showAll && displayBadges.length < limit && (
            <>
              {Array.from({ length: limit - displayBadges.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="w-12 h-12 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
                >
                  <span className="text-gray-400 text-xs">?</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Badge Categories */}
      {showAll && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {['learning', 'streak', 'challenge', 'social', 'milestone'].map(category => {
            const categoryBadges = badges.filter(badge => badge.category === category);
            if (categoryBadges.length === 0) return null;

            return (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 capitalize mb-3">{category} Badges</h5>
                <div className="grid grid-cols-4 gap-2">
                  {categoryBadges.map(badge => (
                    <div key={badge.id} className="relative group cursor-pointer">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-white text-sm shadow-md group-hover:shadow-lg transition-all group-hover:scale-110`}>
                        {badge.icon}
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-neutral-950 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {badge.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
