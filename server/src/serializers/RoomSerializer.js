class RoomSerializer {
  static getDetails(Room) {
    const disallowedAttributes = ["createdAt", "updatedAt"]
    const serializedRoom = {}
    
    Object.keys(Room).forEach((key) => {
      if (!disallowedAttributes.includes(key)) {
        serializedRoom[key] = Room[key]
      }
    })

    return serializedRoom
  }
}

export default RoomSerializer