import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    default : ""
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Progress tracking
  progress: {
    completedQuestions: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InterviewQuestion'
      },
      completedAt: {
        type: Date,
        default: Date.now
      },
      score: {
        type: Number,
        min: 0,
        max: 100
      }
    }],
    favoriteQuestions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InterviewQuestion'
    }],
    studySessions: [{
      topic: String,
      duration: Number, // in minutes
      questionsAttempted: Number,
      correctAnswers: Number,
      sessionDate: {
        type: Date,
        default: Date.now
      }
    }],
  },
  learnedPrepareTopics: {
    type: [{
      topic: { type: String, required: true },
      concept: { type: String, required: true },
      completedAt: { type: Date, default: Date.now }
    }],
    default: []
  }
}, {
  timestamps: true
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 