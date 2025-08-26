import mongoose from 'mongoose';
import { interviewData } from '../data/interviewData.js';

const dailyChallengeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    default: () => {
      // Set to start of day in UTC
      const now = new Date();
      now.setUTCHours(0, 0, 0, 0);
      return now;
    }
  },
  topic: {
    type: String,
    required: true,
    enum: ['Javascript', 'React', 'Node', 'Typescript', 'SQL', 'Next', 'RabbitMQ', 'OOP', 'AWS S3']
  },
  questions: [{
    type: mongoose.Schema.Types.Mixed,
    required: true
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  xpReward: {
    type: Number,
    required: true,
    default: 30
  },
  streakBonus: {
    type: Number,
    default: 5 // Additional XP per day of streak
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create a compound index on date and topic for faster lookups
dailyChallengeSchema.index({ date: 1, topic: 1 }, { unique: true });

// Static method to get or create today's challenge for a topic
dailyChallengeSchema.statics.getOrCreateForToday = async function(topic) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  
  // Try to find existing challenge for today
  let challenge = await this.findOne({
    date: today,
    topic: topic,
    isActive: true
  });
  
  // If no challenge exists for today, create one
  if (!challenge) {
    // Find questions for this topic from interviewData
    const topicData = interviewData.find(item => item.topic === topic);
    
    if (!topicData || !topicData.questions || topicData.questions.length === 0) {
      throw new Error(`No questions found for topic: ${topic}. Available topics: ${interviewData.map(item => item.topic).join(', ')}`);
    }
    
    // Get 2 random questions from the topic
    const shuffled = [...topicData.questions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(2, shuffled.length));
    
    // Add unique IDs to questions for tracking
    const questionsWithIds = selectedQuestions.map((q, index) => ({
      ...q,
      _id: `${topic}_${today.getTime()}_${index}`,
      topic: topic,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
    }));
    
    challenge = new this({
      date: today,
      topic: topic,
      questions: questionsWithIds,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
    });
    
    await challenge.save();
  }
  
  return challenge;
};

const DailyChallenge = mongoose.models.DailyChallenge || 
  mongoose.model('DailyChallenge', dailyChallengeSchema);

export default DailyChallenge;
