const knex = require('../../knex.js')

exports.findAllTimeslots = async (id) => {
  const results = await knex('timeslots').select("*")
  return results
}