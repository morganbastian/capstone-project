/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  const mockUserData = require('./data/mockUserData.json')
  const mockUserDataWithHash = await Promise.all(mockUserData.map(async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash
    return user
  }))

  console.log(mockUserDataWithHash)
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(mockUserDataWithHash);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE users_id_seq RESTART WITH ${mockUserData.length + 1}`)
};