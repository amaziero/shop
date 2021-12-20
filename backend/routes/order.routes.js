import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controller/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()

orderRouter.route('/').post(protect, addOrderItems)
orderRouter.route('/myorders').get(protect, getMyOrders)
orderRouter.route('/:id').get(protect, getOrderById)
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid)

export default orderRouter
