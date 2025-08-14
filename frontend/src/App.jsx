import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import ProtectedRoute from './routes/ProtectedRoute/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-full pb-10 bg-slate-200'>
      
      <Routes>
        <Route path='/login' element={
        
          <LoginPage />
          } />
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>     
    </div>
    
  )
}

export default App
