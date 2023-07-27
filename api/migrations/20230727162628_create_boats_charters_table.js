/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates reports table
exports.up = function(knex) {
    return knex.schema.createTable('boats_charters', function(table) {
      table.increments('id').primary();
      table.integer('boatId').notNullable().references('id').inTable('boats').onDelete('CASCADE');
      table.integer('charterId').notNullable().references('id').inTable('charters').onDelete('CASCADE');
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  // drops reports table
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('boats_charters')
  };