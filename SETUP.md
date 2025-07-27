# Interview Nerd - MongoDB & Authentication Setup

## Overview
This project has been set up with MongoDB Atlas integration and Google authentication. The setup includes:

1. **MongoDB Atlas Database** with collections for:
   - Users (with authentication and progress tracking)
   - Interview Questions (from local data)
   - Prepare Data (from local data)

2. **Authentication System** with:
   - Google OAuth integration
   - Email/password registration and login
   - NextAuth.js for session management

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://betainformally:betaversion@beta.wbpvhl2.mongodb.net/interview_nerd?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Google OAuth (You'll need to set these up in Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT Secret (for custom JWT tokens)
JWT_SECRET=your-jwt-secret-key-change-this-in-production
```

### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
6. Copy the Client ID and Client Secret to your `.env.local` file

### 3. Database Seeding
Run the following command to seed the database with your local data:

```bash
npm run seed
```

This will:
- Connect to MongoDB Atlas
- Clear existing data (if any)
- Import all interview questions from `data/interviewData.js`
- Import all prepare data from `data/prepareData.js`
- Display a summary of imported data

### 4. Start the Development Server
```bash
npm run dev
```

## Database Schema

### Users Collection
- **name**: String (required)
- **email**: String (required, unique)
- **password**: String (hashed, required for email/password auth)
- **googleId**: String (for Google OAuth users)
- **image**: String (profile picture URL)
- **role**: String (enum: 'user', 'admin')
- **isVerified**: Boolean
- **progress**: Object (tracks user progress)
  - **completedQuestions**: Array of completed questions
  - **favoriteQuestions**: Array of favorited questions
  - **studySessions**: Array of study sessions

### Interview Questions Collection
- **topic**: String (enum: 'Javascript', 'React', 'Node', 'Next.js', 'TypeScript')
- **categories**: String (enum: 'Junior', 'Mid', 'Senior')
- **tags**: Array of tag objects
- **prepareLink**: String
- **externallinks**: Array of strings
- **questions**: Array of question objects
- **stats**: Object (usage statistics)

### Prepare Data Collection
- **category**: String (enum: 'Javascript', 'React', 'Node', 'Next.js', 'TypeScript')
- **themeBgColor**: String
- **textColor**: String
- **topicColor**: String
- **lightColor**: String
- **type**: Array of type objects with concepts
- **stats**: Object (usage statistics)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/[...nextauth]` - NextAuth endpoints

### Data (to be implemented)
- `GET /api/questions` - Get interview questions
- `GET /api/prepare` - Get prepare data
- `POST /api/progress` - Update user progress

## Features Implemented

### ✅ Completed
- MongoDB Atlas connection setup
- Database models and schemas
- User registration and login APIs
- Google OAuth integration
- NextAuth.js configuration
- Database seeding script
- Updated login/signup pages with authentication
- Session management

### 🔄 To Be Implemented
- Data fetching APIs to replace local data
- User progress tracking
- Question statistics
- Admin panel
- Password reset functionality
- Email verification

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify the connection string in `.env.local`
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions

2. **Google OAuth Error**
   - Verify Google Client ID and Secret in `.env.local`
   - Check if redirect URIs are correctly configured
   - Ensure Google+ API is enabled

3. **NextAuth Error**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your development URL

4. **Seeding Error**
   - Ensure MongoDB connection is working
   - Check if data files exist and are properly formatted

## Security Notes

- Change all secret keys in production
- Use environment variables for sensitive data
- Implement proper CORS policies
- Add rate limiting for APIs
- Use HTTPS in production
- Regularly update dependencies

## Next Steps

1. Set up Google OAuth credentials
2. Create `.env.local` file with proper values
3. Run `npm run seed` to populate the database
4. Test authentication flow
5. Implement data fetching APIs
6. Add user progress tracking
7. Deploy to production with proper environment variables 