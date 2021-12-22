import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import conncetDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import morgan from 'morgan'

import productsRouter from './routes/products.routes.js'
import userRouter from './routes/user.routes.js'
import orderRouter from './routes/order.routes.js'
import routerUpload from './routes/upload.routes.js'

dotenv.config()
conncetDB()

const app = express()

if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())
const __dirname = path.resolve()

app.use('/api/products', productsRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', routerUpload)

app.get('/api/config/paypal', (request, response) => {
	response.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/upload', express.static(path.join(__dirname, '/upload')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
