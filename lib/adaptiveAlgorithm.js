// Adaptive Algorithm System for Code Playground
// Adjusts difficulty based on user performance and learning patterns

export class AdaptiveAlgorithm {
  constructor() {
    this.performanceHistory = [];
    this.skillLevels = {
      javascript: { level: 1, experience: 0 },
      typescript: { level: 1, experience: 0 },
      python: { level: 1, experience: 0 }
    };
    this.learningPatterns = {
      averageTimePerDifficulty: { easy: 300, medium: 600, hard: 1200 }, // seconds
      successRates: { easy: 0.8, medium: 0.6, hard: 0.4 },
      preferredTopics: []
    };
  }

  // Record user performance for a completed question
  recordPerformance(questionData, userMetrics) {
    const performance = {
      questionId: questionData.id,
      language: questionData.language,
      difficulty: questionData.difficulty,
      timeSpent: userMetrics.timeSpent, // in seconds
      attempts: userMetrics.attempts,
      hintsUsed: userMetrics.hintsUsed,
      success: userMetrics.success,
      codeQuality: this.assessCodeQuality(userMetrics.finalCode),
      timestamp: new Date().toISOString(),
      tags: questionData.tags
    };

    this.performanceHistory.push(performance);
    this.updateSkillLevel(questionData.language, performance);
    this.updateLearningPatterns(performance);
    
    return performance;
  }

  // Assess code quality based on various factors
  assessCodeQuality(code) {
    let score = 100;
    
    // Deduct points for poor practices
    if (code.includes('var ')) score -= 10; // Prefer let/const
    if (code.split('\n').length > 50) score -= 15; // Too long
    if (!code.includes('//') && !code.includes('/*')) score -= 5; // No comments
    if (code.includes('console.log') && code.split('console.log').length > 3) score -= 10; // Too many logs
    
    // Add points for good practices
    if (code.includes('const ') || code.includes('let ')) score += 5;
    if (code.includes('//') || code.includes('/*')) score += 5;
    if (code.includes('try') && code.includes('catch')) score += 10; // Error handling
    
    return Math.max(0, Math.min(100, score));
  }

  // Update skill level based on performance
  updateSkillLevel(language, performance) {
    const currentSkill = this.skillLevels[language];
    let experienceGain = 0;

    // Base experience based on difficulty
    const baseExp = { easy: 10, medium: 25, hard: 50 }[performance.difficulty];
    
    // Multiply by success and quality factors
    const successMultiplier = performance.success ? 1.0 : 0.3;
    const qualityMultiplier = performance.codeQuality / 100;
    const timeMultiplier = this.getTimeMultiplier(performance);

    experienceGain = Math.floor(baseExp * successMultiplier * qualityMultiplier * timeMultiplier);
    
    currentSkill.experience += experienceGain;
    
    // Level up logic
    const expNeededForNextLevel = currentSkill.level * 100;
    if (currentSkill.experience >= expNeededForNextLevel) {
      currentSkill.level += 1;
      currentSkill.experience = currentSkill.experience - expNeededForNextLevel;
    }

    return { experienceGain, newLevel: currentSkill.level };
  }

  // Calculate time multiplier (faster = better, but not too fast = suspicious)
  getTimeMultiplier(performance) {
    const expectedTime = this.learningPatterns.averageTimePerDifficulty[performance.difficulty];
    const ratio = performance.timeSpent / expectedTime;
    
    if (ratio < 0.3) return 0.8; // Too fast, might be cheating
    if (ratio < 0.7) return 1.2; // Good speed
    if (ratio < 1.5) return 1.0; // Normal speed
    if (ratio < 3.0) return 0.8; // Slow but acceptable
    return 0.6; // Very slow
  }

  // Update learning patterns based on performance
  updateLearningPatterns(performance) {
    // Update average times
    const currentAvg = this.learningPatterns.averageTimePerDifficulty[performance.difficulty];
    this.learningPatterns.averageTimePerDifficulty[performance.difficulty] = 
      (currentAvg * 0.8) + (performance.timeSpent * 0.2);

    // Update success rates
    const recentPerformances = this.performanceHistory
      .filter(p => p.difficulty === performance.difficulty)
      .slice(-10); // Last 10 attempts
    
    const successRate = recentPerformances.reduce((sum, p) => sum + (p.success ? 1 : 0), 0) / recentPerformances.length;
    this.learningPatterns.successRates[performance.difficulty] = successRate;

    // Update preferred topics
    if (performance.success) {
      performance.tags.forEach(tag => {
        const existing = this.learningPatterns.preferredTopics.find(t => t.tag === tag);
        if (existing) {
          existing.score += 1;
        } else {
          this.learningPatterns.preferredTopics.push({ tag, score: 1 });
        }
      });
    }
  }

  // Get next recommended question based on adaptive algorithm
  getNextRecommendation(language, availableQuestions) {
    const userSkill = this.skillLevels[language];
    const recentPerformance = this.getRecentPerformance(language, 5);
    
    // Determine target difficulty
    let targetDifficulty = this.calculateTargetDifficulty(userSkill, recentPerformance);
    
    // Filter questions by language and difficulty
    let candidateQuestions = availableQuestions.filter(q => 
      q.language === language && q.difficulty === targetDifficulty
    );

    // If no questions at target difficulty, expand search
    if (candidateQuestions.length === 0) {
      candidateQuestions = availableQuestions.filter(q => q.language === language);
    }

    // Remove already completed questions (optional - for variety)
    const completedIds = this.performanceHistory
      .filter(p => p.success && p.language === language)
      .map(p => p.questionId);
    
    const uncompletedQuestions = candidateQuestions.filter(q => !completedIds.includes(q.id));
    const questionsToChooseFrom = uncompletedQuestions.length > 0 ? uncompletedQuestions : candidateQuestions;

    // Score questions based on user preferences and learning gaps
    const scoredQuestions = questionsToChooseFrom.map(question => ({
      question,
      score: this.scoreQuestion(question, recentPerformance)
    }));

    // Sort by score and return top recommendation
    scoredQuestions.sort((a, b) => b.score - a.score);
    
    return {
      recommendedQuestion: scoredQuestions[0]?.question || candidateQuestions[0],
      reasoning: this.generateRecommendationReasoning(targetDifficulty, userSkill, recentPerformance),
      alternativeQuestions: scoredQuestions.slice(1, 4).map(sq => sq.question)
    };
  }

  // Calculate target difficulty based on skill and recent performance
  calculateTargetDifficulty(userSkill, recentPerformance) {
    const baseLevel = userSkill.level;
    
    if (recentPerformance.length === 0) {
      return baseLevel <= 2 ? 'easy' : baseLevel <= 4 ? 'medium' : 'hard';
    }

    const recentSuccessRate = recentPerformance.reduce((sum, p) => sum + (p.success ? 1 : 0), 0) / recentPerformance.length;
    const avgQuality = recentPerformance.reduce((sum, p) => sum + p.codeQuality, 0) / recentPerformance.length;

    // Adaptive difficulty adjustment
    if (recentSuccessRate >= 0.8 && avgQuality >= 80) {
      // User is doing well, increase difficulty
      if (baseLevel <= 2) return 'medium';
      if (baseLevel <= 4) return 'hard';
      return 'hard';
    } else if (recentSuccessRate <= 0.4 || avgQuality <= 50) {
      // User is struggling, decrease difficulty
      if (baseLevel <= 2) return 'easy';
      if (baseLevel <= 4) return 'easy';
      return 'medium';
    } else {
      // Maintain current level
      if (baseLevel <= 2) return 'easy';
      if (baseLevel <= 4) return 'medium';
      return 'hard';
    }
  }

  // Score individual questions for recommendation
  scoreQuestion(question, recentPerformance) {
    let score = 50; // Base score

    // Prefer topics user has shown interest in
    const preferredTags = this.learningPatterns.preferredTopics
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(t => t.tag);

    const matchingTags = question.tags.filter(tag => preferredTags.includes(tag));
    score += matchingTags.length * 10;

    // Avoid recently failed topics temporarily
    const recentFailedTags = recentPerformance
      .filter(p => !p.success)
      .flatMap(p => p.tags);
    
    const conflictingTags = question.tags.filter(tag => recentFailedTags.includes(tag));
    score -= conflictingTags.length * 5;

    // Prefer variety in question types
    const recentQuestionTypes = recentPerformance.map(p => p.tags[0]); // Primary tag
    if (!recentQuestionTypes.includes(question.tags[0])) {
      score += 15;
    }

    return score;
  }

  // Get recent performance data
  getRecentPerformance(language, count = 5) {
    return this.performanceHistory
      .filter(p => p.language === language)
      .slice(-count);
  }

  // Generate human-readable reasoning for recommendations
  generateRecommendationReasoning(targetDifficulty, userSkill, recentPerformance) {
    const reasons = [];

    reasons.push(`Based on your level ${userSkill.level} in this language`);
    
    if (recentPerformance.length > 0) {
      const successRate = recentPerformance.reduce((sum, p) => sum + (p.success ? 1 : 0), 0) / recentPerformance.length;
      const avgQuality = recentPerformance.reduce((sum, p) => sum + p.codeQuality, 0) / recentPerformance.length;

      if (successRate >= 0.8) {
        reasons.push("you've been performing excellently");
      } else if (successRate >= 0.6) {
        reasons.push("you're making good progress");
      } else {
        reasons.push("let's focus on building confidence");
      }

      if (avgQuality >= 80) {
        reasons.push("your code quality is high");
      } else if (avgQuality >= 60) {
        reasons.push("your code quality is improving");
      } else {
        reasons.push("let's work on code quality");
      }
    }

    reasons.push(`I recommend ${targetDifficulty} level questions`);

    return reasons.join(', ') + '.';
  }

  // Get user statistics for dashboard
  getUserStats(language = null) {
    const relevantHistory = language 
      ? this.performanceHistory.filter(p => p.language === language)
      : this.performanceHistory;

    if (relevantHistory.length === 0) {
      return {
        totalQuestions: 0,
        successRate: 0,
        averageQuality: 0,
        totalTimeSpent: 0,
        skillLevels: this.skillLevels,
        strongTopics: [],
        improvementAreas: []
      };
    }

    const successRate = relevantHistory.reduce((sum, p) => sum + (p.success ? 1 : 0), 0) / relevantHistory.length;
    const averageQuality = relevantHistory.reduce((sum, p) => sum + p.codeQuality, 0) / relevantHistory.length;
    const totalTimeSpent = relevantHistory.reduce((sum, p) => sum + p.timeSpent, 0);

    // Analyze topics
    const topicPerformance = {};
    relevantHistory.forEach(p => {
      p.tags.forEach(tag => {
        if (!topicPerformance[tag]) {
          topicPerformance[tag] = { attempts: 0, successes: 0, totalQuality: 0 };
        }
        topicPerformance[tag].attempts++;
        if (p.success) topicPerformance[tag].successes++;
        topicPerformance[tag].totalQuality += p.codeQuality;
      });
    });

    const topicStats = Object.entries(topicPerformance).map(([tag, stats]) => ({
      tag,
      successRate: stats.successes / stats.attempts,
      averageQuality: stats.totalQuality / stats.attempts,
      attempts: stats.attempts
    }));

    const strongTopics = topicStats
      .filter(t => t.attempts >= 2 && t.successRate >= 0.7)
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5);

    const improvementAreas = topicStats
      .filter(t => t.attempts >= 2 && t.successRate < 0.5)
      .sort((a, b) => a.successRate - b.successRate)
      .slice(0, 5);

    return {
      totalQuestions: relevantHistory.length,
      successRate: Math.round(successRate * 100),
      averageQuality: Math.round(averageQuality),
      totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
      skillLevels: this.skillLevels,
      strongTopics,
      improvementAreas,
      recentTrend: this.calculateRecentTrend(relevantHistory)
    };
  }

  // Calculate recent performance trend
  calculateRecentTrend(history) {
    if (history.length < 4) return 'insufficient_data';

    const recent = history.slice(-5);
    const older = history.slice(-10, -5);

    if (older.length === 0) return 'insufficient_data';

    const recentSuccess = recent.reduce((sum, p) => sum + (p.success ? 1 : 0), 0) / recent.length;
    const olderSuccess = older.reduce((sum, p) => sum + (p.success ? 1 : 0), 0) / older.length;

    const difference = recentSuccess - olderSuccess;

    if (difference > 0.2) return 'improving';
    if (difference < -0.2) return 'declining';
    return 'stable';
  }

  // Export user data for persistence
  exportData() {
    return {
      performanceHistory: this.performanceHistory,
      skillLevels: this.skillLevels,
      learningPatterns: this.learningPatterns,
      exportedAt: new Date().toISOString()
    };
  }

  // Import user data from persistence
  importData(data) {
    if (data.performanceHistory) this.performanceHistory = data.performanceHistory;
    if (data.skillLevels) this.skillLevels = data.skillLevels;
    if (data.learningPatterns) this.learningPatterns = data.learningPatterns;
  }
}

// Singleton instance for global use
export const adaptiveAlgorithm = new AdaptiveAlgorithm();

// Helper functions for integration
export const playgroundAdaptive = {
  // Initialize for a user session
  initializeSession: (userId) => {
    // In a real app, load user data from database
    const savedData = localStorage.getItem(`playground_adaptive_${userId}`);
    if (savedData) {
      adaptiveAlgorithm.importData(JSON.parse(savedData));
    }
  },

  // Save session data
  saveSession: (userId) => {
    const data = adaptiveAlgorithm.exportData();
    localStorage.setItem(`playground_adaptive_${userId}`, JSON.stringify(data));
  },

  // Record question completion
  recordCompletion: (questionData, userMetrics, userId) => {
    const performance = adaptiveAlgorithm.recordPerformance(questionData, userMetrics);
    playgroundAdaptive.saveSession(userId);
    return performance;
  },

  // Get next recommendation
  getRecommendation: (language, availableQuestions) => {
    return adaptiveAlgorithm.getNextRecommendation(language, availableQuestions);
  },

  // Get user statistics
  getStats: (language = null) => {
    return adaptiveAlgorithm.getUserStats(language);
  }
};
