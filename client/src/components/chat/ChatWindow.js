import React, { useState } from "react"
import Message from "./Message"

const ChatWindow = ({ user, roomId, messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState({
    text: "",
    user: {
      id: user.id,
      email: user.email
    },
    room: roomId
  })

  const messagesList = messages.map((message, index) => {
    if (message.user) {
      message.belongsToCurrentUser = message.user.id === user.id ? true : false
    }

    return (
      <Message key={index} message={message}/>
    )
  })

  const handleChange = (event) => {
    setNewMessage({
      ...newMessage,
      text: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(newMessage)
    setNewMessage({
      ...newMessage,
      text: ""
    })
  }

  return (
    <div className="">
      <div className="min-h-[50vh] w-4/5 flex items-end mx-auto mb-5">
        <ul className="flex flex-col w-full">
          {messagesList}
        </ul>
      </div>
      <form 
        className="flex justify-evenly"
        onSubmit={handleSubmit}>
        <input 
          className="border border-gray-200 rounded-lg w-4/5 px-3"
          type="text" 
          onChange={handleChange} 
          value={newMessage.text}
          placeholder="Message"
        />
        <input 
          className="bg-black text-white rounded-lg px-4 py-1"
          type="submit" 
          value="Send" 
          role="button"
        />
      </form>
    </div>
  )
}

export default ChatWindow