import express from 'express'
const router = express.Router()
import {
  updatePost,
  getAllPosts,
  createPost,
} from '../controllers/postsController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getAllPosts).post(protect, admin, createPost)

router.route('/:id').put(protect, admin, updatePost)

export default router
