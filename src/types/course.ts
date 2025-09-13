import { z } from 'zod';

// Zod schema for course validation
export const courseSchema = z.object({
  courseCode: z.string().min(1, 'รหัสวิชาจำเป็น'),
  courseNameThai: z.string().min(1, 'ชื่อวิชา (ไทย) จำเป็น'),
  courseNameEnglish: z.string().min(1, 'ชื่อวิชา (อังกฤษ) จำเป็น'),
  credits: z.number().min(1, 'หน่วยกิตต้องมากกว่า 0').max(6, 'หน่วยกิตไม่เกิน 6'),
  instructor: z.string().min(1, 'ชื่ออาจารย์ผู้สอนจำเป็น'),
  grade: z.enum(['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'W', 'I', 'S', 'U'], {
    message: 'เกรดจำเป็น',
  }),
});

// TypeScript type from Zod schema
export type Course = z.infer<typeof courseSchema>;

// Course with ID for store management
export interface CourseWithId extends Course {
  id: string;
}

// Grade point mapping for GPA calculation
export const gradePoints: Record<Course['grade'], number> = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
  'W': 0.0,  // Withdrawn - no credit
  'I': 0.0,  // Incomplete - no credit
  'S': 0.0,  // Satisfactory - no point value
  'U': 0.0,  // Unsatisfactory - no point value
};