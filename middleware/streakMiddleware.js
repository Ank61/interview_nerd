import { getToken } from 'next-auth/jwt';
import User from '../models/User';
import dbConnect from '../lib/mongodb';

/**
 * Middleware to update user's login streak
 * This should be used in API routes that require authentication
 */
export const updateLoginStreak = async (req, res, next) => {
  try {
    // Skip for non-authenticated routes or if already processed
    if (!req.headers.authorization) {
      return next();
    }

    await dbConnect();
    
    // Get the token from the Authorization header
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET,
      encryption: true
    });

    if (!token || !token.sub) {
      return next();
    }

    // Update the user's streak
    const user = await User.findById(token.sub);
    if (user) {
      await user.updateStreak();
    }

    next();
  } catch (error) {
    console.error('Error updating login streak:', error);
    // Don't fail the request if streak update fails
    next();
  }
};

/**
 * Wrapper for API routes to ensure streak is updated
 */
export const withStreakTracking = (handler) => {
  return async (req, res) => {
    try {
      await updateLoginStreak(req, res, () => {});
      return handler(req, res);
    } catch (error) {
      console.error('Error in withStreakTracking:', error);
      return handler(req, res);
    }
  };
};
