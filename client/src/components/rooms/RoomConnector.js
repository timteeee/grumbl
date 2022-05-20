import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const RoomConnector = ({ user, socket, ...rest }) => {
  debugger
  const { computedMatch } = rest
  const [roomId, setRoomId] = useState(null)
  
  useEffect(() => {
    socket.on("room:join success", (roomId) => {
      setRoomId(roomId)
    })
    
    socket.emit("room:join", { user, roomId: computedMatch.params.roomId })

    return () => {
      socket.removeAllListeners("room:join success")
    }
  }, [])

  if (roomId) {
    return (
      <Redirect to={{
        pathname: `/rooms/${roomId}`,
        socket: socket
      }} />
    )
  }

  return <h1>You'll be connected to your room shortly...</h1>
}

export default RoomConnector