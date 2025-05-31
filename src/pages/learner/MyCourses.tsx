
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Clock, Star } from 'lucide-react';
import { useCoursesStore } from '@/store/coursesStore';
import { CourseCard } from '@/components/ui/CourseCard';

/**
 * My Courses page - Shows enrolled courses with progress tracking
 * Features filtering, search, and different view modes
 */
const MyCourses: React.FC = () => {
  const { courses } = useCoursesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: '1',
      title: 'Interactive Mathematics: Algebra Fundamentals',
      description: 'Master algebraic concepts through visual learning and interactive exercises',
      category: 'Mathematics',
      level: 'beginner' as const,
      duration: '8 weeks',
      price: 49.99,
      instructor: {
        name: 'Dr. Sarah Chen',
        avatar: '/api/placeholder/40/40',
        bio: 'Mathematics professor with 15 years of experience'
      },
      thumbnail: '/api/placeholder/300/200',
      coverVideo: '/api/placeholder/video',
      lessons: [
        { id: '1', title: 'Introduction to Variables', duration: '15 min', type: 'video' as const, completed: true },
        { id: '2', title: 'Basic Operations', duration: '20 min', type: 'video' as const, completed: true },
        { id: '3', title: 'Practice Exercises', duration: '10 min', type: 'exercise' as const, completed: false },
      ],
      progress: 67,
      enrolled: true,
      rating: 4.8,
      studentsCount: 1234,
    },
    {
      id: '2',
      title: 'Creative Writing Workshop',
      description: 'Express yourself through stories, poems, and creative exercises',
      category: 'Language Arts',
      level: 'intermediate' as const,
      duration: '6 weeks',
      price: 39.99,
      instructor: {
        name: 'Prof. Michael Torres',
        avatar: '/api/placeholder/40/40',
        bio: 'Award-winning author and writing instructor'
      },
      thumbnail: '/api/placeholder/300/200',
      lessons: [
        { id: '1', title: 'Finding Your Voice', duration: '25 min', type: 'video' as const, completed: true },
        { id: '2', title: 'Character Development', duration: '30 min', type: 'video' as const, completed: false },
      ],
      progress: 25,
      enrolled: true,
      rating: 4.9,
      studentsCount: 856,
    },
    {
      id: '3',
      title: 'Science Experiments for Kids',
      description: 'Hands-on learning with safe and fun science experiments',
      category: 'Science',
      level: 'beginner' as const,
      duration: '10 weeks',
      price: 59.99,
      instructor: {
        name: 'Dr. Emma Wilson',
        avatar: '/api/placeholder/40/40',
        bio: 'Science educator and researcher'
      },
      thumbnail: '/api/placeholder/300/200',
      lessons: [
        { id: '1', title: 'Lab Safety', duration: '10 min', type: 'video' as const, completed: true },
        { id: '2', title: 'The Scientific Method', duration: '15 min', type: 'video' as const, completed: true },
        { id: '3', title: 'Volcano Experiment', duration: '20 min', type: 'exercise' as const, completed: true },
      ],
      progress: 100,
      enrolled: true,
      rating: 4.7,
      studentsCount: 2341,
    },
  ];

  // Filter courses based on active tab
  const getFilteredCourses = () => {
    let filtered = enrolledCourses;

    // Filter by tab
    switch (activeTab) {
      case 'in-progress':
        filtered = filtered.filter(course => course.progress > 0 && course.progress < 100);
        break;
      case 'completed':
        filtered = filtered.filter(course => course.progress === 100);
        break;
      default:
        // Show all enrolled courses
        break;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  const tabs = [
    { id: 'all', label: 'All Courses', count: enrolledCourses.length },
    { 
      id: 'in-progress', 
      label: 'In Progress', 
      count: enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length 
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      count: enrolledCourses.filter(c => c.progress === 100).length 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">My Courses</h1>
          <p className="text-muted-foreground">Track your learning progress and continue where you left off</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-ring"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Course List */}
      <div className="space-y-6">
        {filteredCourses.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variant="enrolled"
                  onClick={() => window.location.href = `/app/course/${course.id}/learn`}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-card border rounded-lg p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full md:w-48 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <span className={`badge ${
                            course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                            course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.level}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">{course.description}</p>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <span>by {course.instructor.name}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}% complete</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-accent-500 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {course.lessons.filter(l => l.completed).length} of {course.lessons.length} lessons completed
                        </span>
                        <Link
                          to={`/app/course/${course.id}/learn`}
                          className="btn-primary py-2 px-4 text-sm"
                        >
                          {course.progress === 100 ? 'Review' : 'Continue'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters.'
                  : 'You haven\'t enrolled in any courses yet.'
                }
              </p>
              {!searchTerm && (
                <Link to="/courses" className="btn-primary">
                  Browse Courses
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
