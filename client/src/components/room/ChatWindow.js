import React, { useState, useEffect, useRef } from "react"
import Message from "./Message"

const AlwaysScrollToBottom = (messages) => {
  const ref = useRef()
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  return <div ref={ref} />
}

const ChatWindow = ({ userId, messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState({ text: "" })

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

  const messagesList = messages.map((message, index) => {
    if (message.user) {
      message.belongsToCurrentUser = message.user.id === userId ? true : false
    }

    return (
      <Message key={index} message={message}/>
    )
  })

  return (
    <div className="">
      <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-md mx-auto mb-5 min-h-[69vh] max-h-[69vh] w-[89%] overflow-y-auto">
        <ul className="w-full p-2 flex flex-grow flex-col justify-end">
          {messagesList}
          <AlwaysScrollToBottom messages={messages} />
        </ul>
      </div>
      <form 
        className="flex justify-center"
        onSubmit={handleSubmit}>
          <input 
            className="border border-gray-200 rounded-lg bg-white bg-opacity-50 backdrop-blur-md shadow-md w-4/5 px-3"
            type="text" 
            onChange={handleChange} 
            value={newMessage.text}
            placeholder="Message"
          />
        <label>
        </label>
        <input 
          className="bg-[#ff485a] text-white rounded-lg shadow-md px-4 py-1"
          type="submit" 
          value="Send" 
          role="button"
        />
      </form>
    </div>
  )
}

export default ChatWindow