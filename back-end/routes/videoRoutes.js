import express from 'express'

const router = express.Router()
import {
  getVideos,
  createVideo,
  getVideos2,
  getVideosPages,
} from '../controllers/videoController.js'

router.route('/').get(getVideos2).post(createVideo)
router.route('/pages').get(getVideosPages)

export default router
