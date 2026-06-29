import { Link, useLocation } from 'react-router-dom'
import { cn } from '../utils/cn'
import { motion } from 'framer-motion'
import { Home, FileText, List, Phone, ChevronRight } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/submission', label: 'New Submission', icon: FileText },
    { path: '/submissions', label: 'View Submissions', icon: List },
    { path: '/contact', label: 'Contact ONGC', icon: Phone }
  ]

  return (
    <aside className="w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-white/20 dark:border-white/10 min-h-screen shadow-xl">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
            <img src="/ongc-logo.svg" alt="ONGC Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">ONGC Portal</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Training Management</p>
          </div>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={item.path}
              className={cn(
                "group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden",
                isActive(item.path)
                  ? "bg-gradient-to-r from-ongc-red to-red-700 text-white shadow-xl shadow-ongc-red/30"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                />
              )}
              <item.icon className="w-6 h-6 flex-shrink-0" />
              <span className="font-semibold text-sm">{item.label}</span>
              {isActive(item.path) && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          </motion.div>
        ))}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/50">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">Need Help?</p>
          <div className="space-y-2">
            <a href="tel:01126750998" className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 hover:text-ongc-blue dark:hover:text-blue-400 transition-colors">
              <span className="text-xs font-semibold">Phone:</span> 011-2675 0998
            </a>
            <a href="mailto:secretariat@ongc.co.in" className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 hover:text-ongc-blue dark:hover:text-blue-400 transition-colors">
              <span className="text-xs font-semibold">Email:</span> secretariat@ongc.co.in
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
