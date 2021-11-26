const express = require('express')
const products =  require('./data/products')

const app = express()

app.get('/api/products', (request, response) => {
	response.json(products)
})

app.get('/api/products/:id', (request, response) => {
	const { id }  = request.params
	const product = products.find((productId) => productId._id === id)
	
	response.json(product)
})

app.listen(3333, console.log('server running on port 3333'))