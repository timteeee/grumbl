import { Room } from "../models/index.js"
import RoomSerializer from "../serializers/RoomSerializer.js"

export const registerRoomEvents = (io, socket) => {
  socket.on("room:join", async ({ user, roomId }) => {
    socket.data.userId = user.id
    try{
      const room = await Room.query().findOne({ id: roomId })
      const serializedRoom = RoomSerializer.getDetails(room)
      socket.join(roomId)
      io.to(socket.id).emit("room:join success", serializedRoom)
      socket.to(roomId).emit("user:joined", user.name)
    } catch(error) {
      console.log(error)
    }
  })
}