const knex = require('../../knex.js')

exports.findAllBoats = async (id) => {
  const results = await knex('boats').select("*")
  return results
}