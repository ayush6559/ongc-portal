import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronLeft, ChevronRight, Save, Send, Clock, AlertCircle } from 'lucide-react'

// Define default columns
const DEFAULT_COLUMNS = [
  'trgNo',
  'trainingName',
  'vendor',
  'instructor',
  'venue',
  'dateFrom',
  'dateTo',
  'nod',
  'method',
  'submissionDone'
]

// Helper to format column names for display
const formatColumnName = (key: string) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

export default function SubmissionForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [columns, setColumns] = useState<string[]>(DEFAULT_COLUMNS)
  const navigate = useNavigate()
  const [formData, setFormData] = useState<any>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Initialize form data
  useEffect(() => {
    // Load custom columns from localStorage
    const savedColumns = localStorage.getItem('tableColumns')
    const allColumns = savedColumns ? JSON.parse(savedColumns) : DEFAULT_COLUMNS
    setColumns(allColumns)
    
    // Try to load draft from localStorage
    const savedDraft = localStorage.getItem('submissionDraft')
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft))
    } else {
      // Initialize empty form data
      const initialData: any = {}
      allColumns.forEach((col: string) => {
        initialData[col] = col === 'nod' ? 0 : ''
      })
      setFormData(initialData)
    }
  }, [])

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('submissionDraft', JSON.stringify(formData))
      setLastSaved(new Date())
    }, 2000)
    return () => clearTimeout(timer)
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev: number) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev: number) => prev - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]')
      submissions.push({
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('submissions', JSON.stringify(submissions))
      localStorage.removeItem('submissionDraft')
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/submissions')
      }, 1500)
    }, 1500)
  }

  const handleSaveDraft = () => {
    localStorage.setItem('submissionDraft', JSON.stringify(formData))
    setLastSaved(new Date())
  }

  // Get custom columns (non-default)
  const customColumns = columns.filter(col => !DEFAULT_COLUMNS.includes(col))

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">New Submission</h2>
                {lastSaved && (
                  <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 text-sm">
                    <Save className="w-4 h-4" />
                    Last saved {lastSaved.toLocaleTimeString()}
                  </div>
                )}
              </div>
              <button
                onClick={handleSaveDraft}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Draft
              </button>
            </div>

            {/* Step Indicator */}
            <div className="mb-10">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[1, 2].map(step => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      animate={{
                        backgroundColor: step <= currentStep ? 'var(--ongc-red)' : 'transparent',
                        borderColor: step <= currentStep ? 'var(--ongc-red)' : 'transparent',
                        scale: step <= currentStep ? 1 : 0.95
                      }}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 border-2 ${
                        step <= currentStep
                          ? 'bg-gradient-to-br from-ongc-red to-red-700 text-white shadow-xl shadow-ongc-red/30 border-transparent'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {step < currentStep ? <CheckCircle2 className="w-7 h-7" /> : step}
                    </motion.div>
                    {step < 2 && (
                      <div className="w-24 h-2 mx-6 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: step < currentStep ? '100%' : '0%' }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-ongc-red to-red-700"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between max-w-md mx-auto mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span className="text-center">Training Details</span>
                <span className="text-center">Review & Confirm</span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-ongc-blue to-blue-600">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Training Details</h3>
                          <p className="text-slate-500 dark:text-slate-400">Fill in all the required information</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['trgNo', 'trainingName', 'vendor', 'instructor', 'venue', 'dateFrom', 'dateTo', 'nod', 'method'].map((col, index) => (
                          <motion.div
                            key={col}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                              {formatColumnName(col)}
                            </label>
                            {col === 'method' ? (
                              <select
                                name={col}
                                value={formData[col] || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-4 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent text-slate-800 dark:text-white transition-all duration-300 text-base"
                              >
                                <option value="">Select Method</option>
                                <option value="Offline">Offline</option>
                                <option value="Online">Online</option>
                              </select>
                            ) : (
                              <input
                                type={col === 'nod' ? 'number' : col.includes('date') ? 'date' : 'text'}
                                name={col}
                                value={formData[col] || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-4 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent text-slate-800 dark:text-white transition-all duration-300 text-base"
                              />
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Custom Columns Section */}
                      {customColumns.length > 0 && (
                        <div className="pt-8 border-t border-slate-200 dark:border-slate-700 mt-8">
                          <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-slate-400" />
                            Custom Fields
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {customColumns.map((col, index) => (
                              <div key={col}>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                  {formatColumnName(col)}
                                </label>
                                <input
                                  type="text"
                                  name={col}
                                  value={formData[col] || ''}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-4 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ongc-red focus:border-transparent text-slate-800 dark:text-white transition-all duration-300 text-base"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Review & Confirm</h3>
                          <p className="text-slate-500 dark:text-slate-400">Please review all the information before submitting</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800/70 dark:to-slate-900/70 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                        <div className="space-y-8">
                          <div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-6 flex items-center gap-2">
                              <Clock className="w-5 h-5 text-ongc-blue" />
                              Training Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                              {['trgNo', 'trainingName', 'vendor', 'instructor', 'venue', 'dateFrom', 'dateTo', 'nod', 'method'].map(col => (
                                <div key={col} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                                  <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">{formatColumnName(col)}</dt>
                                  <dd className="text-slate-800 dark:text-white font-medium">
                                    {col === 'method' ? (
                                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                                        formData[col] === 'Online'
                                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                                      }`}>
                                        {formData[col]}
                                      </span>
                                    ) : (
                                      formData[col] || '-'
                                    )}
                                  </dd>
                                </div>
                              ))}
                            </div>
                          </div>

                          {customColumns.length > 0 && (
                            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                              <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Custom Fields</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {customColumns.map(col => (
                                  <div key={col} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                                    <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">{formatColumnName(col)}</dt>
                                    <dd className="text-slate-800 dark:text-white font-medium">{formData[col] || '-'}</dd>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevious}
                      className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 font-semibold text-base"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                  )}
                  <div className="flex-1" />
                  {currentStep < 2 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-gradient-to-r from-ongc-red to-red-700 text-white px-8 py-4 rounded-2xl shadow-lg shadow-ongc-red/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold text-base"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-gradient-to-r from-ongc-red to-red-700 text-white px-8 py-4 rounded-2xl shadow-lg shadow-ongc-red/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold text-base disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full"
                          />
                          Submitting...
                        </>
                      ) : showSuccess ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Submitted!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
