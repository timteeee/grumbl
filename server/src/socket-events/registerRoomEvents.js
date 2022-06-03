import { Room } from "../models/index.js"
import RoomSerializer from "../serializers/RoomSerializer.js"

export const registerRoomEvents = (io, socket) => {
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