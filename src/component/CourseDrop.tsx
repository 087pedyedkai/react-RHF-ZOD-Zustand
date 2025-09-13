import React from 'react';
import { useCourseStore } from '../store/courseStore';

export const CourseDrop: React.FC = () => {
  const droppedCourses = useCourseStore(state => state.droppedCourses);
  const restoreCourse = useCourseStore(state => state.restoreCourse);

  const handleRestore = (courseId: string, courseName: string) => {
    if (window.confirm(`คุณต้องการกู้คืนรายวิชา "${courseName}" หรือไม่?`)) {
      restoreCourse(courseId);
    }
  };

  if (droppedCourses.length === 0) {
    return (
      <div className="course-drop-container">
        <h2>รายวิชาที่ถอน</h2>
        <p className="no-courses">ยังไม่มีรายวิชาที่ถอน</p>
      </div>
    );
  }

  return (
    <div className="course-drop-container">
      <h2>รายวิชาที่ถอน</h2>
      <p className="drop-info">รายวิชาที่ถอนแล้ว ({droppedCourses.length} รายวิชา)</p>
      
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
            {droppedCourses.map((course) => (
              <tr key={course.id} className="dropped-course">
                <td>{course.courseCode}</td>
                <td>{course.courseNameThai}</td>
                <td>{course.courseNameEnglish}</td>
                <td>{course.credits}</td>
                <td>{course.instructor}</td>
                <td className={`grade-${course.grade.toLowerCase()}`}>
                  {course.grade}
                </td>
                <td>
                  <button 
                    onClick={() => handleRestore(course.id, course.courseNameThai)}
                    className="restore-btn"
                    title={`กู้คืนรายวิชา ${course.courseNameThai}`}
                  >
                    กู้คืน
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};