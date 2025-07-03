import express from 'express'
import cors from 'cors'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Ruta base de prueba
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default app
