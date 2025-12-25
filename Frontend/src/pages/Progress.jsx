import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Target, Flame, TrendingUp, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { courses } from '../data/mockData';
import { authUtils } from '../utils/auth';
import { authAPI } from '../utils/api';

const weeklyActivity = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 2 },
  { day: 'Fri', hours: 4 },
  { day: 'Sat', hours: 1 },
  { day: 'Sun', hours: 2.5 },
];

const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

export default function Progress() {
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

  const inProgress = courses.filter(c => c.completedLessons > 0 && c.completedLessons < c.lessons);
  const completed = courses.filter(c => c.completedLessons === c.lessons);
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons, 0);
  const completedLessons = courses.reduce((acc, c) => acc + c.completedLessons, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-teal-500/10 rounded-xl">
          <TrendingUp className="w-6 h-6 text-teal-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Your Progress</h1>
          <p className="text-zinc-500">Track your learning journey and achievements</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-amber-500/20" hover>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{completed.length}</p>
              <p className="text-sm text-zinc-500">Completed</p>
            </div>
          </div>
        </Card>
        <Card className="p-5 border-teal-500/20" hover>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-500/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{inProgress.length}</p>
              <p className="text-sm text-zinc-500">In Progress</p>
            </div>
          </div>
        </Card>
        <Card className="p-5 border-emerald-500/20" hover>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{currentUser.averageScore || 0}%</p>
              <p className="text-sm text-zinc-500">Avg Score</p>
            </div>
          </div>
        </Card>
        <Card className="p-5 border-orange-500/20" hover>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{currentUser.streak || 0}</p>
              <p className="text-sm text-zinc-500">Day Streak</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <Card className="lg:col-span-2" glow>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Weekly Activity</h2>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Calendar className="w-4 h-4" />
                This Week
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-3 h-44">
              {weeklyActivity.map(({ day, hours }) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full bg-zinc-800 rounded-lg relative" style={{ height: '140px' }}>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-teal-500 to-teal-400 rounded-lg transition-all duration-500"
                      style={{ height: `${(hours / maxHours) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 font-medium">{day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-zinc-800">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">16.5</p>
                <p className="text-sm text-zinc-500">Hours this week</p>
              </div>
              <div className="w-px h-12 bg-zinc-800" />
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-400">+23%</p>
                <p className="text-sm text-zinc-500">vs last week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Progress */}
        <Card glow>
          <CardHeader>
            <h2 className="text-lg font-bold text-white">Overall Progress</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative w-36 h-36 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="60" fill="none" stroke="#27272a" strokeWidth="10" />
                <circle
                  cx="72" cy="72" r="60" fill="none" stroke="url(#overallGradient)" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(completedLessons / totalLessons) * 377} 377`}
                />
                <defs>
                  <linearGradient id="overallGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{Math.round((completedLessons / totalLessons) * 100)}%</p>
                  <p className="text-xs text-zinc-500">Complete</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-zinc-800/50 rounded-lg">
                <span className="text-zinc-400">Lessons completed</span>
                <span className="font-semibold text-white">{completedLessons}/{totalLessons}</span>
              </div>
              <div className="flex justify-between p-3 bg-zinc-800/50 rounded-lg">
                <span className="text-zinc-400">Courses enrolled</span>
                <span className="font-semibold text-white">{courses.length}</span>
              </div>
              <div className="flex justify-between p-3 bg-zinc-800/50 rounded-lg">
                <span className="text-zinc-400">Certificates earned</span>
                <span className="font-semibold text-white">{completed.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* In Progress Courses */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-teal-500/10 rounded-lg">
            <Sparkles className="w-5 h-5 text-teal-400" />
          </div>
          <h2 className="text-lg font-bold text-white">Courses In Progress</h2>
        </div>
        <div className="space-y-3">
          {inProgress.map(course => (
            <Card key={course.id} hover className="p-5">
              <div className="flex items-center gap-5">
                <img src={course.image} alt={course.title} className="w-20 h-20 rounded-xl object-cover hidden sm:block" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white truncate">{course.title}</h3>
                    <Badge difficulty={course.difficulty} className="hidden sm:inline-flex">{course.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-zinc-500 mb-3">{course.completedLessons} of {course.lessons} lessons</p>
                  <ProgressBar value={course.completedLessons} max={course.lessons} size="sm" />
                </div>
                <Link to={`/courses/${course.id}`}>
                  <Button variant="ghost" size="sm" className="group">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Completed Courses */}
      {completed.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Completed Courses</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map(course => (
              <Card key={course.id} className="p-5 border-amber-500/10" hover>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-xl">
                    <Trophy className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{course.title}</h3>
                    <p className="text-sm text-teal-400">Completed</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
