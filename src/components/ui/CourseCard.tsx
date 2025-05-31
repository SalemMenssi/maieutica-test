
import React from 'react';
import { Clock, Star, Users, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Course } from '@/store/coursesStore';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  variant?: 'default' | 'enrolled';
  className?: string;
}

/**
 * Course Card component displaying course information
 * Supports both public catalog and enrolled course views
 */
export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onClick,
  variant = 'default',
  className,
}) => {
  const isEnrolled = variant === 'enrolled' || course.enrolled;

  return (
    <div 
      className={cn(
        'bg-card border rounded-lg overflow-hidden shadow-sm course-card cursor-pointer',
        'hover:shadow-md transition-all duration-300',
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Course: ${course.title}`}
    >
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={`${course.title} course thumbnail`}
          className="w-full h-48 object-cover"
        />
        
        {/* Course level badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'badge text-xs',
            course.level === 'beginner' && 'bg-green-100 text-green-800',
            course.level === 'intermediate' && 'bg-yellow-100 text-yellow-800',
            course.level === 'advanced' && 'bg-red-100 text-red-800'
          )}>
            {course.level}
          </span>
        </div>

        {/* Progress indicator for enrolled courses */}
        {isEnrolled && course.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-accent-500" 
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 mb-1">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
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
          
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.studentsCount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={course.instructor.avatar} 
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-muted-foreground">
              {course.instructor.name}
            </span>
          </div>

          {!isEnrolled && (
            <span className="font-semibold text-primary-600">
              ${course.price}
            </span>
          )}
          
          {isEnrolled && (
            <span className="text-sm font-medium text-accent-500">
              {course.progress}% Complete
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
