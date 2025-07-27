import mongoose from 'mongoose';

const conceptSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  explanation: {
    type: String,
    required: true,
  },
  examples: [{
    type: String,
  }],
  questions: [{
    question: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: '',
    },
  }],
  links: [{
    type: String,
  }],
});

const typeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  concepts: [conceptSchema],
});

const prepareDataSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Javascript', 'React', 'Node', 'Next.js', 'Next', 'TypeScript', 'Typescript'],
  },
  themeBgColor: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
  topicColor: {
    type: String,
    required: true,
  },
  lightColor: {
    type: String,
    required: true,
  },
  type: [typeSchema],
  // Statistics
  stats: {
    totalViews: {
      type: Number,
      default: 0,
    },
    totalTimeSpent: {
      type: Number,
      default: 0, // in minutes
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

// Indexes for faster queries
prepareDataSchema.index({ category: 1 });
prepareDataSchema.index({ 'type.label': 1 });

const PrepareData = mongoose.models.PrepareData || mongoose.model('PrepareData', prepareDataSchema);

export default PrepareData; 