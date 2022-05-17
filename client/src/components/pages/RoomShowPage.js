import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import ChatWindow from "../chat/ChatWindow"

const RoomShowPage = ({ user, params, url }) => {
  const [socket] = useState(io("http://localhost:3000"))
  const [messages, setMessages] = useState([
    {
      text: `Invite others to this room by sending them this link:\nlocalhost:3000/${url}`,
      user: null,
      room: params.roomId
    }
  ])

  useEffect(() => {
    socket.emit("join-room", params.roomId)

    socket.on("joined", (roomId) => {
      console.log(`Joined Room ${roomId}`)
    })
  }, [])

  socket.on("receive-message", newMessage => {
    setMessages([...messages, newMessage])
  })

  const sendMessage = (newMessage) => {
    setMessages([...messages, newMessage])
    socket.emit("send-message", newMessage)
  }

  return (
    <div className="container">
      <ChatWindow 
        user={user} 
        roomId={params.roomId}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default RoomShowPage

// localhost:3000/rooms/9b58eea1-97c1-438f-9cda-0cefe980485f