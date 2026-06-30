import { useState, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table'
import {
  Search,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import * as XLSX from 'xlsx'

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

// Initial training schedule data
const initialSubmissions = [
  { id: "1", trgNo: "LM_26_A01", trainingName: "Landmark-1", vendor: "HAL", instructor: "XYZ", venue: "GEOPIC", dateFrom: "20-Jul-26", dateTo: "24-Jul-26", nod: "", method: "", submissionDone: false },
  { id: "2", trgNo: "LM_26_A02", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "Mumbai", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "3", trgNo: "LM_26_A03", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "Delhi", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "4", trgNo: "LM_26_A04", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "5", trgNo: "LM_26_A05", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "6", trgNo: "LM_26_A06", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "7", trgNo: "LM_26_A07", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "8", trgNo: "LM_26_A08", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "9", trgNo: "LM_26_A09", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "10", trgNo: "LM_26_A10", trainingName: "Landmark-1", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "11", trgNo: "LM_26_01", trainingName: "Static Modelling", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "12", trgNo: "LM_26_02", trainingName: "System Administration", vendor: "HAL", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "13", trgNo: "SLB_26_A01", trainingName: "Petrel-1", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "14", trgNo: "SLB_26_A02", trainingName: "Petrel-2", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "15", trgNo: "SLB_26_A03", trainingName: "Petrel-3", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "16", trgNo: "SLB_26_A04", trainingName: "Petrel-4", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "17", trgNo: "SLB_26_A05", trainingName: "Petrel-5", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "18", trgNo: "SLB_26_A06", trainingName: "Petrel-6", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "19", trgNo: "SLB_26_A07", trainingName: "Petrel-7", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "20", trgNo: "SLB_26_A08", trainingName: "Petrel-8", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "21", trgNo: "SLB_26_01", trainingName: "Techlog 1", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "Jul-26", nod: "", method: "", submissionDone: false },
  { id: "22", trgNo: "SLB_26_02", trainingName: "Techlog 2", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "Jun-26", nod: "", method: "", submissionDone: false },
  { id: "23", trgNo: "SLB_26_03", trainingName: "Techlog 3", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "Jul-26", nod: "", method: "", submissionDone: false },
  { id: "24", trgNo: "SLB_26_04", trainingName: "Techlog 4", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "Sep-26", nod: "", method: "", submissionDone: false },
  { id: "25", trgNo: "SLB_26_05", trainingName: "Techlog 5", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "Nov-26", nod: "", method: "", submissionDone: false },
  { id: "26", trgNo: "SLB_26_06", trainingName: "Techlog 6", vendor: "SLB", instructor: "", venue: "", dateFrom: "", dateTo: "Jan-27", nod: "", method: "", submissionDone: false },
  { id: "27", trgNo: "PG_26_01", trainingName: "Paradigm 1", vendor: "PGDM", instructor: "", venue: "", dateFrom: "", dateTo: "Aug-26", nod: "", method: "", submissionDone: false },
  { id: "28", trgNo: "PG_26_02", trainingName: "Paradigm 2", vendor: "PGDM", instructor: "", venue: "", dateFrom: "", dateTo: "Aug-26", nod: "", method: "", submissionDone: false },
  { id: "29", trgNo: "PG_26_03", trainingName: "Paradigm 3", vendor: "PGDM", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "30", trgNo: "PG_26_04", trainingName: "Paradigm 4", vendor: "PGDM", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "31", trgNo: "PG_26_05", trainingName: "Paradigm 5", vendor: "PGDM", instructor: "", venue: "", dateFrom: "", dateTo: "Dec-26", nod: "", method: "", submissionDone: false },
  { id: "32", trgNo: "PG_26_06", trainingName: "Paradigm 6", vendor: "PGDM", instructor: "", venue: "", dateFrom: "", dateTo: "Jan-27", nod: "", method: "", submissionDone: false },
  { id: "33", trgNo: "PG_26_07", trainingName: "Paradigm 7", vendor: "PGDM", instructor: "", venue: "", dateFrom: "", dateTo: "Feb-27", nod: "", method: "", submissionDone: false },
  { id: "34", trgNo: "PG_26_08", trainingName: "Paradigm 8", vendor: "PGDM", instructor: "", venue: "", dateFrom: "", dateTo: "Feb-27", nod: "", method: "", submissionDone: false },
  { id: "35", trgNo: "Geosoft_26_01", trainingName: "Geosoft1", vendor: "Geosoftware", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "36", trgNo: "Geosoft_26_02", trainingName: "Geosoft2", vendor: "Geosoftware", instructor: "", venue: "", dateFrom: "", dateTo: "Nov-26", nod: "", method: "", submissionDone: false },
  { id: "37", trgNo: "Petro_26_01", trainingName: "Petro1", vendor: "Petrosys", instructor: "", venue: "", dateFrom: "", dateTo: "Aug-26", nod: "", method: "", submissionDone: false },
  { id: "38", trgNo: "Petro_26_02", trainingName: "Petro2", vendor: "Petrosys", instructor: "", venue: "", dateFrom: "", dateTo: "Jan-27", nod: "", method: "", submissionDone: false },
  { id: "39", trgNo: "Paleo_26_01", trainingName: "Paleo1", vendor: "Ellis", instructor: "", venue: "", dateFrom: "", dateTo: "Sep-26", nod: "", method: "", submissionDone: false },
  { id: "40", trgNo: "Paleo_26_02", trainingName: "Paleo2", vendor: "Ellis", instructor: "", venue: "", dateFrom: "", dateTo: "Feb-27", nod: "", method: "", submissionDone: false },
  { id: "41", trgNo: "Norsar_26_01", trainingName: "Norsar1", vendor: "Norsar", instructor: "", venue: "", dateFrom: "", dateTo: "Sep-26", nod: "", method: "", submissionDone: false },
  { id: "42", trgNo: "BF_26_01", trainingName: "Beicip-Franlab-1", vendor: "Beicip", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "43", trgNo: "BF_26_02", trainingName: "Beicip-Franlab-2", vendor: "Beicip", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "44", trgNo: "BF_26_03", trainingName: "Beicip-Franlab-3", vendor: "Beicip", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "45", trgNo: "BF_26_04", trainingName: "Beicip-Franlab-4", vendor: "Beicip", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false },
  { id: "46", trgNo: "FFA_26_01", trainingName: "Geo-1", vendor: "FFA", instructor: "", venue: "", dateFrom: "", dateTo: "", nod: "", method: "", submissionDone: false }
];

export default function ViewSubmissions() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>(DEFAULT_COLUMNS)
  const [newColumnName, setNewColumnName] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})
  const [rowSelection, setRowSelection] = useState({})

  // Load data from localStorage on mount and seed if empty
  useEffect(() => {
    // Load submissions
    let savedSubmissions = localStorage.getItem('submissions')
    let parsedSubmissions = savedSubmissions ? JSON.parse(savedSubmissions) : []
    
    if (parsedSubmissions.length === 0) {
      parsedSubmissions = initialSubmissions
      localStorage.setItem('submissions', JSON.stringify(parsedSubmissions))
    }
    setSubmissions(parsedSubmissions)

    // Load custom columns
    const savedColumns = localStorage.getItem('tableColumns')
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns))
    }
  }, [])

  // Save columns to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tableColumns', JSON.stringify(columns))
  }, [columns])



  // Toggle submission done status
  const toggleSubmissionDone = (id: string) => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === id ? { ...sub, submissionDone: !sub.submissionDone } : sub
    )
    setSubmissions(updatedSubmissions)
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions))
  }

  // Add new dynamic column
  const addColumn = () => {
    if (!newColumnName.trim()) return
    // Convert to camelCase for consistent key
    const camelCaseKey = newColumnName.trim().replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    ).replace(/\s+/g, '')
    if (!columns.includes(camelCaseKey)) {
      setColumns([...columns, camelCaseKey])
    }
    setNewColumnName('')
  }

  // Remove a column
  const removeColumn = (columnKey: string) => {
    if (DEFAULT_COLUMNS.includes(columnKey)) {
      alert('Cannot remove default columns')
      return
    }
    setColumns(columns.filter((col: string) => col !== columnKey))
  }

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(submissions)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions")
    XLSX.writeFile(workbook, "ongc-submissions.xlsx")
  }

  // Define table columns
  const tableColumns = useMemo<ColumnDef<any>[]>(() => 
    columns.map(col => ({
      accessorKey: col,
      header: ({ column }) => (
        <div className="flex items-center gap-2 px-4 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none hover:text-ongc-red dark:hover:text-red-400 transition-colors">
          {formatColumnName(col)}
          <button onClick={column.getToggleSortingHandler()}>
            {column.getIsSorted() === 'desc' ? (
              <ChevronDown className="w-4 h-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronUp className="w-4 h-4" />
            ) : null}
          </button>
        </div>
      ),
      cell: ({ row, getValue }) => {
        const value = getValue() as any
        if (col === 'method') {
          return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              value === 'Online'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                : value === 'Offline'
                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {value && typeof value === 'string' ? value : '-'}
            </span>
          )
        }
        if (col === 'submissionDone') {
          return (
            <input
              type="checkbox"
              checked={!!value}
              onChange={() => toggleSubmissionDone(row.original.id)}
              className="w-5 h-5 rounded border-gray-300 text-ongc-red focus:ring-ongc-red dark:bg-gray-700 dark:border-gray-600"
            />
          )
        }
        return <span className="text-sm text-gray-700 dark:text-gray-200">{value && typeof value !== 'object' ? value : '-'}</span>
      }
    })),
    [columns, submissions]
  )

  const table = useReactTable({
    data: submissions,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">View Submissions</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage all training submissions</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={exportToExcel}
                  className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-5 h-5" />
                  Export Excel
                </button>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl mb-6 border border-white/20 dark:border-white/10">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                {/* Global Search */}
                <div className="relative flex-1 w-full lg:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Search all columns..."
                    className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ongc-red transition-all text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Customize Columns */}
            <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 shadow-xl border border-white/20 dark:border-white/10 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Customize Columns</h3>
              <div className="flex gap-3 flex-wrap items-end">
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Column Name
                  </label>
                  <input
                    type="text"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addColumn()
                    }}
                    placeholder="e.g., Phone Number"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ongc-red transition-all text-slate-800 dark:text-white"
                  />
                </div>
                <button
                  onClick={addColumn}
                  className="bg-gradient-to-r from-ongc-red to-red-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold flex items-center gap-2 shadow-ongc-red/30"
                >
                  <Plus className="w-5 h-5" />
                  Add Column
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {columns.map(col => (
                  <motion.span
                    key={col}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 whitespace-nowrap ${
                      DEFAULT_COLUMNS.includes(col)
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}
                  >
                    {formatColumnName(col)}
                    {!DEFAULT_COLUMNS.includes(col) && (
                      <button
                        onClick={() => removeColumn(col)}
                        className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead className="bg-slate-100/70 dark:bg-slate-800/70">
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="border-b border-slate-200 dark:border-slate-700">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {table.getRowModel().rows.map(row => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hover:bg-slate-100/40 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-4 py-5">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                    {table.getRowModel().rows.length === 0 && (
                      <tr>
                        <td colSpan={table.getVisibleLeafColumns().length} className="px-8 py-16 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <svg className="w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 200 01-2-2V5a2 200 012-2h5.586a1 100 01.707.293l5.414 5.414a1 100 01.293.707V19a2 200 01-2 2z" />
                            </svg>
                            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No submissions found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, submissions.length)} of {submissions.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: table.getPageCount() }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => table.setPageIndex(i)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          i === table.getState().pagination.pageIndex
                            ? 'bg-gradient-to-r from-ongc-red to-red-700 text-white shadow-ongc-red/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
