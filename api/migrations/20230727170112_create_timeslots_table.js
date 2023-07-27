/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates timeslots table
exports.up = function(knex) {
    return knex.schema.createTable('timeslots', function(table) {
      table.increments('id').primary();
      table.integer('charterId').notNullable().references('id').inTable('charters').onDelete('CASCADE');
      table.date('weekDay').notNullable();
      table.time('startTime').notNullable();
      table.time('endTime').notNullable();
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  // drops timeslots table
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('timeslots')
  };
