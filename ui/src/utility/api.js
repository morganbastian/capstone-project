import { getToken } from './utils'
//The base url of the API, can be changed in the .env file
const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000'

/**
 * Sends a login request to the api for a user with the provided username and password.
 *
 * @async
 * @function
 * @param {Object} data - An object containing the user's login credentials.
 * @param {string} data.username - The user's username.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves with the user's data.
 * @throws {Error} - Throws an error if there was an issue with the login request.
 */
export const login = async (data) => {
	const { username, password } = data

	const response = await fetch(`${baseUrl}/users/login`, {
		method: 'POST',
		headers: new Headers({
			Authorization: `Basic ${btoa(`${username}:${password}`)}`, //btoa is only deprecated in Node.js not in browser environments!
		}),
	})

	const responseData = await response.json()

	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

/**
 * Sends a registration request to the api for a user with the provided data.
 *
 * @async
 * @function
 * @param {Object} data - An object containing the user's data require to create an account.
 * @param {string} data.username - The user's username
 * @param {string} data.password - The user's password
 * @param {*} data.[...] - Any additional user data required for account creation
 * @returns {Promise<Object>} - A promise that resolves with the user's data.
 * @throws {Error} - Throws an error if there was an issue with the login request.
 */

export const register = async (data) => {
	const response = await fetch(`${baseUrl}/users/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})

	const responseData = await response.json()

	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const getMe = async () => {
	const token = getToken()
	if (!token) {
		throw new Error(`Missing User Token`)
	}

	const response = await fetch(`${baseUrl}/users/me`, {
		method: 'GET',
		headers: new Headers({
			Authorization: `Bearer ${token}`, //Token is required for protected Routes
		}),
	})

	const responseData = await response.json()

	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const createNewBooking = async (bookingData) => {
	const response = await fetch(`${baseUrl}/bookings/new`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(bookingData),
	})

	const responseData = await response.json()
	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}
}

export const getBookingById = async (id) => {
	const response = await fetch(`${baseUrl}/bookings/${id}`, {
		method: 'GET',
	})

	const responseData = await response.json()
	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const getBookingByUserId = async (userId) => {
	const response = await fetch(`${baseUrl}/bookings/userid/${userId}`, {
		method: 'GET',
	})

	const responseData = await response.json()
	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const deleteBooking = async (id) => {
	const token = getToken()
	if (!token) {
		throw new Error(`Missing User Token`)
	}

	const response = await fetch(`${baseUrl}/bookings/delete/${id}`, {
		method: 'DELETE',
		headers: new Headers({
			Authorization: `Bearer ${token}`, //Token is required for protected Routes
		}),
	})

	const responseData = await response.json()

	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const updateBooking = async (data) => {
	console.log(data)
	const token = getToken()
	const response = await fetch(`${baseUrl}/bookings/update/${data.id}`, {
		method: 'PUT',
		headers: new Headers({
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify(data),
	})

	const responseData = await response.json()

	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const getAllBookings = async () => {
	const response = await fetch(`${baseUrl}/bookings/`)
	const responseData = await response.json()
	return responseData
}

export const getAllBoats = async () => {
	const response = await fetch(`${baseUrl}/boats/`)
	const responseData = await response.json()
	return responseData
}

export const getAllTimeslots = async () => {
	const response = await fetch(`${baseUrl}/timeslots/`)
	const responseData = await response.json()
	return responseData
}

