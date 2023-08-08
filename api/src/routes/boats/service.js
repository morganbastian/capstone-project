const knex = require('../../knex.js')

exports.findAllBoats = async (id) => {
  const results = await knex('boats').select("*")
  const formattedData = results.map((item) => {
		//put the date from results in a date object
		const date = new Date(item.serviceDate)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const formattedDate = `${month}-${day}-${year}`
		
		

		return {
			...item,
			serviceDate: formattedDate,
		}
	})

	return formattedData
}

exports.modifyBoat = async (boatData, id) => {
	// Insert the user into the database and return
	console.log('boat data: ', boatData)
  console.log('serviceDate: ',boatData.serviceDate)
  const formattedDate = boatData.serviceDate.slice(0, 10)
  boatData.serviceDate = formattedDate
  console.log(boatData.serviceDate)
	return await knex('boats').update(boatData).where('id', id) // return the data you need
}

exports.findBoatById = async (id) => {
	const results = await knex('boats').select('*').where('id', id)
	return results
}