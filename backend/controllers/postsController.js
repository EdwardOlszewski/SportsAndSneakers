import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    whoIAm: '..',
    whatIDo: '..',
    whereToFindMe: '..',
  })
  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    get all posts
// @route   GET /api/posts
// @access Ppublic
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findById('60452f8a74a7f32a205ac0b6')
  res.json({
    _id: posts._id,
    whoIAm: posts.whoIAm,
    whatIDo: posts.whatIDo,
    whereToFindMe: posts.whereToFindMe,
  })
})

// @desc    Update a post
// @route   PUT /api/posts
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { whoIAm, whatIDo, whereToFindMe } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    post.whoIAm = whoIAm
    post.whatIDo = whatIDo
    post.whereToFindMe = whereToFindMe

    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

export { createPost, updatePost, getAllPosts }
