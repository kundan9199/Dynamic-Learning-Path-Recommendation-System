import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Course from './models/Course.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
    });

    // Create sample user
    const user = await User.create({
      name: 'Tabish',
      email: 'tabish@example.com',
      password: 'password123',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      streak: 3
    });

    // Create courses
    const courses = await Course.insertMany([
      {
        title: 'Introduction to Machine Learning',
        description: 'Learn the fundamentals of ML algorithms and their applications in real-world scenarios.',
        difficulty: 'Beginner',
        duration: '8 weeks',
        instructor: 'Dr. Sarah Chen',
        instructorId: admin._id,
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
        tags: ['AI', 'Python', 'Data Science'],
        rating: 4.8,
        ratingsCount: 234,
        enrolledCount: 2340,
        status: 'Published',
        price: 99,
        discountPrice: 49,
        lessons: [
          { title: 'What is Machine Learning?', duration: '15 min', order: 1 },
          { title: 'Types of ML: Supervised vs Unsupervised', duration: '20 min', order: 2 },
          { title: 'Setting Up Your Python Environment', duration: '25 min', order: 3 },
          { title: 'Introduction to NumPy', duration: '30 min', order: 4 },
          { title: 'Working with Pandas DataFrames', duration: '35 min', order: 5 }
        ],
        quizQuestions: [
          {
            question: 'What is the primary goal of supervised learning?',
            options: [
              'To find hidden patterns in data',
              'To learn from labeled data and make predictions',
              'To reduce dimensionality of data',
              'To cluster similar data points'
            ],
            correctAnswer: 1
          },
          {
            question: 'Which algorithm is best suited for classification problems?',
            options: [
              'Linear Regression',
              'K-Means Clustering',
              'Logistic Regression',
              'Principal Component Analysis'
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        title: 'Advanced React Patterns',
        description: 'Master advanced React concepts including hooks, context, and performance optimization.',
        difficulty: 'Advanced',
        duration: '6 weeks',
        instructor: 'Mike Rodriguez',
        instructorId: admin._id,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        tags: ['React', 'JavaScript', 'Frontend'],
        rating: 4.9,
        ratingsCount: 185,
        enrolledCount: 1856,
        status: 'Published',
        price: 129,
        discountPrice: 79,
        lessons: [
          { title: 'Advanced Hooks Patterns', duration: '40 min', order: 1 },
          { title: 'Context API Deep Dive', duration: '35 min', order: 2 },
          { title: 'Performance Optimization', duration: '45 min', order: 3 }
        ],
        quizQuestions: []
      },
      {
        title: 'Data Structures & Algorithms',
        description: 'Build a strong foundation in DSA with practical coding exercises and interviews prep.',
        difficulty: 'Intermediate',
        duration: '10 weeks',
        instructor: 'Prof. James Liu',
        instructorId: admin._id,
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
        tags: ['DSA', 'Coding', 'Interviews'],
        rating: 4.7,
        ratingsCount: 312,
        enrolledCount: 3120,
        status: 'Published',
        price: 149,
        discountPrice: 89,
        lessons: [
          { title: 'Arrays and Strings', duration: '30 min', order: 1 },
          { title: 'Linked Lists', duration: '35 min', order: 2 },
          { title: 'Stacks and Queues', duration: '30 min', order: 3 }
        ],
        quizQuestions: []
      },
      {
        title: 'Cloud Architecture with AWS',
        description: 'Design scalable and resilient cloud solutions using Amazon Web Services.',
        difficulty: 'Intermediate',
        duration: '8 weeks',
        instructor: 'Emily Watson',
        instructorId: admin._id,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
        tags: ['AWS', 'Cloud', 'DevOps'],
        rating: 4.6,
        ratingsCount: 142,
        enrolledCount: 1420,
        status: 'Published',
        price: 119,
        discountPrice: 69,
        lessons: [
          { title: 'Introduction to AWS', duration: '25 min', order: 1 },
          { title: 'EC2 and VPC', duration: '40 min', order: 2 }
        ],
        quizQuestions: []
      },
      {
        title: 'UI/UX Design Fundamentals',
        description: 'Create beautiful and user-friendly interfaces with modern design principles.',
        difficulty: 'Beginner',
        duration: '5 weeks',
        instructor: 'Anna Kim',
        instructorId: admin._id,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
        tags: ['Design', 'Figma', 'UX'],
        rating: 4.8,
        ratingsCount: 289,
        enrolledCount: 2890,
        status: 'Published',
        price: 79,
        discountPrice: 39,
        lessons: [
          { title: 'Design Principles', duration: '20 min', order: 1 },
          { title: 'Color Theory', duration: '25 min', order: 2 }
        ],
        quizQuestions: []
      },
      {
        title: 'Python for Data Analysis',
        description: 'Analyze and visualize data using Python, Pandas, and Matplotlib.',
        difficulty: 'Beginner',
        duration: '6 weeks',
        instructor: 'Dr. Mark Thompson',
        instructorId: admin._id,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        tags: ['Python', 'Data', 'Analytics'],
        rating: 4.7,
        ratingsCount: 215,
        enrolledCount: 2150,
        status: 'Published',
        price: 89,
        discountPrice: 49,
        lessons: [
          { title: 'Python Basics', duration: '30 min', order: 1 },
          { title: 'Pandas Introduction', duration: '35 min', order: 2 }
        ],
        quizQuestions: []
      }
    ]);

    // Enroll user in some courses
    user.enrolledCourses = [
      {
        course: courses[0]._id,
        completedLessons: [courses[0].lessons[0]._id, courses[0].lessons[1]._id],
        progress: 40
      },
      {
        course: courses[2]._id,
        completedLessons: courses[2].lessons.map(l => l._id),
        progress: 100,
        completed: true,
        completedAt: new Date()
      }
    ];
    await user.save();

    console.log('✅ Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: alex@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
