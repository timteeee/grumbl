class RoomManager {
  constructor() {
    this.activeRooms = {}
  }

  openRoom(room) {
    if (!this.activeRooms[room.id]) {
      this.activeRooms[room.id] = { id: room.id, hostId: room.hostId, users: {} }
    }
  }

  closeRoom(roomId) {
    delete this.activeRooms[roomId]
  }

  getRoomInfo(room) {
    if (!this.activeRooms[room.id]) {
      this.openRoom(room)
    }
    return this.activeRooms[room.id]
  }

  roomHasUser(userId, room) {
    if (!this.activeRooms[room.id]) {
      this.openRoom(room)
    }
    return this.activeRooms[room.id].users[userId] ? true : false
  }

  getUsersInRoom(roomId) {
    return this.activeRooms[roomId].users
  }

  addUserToRoom(user, room) {
    if (!this.activeRooms[room.id]) {
      this.openRoom(room)
    }
    this.activeRooms[room.id].users[user.id] = user
  }

  removeUserFromRoom(socketId, roomId) {
    const user = Object.values(this.activeRooms[roomId].users).find((user) => user.socket === socketId)
    delete this.activeRooms[roomId].users[user.id]
  }
}

export default RoomManager