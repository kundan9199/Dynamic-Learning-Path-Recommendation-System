# Learning Path Backend API

Node.js + Express + MongoDB backend for the Dynamic Learning Path Recommendation System.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Install MongoDB
Make sure MongoDB is installed and running on your system:
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow official MongoDB installation guide

### 3. Start MongoDB
```bash
# Windows
net start MongoDB

# Mac/Linux
brew services start mongodb-community
# or
mongod
```

### 4. Configure Environment
The `.env` file is already created with default settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learningpath
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
```

### 5. Seed Database
```bash
npm run seed
```

This will create:
- Admin user: `admin@example.com` / `admin123`
- Test user: `alex@example.com` / `password123`
- 6 sample courses with lessons and quizzes

### 6. Start Server
```bash
npm run dev
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (admin/instructor)
- `PUT /api/courses/:id` - Update course (admin/instructor)
- `DELETE /api/courses/:id` - Delete course (admin)
- `POST /api/courses/:id/enroll` - Enroll in course (protected)
- `GET /api/courses/recommendations` - Get personalized recommendations (protected)

### Progress
- `POST /api/progress/lesson/complete` - Mark lesson as complete (protected)
- `POST /api/progress/quiz/submit` - Submit quiz answers (protected)
- `GET /api/progress` - Get user progress (protected)
- `GET /api/progress/weekly` - Get weekly activity (protected)

## Testing the API

### Using curl:
```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alex@example.com","password":"password123"}'

# Get courses
curl http://localhost:5000/api/courses
```

### Using the Frontend:
1. Start the backend: `npm run dev`
2. Start the frontend: `cd ../learning-path-app && npm run dev`
3. Open http://localhost:5174
4. Login with test credentials

## Database Schema

### User
- name, email, password (hashed)
- role (student/instructor/admin)
- avatar, bio, location
- streak, lastActive
- enrolledCourses (array with progress tracking)
- quizResults (array)

### Course
- title, description, difficulty
- duration, instructor, instructorId
- image, tags
- lessons (embedded array)
- quizQuestions (embedded array)
- rating, ratingsCount, enrolledCount
- status (Draft/Published)
- price, discountPrice

### DailyActivity
- user, date
- hoursSpent, lessonsCompleted, coursesCompleted
