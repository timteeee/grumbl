import React, { useState, useEffect, useContext } from "react"
import ChatWindow from "./room/ChatWindow"
import ToggleViewButtons from "./room/ToggleViewButtons"
import getCurrentHost from "../services/getCurrentHost"
import DiscoveryWindow from "./room/DiscoveryWindow"
import { UserContext } from "../services/UserContext"

const RoomShowPage = ({ socket, ...rest }) => {
  const user = useContext(UserContext)
  const { roomId } = rest.computedMatch.params
  const [roomInfo, setRoomInfo] = useState({})
  const [openWindow, setOpenWindow] = useState("chat")
  const [searchSent, setSearchSent] = useState(false)
  const [restaurantStack, setRestaurantStack] = useState([])
  const [matchedRestaurant, setMatchedRestaurant] = useState(null)
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

    socket.on("vote:match", (restaurant) => {
      setMatchedRestaurant(JSON.parse(restaurant))
      setRestaurantStack([])
    })

    socket.on("user:joined", (user) => {
      setMessages(previousMessages => {
        return [...previousMessages,
          {
            text: `${user} has joined the room`,
            user: null
          }
        ]
      })
    })

    socket.on("user:left", (user) => {
      setMessages(previousMessages => {
        return [...previousMessages,
          {
            text: `${user} has left the room`,
            user: null
          }
        ]
      })
    })

    socket.emit("room:join", { user: user.firstName, roomId: rest.computedMatch.params.roomId })
    
    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = (newMessage) => {
    newMessage.user = { id: user.id, name: user.firstName }
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

  const topOfStack = restaurantStack[0]

  const sendVote = (voteValue) => {
    socket.emit("vote:send", {
      value: voteValue, 
      roomId: roomInfo.id, 
      userId: user.id,
      restaurantId: topOfStack.id
    })

    setRestaurantStack(restaurantStack.filter(restaurant => {
      return restaurantStack.indexOf(restaurant) !== 0
    }))
  }

  return (
    <div className="min-h-full">
      <div className="lg:hidden">
        <ToggleViewButtons 
          setOpenWindow={setOpenWindow} 
        />
        {
          openWindow === "chat" 
          ? <ChatWindow 
              userId={user.id} 
              roomId={roomId}
              messages={messages}
              sendMessage={sendMessage} 
            /> 
          : <DiscoveryWindow
              searchSent={searchSent}
              userIsHost={user.id === roomInfo.hostId ? true : false}
              restaurant={topOfStack}
              matchedRestaurant={matchedRestaurant}
              getYelpData={getYelpData}
              sendVote={sendVote} 
            />
        }
      </div>
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-2">
        <DiscoveryWindow
          searchSent={searchSent}
          userIsHost={user.id === roomInfo.hostId ? true : false}
          restaurant={topOfStack}
          matchedRestaurant={matchedRestaurant}
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
    </div>
  )
}

export default RoomShowPage