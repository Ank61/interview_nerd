import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all learnedPrepareTopics for a user
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    try {
      await connectDB();
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ learnedPrepareTopics: user.learnedPrepareTopics || [] });
    } catch (error) {
      console.error('Fetch learned topics error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    // Remove a learnedPrepareTopic for a user
    const { userId, topic, concept } = req.body;
    if (!userId || !topic || !concept) {
      return res.status(400).json({ message: 'userId, topic, and concept are required' });
    }
    try {
      await connectDB();
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Remove the specific topic/concept
      user.learnedPrepareTopics = user.learnedPrepareTopics.filter(
        (item) => !(item.topic === topic && item.concept === concept)
      );
      await user.save();
      return res.status(200).json({ message: 'Removed from learned topics', learnedPrepareTopics: user.learnedPrepareTopics });
    } catch (error) {
      console.error('Remove learned topic error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, topic, concept } = req.body;
  if (!userId || !topic || !concept) {
    return res.status(400).json({ message: 'userId, topic, and concept are required' });
  }

  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent duplicates
    const alreadyLearned = user.learnedPrepareTopics?.some(
      (item) => item.topic === topic && item.concept === concept
    );
    if (alreadyLearned) {
      return res.status(200).json({ message: 'Already marked as learned' });
    }

    user.learnedPrepareTopics.push({ topic, concept, completedAt: new Date() });
    await user.save();
    return res.status(200).json({ message: 'Marked as learned', learnedPrepareTopics: user.learnedPrepareTopics });
  } catch (error) {
    console.error('Learned topic error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 