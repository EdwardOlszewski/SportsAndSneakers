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
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const count = await Image.countDocuments()
  const images = await Image.find()
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ images, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Delete an image
// @route   DELETE /api/images/:id
// @access  Private/Admin
const deleteImage = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id)

  if (image) {
    await image.remove()
    res.json({ message: 'Image removed' })
  } else {
    res.status(404)
    throw new Error('Image not found')
  }
})

export { createImage, getAllImages, deleteImage }
