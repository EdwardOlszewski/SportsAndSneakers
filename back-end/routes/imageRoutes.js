import express from 'express'
const router = express.Router()

import {
  createImage,
  getAllImages,
  deleteImage,
} from '../controllers/imageController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(createImage).get(getAllImages)
router.route('/:id').delete(protect, admin, deleteImage)
export default router
