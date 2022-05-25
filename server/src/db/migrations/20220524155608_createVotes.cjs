/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("votes", (table) => {
    table.bigIncrements("id").notNullable()
    table.bigInteger("userId").notNullable().references("users.id")
    table.bigInteger("roomId").notNullable().references("rooms.id")
    table.string("restaurantId").notNullable()
    table.boolean("value").notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("votes")
}
