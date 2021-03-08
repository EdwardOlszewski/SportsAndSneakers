import express from 'express'

const router = express.Router()
import {
  createVideo,
  getVideos2,
  getVideosPages,
} from '../controllers/videoController.js'

router.route('/').get(getVideos2).post(createVideo)
router.route('/pages').get(getVideos2)

export default router
