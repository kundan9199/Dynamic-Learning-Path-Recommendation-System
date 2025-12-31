# Dynamic Learning Path Recommendation System | LearnPath

A modern, full-stack learning management system with AI-powered course recommendations, built with React, Node.js, Express, and MongoDB.

## 🎨 Features

### Frontend
- **Dark Theme UI** - Premium dark design with teal accents
- **Responsive Design** - Mobile-first, works on all devices
- **Authentication** - Secure login/register with JWT
- **Course Catalog** - Browse, filter, and search courses
- **Progress Tracking** - Track lessons, quizzes, and achievements
- **Personalized Recommendations** - AI-powered course suggestions
- **Admin Panel** - Manage courses and content
- **User Profiles** - Customizable profiles with stats

### Backend
- **RESTful API** - Clean, organized API endpoints
- **MongoDB Database** - Flexible NoSQL data storage
- **JWT Authentication** - Secure token-based auth
- **Course Management** - CRUD operations for courses
- **Progress Tracking** - Lesson completion and quiz results
- **Recommendation Engine** - Tag-based course recommendations
- **Role-Based Access** - Student, Instructor, Admin roles

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### 1. Install MongoDB

**Windows:**
```bash
# Download and install from https://www.mongodb.com/try/download/community
# Start MongoDB service
net start MongoDB
```

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Follow official MongoDB installation guide
sudo systemctl start mongod
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run seed    # Seed database with sample data
npm run dev     # Start backend server on port 5000
```

### 3. Setup Frontend

```bash
cd learning-path-app
npm install
npm run dev     # Start frontend on port 5174
```

### 4. Access the Application

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5000/api

### 5. Login with Test Credentials

**Student Account:**
- Email: `alex@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

## 📁 Project Structure

```
.
├── backend/                    # Node.js + Express backend
│   ├── config/                # Database configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Auth middleware
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── server.js              # Express server
│   ├── seed.js                # Database seeder
│   └── .env                   # Environment variables
│
└── learning-path-app/         # React + Vite frontend
    ├── src/
    │   ├── components/        # Reusable UI components
    │   │   ├── layout/        # Layout components
    │   │   └── ui/            # UI primitives
    │   ├── context/           # React context (Auth)
    │   ├── pages/             # Page components
    │   ├── services/          # API service layer
    │   ├── App.jsx            # Main app component
    │   └── main.jsx           # Entry point
    └── package.json
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      Register new user
POST   /api/auth/login         Login user
GET    /api/auth/me            Get current user (protected)
PUT    /api/auth/profile       Update profile (protected)
```

### Courses
```
GET    /api/courses                    Get all courses
GET    /api/courses/:id                Get single course
POST   /api/courses                    Create course (admin/instructor)
PUT    /api/courses/:id                Update course (admin/instructor)
DELETE /api/courses/:id                Delete course (admin)
POST   /api/courses/:id/enroll         Enroll in course (protected)
GET    /api/courses/recommendations    Get recommendations (protected)
```

### Progress
```
POST   /api/progress/lesson/complete   Mark lesson complete (protected)
POST   /api/progress/quiz/submit       Submit quiz (protected)
GET    /api/progress                   Get user progress (protected)
GET    /api/progress/weekly            Get weekly activity (protected)
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🎯 Key Features Explained

### 1. Authentication System
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes on frontend and backend
- Role-based access control (Student, Instructor, Admin)

### 2. Course Management
- Create, read, update, delete courses
- Course enrollment tracking
- Lesson completion tracking
- Quiz system with scoring
- Course ratings and reviews

### 3. Progress Tracking
- Track completed lessons per course
- Calculate course progress percentage
- Quiz results and scores
- Learning streak tracking
- Weekly activity monitoring

### 4. Recommendation Engine
- Tag-based course matching
- Considers user's enrolled courses
- Falls back to popular courses
- Personalized recommendation reasons

### 5. Admin Dashboard
- Manage all courses
- View student statistics
- Create/edit/delete courses
- Monitor platform metrics

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learningpath
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
```

## 📝 Database Schema

### User Model
- Personal info (name, email, password)
- Role (student/instructor/admin)
- Profile data (avatar, bio, location)
- Enrolled courses with progress
- Quiz results
- Streak tracking

### Course Model
- Course details (title, description, difficulty)
- Instructor information
- Lessons (embedded array)
- Quiz questions (embedded array)
- Ratings and enrollment stats
- Pricing information

### DailyActivity Model
- User reference
- Date
- Hours spent
- Lessons completed
- Courses completed

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Update MONGODB_URI to production database
3. Deploy using Git or CLI

### Frontend Deployment (Vercel/Netlify)
1. Update API_URL in `src/services/api.js`
2. Build: `npm run build`
3. Deploy `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built with ❤️ for modern learning experiences

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Restart MongoDB
# Windows: net stop MongoDB && net start MongoDB
# Mac: brew services restart mongodb-community
```

### Port Already in Use
```bash
# Change PORT in backend/.env
# Change port in frontend vite.config.js
```

### CORS Issues
- Backend already configured with CORS
- Ensure frontend API_URL matches backend URL

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
