import React from 'react';
import { CourseForm } from './CourseForm';
import { CourseList } from './CourseList';
import { CourseDrop } from './CourseDrop';
import './stu_system.css';

export const StudentSystem: React.FC = () => {
  return (
    <div className="student-system">
      <header className="system-header">
        <h1>ระบบการจัดการรายวิชา</h1>
      </header>

      <div className="system-content">
        {/* Add Course Form */}
        <section className="form-section">
          <CourseForm />
        </section>

        {/* Enrolled Courses */}
        <section className="enrolled-section">
          <CourseList />
        </section>

        {/* Dropped Courses */}
        <section className="dropped-section">
          <CourseDrop />
        </section>
      </div>
    </div>
  );
};

export default StudentSystem;
