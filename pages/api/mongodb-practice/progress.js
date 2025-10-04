import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "../../../lib/mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);

        // If not authenticated, return empty progress (will use localStorage)
        if (!session) {
            return res.status(200).json({
                success: true,
                authenticated: false,
                progress: {
                    completedQuestions: [],
                    categoryProgress: {}
                }
            });
        }

        await connectDB();

        const userId = new mongoose.Types.ObjectId(session.user.id);

        // GET - Fetch user's MongoDB progress
        if (req.method === 'GET') {
            const user = await mongoose.connection.db.collection('users').findOne(
                { _id: userId },
                { projection: { 'mongoProgress': 1 } }
            );

            return res.status(200).json({
                success: true,
                authenticated: true,
                progress: user?.mongoProgress || {
                    completedQuestions: [],
                    categoryProgress: {}
                }
            });
        }

        // POST - Save question completion
        if (req.method === 'POST') {
            const { questionId, category, difficulty, query, isCorrect } = req.body;

            if (!questionId || !category || !difficulty) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }

            // Check if question already completed
            const existingUser = await mongoose.connection.db.collection('users').findOne({
                _id: userId,
                'mongoProgress.completedQuestions.questionId': questionId
            });

            if (existingUser) {
                // Update existing completion
                await mongoose.connection.db.collection('users').updateOne(
                    {
                        _id: userId,
                        'mongoProgress.completedQuestions.questionId': questionId
                    },
                    {
                        $set: {
                            'mongoProgress.completedQuestions.$.lastAttempt': new Date(),
                            'mongoProgress.completedQuestions.$.query': query,
                            'mongoProgress.completedQuestions.$.isCorrect': isCorrect
                        },
                        $inc: {
                            'mongoProgress.completedQuestions.$.attempts': 1
                        }
                    }
                );
            } else {
                // Add new completion
                await mongoose.connection.db.collection('users').updateOne(
                    { _id: userId },
                    {
                        $push: {
                            'mongoProgress.completedQuestions': {
                                questionId,
                                category,
                                difficulty,
                                query,
                                isCorrect,
                                completedAt: new Date(),
                                lastAttempt: new Date(),
                                attempts: 1
                            }
                        }
                    },
                    { upsert: true }
                );
            }

            // Update category progress
            await mongoose.connection.db.collection('users').updateOne(
                { _id: userId },
                {
                    $inc: {
                        [`mongoProgress.categoryProgress.${category}.total`]: 1,
                        [`mongoProgress.categoryProgress.${category}.${difficulty}`]: 1
                    },
                    $set: {
                        [`mongoProgress.categoryProgress.${category}.lastPracticed`]: new Date()
                    }
                },
                { upsert: true }
            );

            // Award XP for MongoDB practice
            if (isCorrect) {
                const xpReward = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 20 : 30;
                await mongoose.connection.db.collection('users').updateOne(
                    { _id: userId },
                    {
                        $inc: {
                            'gamification.xp': xpReward,
                            'gamification.stats.totalQuestionsAnswered': 1,
                            'gamification.stats.correctAnswers': 1
                        }
                    }
                );
            }

            return res.status(200).json({
                success: true,
                message: 'Progress saved successfully'
            });
        }

        return res.status(405).json({ message: 'Method not allowed' });

    } catch (error) {
        console.error('Error in MongoDB progress API:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}