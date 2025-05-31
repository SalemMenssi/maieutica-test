
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award,
  Play,
  BookOpen,
  Calendar,
  Trophy
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCoursesStore } from '@/store/coursesStore';
import { XPProgressBar } from '@/components/ui/XPProgressBar';
import { CourseCard } from '@/components/ui/CourseCard';

/**
 * Learner Dashboard - Main overview page with gamified elements
 * Features XP progress, course recommendations, weekly goals, and achievements
 */
const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { courses } = useCoursesStore();
  const [weeklyGoal] = useState({ current: 4, target: 7 }); // hours studied this week
  const [studyStreak] = useState(12); // consecutive days
  
  // Filter enrolled courses
  const enrolledCourses = courses.filter(course => course.enrolled);
  const inProgressCourses = enrolledCourses.filter(course => course.progress && course.progress < 100);
  const completedCourses = enrolledCourses.filter(course => course.progress === 100);

  // Mock upcoming live sessions
  const upcomingLive = [
    {
      id: '1',
      title: 'Interactive Math Workshop',
      instructor: 'Dr. Sarah Chen',
      time: '2:00 PM Today',
      thumbnail: '/api/placeholder/60/40'
    },
    {
      id: '2',
      title: 'Creative Writing Session',
      instructor: 'Prof. Michael Torres',
      time: '10:00 AM Tomorrow',
      thumbnail: '/api/placeholder/60/40'
    }
  ];

  // Recent achievements/badges
  const recentAchievements = [
    { id: '1', name: 'Week Warrior', description: '7 days study streak', icon: '🔥' },
    { id: '2', name: 'Quick Learner', description: 'Completed 3 lessons today', icon: '⚡' },
    { id: '3', name: 'Math Master', description: 'Finished algebra course', icon: '🧮' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-foreground">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your learning journey? You're doing great!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* XP Progress Card */}
        <div className="col-span-1 md:col-span-2 bg-card rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Your Progress</h3>
            <TrendingUp className="w-5 h-5 text-accent-500" />
          </div>
          <XPProgressBar 
            currentXP={user?.xp || 0}
            maxXP={1000}
            level={user?.level || 1}
            showAnimation
          />
          <div className="mt-4 text-sm text-muted-foreground">
            🎯 Keep going! Only {1000 - (user?.xp || 0)} XP to next level
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Weekly Goal</h3>
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{weeklyGoal.current}h studied</span>
              <span className="text-muted-foreground">{weeklyGoal.target}h goal</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(weeklyGoal.current / weeklyGoal.target) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {weeklyGoal.target - weeklyGoal.current}h left to reach your goal
            </p>
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Study Streak</h3>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-accent-500">
              {studyStreak}
            </div>
            <p className="text-sm text-muted-foreground">days in a row</p>
            <p className="text-xs text-accent-500 font-medium">
              Amazing! Keep it up!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
            {inProgressCourses.length > 0 ? (
              <div className="grid gap-4">
                {inProgressCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="bg-card rounded-lg p-4 border flex items-center space-x-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.progress}% complete
                      </p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-accent-500 h-1.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      to={`/app/course/${course.id}/learn`}
                      className="btn-primary py-2 px-4 text-sm"
                    >
                      Continue
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg p-8 border text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No courses in progress</h3>
                <p className="text-muted-foreground mb-4">Start learning something new today!</p>
                <Link to="/app/courses" className="btn-primary">
                  Browse Courses
                </Link>
              </div>
            )}
          </div>

          {/* Recent Achievements */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
            <div className="grid gap-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-card rounded-lg p-4 border flex items-center space-x-4">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Award className="w-5 h-5 text-accent-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Live Sessions */}
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-accent-500" />
              Upcoming Live Sessions
            </h3>
            <div className="space-y-3">
              {upcomingLive.map((session) => (
                <div key={session.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <img 
                    src={session.thumbnail} 
                    alt={session.title}
                    className="w-12 h-8 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{session.title}</h4>
                    <p className="text-xs text-muted-foreground">{session.instructor}</p>
                    <p className="text-xs text-accent-500 font-medium">{session.time}</p>
                  </div>
                  <Play className="w-4 h-4 text-primary-600 flex-shrink-0" />
                </div>
              ))}
            </div>
            <Link 
              to="/app/live-sessions" 
              className="block mt-4 text-center text-sm text-primary-600 hover:text-primary-400"
            >
              View all sessions →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/app/courses"
                className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <BookOpen className="w-5 h-5 text-primary-600" />
                <span className="font-medium">Browse Courses</span>
              </Link>
              <Link 
                to="/app/leaderboard"
                className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <Trophy className="w-5 h-5 text-accent-500" />
                <span className="font-medium">View Leaderboard</span>
              </Link>
              <Link 
                to="/app/profile"
                className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">My Achievements</span>
              </Link>
            </div>
          </div>

          {/* Study Tip of the Day */}
          <div className="bg-gradient-to-br from-accent-300/20 to-primary-600/20 rounded-lg p-6 border">
            <h3 className="font-semibold mb-2">💡 Study Tip</h3>
            <p className="text-sm text-muted-foreground">
              Take breaks every 25 minutes during study sessions. 
              Your brain needs time to process and retain information!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
