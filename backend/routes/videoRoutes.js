import express from 'express'

const router = express.Router()
import {
  getVideos,
  createVideo,
  getVideos2,
} from '../controllers/videoController.js'

router.route('/').get(getVideos2).post(createVideo)

export default router
