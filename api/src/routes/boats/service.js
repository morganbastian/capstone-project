const knex = require('../../knex.js')

exports.findAllBoats = async (id) => {
  const results = await knex('boats').select("*")
  return results
}

exports.modifyBoat = async (boatData, id) => {
	// Insert the user into the database and return
	console.log(boatData)
	return await knex('boats').update(boatData).where('id', id) // return the data you need
}

exports.findBoatById = async (id) => {
	const results = await knex('boats').select('*').where('id', id)
	return results
}