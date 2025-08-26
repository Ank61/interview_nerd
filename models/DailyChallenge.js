import mongoose from 'mongoose';

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
    enum: ['javascript', 'react', 'node', 'typescript', 'sql', 'nextjs', 'rabbitmq', 'oop']
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterviewQuestion',
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
    default: 50
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
    // Find random questions for this topic
    const questions = await mongoose.model('InterviewQuestion').aggregate([
      { $match: { category: topic } },
      { $sample: { size: 3 } } // Get 3 random questions
    ]);
    
    if (questions.length === 0) {
      throw new Error(`No questions found for topic: ${topic}`);
    }
    
    challenge = new this({
      date: today,
      topic: topic,
      questions: questions.map(q => q._id),
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
    });
    
    await challenge.save();
  }
  
  return challenge;
};

const DailyChallenge = mongoose.models.DailyChallenge || 
  mongoose.model('DailyChallenge', dailyChallengeSchema);

export default DailyChallenge;
