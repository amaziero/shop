import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
	getProductId,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	getTopProducts,
	createProductReview
} from '../controller/productController.js'

const productsRouter = express.Router()

productsRouter
	.route('/')
	.get(getProducts)
	.post(protect, admin, createProduct)

productsRouter.get('/top', getTopProducts)
productsRouter
	.route('/:id/reviews')
	.post(protect, createProductReview)

productsRouter
	.route('/:id')
	.get(getProductId)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)

export default productsRouter
