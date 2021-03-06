import asynchHandler from 'express-async-handler'
import Video from '../models/videoModel.js'

// @desc    Create a video
// @route   POST /api/videos
// @access  Public
const createVideo = asynchHandler(async (req, res) => {
  const { url } = req.body

  const video = await Video.create({
    url,
  })

  if (video) {
    res.status(201).json({
      url: video.url,
    })
  } else {
    res.status(400)
    throw new Error('Invalid video data')
  }
})

// @desc    Fetch all videos
// @route   GET /api/videos
// @access  Public
const getVideos = asynchHandler(async (req, res) => {
  const videos = await Video.find()
  res.json({ videos })
})

// @desc    Fetch all videos
// @route   GET /api/videos
// @access  Public
const getVideos2 = asynchHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1

  const count = await Video.countDocuments()
  const videos = await Video.find()
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

export { getVideos, createVideo, getVideos2, getVideosPages }
