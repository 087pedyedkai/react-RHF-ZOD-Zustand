import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, type Course } from '../types/course';
import { useCourseStore } from '../store/courseStore';

export const CourseForm: React.FC = () => {
  const addCourse = useCourseStore(state => state.addCourse);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Course>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = (data: Course) => {
    addCourse(data);
    reset();
  };

  return (
    <div className="course-form-container">
      <h2>เพิ่มรายวิชา</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="course-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="courseCode">รหัสวิชา:</label>
            <input
              type="text"
              id="courseCode"
              {...register('courseCode')}
              placeholder="เช่น CSC101"
            />
            {errors.courseCode && (
              <span className="error">{errors.courseCode.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="credits">หน่วยกิต:</label>
            <input
              type="number"
              id="credits"
              {...register('credits', { valueAsNumber: true })}
              min="1"
              max="6"
              placeholder="1-6"
            />
            {errors.credits && (
              <span className="error">{errors.credits.message}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="courseNameThai">ชื่อวิชา (ไทย):</label>
            <input
              type="text"
              id="courseNameThai"
              {...register('courseNameThai')}
              placeholder="ชื่อวิชาภาษาไทย"
            />
            {errors.courseNameThai && (
              <span className="error">{errors.courseNameThai.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="courseNameEnglish">ชื่อวิชา (อังกฤษ):</label>
            <input
              type="text"
              id="courseNameEnglish"
              {...register('courseNameEnglish')}
              placeholder="Course Name in English"
            />
            {errors.courseNameEnglish && (
              <span className="error">{errors.courseNameEnglish.message}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="instructor">อาจารย์ผู้สอน:</label>
            <input
              type="text"
              id="instructor"
              {...register('instructor')}
              placeholder="ชื่ออาจารย์ผู้สอน"
            />
            {errors.instructor && (
              <span className="error">{errors.instructor.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="grade">เกรด:</label>
            <select id="grade" {...register('grade')}>
              <option value="">เลือกเกรด</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="F">F</option>
              <option value="W">W</option>
              <option value="I">I</option>
              <option value="S">S</option>
              <option value="U">U</option>
            </select>
            {errors.grade && (
              <span className="error">{errors.grade.message}</span>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          เพิ่มรายวิชา
        </button>
      </form>
    </div>
  );
};