# 📚 Edify - YouTube Learning Platform

A complete, production-ready MERN stack web application that allows users to manage their own YouTube learning content with progress tracking, automatic resume playback, and daily learning streak tracking.

**Developed by APM Ltd**

## ✨ Features

### 🔐 Authentication
- JWT-based authentication with refresh tokens
- Secure password hashing with bcrypt
- Protected routes and automatic token refresh

### 📺 Video Management
- Add individual YouTube videos by URL
- Add entire YouTube playlists
- Fetch video metadata automatically (title, thumbnail, duration)
- No YouTube recommendations or related videos

### 📊 Progress Tracking
- Track watch progress for each video
- Auto-save progress every 5 seconds
- Automatic completion at 95% watched
- Visual progress bars on video thumbnails

### ⏯️ Resume Playback
- Automatically resume from last watched position
- "Continue watching?" prompt with timestamp
- Option to start from beginning

### 🔥 Daily Learning Streak
- Track daily watch time
- Maintain streak with 10+ minutes daily
- View current and best streak
- Weekly activity chart
- Calendar view of learning days

### 🎨 Modern UI
- Responsive design with Tailwind CSS
- Dark/Light mode toggle
- Smooth animations and transitions
- Premium gradient designs
- Custom scrollbar styling

## 🚀 Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **YouTube Data API v3** - Video metadata

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **react-youtube** - YouTube player integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- YouTube Data API v3 key ([Get one here](https://console.cloud.google.com/apis/credentials))

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd LearnY
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/youtube-learning
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/youtube-learning

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d

# YouTube API Configuration
YOUTUBE_API_KEY=your_youtube_api_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

The `.env` file is already created with:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📖 Usage Guide

### 1. Create an Account
- Navigate to `http://localhost:5173`
- Click "Sign up" and create your account
- You'll be automatically logged in

### 2. Add Videos
- Click "➕ Add Video" button
- Paste a YouTube video URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
- Or paste a playlist URL and check "This is a playlist URL"
- Click "Add Video" or "Add Playlist"

### 3. Watch Videos
- Click on any video thumbnail to start watching
- The player will automatically resume from where you left off
- Progress is saved every 5 seconds
- Videos are marked complete at 95% watched

### 4. Track Your Progress
- View your dashboard for stats and analytics
- See your current learning streak
- Check weekly activity chart
- Monitor total watch time

### 5. Maintain Your Streak
- Watch at least 10 minutes daily to maintain your streak
- The streak resets after 24 hours of inactivity
- Green bars in the weekly chart indicate days you met the goal

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Videos
- `POST /api/video/add` - Add single video
- `POST /api/video/playlist/add` - Add playlist
- `GET /api/video/list` - Get user's videos
- `GET /api/video/playlists` - Get user's playlists
- `DELETE /api/video/:id` - Delete video
- `PUT /api/video/reorder` - Reorder videos

### Progress
- `PUT /api/progress/:videoId` - Update video progress
- `GET /api/progress/:videoId/resume` - Get resume time
- `GET /api/progress/stats` - Get progress statistics
- `GET /api/progress/videos` - Get videos with progress

### Streak
- `POST /api/streak/update` - Update daily watch time
- `GET /api/streak/stats` - Get streak statistics
- `GET /api/streak/weekly` - Get weekly activity data

## 🔧 Configuration

### YouTube API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

### MongoDB Setup

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/youtube-learning
```

**MongoDB Atlas:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Replace in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/youtube-learning
```

## 🎨 Features in Detail

### Custom Video Player
- Uses YouTube Iframe API
- Parameters configured to hide recommendations:
  - `rel=0` - No related videos
  - `modestbranding=1` - Minimal branding
  - `iv_load_policy=3` - No annotations
- Custom controls for next/previous video
- Automatic progress tracking

### Progress Tracking Algorithm
- Saves progress every 5 seconds while playing
- Saves immediately when paused
- Marks complete at 95% to account for credits/outros
- Stores: `watchedSeconds`, `totalDuration`, `isCompleted`

### Streak Calculation
- Daily goal: 10 minutes (600 seconds)
- Streak increments if previous day met goal
- Resets if more than 24 hours inactive
- Tracks: `currentStreak`, `bestStreak`, `dailyWatchTime`

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong JWT secrets
3. Configure MongoDB Atlas
4. Set up proper CORS origins
5. Deploy to services like Heroku, Railway, or DigitalOcean

### Frontend
1. Build the production bundle:
```bash
npm run build
```
2. Deploy the `dist` folder to Vercel, Netlify, or similar
3. Update `VITE_API_URL` to production backend URL

## 📝 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  refreshToken: String,
  createdAt: Date
}
```

### Video
```javascript
{
  userId: ObjectId,
  videoId: String,
  title: String,
  thumbnail: String,
  duration: Number,
  playlistId: String,
  playlistName: String,
  orderIndex: Number,
  addedAt: Date
}
```

### Progress
```javascript
{
  userId: ObjectId,
  videoId: String,
  watchedSeconds: Number,
  totalDuration: Number,
  isCompleted: Boolean,
  lastWatchedAt: Date,
  completedAt: Date
}
```

### Streak
```javascript
{
  userId: ObjectId,
  date: Date,
  totalWatchTimeSeconds: Number,
  streakCount: Number,
  lastActiveDate: Date
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Copyright © 2024 APM Ltd. All rights reserved.

This project is proprietary software owned by APM Ltd.

## 🙏 Acknowledgments

- YouTube Data API v3 for video metadata
- React YouTube component for player integration
- Tailwind CSS for beautiful styling
- MongoDB for flexible data storage

---

**Built with ❤️ using the MERN stack**
