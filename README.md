# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# ระบบการถอนรายวิชา (Course Withdrawal System)

ระบบจัดการรายวิชาที่พัฒนาด้วย React, React Hook Form, Zod, และ Zustand

## คุณสมบัติหลัก

### 📚 การจัดการรายวิชา
- **เพิ่มรายวิชา**: เพิ่มรายวิชาใหม่ด้วยแบบฟอร์มที่มีการตรวจสอบข้อมูล
- **แสดงรายวิชาที่ลงทะเบียน**: แสดงรายการวิชาทั้งหมดที่ลงทะเบียนพร้อมรายละเอียด
- **ถอนรายวิชา**: สามารถเลือกถอนรายวิชาที่ไม่ต้องการ
- **กู้คืนรายวิชา**: สามารถกู้คืนรายวิชาที่ถอนไปแล้ว

### 🧮 การคำนวณ GPA
- คำนวณเกรดเฉลี่ยรวม (GPA) อัตโนมัติ
- แสดงจำนวนหน่วยกิตรวม
- ไม่นับเกรด W, I, S, U ในการคำนวณ GPA

### ✅ การตรวจสอบข้อมูล
- ใช้ Zod สำหรับตรวจสอบความถูกต้องของข้อมูล
- แสดงข้อความแจ้งเตือนเมื่อข้อมูลไม่ถูกต้อง
- ตรวจสอบรหัสวิชา, ชื่อวิชา, หน่วยกิต, อาจารย์, และเกรด

## โครงสร้างข้อมูลรายวิชา

```typescript
interface Course {
  courseCode: string;        // รหัสวิชา
  courseNameThai: string;    // ชื่อวิชา (ไทย)
  courseNameEnglish: string; // ชื่อวิชา (อังกฤษ)
  credits: number;           // หน่วยกิต (1-6)
  instructor: string;        // ชื่ออาจารย์ผู้สอน
  grade: 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F' | 'W' | 'I' | 'S' | 'U';
}
```

## คอมโพเนนต์หลัก

### 🎯 CourseForm
- แบบฟอร์มเพิ่มรายวิชาใหม่
- ใช้ React Hook Form กับ Zod validation
- มี field สำหรับข้อมูลรายวิชาครบถ้วน

### 📋 CourseList
- แสดงรายวิชาที่ลงทะเบียนในรูปแบบตาราง
- แสดงสรุปหน่วยกิตและ GPA
- มีปุ่มถอนรายวิชาในแต่ละรายการ

### 🗑️ DropButton
- ปุ่มสำหรับถอนรายวิชา
- มีการยืนยันก่อนดำเนินการ
- ส่งรายวิชาไปยังส่วนรายวิชาที่ถอน

### 📝 CourseDrop
- แสดงรายวิชาที่ถอนแล้ว
- สามารถกู้คืนรายวิชากลับมาได้
- แสดงจำนวนรายวิชาที่ถอน

### 🏪 CourseStore (Zustand)
- จัดการ state ของรายวิชาที่ลงทะเบียนและถอน
- คำนวณ GPA และหน่วยกิตรวม
- มี actions สำหรับเพิ่ม, ถอน, และกู้คืนรายวิชา

## เกรดและคะแนน

| เกรด | คะแนน | คำอธิบาย |
|------|-------|-----------|
| A    | 4.0   | ดีเยี่ยม |
| B+   | 3.5   | ดีมาก |
| B    | 3.0   | ดี |
| C+   | 2.5   | ค่อนข้างดี |
| C    | 2.0   | พอใช้ |
| D+   | 1.5   | อ่อน |
| D    | 1.0   | อ่อนมาก |
| F    | 0.0   | ตก |
| W    | -     | ถอน (ไม่นับ GPA) |
| I    | -     | ไม่สมบูรณ์ (ไม่นับ GPA) |
| S    | -     | เป็นที่พอใจ (ไม่นับ GPA) |
| U    | -     | ไม่เป็นที่พอใจ (ไม่นับ GPA) |

## การติดตั้งและใช้งาน

### ติดตั้ง Dependencies
```bash
npm install
```

### รันโปรเจค
```bash
npm run dev
```

### สร้าง Build สำหรับ Production
```bash
npm run build
```

## เทคโนโลยีที่ใช้

- **React 19**: UI Framework
- **TypeScript**: Type Safety
- **React Hook Form**: Form Management
- **Zod**: Schema Validation
- **Zustand**: State Management
- **Vite**: Build Tool
- **CSS3**: Styling

## โครงสร้างไฟล์

```
src/
├── component/
│   ├── CourseForm.tsx      # แบบฟอร์มเพิ่มรายวิชา
│   ├── CourseList.tsx      # แสดงรายวิชาที่ลงทะเบียน
│   ├── CourseDrop.tsx      # แสดงรายวิชาที่ถอน
│   ├── DropButton.tsx      # ปุ่มถอนรายวิชา
│   ├── stu_system.tsx      # คอมโพเนนต์หลัก
│   └── stu_system.css      # สไตล์ระบบ
├── store/
│   └── courseStore.ts      # Zustand store
├── types/
│   └── course.ts           # Type definitions และ Zod schemas
└── App.tsx                 # แอปหลัก
```

## การใช้งาน

1. **เพิ่มรายวิชา**: กรอกข้อมูลในแบบฟอร์มด้านบนและกดปุ่ม "เพิ่มรายวิชา"
2. **ดูรายวิชา**: รายวิชาที่เพิ่มจะแสดงในตารางพร้อมสรุป GPA และหน่วยกิต
3. **ถอนรายวิชา**: กดปุ่ม "ถอนรายวิชา" ในรายวิชาที่ต้องการถอน
4. **กู้คืนรายวิชา**: ในส่วนรายวิชาที่ถอน สามารถกดปุ่ม "กู้คืน" เพื่อนำกลับมา

## ข้อดี

- ✅ ระบบตรวจสอบข้อมูลที่เข้มงวด
- ✅ การจัดการ state ที่มีประสิทธิภาพ
- ✅ UI ที่สวยงามและใช้งานง่าย
- ✅ รองรับการใช้งานบนมือถือ
- ✅ คำนวณ GPA อย่างถูกต้องตามมาตรฐาน
- ✅ สามารถกู้คืนรายวิชาที่ถอนผิดพลาด

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
