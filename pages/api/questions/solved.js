import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "../../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        // Connect to the database
        const db = await connectDB();
        const userId = session.user.id;

        if (req.method === 'GET') {
            console.log(' [GET] Fetching solved questions for user:', userId);
            const user = await db.connection.db.collection('users').findOne(
                { _id: userId },
                { projection: { 'gamification.solvedQuestions': 1 } }
            );

            const solvedQuestions = user?.gamification?.solvedQuestions || [];
            console.log(` [GET] Found ${solvedQuestions.length} solved questions for user:`, userId);

            return res.status(200).json({
                success: true,
                solvedQuestions
            });
        }

        if (req.method === 'POST') {
            const { questionId, difficulty, category } = req.body;
            console.log(' [POST] Marking question as solved:', { userId, questionId, difficulty, category });

            if (!questionId || !difficulty || !category) {
                console.error(' [POST] Missing required fields:', { questionId, difficulty, category });
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }

            const result = await db.connection.db.collection('users').updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        'gamification.solvedQuestions': {
                            questionId,
                            difficulty,
                            category,
                            solvedAt: new Date()
                        }
                    }
                },
                { upsert: true }
            );

            console.log(' [POST] Successfully marked question as solved:', result);
            return res.status(200).json({
                success: true,
                message: 'Question marked as solved',
                data: result
            });
        }
    } catch (error) {
        console.error(' Error in solved questions API:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}
