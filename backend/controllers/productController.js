import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.json({ products })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    image: '/images/sample.jpg',
    description: 'Sample description',
    size: 0,
    price: 0,
    countInStock: 0,
    isPublished: false,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, size, price, countInStock, published } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.image = image
    product.description = description
    product.size = size
    product.price = price
    product.countInStock = countInStock
    product.isPublished = published

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Update a product QTY
// @route   PUT /api/products/qty/:id
// @access  Public
const updateProductQTY = asyncHandler(async (req, res) => {
  const { qty } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = product.name
    product.image = product.image
    product.description = product.description
    product.size = product.size
    product.price = product.price
    product.countInStock = product.countInStock - qty
    product.isPublished = product.isPublished

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  updateProductQTY,
}
