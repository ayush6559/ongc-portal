import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { Sun, Moon, Bell, Search } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()
  const { theme, setTheme, setIsAuthenticated } = useAppStore()

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
            <img src="/ongc-logo.svg" alt="ONGC Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Training Intelligence Platform</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Oil and Natural Gas Corporation Ltd.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-300 w-48"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-ongc-red text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-ongc-red to-red-700 text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-ongc-red/30"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
