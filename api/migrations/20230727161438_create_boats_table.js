/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table
exports.up = function(knex) {
    return knex.schema.createTable('boats', function(table) {
      table.increments('id').primary();
      table.integer('capacity').notNullable();
      table.string('description', 255);
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  // drops users table
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('boats')
  };
