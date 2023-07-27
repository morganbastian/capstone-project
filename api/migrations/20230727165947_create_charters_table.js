/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates charters table
exports.up = function(knex) {
    return knex.schema.createTable('charters', function(table) {
      table.increments('id').primary();
      table.string('name', 150);
      table.string('description', 255);
      table.time('duration').notNullable();
      table.enu("type", ["eco-tour", "harbor cruise"]).nullable();

    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  // drops charters table
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('charters')
  };
