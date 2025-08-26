// Spaced Repetition System for Interview Questions
// Based on the SM-2 algorithm with modifications for interview preparation

export class SpacedRepetitionEngine {
  constructor() {
    this.intervals = {
      // Initial intervals in days
      1: 1,     // First review: 1 day
      2: 3,     // Second review: 3 days  
      3: 7,     // Third review: 1 week
      4: 14,    // Fourth review: 2 weeks
      5: 30,    // Fifth review: 1 month
      6: 90,    // Sixth review: 3 months
      7: 180    // Seventh review: 6 months
    };
    
    this.difficultyMultipliers = {
      'easy': 0.7,
      'medium': 1.0,
      'hard': 1.3
    };
  }

  // Calculate next review date based on performance
  calculateNextReview(questionData, userResponse) {
    const { 
      repetitionCount = 0, 
      easinessFactor = 2.5, 
      lastReviewDate = null,
      difficulty = 'medium'
    } = questionData;

    const { 
      correct, 
      responseTime, 
      confidence = 3 // 1-5 scale
    } = userResponse;

    let newEasinessFactor = easinessFactor;
    let newRepetitionCount = repetitionCount;
    let intervalDays = 1;

    if (correct) {
      newRepetitionCount += 1;
      
      // Calculate base interval
      if (newRepetitionCount <= 7) {
        intervalDays = this.intervals[newRepetitionCount] || 180;
      } else {
        // For reviews beyond 7th, use exponential growth
        intervalDays = Math.round(this.intervals[7] * Math.pow(newEasinessFactor, newRepetitionCount - 7));
      }

      // Adjust based on confidence and response time
      const confidenceMultiplier = this.getConfidenceMultiplier(confidence);
      const timeMultiplier = this.getTimeMultiplier(responseTime, difficulty);
      
      intervalDays = Math.round(intervalDays * confidenceMultiplier * timeMultiplier);
      
      // Update easiness factor based on performance
      newEasinessFactor = Math.max(1.3, 
        easinessFactor + (0.1 - (5 - confidence) * (0.08 + (5 - confidence) * 0.02))
      );
    } else {
      // Incorrect answer - reset repetition count and shorten interval
      newRepetitionCount = 0;
      intervalDays = 1; // Review tomorrow
      newEasinessFactor = Math.max(1.3, easinessFactor - 0.2);
    }

    // Apply difficulty multiplier
    intervalDays = Math.round(intervalDays * this.difficultyMultipliers[difficulty]);
    
    // Ensure minimum and maximum intervals
    intervalDays = Math.max(1, Math.min(intervalDays, 365));

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);

    return {
      nextReviewDate,
      repetitionCount: newRepetitionCount,
      easinessFactor: newEasinessFactor,
      intervalDays,
      lastReviewDate: new Date()
    };
  }

  getConfidenceMultiplier(confidence) {
    // Confidence scale: 1 (very unsure) to 5 (very confident)
    const multipliers = {
      1: 0.6,  // Very unsure - review sooner
      2: 0.8,  // Somewhat unsure
      3: 1.0,  // Neutral
      4: 1.2,  // Confident
      5: 1.4   // Very confident - review later
    };
    return multipliers[confidence] || 1.0;
  }

  getTimeMultiplier(responseTime, difficulty) {
    if (!responseTime) return 1.0;

    // Expected times in seconds based on difficulty
    const expectedTimes = {
      'easy': 30,
      'medium': 60,
      'hard': 120
    };

    const expectedTime = expectedTimes[difficulty] || 60;
    const ratio = responseTime / expectedTime;

    if (ratio <= 0.5) {
      return 1.3; // Very fast - increase interval
    } else if (ratio <= 1.0) {
      return 1.1; // Fast - slightly increase interval
    } else if (ratio <= 2.0) {
      return 1.0; // Normal time
    } else {
      return 0.8; // Slow - decrease interval
    }
  }

  // Get questions due for review
  getQuestionsForReview(userQuestions, limit = 10) {
    const now = new Date();
    const dueQuestions = [];

    for (const question of userQuestions) {
      const spacedRepetitionData = question.spacedRepetition || {};
      const nextReviewDate = spacedRepetitionData.nextReviewDate ? 
        new Date(spacedRepetitionData.nextReviewDate) : new Date(0);

      if (nextReviewDate <= now) {
        dueQuestions.push({
          ...question,
          priority: this.calculateReviewPriority(spacedRepetitionData, now)
        });
      }
    }

    // Sort by priority (higher priority first)
    dueQuestions.sort((a, b) => b.priority - a.priority);
    
    return dueQuestions.slice(0, limit);
  }

  calculateReviewPriority(spacedRepetitionData, now) {
    const { 
      nextReviewDate, 
      repetitionCount = 0, 
      easinessFactor = 2.5,
      lastReviewDate 
    } = spacedRepetitionData;

    if (!nextReviewDate) return 100; // New questions have highest priority

    const reviewDate = new Date(nextReviewDate);
    const daysPastDue = Math.max(0, (now - reviewDate) / (1000 * 60 * 60 * 24));
    
    // Priority factors:
    // 1. How overdue the question is
    // 2. Lower repetition count = higher priority
    // 3. Lower easiness factor = higher priority (harder questions)
    
    let priority = daysPastDue * 10; // Base priority from being overdue
    priority += Math.max(0, 10 - repetitionCount); // Boost for less reviewed questions
    priority += Math.max(0, (3.0 - easinessFactor) * 5); // Boost for difficult questions
    
    return Math.round(priority);
  }

  // Generate review statistics
  getReviewStats(userQuestions) {
    const now = new Date();
    const stats = {
      totalQuestions: userQuestions.length,
      dueToday: 0,
      dueTomorrow: 0,
      dueThisWeek: 0,
      overdue: 0,
      newQuestions: 0,
      masteredQuestions: 0,
      averageInterval: 0
    };

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    let totalInterval = 0;
    let questionsWithInterval = 0;

    for (const question of userQuestions) {
      const spacedRepetitionData = question.spacedRepetition || {};
      const nextReviewDate = spacedRepetitionData.nextReviewDate ? 
        new Date(spacedRepetitionData.nextReviewDate) : null;
      const repetitionCount = spacedRepetitionData.repetitionCount || 0;

      if (!nextReviewDate) {
        stats.newQuestions++;
      } else {
        if (nextReviewDate <= now) {
          stats.dueToday++;
          if (nextReviewDate < now) {
            stats.overdue++;
          }
        } else if (nextReviewDate <= tomorrow) {
          stats.dueTomorrow++;
        } else if (nextReviewDate <= nextWeek) {
          stats.dueThisWeek++;
        }

        if (repetitionCount >= 5 && spacedRepetitionData.easinessFactor >= 2.5) {
          stats.masteredQuestions++;
        }

        if (spacedRepetitionData.intervalDays) {
          totalInterval += spacedRepetitionData.intervalDays;
          questionsWithInterval++;
        }
      }
    }

    if (questionsWithInterval > 0) {
      stats.averageInterval = Math.round(totalInterval / questionsWithInterval);
    }

    return stats;
  }

  // Suggest optimal study session
  planStudySession(userQuestions, availableTimeMinutes = 30) {
    const questionsPerMinute = 0.5; // Assume 2 minutes per question on average
    const maxQuestions = Math.floor(availableTimeMinutes * questionsPerMinute);
    
    const dueQuestions = this.getQuestionsForReview(userQuestions, maxQuestions);
    const reviewStats = this.getReviewStats(userQuestions);
    
    return {
      recommendedQuestions: dueQuestions,
      sessionStats: {
        estimatedTime: dueQuestions.length * 2, // 2 minutes per question
        questionsToReview: dueQuestions.length,
        newQuestions: dueQuestions.filter(q => !q.spacedRepetition?.nextReviewDate).length,
        reviewQuestions: dueQuestions.filter(q => q.spacedRepetition?.nextReviewDate).length
      },
      studyTips: this.generateStudyTips(reviewStats, dueQuestions.length)
    };
  }

  generateStudyTips(reviewStats, sessionSize) {
    const tips = [];
    
    if (reviewStats.overdue > 5) {
      tips.push("You have several overdue reviews. Focus on catching up to maintain your learning momentum.");
    }
    
    if (sessionSize > 15) {
      tips.push("Large review session ahead! Take breaks every 10 questions to maintain focus.");
    }
    
    if (reviewStats.newQuestions > reviewStats.totalQuestions * 0.3) {
      tips.push("Balance new learning with review. Try to review 2-3 old questions for every new one.");
    }
    
    if (reviewStats.masteredQuestions > reviewStats.totalQuestions * 0.5) {
      tips.push("Great progress! You've mastered many questions. Consider exploring new topics.");
    }
    
    return tips;
  }
}

// Export singleton instance
export const spacedRepetitionEngine = new SpacedRepetitionEngine();
