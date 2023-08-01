const knex = require('../../knex.js')

exports.findBookingById = async (id) => {
	const results = await knex('bookings').select('*').where('id', id)
	return results
}

exports.findBookingByUserId = async (userId) => {
	const results = await knex('bookings').select('*').where('userId', userId)
	return results
}

exports.addNewBooking = async (newBooking) => {
	const createdBooking = await knex('bookings').insert(newBooking)
	return createdBooking
}

//selects all bookings from the bookings table
exports.findAllBookings = async () => {
	const bookings = await knex('bookings').select('*')
	console.log('bookings: ', bookings)

	return bookings
}

exports.modifyBooking = async (bookingData, id) => {
	// Insert the user into the database and return
	console.log(bookingData)
	return await knex('bookings').update(bookingData).where('id', id) // return the data you need
}

exports.destroyBooking = async (id) => {
	const deletedBooking = await knex('bookings').delete().where('id', id)
	return deletedBooking
}
