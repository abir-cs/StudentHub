import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StudentsList from './components/StudentsList'
import Student from './components/Student'
import CoursesList from './components/CoursesList'
import Course from './components/Course'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar/>
      <div className="content">
        <Routes >
          <Route path="/" element={<StudentsList/>}/>
          <Route path="/students/:id" element={<Student/>}/>
          <Route path="/courses" element={<CoursesList/>}/>
          <Route path="/courses/:id" element={<Course/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
