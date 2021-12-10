import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.route('/').post(registerUser)
userRouter.post('/login', authUser)
userRouter
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

export default userRouter
