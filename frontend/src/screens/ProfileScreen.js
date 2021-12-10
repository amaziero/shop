import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails, updateUserProfile } from '../actions/usersActions.js'

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState(null)

	// const redirect = location.search ? location.search.split('=')[1] : '/'

	const dispatch = useDispatch()
	
	const userDetails = useSelector(state => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector(state => state.userUpdateProfile)
	const { success } = userUpdateProfile

	useEffect(() => {
		if(!userInfo) {
			history.push('/login')
		} else {
			if(!user.name) {
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
		
	}, [dispatch, history, user, userInfo])

	
	const submitHandler = (event) => {
		event.preventDefault()
	
		if(password !== confirmPassword) {
			setMessage('Password do not macth')
		} else  { 
			dispatch(updateUserProfile({ id: user._id, name, email, password }))
		}
	}

	return (
		<Row >
			<Col md={3} >
				<h2>User Profile</h2>

				{message && <Message variant='danger' >{message}</Message>}
				{error && <Message variant='danger' >{error}</Message>}
				{success && <Message variant='success' >Profile Updated</Message>}
				{loading && <Loader />}

				<Form onSubmit={submitHandler} >
					<Form.Group controlId='name' >
						<Form.Label >Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(event) => setName(event.target.value)}
							></Form.Control>
					</Form.Group>

					<Form.Group controlId='email' >
						<Form.Label >Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							></Form.Control>
					</Form.Group>

					<Form.Group controlId='password' >
						<Form.Label >Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter password'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword' >
						<Form.Label >Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Confirm password'
								value={confirmPassword}
								onChange={(event) => setConfirmPassword(event.target.value)}
							></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary' > Update </Button>
				</Form>
			</Col>
			
			<Col md={9}>
				My Orders
			</Col>
		</Row>
	)
}

export default ProfileScreen
