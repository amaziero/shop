import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const productsRouter = express.Router()

productsRouter.get('/', asyncHandler(async (request, response) => {
	const products = await Product.find({})

	response.json(products)
}))

productsRouter.get('/:id', asyncHandler(async (request, response) => {
	const product = await Product.findById(request.params.id)

	if(product) {
		response.json(product)
	} else {
		response.status(404).json({ message: 'Product not found' })
	}
	
}))

export default productsRouter
