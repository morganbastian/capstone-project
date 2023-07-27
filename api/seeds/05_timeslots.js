/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockTimeslotsData = require('./data/mockTimeslotsData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('timeslots').del()
  await knex('timeslots').insert(mockTimeslotsData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE timeslots_id_seq RESTART WITH ${mockTimeslotsData.length + 1}`)
};


