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

        // Use mongoose.Types.ObjectId instead of mongodb's ObjectId
        const userId = new mongoose.Types.ObjectId(session.user.id);

        // GET - Fetch user's Python progress
        if (req.method === 'GET') {
            const user = await mongoose.connection.db.collection('users').findOne(
                { _id: userId },
                { projection: { 'pythonProgress': 1 } }
            );

            return res.status(200).json({
                success: true,
                authenticated: true,
                progress: user?.pythonProgress || {
                    completedQuestions: [],
                    categoryProgress: {}
                }
            });
        }

        // POST - Save question completion
        if (req.method === 'POST') {
            const { questionId, category, difficulty, code, isCorrect } = req.body;

            if (!questionId || !category || !difficulty) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }

            // Check if question already completed
            const existingUser = await mongoose.connection.db.collection('users').findOne({
                _id: userId,
                'pythonProgress.completedQuestions.questionId': questionId
            });

            if (existingUser) {
                // Update existing completion
                await mongoose.connection.db.collection('users').updateOne(
                    {
                        _id: userId,
                        'pythonProgress.completedQuestions.questionId': questionId
                    },
                    {
                        $set: {
                            'pythonProgress.completedQuestions.$.lastAttempt': new Date(),
                            'pythonProgress.completedQuestions.$.code': code,
                            'pythonProgress.completedQuestions.$.isCorrect': isCorrect
                        },
                        $inc: {
                            'pythonProgress.completedQuestions.$.attempts': 1
                        }
                    }
                );
            } else {
                // Add new completion
                await mongoose.connection.db.collection('users').updateOne(
                    { _id: userId },
                    {
                        $push: {
                            'pythonProgress.completedQuestions': {
                                questionId,
                                category,
                                difficulty,
                                code,
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
                        [`pythonProgress.categoryProgress.${category}.total`]: 1,
                        [`pythonProgress.categoryProgress.${category}.${difficulty}`]: 1
                    },
                    $set: {
                        [`pythonProgress.categoryProgress.${category}.lastPracticed`]: new Date()
                    }
                },
                { upsert: true }
            );

            // Award XP for Python practice
            if (isCorrect) {
                const xpReward = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
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
        console.error('Error in Python progress API:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}