import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SubmissionForm from './pages/SubmissionForm'
import ViewSubmissions from './pages/ViewSubmissions'
import Contact from './pages/Contact'
import { useAppStore } from './store'
import CommandPalette from './components/CommandPalette'

function App() {
  const { isAuthenticated, theme } = useAppStore()
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  useEffect(() => {
    // Apply dark mode class to html
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/submission" element={isAuthenticated ? <SubmissionForm /> : <Navigate to="/login" />} />
        <Route path="/submissions" element={isAuthenticated ? <ViewSubmissions /> : <Navigate to="/login" />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
      </Routes>
      {isAuthenticated && (
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setIsCommandPaletteOpen(false)} 
        />
      )}
    </BrowserRouter>
  )
}

export default App
