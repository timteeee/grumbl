import React, { useState, useEffect } from "react"
import ChatWindow from "./room/ChatWindow"
import ToggleChatButton from "./room/ToggleChatButton"
import YelpQueryForm from "./room/YelpQueryForm"
import getCurrentHost from "../services/getCurrentHost"

const RoomShowPage = ({ user, socket, ...rest }) => {
  const { roomId } = rest.computedMatch.params
  const [roomInfo, setRoomInfo] = useState({})
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: `Invite others to this room by sending them this link:\n${getCurrentHost()}/rooms/${roomId}`,
      user: null
    }
  ])

  useEffect(() => {
    socket.on("room:join success", (roomInfo) => {
      setRoomInfo(roomInfo)
    })

    socket.on("message:recieve", newMessage => {
      setMessages(previousMessages => [...previousMessages, newMessage])
    })

    socket.on("restaurants:recieve", (yelpQueryData) => {
      console.log(yelpQueryData)
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

  const getYelpData = (yelpQueryData) => {
    socket.emit("restaurants:get", {
      yelpQueryData,
      roomId: roomInfo.id
    })
  }

  return (
    <div className="container">
      <ToggleChatButton setChatOpen={setChatOpen} />
      <YelpQueryForm getYelpData={getYelpData}/>
      {
        chatOpen ?
        <ChatWindow 
          user={user} 
          roomId={roomId}
          messages={messages}
          sendMessage={sendMessage}
        /> : null
      }
    </div>
  )
}

export default RoomShowPage