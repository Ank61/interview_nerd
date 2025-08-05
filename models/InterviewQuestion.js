import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "",
  },
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    default: "",
  },
  tags: [tagSchema],
});

const interviewQuestionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    tags: [tagSchema],
    prepareLink: {
      type: String,
      default: "",
    },
    externallinks: [
      {
        type: String,
      },
    ],
    questions: [questionSchema],
    // Statistics
    stats: {
      totalAttempts: {
        type: Number,
        default: 0,
      },
      correctAnswers: {
        type: Number,
        default: 0,
      },
      averageScore: {
        type: Number,
        default: 0,
      },
      difficulty: {
        type: String,
        default: "Medium",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
interviewQuestionSchema.index({ topic: 1, categories: 1 });
interviewQuestionSchema.index({ "tags.name": 1 });
interviewQuestionSchema.index({ "stats.difficulty": 1 });

const InterviewQuestion =
  mongoose.models.InterviewQuestion ||
  mongoose.model("InterviewQuestion", interviewQuestionSchema);

export default InterviewQuestion;
