import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'

import videoRoutes from './routes/videoRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import imageUploadRoutes from './routes/imageUploadRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Init dotenv
dotenv.config()

// Connect DB
connectDB()

// Init app with express
const app = express()

// Use morgan while in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Init json
app.use(express.json())

// Routes
app.use('/api/videos', videoRoutes)
app.use('/api/upload', imageUploadRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/users', userRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
