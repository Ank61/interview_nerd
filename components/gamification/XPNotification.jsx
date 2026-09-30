import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, Award, Flame } from 'lucide-react';

const XPNotification = ({ 
  show, 
  xpGained, 
  reason, 
  levelUp = false, 
  newLevel = null,
  badges = [],
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setCurrentStep(0);
      
      // Auto-advance through notifications
      const timer = setTimeout(() => {
        if (levelUp || badges.length > 0) {
          setCurrentStep(1);
          setTimeout(() => {
            if (badges.length > 0) {
              setCurrentStep(2);
              setTimeout(() => {
                handleComplete();
              }, 2000);
            } else {
              handleComplete();
            }
          }, 2000);
        } else {
          handleComplete();
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, levelUp, badges.length]);

  const handleComplete = () => {
    setVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleComplete}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-surface rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* XP Gained */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 0.6,
                    repeat: 1
                  }}
                  className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <Zap className="w-10 h-10 text-white" />
                </motion.div>
                
                <div>
                  <motion.h2 
                    className="text-3xl font-bold text-gray-900 mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    +{xpGained} XP
                  </motion.h2>
                  <p className="text-gray-600">{reason}</p>
                </div>

                {/* Floating XP particles */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1,
                      scale: 0
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      opacity: 0,
                      scale: 1
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.1
                    }}
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Level Up */}
            {currentStep === 1 && levelUp && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: 2
                  }}
                  className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <Star className="w-12 h-12 text-white" />
                </motion.div>
                
                <div>
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    LEVEL UP!
                  </h2>
                  <p className="text-xl font-semibold text-gray-900">
                    Level {newLevel}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Youre getting stronger! 💪
                  </p>
                </div>

                {/* Confetti effect */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#10b981'][i % 5],
                      left: '50%',
                      top: '30%'
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1,
                      scale: 0
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 400,
                      y: Math.random() * 300 + 100,
                      opacity: 0,
                      scale: 1,
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.05
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* New Badges */}
            {currentStep === 2 && badges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <Award className="w-10 h-10 text-white" />
                </motion.div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    New Badge{badges.length > 1 ? 's' : ''} Earned!
                  </h2>
                  
                  <div className="space-y-3">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200"
                      >
                        <div className="text-2xl">{badge.icon}</div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">{badge.name}</div>
                          <div className="text-sm text-gray-600">{badge.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleComplete}
              className="mt-6 px-6 py-2 bg-brand text-neutral-950 rounded-lg font-semibold hover:bg-brand/90 transition-colors"
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default XPNotification;
