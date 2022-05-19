import React from "react"

const ShowChatButton = ({ setChatOpen }) => {
  const toggleChat = (event) => {
    event.preventDefault()
    setChatOpen(currentState => !currentState)
  }

  return (
    <button 
      className="bg-black text-white rounded-lg px-4 py-1" 
      onClick={toggleChat}
      role="button">
      Chat
    </button>
  )
}

export default ShowChatButton