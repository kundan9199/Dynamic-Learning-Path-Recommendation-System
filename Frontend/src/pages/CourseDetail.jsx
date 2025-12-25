import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Star, Users, CheckCircle2, Circle, Play, FileText, Award, Sparkles, Tag } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { courses, courseLessons, quizQuestions } from '../data/mockData';

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id)) || courses[0];
  const lessons = courseLessons[1] || [];
  
  const [completedLessons, setCompletedLessons] = useState(
    lessons.filter(l => l.completed).map(l => l.id)
  );
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const toggleLesson = (lessonId) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const progress = Math.round((completedLessons.length / lessons.length) * 100);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const quizScore = quizSubmitted
    ? quizQuestions.filter(q => quizAnswers[q.id] === q.correctAnswer).length
    : 0;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      {/* Course Header */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden" glow>
            <div className="relative">
              <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            </div>
            <CardContent className="space-y-5 -mt-16 relative">
              <div className="flex flex-wrap gap-2">
                <Badge difficulty={course.difficulty}>{course.difficulty}</Badge>
                {course.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-lg border border-zinc-700">{tag}</span>
                ))}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{course.title}</h1>
              <p className="text-zinc-400 leading-relaxed">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 pt-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-600" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-zinc-600" />
                  <span>{lessons.length} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-zinc-300">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-zinc-600" />
                  <span>{course.enrolled.toLocaleString()} enrolled</span>
                </div>
              </div>

              <div className="pt-5 border-t border-zinc-800">
                <p className="text-sm text-zinc-500 mb-1">Instructor</p>
                <p className="font-medium text-white">{course.instructor}</p>
              </div>
            </CardContent>
          </Card>

          {/* Lessons */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Course Content</h2>
                <span className="text-sm text-zinc-500">{completedLessons.length}/{lessons.length} completed</span>
              </div>
              <ProgressBar value={completedLessons.length} max={lessons.length} className="mt-4" />
            </CardHeader>
            <div className="divide-y divide-zinc-800 max-h-[500px] overflow-y-auto">
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => toggleLesson(lesson.id)}
                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/50 transition-colors text-left group"
                  >
                    <span className="text-sm text-zinc-600 w-6 font-mono">{String(index + 1).padStart(2, '0')}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-700 group-hover:text-zinc-500 flex-shrink-0 transition-colors" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate transition-colors ${isCompleted ? 'text-zinc-500' : 'text-zinc-200 group-hover:text-white'}`}>
                        {lesson.title}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-600 flex-shrink-0">{lesson.duration}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card className="p-6 sticky top-20" glow>
            <div className="text-center mb-6">
              <div className="relative inline-flex">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="#27272a" strokeWidth="8" />
                  <circle
                    cx="56" cy="56" r="48" fill="none" stroke="url(#progressGradient)" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(progress / 100) * 301.6} 301.6`}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{progress}%</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-500 mt-2">Course Progress</p>
            </div>
            
            {progress === 100 ? (
              <div className="text-center p-5 bg-teal-500/10 border border-teal-500/20 rounded-2xl mb-5">
                <Award className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                <p className="font-semibold text-teal-400">Course Completed!</p>
                <p className="text-sm text-zinc-500 mt-1">Great job finishing this course</p>
              </div>
            ) : (
              <Button className="w-full mb-4" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            )}
            
            <Button variant="outline" className="w-full" onClick={() => setShowQuiz(!showQuiz)}>
              <FileText className="w-4 h-4 mr-2" />
              {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
            </Button>

            {/* Pricing Card */}
            <div className="mt-6 p-5 bg-gradient-to-br from-zinc-800/50 to-zinc-900 rounded-2xl border border-zinc-700">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Limited Offer</span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">$49</span>
                <span className="text-lg text-zinc-500 line-through">$99</span>
              </div>
              <p className="text-sm text-zinc-500 mb-4">50% off — Ends in 2 days</p>
              <Button className="w-full">Enroll Now</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Quiz Section */}
      {showQuiz && (
        <Card glow>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Knowledge Check</h2>
                <p className="text-sm text-zinc-500">Test your understanding of the course material</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {quizSubmitted ? (
              <div className="text-center py-10">
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-5 ${quizScore >= 4 ? 'bg-teal-500/20 border border-teal-500/30' : 'bg-amber-500/20 border border-amber-500/30'}`}>
                  <span className={`text-4xl font-bold ${quizScore >= 4 ? 'text-teal-400' : 'text-amber-400'}`}>
                    {quizScore}/{quizQuestions.length}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {quizScore >= 4 ? 'Great job!' : 'Keep practicing!'}
                </h3>
                <p className="text-zinc-500 mb-8">
                  You scored {Math.round((quizScore / quizQuestions.length) * 100)}% on this quiz
                </p>
                <Button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}>
                  Retake Quiz
                </Button>
              </div>
            ) : (
              <>
                {quizQuestions.map((q, qIndex) => (
                  <div key={q.id} className="space-y-4">
                    <p className="font-medium text-white text-lg">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="space-y-3">
                      {q.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oIndex })}
                          className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                            quizAnswers[q.id] === oIndex
                              ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                              : 'border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="w-full"
                  size="lg"
                >
                  Submit Quiz
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
