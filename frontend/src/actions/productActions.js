import {
	PRODUCTS_DETAILS_FAIL,
	PRODUCTS_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS
} from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })
		
		const { data } = await axios.get('/api/products')

		console.log('chegou 1')

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: PRODUCTS_LIST_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}

export const listProductsDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST })
		
		const { data } = await axios.get(`/api/products/${id}`)

		console.log('chegou 1')

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: PRODUCTS_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}
