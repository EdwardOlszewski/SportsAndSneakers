import express from 'express'
const router = express.Router()
import { registerUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
