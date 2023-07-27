/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockBoatsData = require('./data/mockBoatsData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('boats').del()
  await knex('boats').insert(mockBoatsData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE boats_id_seq RESTART WITH ${mockBoatsData.length + 1}`)
};

