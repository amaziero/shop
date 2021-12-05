import dotenv from 'dotenv'
import express from 'express'
import conncetDB from './config/db.js'
import productsRouter from './routes/products.routes.js'

dotenv.config()
conncetDB()

const app = express()

app.use('/api/products', productsRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))