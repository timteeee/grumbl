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
    const { User } = require("./index.js")
    return {
      host: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "rooms.hostId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Room