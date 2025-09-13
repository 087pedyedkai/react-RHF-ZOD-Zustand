import React from 'react';
import { useCourseStore } from '../store/courseStore';
import { DropButton } from './DropButton';

export const CourseList: React.FC = () => {
  const enrolledCourses = useCourseStore(state => state.enrolledCourses);
  const getTotalCredits = useCourseStore(state => state.getTotalCredits);
  const getGPA = useCourseStore(state => state.getGPA);

  if (enrolledCourses.length === 0) {
    return (
      <div className="course-list-container">
        <h2>รายวิชาที่ลงทะเบียน</h2>
        <p className="no-courses">ยังไม่มีรายวิชาที่ลงทะเบียน</p>
      </div>
    );
  }

  return (
    <div className="course-list-container">
      <h2>รายวิชาที่ลงทะเบียน</h2>
      
      <div className="course-summary">
        <p><strong>จำนวนหน่วยกิตรวม:</strong> {getTotalCredits()} หน่วยกิต</p>
        <p><strong>เกรดเฉลี่ยรวม (GPA):</strong> {getGPA().toFixed(2)}</p>
      </div>

      <div className="course-table">
        <table>
          <thead>
            <tr>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา (ไทย)</th>
              <th>ชื่อวิชา (อังกฤษ)</th>
              <th>หน่วยกิต</th>
              <th>อาจารย์ผู้สอน</th>
              <th>เกรด</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.courseCode}</td>
                <td>{course.courseNameThai}</td>
                <td>{course.courseNameEnglish}</td>
                <td>{course.credits}</td>
                <td>{course.instructor}</td>
                <td className={`grade-${course.grade.toLowerCase()}`}>
                  {course.grade}
                </td>
                <td>
                  <DropButton 
                    courseId={course.id} 
                    courseName={course.courseNameThai}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};