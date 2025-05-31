
import { create } from 'zustand';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  thumbnail: string;
  coverVideo?: string;
  lessons: Lesson[];
  progress?: number;
  enrolled?: boolean;
  rating: number;
  studentsCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'exercise' | 'reading' | 'live-session';
  videoUrl?: string;
  exerciseData?: any;
  completed?: boolean;
  resources?: Array<{
    title: string;
    type: 'pdf' | 'link' | 'download';
    url: string;
  }>;
}

interface CoursesState {
  courses: Course[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  filters: {
    category: string;
    level: string;
    search: string;
  };
  setCourses: (courses: Course[]) => void;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  updateFilters: (filters: Partial<CoursesState['filters']>) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  updateProgress: (courseId: string, progress: number) => void;
}

export const useCoursesStore = create<CoursesState>((set, get) => ({
  courses: [],
  currentCourse: null,
  currentLesson: null,
  filters: {
    category: '',
    level: '',
    search: '',
  },

  setCourses: (courses) => set({ courses }),

  setCurrentCourse: (course) => set({ currentCourse: course }),

  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  markLessonComplete: (courseId, lessonId) => {
    set((state) => {
      const updatedCourses = state.courses.map(course => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          );
          const completedLessons = updatedLessons.filter(l => l.completed).length;
          const progress = Math.round((completedLessons / updatedLessons.length) * 100);
          
          return { ...course, lessons: updatedLessons, progress };
        }
        return course;
      });

      return { courses: updatedCourses };
    });
  },

  updateProgress: (courseId, progress) => {
    set((state) => {
      const updatedCourses = state.courses.map(course =>
        course.id === courseId ? { ...course, progress } : course
      );
      return { courses: updatedCourses };
    });
  },
}));
