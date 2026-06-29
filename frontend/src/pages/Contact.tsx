import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Contact ONGC</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Get in touch with ONGC support</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="p-3 bg-gradient-to-br from-ongc-red to-red-700 rounded-2xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Phone (Contact Support)</p>
                    <a href="tel:01126750998" className="text-ongc-red dark:text-red-400 font-medium hover:underline">011-2675 0998</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="p-3 bg-gradient-to-br from-ongc-red to-red-700 rounded-2xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white text-sm mb-1">General Email</p>
                    <a href="mailto:secretariat@ongc.co.in" className="text-ongc-red dark:text-red-400 font-medium hover:underline">secretariat@ongc.co.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="p-3 bg-gradient-to-br from-ongc-red to-red-700 rounded-2xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Head Office</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Oil and Natural Gas Corporation Ltd.<br />Rajiv Gandhi Urja Bhawan<br />K.G. Marg, New Delhi - 110001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                  <div className="p-3 bg-gradient-to-br from-ongc-red to-red-700 rounded-2xl">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Working Hours</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Monday to Friday: 9:00 AM - 5:30 PM<br />Saturday, Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl border border-indigo-500/20 dark:border-indigo-500/10 rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Send Us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent" placeholder="Enter subject" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                  <textarea rows={6} className="w-full px-4 py-4 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent resize-none" placeholder="Type your message here..."></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-ongc-red to-red-700 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg hover:shadow-ongc-red/30">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
