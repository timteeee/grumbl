import React, { useEffect, useState } from "react"
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom"

const RoomCreator = ({ user, socket, ...rest }) => {
  const [roomId, setRoomId] = useState(null)

  useEffect(() => {
    socket.on("room:create success", createdRoomId => setRoomId(createdRoomId))
    
    socket.emit("room:create", user)

    return () => {
      socket.removeAllListeners("room:create success")
    }
  }, [])

  if (roomId) {
    return (
      <Redirect to={{
        pathname: `/rooms/join/${roomId}`,
        socket: socket
      }} />
    )
  }

  return (
    <>
      <div>Creating your room...</div>
    </>
  )
}

export default RoomCreator