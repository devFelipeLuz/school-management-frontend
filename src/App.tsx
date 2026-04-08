import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import { GlobalStyle } from './styles/global'
import DashboardPage from './pages/Dashboard/DashboardPage'
import Students from './pages/Students/Students'

function App() {

  return (
    <BrowserRouter>
    <GlobalStyle />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/students' element={<Students />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
