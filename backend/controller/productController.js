import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (request, response) => {
	const products = await Product.find({})

	response.json(products)	
})

const getProductId = asyncHandler(async (request, response) => {
	const product = await Product.findById(request.params.id)

	if(product) {
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
		image: '/image/sample.png',
		brand: 'Brand',
		category: 'Category',
		countInStock: 0,
		numReviews: 0,
		description: 'Description'
	})

	const createProduct = await product.save()
	response.status(201).json(createProduct)
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

export { getProducts, getProductId, deleteProduct, createProduct, updateProduct }