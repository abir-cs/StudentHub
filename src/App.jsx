import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "react-datepicker/dist/react-datepicker.css"
import './datePicker.css'
import './form.css'
import Navbar from './components/navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StudentsList from './components/StudentsList'
import Student from './components/Student'
import CoursesList from './components/CoursesList'
import Course from './components/Course'
import AddCourse from './components/AddCourse'
import Create from './components/Create'
import EditStudent from './components/EditStudent'
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
          <Route path="/students/:id/addCourse" element={<AddCourse/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="students/:id/editStud" element={<EditStudent/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
