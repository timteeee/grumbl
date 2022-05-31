export const registerMessageEvents = (io, socket) => {
  socket.on("message:send", ({ message, roomId }) => {
    socket.to(roomId).emit("message:recieve", message)
  })
}