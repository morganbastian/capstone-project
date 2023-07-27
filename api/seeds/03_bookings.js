/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockBookingsData = require('./data/mockBookingsData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bookings').del()
  await knex('bookings').insert(mockBookingsData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE bookings_id_seq RESTART WITH ${mockBookingsData.length + 1}`)
};

