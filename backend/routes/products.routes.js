import express from 'express'
import { getProductId, getProducts } from '../controller/productController.js'

const productsRouter = express.Router()

productsRouter.route('/').get(getProducts)
productsRouter.route('/:id').get(getProductId)

export default productsRouter
