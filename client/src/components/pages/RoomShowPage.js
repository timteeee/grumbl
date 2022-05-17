import React, { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import ChatWindow from "../chat/ChatWindow"

const RoomShowPage = ({ user }) => {
  const [messages, setMessages] = useState([])

  const socket = useRef()
  useEffect(() => {
    socket.current = io("http://localhost:3000")

    socket.current.on("connect", () => {
      // generate link to send to users
    })

    socket.current.on("receive-message", newMessage => {
      setMessages((previousMessages) => [...previousMessages, newMessage])
    })
  }, [])

  const sendMessage = (newMessage) => {
    setMessages([...messages, newMessage])
    socket.current.emit("send-message", newMessage)
  }

  return (
    <ChatWindow 
      user={user} 
      messages={messages}
      sendMessage={sendMessage}
    />
  )
}

export default RoomShowPage