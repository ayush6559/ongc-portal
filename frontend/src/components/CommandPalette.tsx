import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, X, Home, FileText, List, Phone, Moon, Sun } from 'lucide-react'
import { useAppStore } from '../store'

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [input, setInput] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { theme, setTheme } = useAppStore()

  const commands = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: Home, action: () => { navigate('/dashboard'); onClose(); } },
    { id: 'submission', label: 'New Submission', icon: FileText, action: () => { navigate('/submission'); onClose(); } },
    { id: 'submissions', label: 'View Submissions', icon: List, action: () => { navigate('/submissions'); onClose(); } },
    { id: 'contact', label: 'Contact ONGC', icon: Phone, action: () => { navigate('/contact'); onClose(); } },
    { id: 'theme', label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', icon: theme === 'dark' ? Sun : Moon, action: () => { setTheme(theme === 'dark' ? 'light' : 'dark'); onClose(); } }
  ]

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(input.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [input])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      filteredCommands[selectedIndex]?.action()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-40 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="relative flex items-center gap-4">
            <Search className="w-6 h-6 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-0 outline-none text-xl text-slate-800 dark:text-white placeholder-slate-400"
            />
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No commands found
            </div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <motion.button
                key={cmd.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={cmd.action}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-200 ${
                  selectedIndex === index
                    ? 'bg-gradient-to-r from-ongc-blue to-blue-600 text-white shadow-lg'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`p-2 rounded-xl ${
                  selectedIndex === index ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'
                }`}>
                  <cmd.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold">{cmd.label}</span>
              </motion.button>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}
