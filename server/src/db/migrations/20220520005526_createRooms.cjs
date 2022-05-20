/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("rooms", (table) => {
    
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {}
