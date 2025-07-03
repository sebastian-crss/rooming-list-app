import express from 'express'
import cors from 'cors'
import roomingListRoutes from './routes/roomingList.routes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Rooming lists
app.use('/api/rooming-lists', roomingListRoutes)

export default app
