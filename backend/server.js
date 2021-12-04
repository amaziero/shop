import dotenv from 'dotenv'
import express from 'express'
import conncetDB from './config/db.js'
import products from './data/products.js'

dotenv.config()
conncetDB()

const app = express()

app.get('/api/products', (request, response) => {
	response.json(products)
})

app.get('/api/products/:id', (request, response) => {
	const { id }  = request.params
	const product = products.find((productId) => productId._id === id)
	
	response.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))