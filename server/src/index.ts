import express from 'express'
import cors from 'cors'
import { tokensRouter } from './routes/tokens.js'
import { PORT, CORS_ORIGINS, CORS_CREDENTIALS } from './config/index.js'

const app = express()

// Request logging middleware
app.use((req, _res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} ${req.path}`)
  next()
})

// Middleware
app.use(
  cors({
    origin: CORS_ORIGINS,
    credentials: CORS_CREDENTIALS,
  })
)
app.use(express.json())

// Routes
app.use('/api/tokens', tokensRouter)

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Access Manager API is running',
  })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}/api/tokens`)
  console.log(`🌐 CORS enabled for: ${CORS_ORIGINS.join(', ')}`)
  console.log(`⏰ Server started at ${new Date().toISOString()}`)
})
