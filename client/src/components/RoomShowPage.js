import React, { useState, useEffect } from "react"
import ChatWindow from "./chat/ChatWindow"
import getCurrentHost from "../services/getCurrentHost"

const RoomShowPage = ({ user, socket, ...rest }) => {
  const { roomId } = rest.computedMatch.params
  const [roomInfo, setRoomInfo] = useState({})
  const [messages, setMessages] = useState([
    {
      text: `Invite others to this room by sending them this link:\n${getCurrentHost()}/rooms/${roomId}`,
      user: null
    }
  ])

  useEffect(() => {
    socket.on("room:join success", (roomInfo) => {
      // eventually will pass along more info than the room id, and this will be set into state
      setRoomInfo(roomInfo)
    })

    socket.on("message:recieve", newMessage => {
      setMessages(previousMessages => [...previousMessages, newMessage])
    })

    socket.emit("room:join", { user, roomId: rest.computedMatch.params.roomId })
    
    return () => {
      socket.removeAllListeners("room:join success")
      socket.removeAllListeners("message:recieve")
      socket.disconnect()
    }
  }, [])

  const sendMessage = (newMessage) => {
    setMessages(previousMessages => [...previousMessages, newMessage])
    socket.emit("message:send", { message: newMessage, roomId: roomInfo.id })
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