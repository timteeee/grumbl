/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("rooms", (table) => {
    table.bigIncrements("id").notNullable()
    table.bigInteger("hostId").notNullable().references("users.id")
    table.boolean("open").notNullable().defaultsTo(true)
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("rooms")
}
