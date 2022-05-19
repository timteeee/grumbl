import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { io } from "socket.io-client"
// import socketUrl from "../services/socketUrl"
import RoomShowPage from "./RoomShowPage"

const socketUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://grumbl.herokuapp.com/"

const RoomConnection = ({ user, params }) => {
  const { roomId, action } = params
  const [socket] = useState(io(socketUrl))
  const [currentAction, setCurrentAction] = useState(action)
  const [latestResponse, setLatestResponse] = useState({})


  if (currentAction === "create") {
    socket.emit("room:create", user)
  }

  socket.on("room:create success", (response) => {
    setCurrentAction("join")
    setLatestResponse(response)
  })

  if (currentAction === "join") {
    socket.emit("room:join", { user, roomId })
  }

  socket.on("room:join success", (response) => {
    setCurrentAction("render")
    setLatestResponse(response)
  })

  if (currentAction === "render") {
    return (
      <RoomShowPage
        currentUser={user}
        socket={socket}
        roomId={latestResponse.roomId}
        url={`${socketUrl}/rooms/join/${latestResponse.roomId}`}
      />
    )
  }

  return <h1>You'll be connected to your room shortly...</h1>
}

export default RoomConnection