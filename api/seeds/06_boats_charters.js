/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockBoats_ChartersData = require('./data/mockBoats_ChartersData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('boats_charters').del()
  await knex('boats_charters').insert(mockBoats_ChartersData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE boats_charters_id_seq RESTART WITH ${mockBoats_ChartersData.length + 1}`)
};



