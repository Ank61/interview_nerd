import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, email, password, googleId, image } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user object
    const userData = {
      name,
      email: email.toLowerCase(),
      isVerified: googleId ? true : false, // Google users are pre-verified
    };

    // Add Google ID if provided
    if (googleId) {
      userData.googleId = googleId;
    }

    // Add image if provided
    if (image) {
      userData.image = image;
    }

    // Hash password if provided (for email/password registration)
    if (password && !googleId) {
      const saltRounds = 12;
      userData.password = await bcrypt.hash(password, saltRounds);
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isVerified: user.isVerified,
      role: user.role,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 