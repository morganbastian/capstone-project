/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcrypt')

exports.seed = async function(knex) {
  const mockUsersData = require('./data/mockUsersData.json')
  const mockUsersDataWithHash = await Promise.all(mockUsersData.map(async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash
    return user
  }))

  console.log(mockUsersDataWithHash)
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(mockUsersDataWithHash);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE users_id_seq RESTART WITH ${mockUsersData.length + 1}`)
};