import React from 'react';
import { useCourseStore } from '../store/courseStore';

interface DropButtonProps {
  courseId: string;
  courseName: string;
}

export const DropButton: React.FC<DropButtonProps> = ({ courseId, courseName }) => {
  const dropCourse = useCourseStore(state => state.dropCourse);

  const handleDrop = () => {
    if (window.confirm(`คุณต้องการถอนรายวิชา "${courseName}" หรือไม่?`)) {
      dropCourse(courseId);
    }
  };

  return (
    <button 
      onClick={handleDrop}
      className="drop-btn"
      title={`ถอนรายวิชา ${courseName}`}
    >
      ถอนรายวิชา
    </button>
  );
};