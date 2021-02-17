import express from 'express'
const router = express.Router()
import { getYoutubeVideos } from '../controllers/youtubeController.js'

router.route('/videos').get(getYoutubeVideos)

export default router
