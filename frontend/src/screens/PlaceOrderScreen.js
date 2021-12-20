import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderAction'

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	cart.itemsPrice = addDecimals(cart.cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	))
	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
	cart.totalPrice = (
		Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)
	).toFixed(2)

	const orderCreate = useSelector(state => state.orderCreate)
	const { order, success, error } = orderCreate

	useEffect(() => {
		if(success) {
			history.push(`/order/${order._id}`)
		}
		// eslint-disable-next-line
	}, [history, success])
	
	const placeOrderHandler = () => {
		dispatch(createOrder({
			orderItems: cart.cartItems,
			shippingAddress: cart.shippingAddress,
			paymentMethod: cart.paymentMethod,
			itemsPrice: cart.itemsPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice
		}))
	}

	return (
		<>
			<CheckOutSteps step1 step2 step3 step4/>
			<Row >
				<Col md={8} >
					<ListGroup variant='flush'>
						<ListGroup.Item >
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
								{cart.shippingAddress.postalCode},{' '} {cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item >
							<h2>Payment Method</h2>
							<p>
								<strong>Method:</strong>
								{cart.paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item >
							<h2>Order Items</h2>
							<p>
								<strong>Order Items:</strong>
								{cart.cartItems.length === 0
									? <Message >You card is empty</Message>
									: (
										<ListGroup variant='flush'>
											{cart.cartItems.map((item, index) => (
												<ListGroup.Item key={index} >
													<Row >
														<Col md={1}>
															<Image src={item.image} alt={item.name} fluid rounded />
														</Col>
														<Col>
															<Link to={`/product/${item.product}`}>
																{item.name}
															</Link>
														</Col>
														<Col md={4}>
															{item.quantity} x {item.price} = {item.quantity * item.price}
														</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									)
								}
							</p>
						</ListGroup.Item>

					</ListGroup>
				</Col>

				<Col >
					<Card >
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row >
									<Col >Items</Col>
									<Col >R${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row >
									<Col >Shipping</Col>
									<Col >R${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row >
									<Col >Tax</Col>
									<Col >R${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row >
									<Col >Total</Col>
									<Col >R${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item >
								{error && <Message variant='danger' >{error}</Message>}
							</ListGroup.Item>

							<ListGroup.Item >
								<Button
									type='button'
									className='btn-block'
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>Place Order</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
