import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import { GlobalStyle } from './styles/global'
import DashboardPage from './pages/Dashboard/DashboardPage'
import Students from './pages/Students/Students'
import SchoolYear from './pages/SchoolYear/SchoolYear'
import Classrooms from './pages/Classrooms/Classrooms'
import Enrollments from './pages/Enrollments/Enrollments'
import Users from './pages/Users/Users'
import Professors from './pages/Professors/Professors'

function App() {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/students' element={<Students />} />
        <Route path='/professors' element={<Professors />} />
        <Route path='/classrooms' element={<Classrooms />} />
        <Route path='/enrollments' element={<Enrollments />} />
        <Route path='/school-years' element={<SchoolYear />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
