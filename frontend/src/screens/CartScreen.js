import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeCart } from '../actions/cartActions'

const CartScreen = ({match, location, hisotry}) => {
	const productId = match.params.id
	const quantity = location.search ? Number(location.search.split('=')[1]) : 1
	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	useEffect(() => {
		if(productId) {
			dispatch(addToCart(productId, quantity))
		}
	}, [dispatch, productId, quantity])

	const removeFromCartHandler = (id) => {
		dispatch(removeCart(id))
	}

	const checkOutHandler = () => {
		hisotry.push('/login?redirect=shipping')
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Shooping cart</h1>
				{cartItems.length === 0 ? 
					<Message >
						Your cart is empty
						<Link to='/' >Go Back</Link>
					</Message> :
					(
						<ListGroup variant='flush' >
							{cartItems.map((item) => (
								<ListGroup.Item key={item.product}>
									<Row >
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>

										<Col md={3}>
											<Link to={`/product/${item.product}`} >{item.name}</Link>
										</Col>

										<Col md={2}>
											R${item.price}
										</Col>

										<Col md={2}>
											<Form.Control
												as='select'
												value={item.quantity}
												onChange={(event) => dispatch(
													addToCart(item.product,
													Number(event.target.value)))}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
														<option key={x+1} value={x+1}> {x+1} </option>
													))}
											</Form.Control>
										</Col>

										<Col >
												<Button
													type='button'
													variant='light'
													onClick={() => removeFromCartHandler(item.product)}
												>
													<i className='fas fa-trash'></i>
												</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)
				}
			</Col>
			<Col md={4}>
				<Card >
					<ListGroup variant='flush'>
						<ListGroup.Item >
							<h2 >Subtotal ({
									cartItems.reduce((acc, item) => acc + item.quantity, 0)
								}) items</h2>
								R${
									cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
								}
						</ListGroup.Item>
						<ListGroup.Item >
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.lenght === 0}
								onClick={() => checkOutHandler()}
							>Checkout</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen