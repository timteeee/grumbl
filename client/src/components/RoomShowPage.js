import React, { useState, useEffect } from "react"
import ChatWindow from "./room/ChatWindow"
import ToggleChatButton from "./room/ToggleChatButton"
import YelpQueryForm from "./room/YelpQueryForm"
import getCurrentHost from "../services/getCurrentHost"
import RestaurantCard from "./room/RestaurantCard"

const RoomShowPage = ({ user, socket, ...rest }) => {
  const { roomId } = rest.computedMatch.params
  const [roomInfo, setRoomInfo] = useState({})
  const [chatOpen, setChatOpen] = useState(false)
  const [restaurantStack, setRestaurantStack] = useState([])
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

    socket.on("restaurants:receive", (jsonObject) => {
      const { restaurants } = JSON.parse(jsonObject)
      setRestaurantStack(restaurants)
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
      ...yelpQueryData,
      pageNum: 1,
      roomId: roomInfo.id
    })
  }

  const sendVote = (voteData) => {
    socket.emit("vote:send", {
      voteData, 
      roomId: roomInfo.id, 
      user: user.id
    })
  }

  const topOfStack = restaurantStack[0]
  const restaurantCard = topOfStack ? 
    <RestaurantCard 
      key={topOfStack.id}
      {...topOfStack}
      sendVote={sendVote}
    /> : null

  return (
    <div className="container">
      <ToggleChatButton setChatOpen={setChatOpen} />
      {restaurantCard}
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