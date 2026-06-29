import express from 'express'
import cors from 'cors'
import * as XLSX from 'xlsx'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let submissions: any[] = []

app.get('/api/submissions', (req, res) => {
  res.json(submissions)
})

app.post('/api/submissions', (req, res) => {
  const submission = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() }
  submissions.push(submission)
  res.status(201).json(submission)
})

app.get('/api/export', (req, res) => {
  const data = submissions.map(sub => ({
    CPF: sub.cpf,
    NAME: sub.name,
    Designation: sub.designation,
    Location: sub.location,
    'TRG_NO': sub.trgNo,
    'Training_Name': sub.trainingName,
    Vendor: sub.vendor,
    Instructor: sub.instructor,
    Venue: sub.venue,
    DateFrom: sub.dateFrom,
    DateTo: sub.dateTo,
    NOD: sub.nod,
    Method: sub.method,
    'Total Days': sub.totalDays,
    Remarks: sub.remarks,
    'e-mail': sub.email,
    Phone: sub.phone
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Nominations')

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  res.setHeader('Content-Disposition', 'attachment; filename=ONGC_Nominations.xlsx')
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.send(buffer)
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
