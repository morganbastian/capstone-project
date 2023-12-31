const knex = require('../../knex.js')

exports.findBookingById = async (id) => {
	const results = await knex('bookings').select('*').where('id', id)
	return results
}

exports.findBookingByUserId = async (userId) => {
	const results = await knex('bookings').select('*').where('userId', userId)
	//format the date and time
	const formattedData = results.map((result) => {
		//put the date from results in a date object
		const date = new Date(result.date)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const formattedDate = `${month}-${day}-${year}`
		//destructure the array and split at the :
		let [hours, minutes] = result.time.split(':')
		//convert number to string
		hours = Number(hours)
		//if hours is greater than or equal to 12 'PM' else its 'AM'
		const ampm = hours >= 12 ? 'PM' : 'AM'
		hours = hours % 12
		// If hours is 0, set it to 12
		hours = hours === 0 ? 12 : hours 
		const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`

		return {
			...result,
			date: formattedDate,
			time: formattedTime,
		}
	})

	return formattedData
}

exports.addNewBooking = async (newBooking) => {
	const formattedDate = newBooking.date.slice(0, 10)
	//get time in hh:mm:ss format
	const time = newBooking.time
	// split time into hours minutes second with destructured array
	const [hours, minutes, secondsPart] = time.split(':')
	const seconds = secondsPart.split(' ')[0]
	const AMPM = secondsPart.split(' ')[1]
	// convert to 24 if PM and not 12
	const formattedHour = AMPM === 'PM' && hours !== '12' ? +hours + 12 : hours
	// turn back into a time string
	const formattedTime = `${formattedHour}:${minutes}:${seconds}`
	newBooking.date = formattedDate
	newBooking.time = formattedTime
	const createdBooking = await knex('bookings').insert(newBooking)
	return createdBooking
}

//selects all bookings from the bookings table
exports.findAllBookings = async () => {
	const bookings = await knex('bookings').select('*')
	console.log('bookings: ', bookings)
	//format the date and time
	const formattedData = bookings.map((item) => {
		//put the date from results in a date object
		const date = new Date(item.date)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const formattedDate = `${month}-${day}-${year}`
		//destructure the array and split at the :
		let [hours, minutes] = item.time.split(':')
		//convert number to string
		hours = Number(hours)
		//if hours is greater than or equal to 12 'PM' else its 'AM'
		const ampm = hours >= 12 ? 'PM' : 'AM'
		hours = hours % 12
		// If hours is 0, set it to 12
		hours = hours === 0 ? 12 : hours // If hours is 0, set it to 12
		const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`

		return {
			...item,
			date: formattedDate,
			time: formattedTime,
		}
	})

	return formattedData
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
