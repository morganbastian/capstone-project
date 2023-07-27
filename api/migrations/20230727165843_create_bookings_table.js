/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates bookings table
exports.up = function(knex) {
    return knex.schema.createTable('bookings', function(table) {
      table.increments('id').primary();
      table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('boatId').notNullable().references('id').inTable('boats').onDelete('CASCADE');
      table.integer('passengers').notNullable();
      table.date('date').notNullable();
      table.time('time').notNullable();
      table.boolean('isCompleted').notNullable();
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  // drops bookings table
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('bookings')
  };
