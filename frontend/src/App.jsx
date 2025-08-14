import { useState } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen bg-slate-200'>
      
      <HomePage />
     
    </div>
    
  )
}

export default App
