import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'

const ShippingScreen = ({ history }) => {
	const cart = useSelector(state => state.cart)
	const { shippingAddress } = cart

	console.log(cart)
	console.log(shippingAddress)

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckOutSteps step1 step2/>
			
			<h1>Shipping</h1>

			<Form onSubmit={submitHandler} >
				<Form.Group controlId='address' >
						<Form.Label >Address</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Address'
								value={address}
								required
								onChange={(event) => setAddress(event.target.value)}
							></Form.Control>
					</Form.Group>

					<Form.Group controlId='city' >
						<Form.Label >City</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter city'
								value={city}
								required
								onChange={(event) => setCity(event.target.value)}
							></Form.Control>
					</Form.Group>

					<Form.Group controlId='postalCode' >
						<Form.Label >Postal Code</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Postal Code'
								value={postalCode}
								required
								onChange={(event) => setPostalCode(event.target.value)}
							></Form.Control>
					</Form.Group>

					<Form.Group controlId='country' >
						<Form.Label >Country</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Country'
								value={country}
								required
								onChange={(event) => setCountry(event.target.value)}
							></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Continue
					</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
