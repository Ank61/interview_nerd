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
            enum: ["learning", "streak", "challenge", "social", "milestone"],
            required: true,
          },
          rarity: {
            type: String,
            enum: ["common", "rare", "epic", "legendary"],
            default: "common",
          },
          earnedAt: {
            type: Date,
            default: Date.now,
          },
          icon: {
            type: String,
            default: "🏆",
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
          // MCQ Challenge specific data
          mcqChallenge: {
            questions: [{
              questionId: Number,
              question: String,
              options: [String],
              correctAnswer: Number,
              userAnswer: {
                type: Number,
                default: -1, // -1 means not answered
              },
              isCorrect: {
                type: Boolean,
                default: false,
              },
              answeredAt: Date,
              category: String,
              difficulty: String,
              explanation: String,
            }],
            score: {
              type: Number,
              default: 0,
            },
            totalQuestions: {
              type: Number,
              default: 5,
            },
            completedQuestions: {
              type: Number,
              default: 0,
            },
            startedAt: Date,
            completedAt: Date,
          },
          // Track all answered MCQ questions to ensure uniqueness
          answeredMCQQuestions: [{
            type: Number, // questionId from mcqDatasets
            default: []
          }],
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

      // Solved Questions Tracking
      solvedQuestions: [{
        questionId: {
          type: String,
          required: true
        },
        difficulty: {
          type: String,
          required: true,
          enum: ['easy', 'medium', 'hard']
        },
        category: {
          type: String,
          required: true
        },
        solvedAt: {
          type: Date,
          default: Date.now
        },
        // Store the code that solved the question (optional)
        solutionCode: {
          type: String,
          default: ''
        },
        // Time taken to solve in seconds (optional)
        timeTaken: {
          type: Number,
          default: 0
        }
      }],

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
            enum: ["public", "friends", "private"],
            default: "friends",
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

// Add methods to the User schema
userSchema.statics.updateUserStats = async function (userId, topic, isCorrect) {
  const updateQuery = {
    $inc: {
      "gamification.stats.totalQuestionsAnswered": 1,
      "gamification.xp": isCorrect ? 10 : 2, // 10 XP for correct, 2 for attempt
    },
    $set: {
      "gamification.streaks.lastActivity": new Date(),
    },
  };

  // Update correct answers count if answer is correct
  if (isCorrect) {
    updateQuery.$inc["gamification.stats.correctAnswers"] = 1;
  }

  // Update topic mastery
  const topicUpdate = {
    $setOnInsert: {
      "gamification.stats.topicMastery.$[elem].topic": topic,
      "gamification.stats.topicMastery.$[elem].questionsCompleted": 1,
      "gamification.stats.topicMastery.$[elem].accuracy": isCorrect ? 100 : 0,
    },
    $inc: {
      "gamification.stats.topicMastery.$[elem].questionsCompleted": 1,
    },
    $set: {
      "gamification.stats.topicMastery.$[elem].lastPracticed": new Date(),
    },
  };

  if (isCorrect) {
    topicUpdate.$inc[
      "gamification.stats.topicMastery.$[elem].correctAnswers"
    ] = 1;
  }

  // First, try to update existing topic mastery
  const result = await this.updateOne(
    {
      _id: userId,
      "gamification.stats.topicMastery.topic": topic,
    },
    [
      {
        $set: {
          "gamification.stats.topicMastery.$[elem].accuracy": {
            $divide: [
              {
                $multiply: [
                  {
                    $ifNull: [
                      "$gamification.stats.topicMastery.$[elem].accuracy",
                      0,
                    ],
                  },
                  {
                    $subtract: [
                      {
                        $ifNull: [
                          "$gamification.stats.topicMastery.$[elem].questionsCompleted",
                          0,
                        ],
                      },
                      { $cond: [isCorrect, 0, 1] },
                    ],
                  },
                ],
              },
              {
                $add: [
                  {
                    $ifNull: [
                      "$gamification.stats.topicMastery.$[elem].questionsCompleted",
                      0,
                    ],
                  },
                  { $cond: [isCorrect, 1, 0] },
                ],
              },
            ],
          },
          "gamification.stats.topicMastery.$[elem].lastPracticed": new Date(),
        },
      },
      {
        $inc: {
          "gamification.stats.topicMastery.$[elem].questionsCompleted": 1,
          "gamification.stats.topicMastery.$[elem].correctAnswers": isCorrect
            ? 1
            : 0,
        },
      },
    ],
    { arrayFilters: [{ "elem.topic": topic }] }
  );

  // If no existing topic mastery was updated, add a new one
  if (result.matchedCount === 0) {
    await this.updateOne(
      { _id: userId },
      {
        $push: {
          "gamification.stats.topicMastery": {
            topic,
            questionsCompleted: 1,
            correctAnswers: isCorrect ? 1 : 0,
            accuracy: isCorrect ? 100 : 0,
            lastPracticed: new Date(),
          },
        },
      }
    );
  }

  // Update overall accuracy
  const user = await this.findById(userId).select("gamification.stats");
  const { totalQuestionsAnswered, correctAnswers } = user.gamification.stats;

  const newTotal = (totalQuestionsAnswered || 0) + 1;
  const newCorrect = (correctAnswers || 0) + (isCorrect ? 1 : 0);

  await this.updateOne(
    { _id: userId },
    {
      "gamification.stats.accuracy": Math.round((newCorrect / newTotal) * 100),
    }
  );

  // Update user's level based on XP
  await this.updateUserLevel(userId);

  return this.findById(userId);
};

// Method to update user's level based on XP
userSchema.statics.updateUserLevel = async function (userId) {
  const user = await this.findById(userId).select(
    "gamification.xp gamification.level"
  );
  if (!user) return null;

  const xp = user.gamification.xp;
  const currentLevel = user.gamification.level;
  const newLevel = Math.min(Math.floor(Math.sqrt(xp / 100)) + 1, 100); // Cap at level 100

  if (newLevel > currentLevel) {
    // Level up!
    await this.updateOne(
      { _id: userId },
      {
        $set: { "gamification.level": newLevel },
        $push: {
          "gamification.badges": {
            id: `level_${newLevel}`,
            name: `Level ${newLevel} Unlocked`,
            description: `Reached level ${newLevel}`,
            category: "milestone",
            rarity:
              newLevel % 10 === 0
                ? "legendary"
                : newLevel % 5 === 0
                  ? "epic"
                  : newLevel % 2 === 0
                    ? "rare"
                    : "common",
            icon: "🏆",
            earnedAt: new Date(),
          },
        },
      }
    );

    return { levelUp: true, newLevel };
  }

  return { levelUp: false, currentLevel };
};

// Method to update user's streak
const getUserStreak = async function () {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastActivity = this.gamification.streaks.lastActivity;

  // If no last activity, start a new streak
  if (!lastActivity) {
    this.gamification.streaks = {
      current: 1,
      longest: 1,
      lastActivity: today,
    };
    await this.save();
    return 1;
  }

  // If already updated today, return current streak
  if (lastActivity >= today) {
    return this.gamification.streaks.current;
  }

  // If last activity was yesterday, increment streak
  if (lastActivity >= yesterday && lastActivity < today) {
    this.gamification.streaks.current += 1;

    // Update longest streak if needed
    if (this.gamification.streaks.current > this.gamification.streaks.longest) {
      this.gamification.streaks.longest = this.gamification.streaks.current;
    }
  } else {
    // Reset streak if more than one day has passed
    this.gamification.streaks.current = 1;
  }

  // Update last activity
  this.gamification.streaks.lastActivity = today;
  await this.save();

  return this.gamification.streaks.current;
};

// Add the method to the schema
userSchema.methods.updateStreak = getUserStreak;

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
