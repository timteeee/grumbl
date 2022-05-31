import { Room } from "../models/index.js"
import RoomSerializer from "../serializers/RoomSerializer.js"
import { ValidationError } from "objection"

export const registerRoomEvents = (io, socket) => {
  socket.on("room:create", async (user) => {
    try {
      const openRoom = await Room.query().findOne({ hostId: user.id, open: true })
      if (!openRoom) {
        const newRoom = await Room.query().insertAndFetch({ hostId: user.id })
        const serializedRoom = RoomSerializer.getDetails(newRoom)
        io.to(socket.id).emit("room:create success", serializedRoom.id)
      } else {
        const serializedOpenRoom = RoomSerializer.getDetails(openRoom)
        io.to(socket.id).emit("room:create open-room-exists", serializedOpenRoom.id)
      }
    } catch(errors) {
      if (errors instanceof ValidationError) {
        console.log(errors.data)
      } else {
        console.log(errors)
      }
    }
  })

  socket.on("room:join", async ({ user, roomId }) => {
    socket.user = user
    try{
      const room = await Room.query().findOne({ id: roomId })
      const serializedRoom = RoomSerializer.getDetails(room)
      socket.join(roomId)
      io.to(socket.id).emit("room:join success", serializedRoom)
      socket.to(roomId).emit("user:joined", socket.user)
    } catch(error) {
      console.log(error)
    }
  })
}