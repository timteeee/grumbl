import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import ShowChatButton from "../chat/ShowChatButton"
import ChatWindow from "../chat/ChatWindow"
import YelpQueryForm from "./YelpQueryForm"

const RoomShowPage = ({ user, params, url }) => {
  const [socket] = useState(io("http://localhost:3000"))
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: `Invite others to this room by sending them this link:\nlocalhost:3000${url}`,
      user: null,
      room: params.roomId
    }
  ])

  useEffect(() => {
    socket.emit("room:join", params.roomId)

    socket.on("joined", (roomId) => {
      console.log(`Joined Room ${roomId}`)
    })
  }, [])

  socket.on("message:receive", newMessage => {
    setMessages([...messages, newMessage])
  })

  socket.on("restaurants:show", (data) => {
    console.log("IT WORKED!", data)
  })

  const sendMessage = (newMessage) => {
    setMessages([...messages, newMessage])
    socket.emit("message:send", { message: newMessage, roomId: params.roomId })
  }

  const getYelpData = (yelpQueryData) => {
    socket.emit("restaurants:get", {
      yelpQueryData,
      roomId: params.roomId
    })
  }

  return (
    <div>
      <ShowChatButton setChatOpen={setChatOpen} />
      <YelpQueryForm getYelpData={getYelpData}/>
      { 
        chatOpen ? 
        <ChatWindow 
          user={user} 
          roomId={params.roomId}
          messages={messages}
          sendMessage={sendMessage}
        /> : null 
      }
    </div>
  )
}

export default RoomShowPage