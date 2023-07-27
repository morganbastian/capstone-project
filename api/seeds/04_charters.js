/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockChartersData = require('./data/mockChartersData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('charters').del()
  await knex('charters').insert(mockChartersData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE charters_id_seq RESTART WITH ${mockChartersData.length + 1}`)
};


