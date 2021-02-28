import express from 'express'
const router = express.Router()

import { createImage, getAllImages } from '../controllers/imageController.js'

router.route('/').post(createImage).get(getAllImages)

export default router
