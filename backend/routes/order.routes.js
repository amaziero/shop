import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } from '../controller/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()

orderRouter.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
orderRouter.route('/myorders').get(protect, getMyOrders)
orderRouter.route('/:id').get(protect, getOrderById)
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid)
orderRouter.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default orderRouter
