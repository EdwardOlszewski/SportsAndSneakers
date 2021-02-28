import asyncHandler from 'express-async-handler'
import Image from '../models/imageModel.js'

// @desc    Create an image
// @route   POST /api/images
// @access  Private/Admin
const createImage = asyncHandler(async (req, res) => {
  const { data } = req.body
  const image = new Image({
    imageURL: data,
  })
  const createdImage = await image.save()
  res.status(201).json(createdImage)
})

// @desc    get all images
// @route   GET /api/images
// @access  Private/Admin
const getAllImages = asyncHandler(async (req, res) => {
  const images = await Image.find()
  res.json({ images })
})

export { createImage, getAllImages }
