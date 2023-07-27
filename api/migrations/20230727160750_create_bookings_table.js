/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates reports table
exports.up = function(knex) {
    return knex.schema.createTable('reports', function(table) {
      table.increments('id').primary();
      table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('boatId').notNullable().references('id').inTable('boats').onDelete('CASCADE');
      table.integer('passengers').notNullable();
      table.date('date').notNullable();
      table.time('time').notNullable();
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  // drops reports table
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('reports')
  };
