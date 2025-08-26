import mongoose from 'mongoose';

const questionFeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterviewQuestion',
    required: true,
    index: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  userAnswer: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true,
    enum: ['javascript', 'react', 'node', 'typescript', 'sql', 'nextjs', 'rabbitmq', 'oop']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  metadata: {
    sessionId: String,
    device: String,
    ipAddress: String
  }
}, {
  timestamps: true
});

// Compound index for faster lookups
questionFeedbackSchema.index({ user: 1, question: 1 }, { unique: true });
questionFeedbackSchema.index({ user: 1, topic: 1, isCorrect: 1 });
questionFeedbackSchema.index({ user: 1, difficulty: 1, isCorrect: 1 });

// Static method to record feedback
questionFeedbackSchema.statics.recordFeedback = async function(userId, question, userAnswer, isCorrect, additionalData = {}) {
  const { timeSpent, sessionId, device, ipAddress } = additionalData;
  
  const feedback = new this({
    user: userId,
    question: question._id,
    isCorrect,
    userAnswer,
    topic: question.category,
    difficulty: question.difficulty,
    timeSpent,
    metadata: {
      sessionId,
      device,
      ipAddress
    }
  });
  
  await feedback.save();
  
  // Update user's stats
  await mongoose.model('User').updateUserStats(userId, question.category, isCorrect);
  
  return feedback;
};

const QuestionFeedback = mongoose.models.QuestionFeedback || 
  mongoose.model('QuestionFeedback', questionFeedbackSchema);

export default QuestionFeedback;
