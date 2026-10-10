import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Home from './components/home/Home'
import TaskBar from './components/taskBar/taskBar'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className='main'>
    <Home />
    </main>
    <TaskBar />
  </StrictMode>
)
