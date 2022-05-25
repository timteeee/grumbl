import React, { useState, useEffect } from "react"
import ChatWindow from "./room/ChatWindow"
import ToggleViewButtons from "./room/ToggleViewButtons"
import getCurrentHost from "../services/getCurrentHost"
import DiscoveryWindow from "./room/DiscoveryWindow"

const RoomShowPage = ({ user, socket, ...rest }) => {
  const { roomId } = rest.computedMatch.params
  const [roomInfo, setRoomInfo] = useState({})
  const [openWindow, setOpenWindow] = useState("chat")
  const [searchSent, setSearchSent] = useState(false)
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

    socket.on("restaurants:searched", () => {
      setSearchSent(true)
    })

    socket.on("restaurants:receive", (jsonObject) => {
      const { restaurants } = JSON.parse(jsonObject)
      setRestaurantStack(restaurants)
    })

    socket.emit("room:join", { user, roomId: rest.computedMatch.params.roomId })
    
    return () => {
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
    setSearchSent(true)
  }

  const sendVote = (voteData) => {
    socket.emit("vote:send", {
      voteData, 
      roomId: roomInfo.id, 
      user: user.id
    })
  }

  const topOfStack = restaurantStack[0]

  return (
    <div className="min-h-full grid lg:grid-cols-2 lg:gap-x-2">
      <ToggleViewButtons 
        setOpenWindow={setOpenWindow} 
      />
      {/* {
        openWindow === "chat" 
        ? <ChatWindow 
            user={user} 
            roomId={roomId}
            messages={messages}
            sendMessage={sendMessage} 
          /> 
        : <DiscoveryWindow
            searchSent={searchSent}
            userIsHost={user.id === roomInfo.hostId ? true : false}
            restaurant={topOfStack}
            getYelpData={getYelpData}
            sendVote={sendVote} 
          />
      } */}
      <DiscoveryWindow
        searchSent={searchSent}
        userIsHost={user.id === roomInfo.hostId ? true : false}
        restaurant={topOfStack}
        getYelpData={getYelpData}
        sendVote={sendVote} 
      />
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