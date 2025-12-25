import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, Target, Flame, ArrowRight, Clock, Star, Sparkles, Zap } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { courses, recommendations } from '../data/mockData';
import { authUtils } from '../utils/auth';
import { authAPI } from '../utils/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const user = authUtils.getUser();
      const token = authUtils.getToken();
      
      if (!user || !token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch fresh user data from backend
        const userData = await authAPI.getMe(token);
        authUtils.updateUser(userData);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error loading user data:', error);
        // Use cached user data if API fails
        setCurrentUser(user);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  if (loading || !currentUser) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  const stats = [
    { label: 'Courses Completed', value: currentUser.completedCourses || 0, icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Average Score', value: `${currentUser.averageScore || 0}%`, icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Day Streak', value: currentUser.streak || 0, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { label: 'In Progress', value: courses.filter(c => c.completedLessons > 0 && c.completedLessons < c.lessons).length, icon: BookOpen, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  ];

  const inProgressCourses = courses.filter(c => c.completedLessons > 0 && c.completedLessons < c.lessons);

  return (
    <div className="space-y-10">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-teal-950/30 border border-zinc-800 p-8 lg:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome back
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Hey, {currentUser.name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl">
              Continue your learning journey. You're on a <span className="text-teal-400 font-semibold">{currentUser.streak || 0}-day streak</span> — keep it going!
            </p>
          </div>
          <Link to="/courses">
            <Button size="lg" className="group">
              Browse Courses
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
          <Card key={label} hover className={`p-5 border ${border}`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-zinc-500">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Continue Learning */}
      {inProgressCourses.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-500/10 rounded-lg">
                <Zap className="w-5 h-5 text-teal-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Continue Learning</h2>
            </div>
            <Link to="/progress" className="text-sm text-teal-400 hover:text-teal-300 font-medium transition-colors">View all</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {inProgressCourses.slice(0, 2).map(course => (
              <Card key={course.id} hover className="overflow-hidden">
                <div className="flex">
                  <img src={course.image} alt={course.title} className="w-36 h-full object-cover hidden sm:block" />
                  <CardContent className="flex-1">
                    <Badge difficulty={course.difficulty} className="mb-3">{course.difficulty}</Badge>
                    <h3 className="font-semibold text-white mb-1">{course.title}</h3>
                    <p className="text-sm text-zinc-500 mb-4">{course.instructor}</p>
                    <ProgressBar value={course.completedLessons} max={course.lessons} showLabel />
                    <Link to={`/courses/${course.id}`}>
                      <Button variant="secondary" size="sm" className="mt-4 group">
                        Continue
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Recommended for You</h2>
          </div>
          <Link to="/courses" className="text-sm text-teal-400 hover:text-teal-300 font-medium transition-colors">See all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map(course => (
            <Card key={course.id} hover glow className="overflow-hidden group">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge difficulty={course.difficulty}>{course.difficulty}</Badge>
                </div>
              </div>
              <CardContent>
                <p className="text-xs text-teal-400 font-medium mb-2">{course.reason}</p>
                <h3 className="font-semibold text-white mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-zinc-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-zinc-300">{course.rating}</span>
                  </div>
                </div>
                <Link to={`/courses/${course.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
