import React, { useState } from "react"
import Message from "./Message"

const ChatWindow = ({ user, messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState({
    text: "",
    user: {
      id: user.id,
      name: user.firstName
    }
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
      <div className="bg-white rounded-lg min-h-[69vh] max-h-[69vh] w-[89%] flex items-end mx-auto mb-5">
        <ul className="flex flex-col w-full p-2 overflow-auto">
          {messagesList}
        </ul>
      </div>
      <form 
        className="flex justify-center"
        onSubmit={handleSubmit}>
          <input 
            className="border border-gray-200 rounded-lg w-4/5 px-3"
            type="text" 
            onChange={handleChange} 
            value={newMessage.text}
            placeholder="Message"
          />
        <label>
        </label>
        <input 
          className="bg-[#ff485a] text-white rounded-lg px-4 py-1"
          type="submit" 
          value="Send" 
          role="button"
        />
      </form>
    </div>
  )
}

export default ChatWindow