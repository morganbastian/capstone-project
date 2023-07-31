require('dotenv').config()

const {
	findAllBookings,
	findBookingById,
	findBookingByUserId,
	modifyUserBookings,
	destroyUserBooking,
	addNewBooking,
} = require('./service')

exports.showBookingById = async (req, res) => {
	try {
		// Only allow admins and account owners to access the user data
		const foundBooking = await findBookingById(req.params.id)

		if (!foundBooking) {
			return res.status(404).json('No User Found')
		}

		return res.json(foundBooking)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.showBookingByUserId = async (req, res) => {
	try {
		// Only allow admins and account owners to access the user data
		const foundBooking = await findBookingByUserId(req.params.userId)

		if (!foundBooking) {
			return res.status(404).json('No User Found')
		}

		return res.json(foundReport)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}
exports.createNewBooking = async (req, res) => {
	try {
		const newBooking = req.body
		const booking = await addNewBooking(newBooking)
		return res.json(booking)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.showAllBookings = async (req, res) => {
	try {
		const allBookings = await findAllBookings(req.params)
		console.log('allBookings: ', allBookings)
		return res.json(allBookings)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.updateUserBookings = async (req, res) => {
	const bookingId = req.params.id
	const newBookingData = req.body
	console.log('user', req.user)
	try {
		const bookingData = aBooking(bookingId)

		// Only allow users to edit their own reports unless the user is an admin
		if (req.user.id !== bookingData.userId && req.user.role !== 'admin') {
			return res
				.status(403)
				.json({ error: 'You do not have permission to access this resource' })
		}

		const updatedUserBooking = await modifyUserBookings(
			newBookingData,
			bookingId
		)
		return res.json(updatedUserBooking)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.deleteUserBooking = async (req, res) => {
	const bookingId = req.params.id
	try {
		console.log('bookingId:', bookingId)
		const bookingData = aBooking(bookingId)
		console.log('bookingData:', bookingData)
		// Only allow admins to access the user list
		if (req.user.id !== bookingData.userId && req.user.role !== 'admin') {
			return res
				.status(403)
				.json({ error: 'You do not have permission to access this resource' })
		}

		const deletedUserBooking = await destroyUserBooking(bookingId)
		return res.json(deletedUserBooking)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}
