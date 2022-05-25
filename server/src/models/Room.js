const Model = require("./Model.js")

class Room extends Model {
  static get tableName() {
    return "rooms"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["hostId"],
      properties: {
        hostId: { type: ["integer", "string"] },
        open: { type: "boolean" }
      }
    }
  }

  static get relationMappings() {
    const { User, Vote } = require("./index.js")
    return {
      host: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "rooms.hostId",
          to: "users.id"
        }
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "rooms.id",
          to: "votes.roomId"
        }
      }
    }
  }
}

module.exports = Room