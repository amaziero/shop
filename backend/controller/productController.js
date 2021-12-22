import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (request, response) => {
	const pageSize = 10
  const page = Number(request.query.pageNumber) || 1

  const keyword = request.query.keyword
    ? {
        name: {
          $regex: request.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product
		.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  response.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductId = asyncHandler(async (request, response) => {
	const product = await Product.findById(request.params.id)

  if (product) {
    response.json(product)
  } else {
    response.status(404)
    throw new Error('Product not found')
  }
})

const deleteProduct = asyncHandler(async (request, response) => {
	const product = await Product.findById(request.params.id)

	if(product) {
		await product.remove()
		response.json({ message: 'Product remove' })
	} else {
		response.status(404)
		throw new Error('Product not found')
	}	
})

const createProduct = asyncHandler(async (request, response) => {
	const product = new Product({
		name: 'Sample',
		price: 0,
		user: request.user._id,
		image: '/images/sample.png',
		brand: 'Brand',
		category: 'Category',
		countInStock: 0,
		numReviews: 0,
		description: 'Description'
	})

	const createProduct = await product.save()
	response.status(201).json(createProduct)
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (request, response) => {
  const { rating, comment } = request.body

  const product = await Product.findById(request.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === request.user._id.toString()
    )

    if (alreadyReviewed) {
      response.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: request.user.name,
      rating: Number(rating),
      comment,
      user: request.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    response.status(201).json({ message: 'Review added' })
  } else {
    response.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  response.json(products)
})

const updateProduct = asyncHandler(async (request, response) => {
	const {
		name,
		price,
		image,
		brand,
		category,
		countInStock,
		description,
	} = request.body
	
	const product = await Product.findById(request.params.id)

	if(product) {
		product.name = name
		product.price = price
		product.image = image
		product.brand = brand
		product.category = category
		product.countInStock = countInStock
		product.description = description
		const updateProduct = await product.save()
		response.status(201).json(updateProduct)
	} else {
		response.status(404)
		throw new Error('Error updating product')
	}
})

export { getProducts, getProductId, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts }