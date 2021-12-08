import dotenv from 'dotenv'
import express from 'express'
import conncetDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

import productsRouter from './routes/products.routes.js'
import userRouter from './routes/user.routes.js'

dotenv.config()
conncetDB()

const app = express()
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/users', userRouter)

const PORT = process.env.PORT || 5000

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))