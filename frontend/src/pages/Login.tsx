import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store'
import { Lock, User, ArrowRight, Shield, Brain, Zap } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { theme, setTheme, setIsAuthenticated } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize dark mode from store
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [theme])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate loading
    setTimeout(() => {
      setIsSuccess(true)
      setTimeout(() => {
        setIsAuthenticated(true)
        navigate('/dashboard')
      }, 800)
    }, 1500)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-ongc-blue/20 to-indigo-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          {/* Glass Card */}
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl shadow-indigo-500/10 p-8 md:p-12">
            {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-36 h-36 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-ongc-red/20 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-ongc-red/10 rounded-3xl blur-xl animate-pulse"></div>
              <img src="/ongc-logo.svg" alt="ONGC Logo" className="w-full h-full object-contain relative z-10" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
              Enterprise Training Intelligence
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base mb-3">
              Secure Corporate Access
            </p>
          </div>

            {/* Features Strip */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                { icon: Shield, label: 'Secure' },
                { icon: Brain, label: 'AI-Powered' },
                { icon: Zap, label: 'Real-time' }
              ].map((feat, i) => (
                <div key={i} className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-white/10">
                  <feat.icon className="w-5 h-5 text-ongc-blue dark:text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{feat.label}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@ongc.com"
                    className="w-full px-5 py-4 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-lg transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <button type="button" className="text-sm text-ongc-blue dark:text-indigo-400 font-semibold hover:underline">
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-5 py-4 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-lg transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-ongc-red to-red-700 text-white font-bold py-5 px-8 rounded-2xl shadow-xl shadow-ongc-red/30 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                    />
                  ) : isSuccess ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Shield className="w-6 h-6" />
                      Access Granted
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                © 2026 Oil and Natural Gas Corporation Ltd.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-6 right-6 p-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg hover:scale-110 transition-all"
      >
        {theme === 'dark' ? (
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  )
}
