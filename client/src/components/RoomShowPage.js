import React, { useState, useEffect } from "react"
import ChatWindow from "./chat/ChatWindow"
import getCurrentHost from "../services/getCurrentHost"

const RoomShowPage = ({ user, socket, ...rest }) => {
  const { roomId } = rest.computedMatch.params
  const [messages, setMessages] = useState([
    {
      text: `Invite others to this room by sending them this link:\n${getCurrentHost()}/rooms/join/${roomId}`,
      user: null
    }
  ])

  useEffect(() => {
    socket.on("message:recieve", newMessage => {
      setMessages(previousMessages => [...previousMessages, newMessage])
    })
    
    socket.emit("room:landed", { user: user.email, roomId })

    return () => {
      socket.removeAllListeners("message:recieve")
    }
  }, [])

  const sendMessage = (newMessage) => {
    setMessages(previousMessages => [...previousMessages, newMessage])
    socket.emit("message:send", { message: newMessage, roomId })
  }

  return (
    <div className="container">
      <ChatWindow 
        user={user} 
        roomId={roomId}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default RoomShowPage