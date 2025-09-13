import { create } from 'zustand';
import type { CourseWithId } from '../types/course';
import { gradePoints } from '../types/course';

interface CourseStore {
  enrolledCourses: CourseWithId[];
  droppedCourses: CourseWithId[];
  
  // Actions
  addCourse: (course: Omit<CourseWithId, 'id'>) => void;
  dropCourse: (courseId: string) => void;
  restoreCourse: (courseId: string) => void;
  
  // Computed values
  getTotalCredits: () => number;
  getGPA: () => number;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  enrolledCourses: [],
  droppedCourses: [],

  addCourse: (course) => {
    const newCourse: CourseWithId = {
      ...course,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    
    set((state) => ({
      enrolledCourses: [...state.enrolledCourses, newCourse],
    }));
  },

  dropCourse: (courseId) => {
    set((state) => {
      const courseToMove = state.enrolledCourses.find(course => course.id === courseId);
      if (!courseToMove) return state;

      return {
        enrolledCourses: state.enrolledCourses.filter(course => course.id !== courseId),
        droppedCourses: [...state.droppedCourses, courseToMove],
      };
    });
  },

  restoreCourse: (courseId) => {
    set((state) => {
      const courseToMove = state.droppedCourses.find(course => course.id === courseId);
      if (!courseToMove) return state;

      return {
        droppedCourses: state.droppedCourses.filter(course => course.id !== courseId),
        enrolledCourses: [...state.enrolledCourses, courseToMove],
      };
    });
  },

  getTotalCredits: () => {
    const { enrolledCourses } = get();
    return enrolledCourses.reduce((total, course) => total + course.credits, 0);
  },

  getGPA: () => {
    const { enrolledCourses } = get();
    
    // Filter out non-GPA affecting grades (W, I, S, U)
    const gpaCoursesCredit = enrolledCourses
      .filter(course => !['W', 'I', 'S', 'U'].includes(course.grade))
      .reduce((total, course) => total + course.credits, 0);
    
    if (gpaCoursesCredit === 0) return 0;
    
    const totalGradePoints = enrolledCourses
      .filter(course => !['W', 'I', 'S', 'U'].includes(course.grade))
      .reduce((total, course) => {
        return total + (gradePoints[course.grade] * course.credits);
      }, 0);
    
    return Math.round((totalGradePoints / gpaCoursesCredit) * 100) / 100;
  },
}));