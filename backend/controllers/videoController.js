import asynchHandler from 'express-async-handler'
import Video from '../models/videoModel.js'

// @desc    Create a video
// @route   POST /api/videos
// @access  Public
const createVideo = asynchHandler(async (req, res) => {
  const { url, publishedAt } = req.body

  const videoExists = await Video.findOne({ url })
  if (videoExists) {
    console.log(`video with url: ${url} already exists`)
  } else {
    const video = await Video.create({
      url,
      publishedAt,
    })
    if (video) {
      res.status(201).json({
        _id: video._id,
        url: video.url,
        publishedAt: video.publishedAt,
      })
    } else {
      res.status(400)
      throw new Error('Invalid Video data')
    }
  }
})

// @desc    Fetch all videos
// @route   GET /api/videos
// @access  Public
const getVideos2 = asynchHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const count = await Video.countDocuments()
  const videos = await Video.find()
    .sort({ publishedAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ videos, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all video pages
// @route   GET /api/videos
// @access  Public
const getVideosPages = asynchHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1
  const totalVideoCount = Number(req.query.totalVideoCount)

  res.json({ page, pages: Math.ceil(totalVideoCount / pageSize) })
})

export { createVideo, getVideos2, getVideosPages }
