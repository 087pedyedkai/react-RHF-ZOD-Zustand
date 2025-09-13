import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StudentSystem from './component/stu_system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudentSystem />
  </StrictMode>,
)
