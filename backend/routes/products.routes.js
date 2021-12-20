import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProductId, getProducts, deleteProduct, createProduct, updateProduct } from '../controller/productController.js'

const productsRouter = express.Router()

productsRouter
	.route('/')
	.get(getProducts)
	.post(protect, admin, createProduct)

productsRouter
	.route('/:id')
	.get(getProductId)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)

export default productsRouter
