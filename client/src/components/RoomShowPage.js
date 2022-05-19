import React, { useState, useEffect } from "react"
// import { io } from "socket.io-client"
import ChatWindow from "./chat/ChatWindow"

const RoomShowPage = ({ currentUser, socket, roomId, url }) => {
  // const [socket] = useState(io("http://localhost:3000"))
  const [messages, setMessages] = useState([
    {
      text: `Invite others to this room by sending them this link:\n${url}`,
      user: null
    }
  ])

  useEffect(() => {
    socket.emit("room:landed", { user: currentUser.email, roomId })

  }, [])

  socket.on("message:recieve", newMessage => {
    setMessages([...messages, newMessage])
  })

  const sendMessage = (newMessage) => {
    setMessages([...messages, newMessage])
    socket.emit("message:send", { message: newMessage, roomId })
  }

  return (
    <div className="container">
      <ChatWindow 
        currentUser={currentUser} 
        roomId={roomId}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default RoomShowPage