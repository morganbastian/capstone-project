/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username', 50).unique().notNullable();
      table.string('email', 150).unique().notNullable();
      table.string('password', 72).notNullable();
      table.enu("role", ["admin", "user"]).nullable().defaultTo("user");
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  // drops users table
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
  };
