const Model = require("./Model")

class Vote extends Model {
  static get tableName() {
    return "votes"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "roomId", "restaurantId"],
      properties: {
        userId: { type: ["string", "integer"] },
        roomId: { type: ["string", "integer"] },
        restaurantId: { type: "string" },
        value: { type: ["string", "boolean"]}
      }
    }
  }

  static get relationMappings() {
    const { User, Room } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id"
        }
      },
      room: {
        relation: Model.BelongsToOneRelation,
        modelClass: Room,
        join: {
          from: "votes.roomId",
          to: "rooms.id"
        }
      }
    }
  }
}

module.exports = Vote