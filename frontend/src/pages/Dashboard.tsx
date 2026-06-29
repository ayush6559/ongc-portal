import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ChartWrapper from '../components/ChartWrapper'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Bell, 
  Activity, 
  Zap, 
  Shield, 
  CheckCircle2, 
  AlertTriangle,
  Brain,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { useAppStore } from '../store'

// Mock data for charts
const performanceData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 7500 },
]

const trainingData = [
  { name: 'Week 1', sessions: 12, attendees: 150 },
  { name: 'Week 2', sessions: 18, attendees: 220 },
  { name: 'Week 3', sessions: 15, attendees: 180 },
  { name: 'Week 4', sessions: 22, attendees: 280 },
]

export default function Dashboard() {
  const { theme } = useAppStore()
  const [liveUsers, setLiveUsers] = useState(247)
  const [activeAlerts, setActiveAlerts] = useState(3)

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveUsers(prev => Math.max(200, Math.min(300, prev + Math.floor(Math.random() * 10) - 5)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-ongc-blue to-indigo-600 bg-clip-text text-transparent">Executive Command Center</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time training intelligence platform</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">System Online</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-500/20">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold">{liveUsers} Live</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                label: 'Global Health Score', 
                value: 94, 
                icon: Activity, 
                color: 'from-emerald-500 to-emerald-600',
                trend: 'up',
                trendValue: '+2.4%'
              },
              { 
                label: 'Training Intelligence', 
                value: 87, 
                icon: Brain, 
                color: 'from-indigo-500 to-indigo-600',
                trend: 'up',
                trendValue: '+5.1%'
              },
              { 
                label: 'Budget Utilization', 
                value: '78%', 
                icon: Zap, 
                color: 'from-amber-500 to-amber-600',
                trend: 'neutral',
                trendValue: 'On Track'
              },
              { 
                label: 'Active Sessions', 
                value: 12, 
                icon: Calendar, 
                color: 'from-ongc-red to-red-700',
                trend: 'down',
                trendValue: '-1.2%'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-900/60 dark:to-slate-900/30 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.02]">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br opacity-20 rounded-full blur-2xl" style={{ background: `linear-gradient(135deg, ${stat.color.includes('emerald') ? '#10b981' : stat.color.includes('indigo') ? '#6366f1' : stat.color.includes('amber') ? '#f59e0b' : '#003B7A'}, transparent)` }} />
                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color}`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 
                        stat.trend === 'down' ? 'text-rose-600 dark:text-rose-400' : 
                        'text-slate-500 dark:text-slate-400'
                      }`}>
                        {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : 
                         stat.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : null}
                        {stat.trendValue}
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts and AI Insights Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="lg:col-span-2"
            >
              <ChartWrapper title="Training Performance" subtitle="Last 6 months">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#003B7A" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#003B7A" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="name" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                      <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255,255,255,0.9)', 
                          backdropFilter: 'blur(10px)', 
                          borderRadius: '12px', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                        }} 
                      />
                      <Area type="monotone" dataKey="value" stroke="#003B7A" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartWrapper>
            </motion.div>

            {/* AI Insights Panel */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl border border-indigo-500/20 dark:border-indigo-500/10 rounded-3xl shadow-xl p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">AI Recommendations</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Generated just now</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Increase Safety Training', desc: 'Based on incident trends, recommend additional safety modules', priority: 'high' },
                    { title: 'Optimize Schedule', desc: 'Shift weekend sessions to weekdays for 23% better attendance', priority: 'medium' },
                    { title: 'Vendor Evaluation', desc: 'Current vendor performance is 15% below target', priority: 'low' }
                  ].map((insight, i) => (
                    <div key={i} className="p-4 bg-white/60 dark:bg-slate-900/60 rounded-2xl border border-white/30 dark:border-white/10">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full ${
                          insight.priority === 'high' ? 'bg-rose-500' : 
                          insight.priority === 'medium' ? 'bg-amber-500' : 
                          'bg-emerald-500'
                        }`} />
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-white text-sm">{insight.title}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{insight.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity">
                  View All Insights
                </button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Activity Feed + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Feed */}
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Real-time Activity</h3>
                  <Bell className="w-5 h-5 text-slate-400" />
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {[
                    { icon: CheckCircle2, color: 'text-emerald-500', message: 'New training completed: Fire Safety', time: '2 min ago' },
                    { icon: Users, color: 'text-blue-500', message: '15 new employees enrolled in onboarding', time: '15 min ago' },
                    { icon: AlertTriangle, color: 'text-amber-500', message: 'Low attendance warning for Module 3', time: '1 hour ago' },
                    { icon: Shield, color: 'text-indigo-500', message: 'Security audit completed successfully', time: '2 hours ago' },
                    { icon: TrendingUp, color: 'text-emerald-500', message: 'Department A performance up by 12%', time: '3 hours ago' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
                      <div className={`p-2 rounded-xl ${activity.color.replace('text-', 'bg-').replace('500', '100 dark:bg-') + activity.color.replace('text-', '/20')}`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{activity.message}</p>
                        <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions + Training Sessions */}
            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Quick Actions</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link
              to="/submission"
              className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-ongc-red to-red-700 text-white rounded-2xl font-semibold hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg hover:shadow-ongc-red/30"
            >
              <TrendingUp className="w-5 h-5" />
              New Submission
            </Link>
                  <Link
                    to="/submissions"
                    className="flex items-center justify-center gap-2 p-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-[1.02]"
                  >
                    <Calendar className="w-5 h-5" />
                    View All
                  </Link>
                </div>
                
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">Upcoming Training</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Advanced Safety Protocols', date: 'Today, 2:00 PM', status: 'confirmed' },
                    { name: 'Leadership Workshop', date: 'Tomorrow, 10:00 AM', status: 'pending' },
                    { name: 'Technical Refresh', date: 'Friday, 1:00 PM', status: 'confirmed' },
                  ].map((session, i) => (
                    <div key={i} className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">{session.name}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{session.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        session.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </main>
      </div>
    </div>
  )
}
