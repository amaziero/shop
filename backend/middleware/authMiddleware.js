import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

const protect = expressAsyncHandler( async(request, response, next) => {
	let token
	
	if(request.headers.authorization  && request.headers.authorization.startsWith('Bearer')) {
		try {
			token = request.headers.authorization.split(' ')[1]
		
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			
			request.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			throw new Error(`error with token: ${error}`)
		}
	}

	if(!token) {
		response.status(401)
		throw new Error('Not authorized')
	}

	
})

const admin = (request, response, next) => {
	if(request.user && request.user.isAdmin) {
		next()
	} else {
		response.status(401)
		throw new Error('Not Authorized as an admin')
	}
}

export { protect, admin }
