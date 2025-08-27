import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import clientPromise from "@/lib/mongodb-adapter";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db("interview_nerd");
  const sharesCollection = db.collection("code_shares");
  const usersCollection = db.collection("users");

  if (req.method === 'POST') {
    // Create a new code share
    try {
      const { 
        questionId, 
        language, 
        code, 
        title, 
        description, 
        isPublic = true,
        tags = [] 
      } = req.body;

      // Validate required fields
      if (!questionId || !language || !code || !title) {
        return res.status(400).json({ 
          error: 'Missing required fields: questionId, language, code, title' 
        });
      }

      // Get user info
      const user = await usersCollection.findOne({ _id: new ObjectId(session.user.id) });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate unique share ID
      const shareId = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);

      const shareData = {
        shareId,
        questionId,
        language,
        code,
        title,
        description: description || '',
        tags: Array.isArray(tags) ? tags : [],
        isPublic,
        author: {
          id: session.user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          level: user.level || 1
        },
        stats: {
          views: 0,
          likes: 0,
          forks: 0,
          comments: 0
        },
        likedBy: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await sharesCollection.insertOne(shareData);

      res.status(201).json({
        success: true,
        shareId,
        _id: result.insertedId,
        message: 'Code shared successfully'
      });

    } catch (error) {
      console.error('Share creation error:', error);
      res.status(500).json({ error: 'Failed to create share' });
    }

  } else if (req.method === 'GET') {
    // Get shared code or list shares
    try {
      const { shareId, userId, language, limit = 20, skip = 0, search } = req.query;

      if (shareId) {
        // Get specific share
        const share = await sharesCollection.findOne({ shareId });
        if (!share) {
          return res.status(404).json({ error: 'Share not found' });
        }

        // Increment view count if not the author
        if (share.author.id !== session.user.id) {
          await sharesCollection.updateOne(
            { shareId },
            { $inc: { 'stats.views': 1 } }
          );
          share.stats.views += 1;
        }

        res.status(200).json({ success: true, share });

      } else {
        // List shares with filters
        const query = { isPublic: true };
        
        if (userId) {
          query['author.id'] = userId;
        }
        
        if (language && language !== 'all') {
          query.language = language;
        }

        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } }
          ];
        }

        const shares = await sharesCollection
          .find(query)
          .sort({ createdAt: -1 })
          .skip(parseInt(skip))
          .limit(parseInt(limit))
          .toArray();

        const total = await sharesCollection.countDocuments(query);

        res.status(200).json({
          success: true,
          shares,
          pagination: {
            total,
            limit: parseInt(limit),
            skip: parseInt(skip),
            hasMore: total > parseInt(skip) + parseInt(limit)
          }
        });
      }

    } catch (error) {
      console.error('Share fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch shares' });
    }

  } else if (req.method === 'PUT') {
    // Update share (like/unlike)
    try {
      const { shareId, action } = req.body;

      if (!shareId || !action) {
        return res.status(400).json({ error: 'Missing shareId or action' });
      }

      const share = await sharesCollection.findOne({ shareId });
      if (!share) {
        return res.status(404).json({ error: 'Share not found' });
      }

      let updateQuery = {};
      let message = '';

      switch (action) {
        case 'like':
          if (share.likedBy.includes(session.user.id)) {
            // Unlike
            updateQuery = {
              $pull: { likedBy: session.user.id },
              $inc: { 'stats.likes': -1 }
            };
            message = 'Share unliked';
          } else {
            // Like
            updateQuery = {
              $addToSet: { likedBy: session.user.id },
              $inc: { 'stats.likes': 1 }
            };
            message = 'Share liked';
          }
          break;

        case 'fork':
          // Create a fork (copy) of the share
          const user = await usersCollection.findOne({ _id: new ObjectId(session.user.id) });
          const forkShareId = Math.random().toString(36).substring(2, 15) + 
                             Math.random().toString(36).substring(2, 15);

          const forkData = {
            ...share,
            _id: undefined,
            shareId: forkShareId,
            title: `Fork of ${share.title}`,
            author: {
              id: session.user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              level: user.level || 1
            },
            stats: {
              views: 0,
              likes: 0,
              forks: 0,
              comments: 0
            },
            likedBy: [],
            forkedFrom: {
              shareId: share.shareId,
              author: share.author,
              title: share.title
            },
            createdAt: new Date(),
            updatedAt: new Date()
          };

          await sharesCollection.insertOne(forkData);
          await sharesCollection.updateOne(
            { shareId },
            { $inc: { 'stats.forks': 1 } }
          );

          return res.status(201).json({
            success: true,
            forkShareId,
            message: 'Share forked successfully'
          });

        default:
          return res.status(400).json({ error: 'Invalid action' });
      }

      await sharesCollection.updateOne({ shareId }, updateQuery);

      res.status(200).json({
        success: true,
        message
      });

    } catch (error) {
      console.error('Share update error:', error);
      res.status(500).json({ error: 'Failed to update share' });
    }

  } else if (req.method === 'DELETE') {
    // Delete share (only by author)
    try {
      const { shareId } = req.body;

      if (!shareId) {
        return res.status(400).json({ error: 'Missing shareId' });
      }

      const share = await sharesCollection.findOne({ shareId });
      if (!share) {
        return res.status(404).json({ error: 'Share not found' });
      }

      if (share.author.id !== session.user.id) {
        return res.status(403).json({ error: 'Not authorized to delete this share' });
      }

      await sharesCollection.deleteOne({ shareId });

      res.status(200).json({
        success: true,
        message: 'Share deleted successfully'
      });

    } catch (error) {
      console.error('Share deletion error:', error);
      res.status(500).json({ error: 'Failed to delete share' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
