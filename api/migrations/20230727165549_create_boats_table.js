/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates boats table
    exports.up = function(knex) {
    return knex.schema.createTable('boats', function(table) {
      table.increments('id').primary();
      table.integer('capacity').notNullable();
      table.date('serviceDate').notNullable();
      table.string('serviceNotes', 255);
      table.string('name', 150);
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  // drops boats table
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('boats')
  };
