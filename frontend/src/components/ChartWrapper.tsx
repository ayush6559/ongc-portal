import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, Download, Brain } from 'lucide-react'
import { cn } from '../utils/cn'

interface ChartWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export default function ChartWrapper({ title, subtitle, children, className }: ChartWrapperProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showAI, setShowAI] = useState(false)

  const handleExport = () => {
    alert('Exporting chart as PNG...')
  }

  return (
    <motion.div
      layout
      className={cn(
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden",
        isFullscreen && "fixed inset-0 z-50 rounded-none shadow-none",
        className
      )}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
          {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAI(!showAI)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <Brain className="w-5 h-5" />
          </button>
          <button
            onClick={handleExport}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className={cn("p-6", isFullscreen && "p-8 h-[calc(100%-73px)]")}>
        <div className={cn(isFullscreen && "h-full")}>
          {children}
        </div>
        <AnimatePresence>
          {showAI && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-500/20 dark:border-indigo-500/10">
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-indigo-500" />
                  AI Insights
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Based on the current data, training performance shows a steady upward trend. 
                  The highest peak occurred in June, indicating successful training initiatives 
                  during that period. Consider maintaining the current momentum for future programs.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
