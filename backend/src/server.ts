import app from './app'
import dotenv from 'dotenv'

// Cargar variables de entorno desde .env
dotenv.config()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Backend listening on port ${PORT}`)
})
