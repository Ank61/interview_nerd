import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
      default: "",
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
      enum: ["user", "admin"],
      default: "user",
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
      completedQuestions: [
        {
          questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InterviewQuestion",
          },
          completedAt: {
            type: Date,
            default: Date.now,
          },
          score: {
            type: Number,
            min: 0,
            max: 100,
          },
          attempts: {
            type: Number,
            default: 1,
          },
          timeSpent: {
            type: Number, // in seconds
            default: 0,
          },
        },
      ],
      favoriteQuestions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "InterviewQuestion",
        },
      ],
      studySessions: [
        {
          topic: String,
          duration: Number, // in minutes
          questionsAttempted: Number,
          correctAnswers: Number,
          sessionDate: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    
    // Gamification System
    gamification: {
      // XP and Leveling
      xp: {
        type: Number,
        default: 0,
      },
      level: {
        type: Number,
        default: 1,
      },
      
      // Streak System
      streaks: {
        current: {
          type: Number,
          default: 0,
        },
        longest: {
          type: Number,
          default: 0,
        },
        lastActivity: {
          type: Date,
          default: null,
        },
        freezeTokens: {
          type: Number,
          default: 0,
        },
      },
      
      // Achievement System
      badges: [
        {
          id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            enum: ['learning', 'streak', 'challenge', 'social', 'milestone'],
            required: true,
          },
          rarity: {
            type: String,
            enum: ['common', 'rare', 'epic', 'legendary'],
            default: 'common',
          },
          earnedAt: {
            type: Date,
            default: Date.now,
          },
          icon: {
            type: String,
            default: '🏆',
          },
        },
      ],
      
      // Challenge System
      challenges: {
        daily: {
          current: {
            id: String,
            type: String,
            target: Number,
            progress: {
              type: Number,
              default: 0,
            },
            completed: {
              type: Boolean,
              default: false,
            },
            assignedAt: Date,
            expiresAt: Date,
          },
          streak: {
            type: Number,
            default: 0,
          },
          completedToday: {
            type: Boolean,
            default: false,
          },
        },
        weekly: {
          current: {
            id: String,
            type: String,
            target: Number,
            progress: {
              type: Number,
              default: 0,
            },
            completed: {
              type: Boolean,
              default: false,
            },
            assignedAt: Date,
            expiresAt: Date,
          },
        },
      },
      
      // Leaderboard Rankings
      leaderboards: {
        weeklyRank: {
          type: Number,
          default: 0,
        },
        monthlyRank: {
          type: Number,
          default: 0,
        },
        allTimeRank: {
          type: Number,
          default: 0,
        },
        weeklyXP: {
          type: Number,
          default: 0,
        },
        monthlyXP: {
          type: Number,
          default: 0,
        },
      },
      
      // Social Features
      social: {
        friends: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        studyGroups: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudyGroup",
          },
        ],
        achievements: {
          shared: [
            {
              badgeId: String,
              sharedAt: {
                type: Date,
                default: Date.now,
              },
            },
          ],
          privacy: {
            type: String,
            enum: ['public', 'friends', 'private'],
            default: 'friends',
          },
        },
      },
      
      // Statistics
      stats: {
        totalQuestionsAnswered: {
          type: Number,
          default: 0,
        },
        correctAnswers: {
          type: Number,
          default: 0,
        },
        accuracy: {
          type: Number,
          default: 0,
        },
        averageTimePerQuestion: {
          type: Number,
          default: 0,
        },
        totalStudyTime: {
          type: Number,
          default: 0,
        },
        topicMastery: [
          {
            topic: String,
            masteryLevel: {
              type: Number,
              min: 0,
              max: 100,
              default: 0,
            },
            questionsCompleted: {
              type: Number,
              default: 0,
            },
            accuracy: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    },
    learnedPrepareTopics: {
      type: [
        {
          topic: { type: String, required: true },
          concept: { type: String, required: true },
          completedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
