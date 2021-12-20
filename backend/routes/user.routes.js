import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getAllUsers,
	deleteUser,
	getUserById,
	updateUser
} from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.route('/').post(registerUser).get(protect, admin, getAllUsers)
userRouter.post('/login', authUser)
userRouter
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)
userRouter
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)

export default userRouter
