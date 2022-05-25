import React from "react"
import chatIcon from "../../assets/images/icons/chat-icon.png"
import magnifyingGlassIcon from "../../assets/images/icons/magnifier-icon.png"

const ToggleViewButtons = ({ setOpenWindow }) => {
  const handleSelect = (event) => {
    event.preventDefault()
    setOpenWindow(event.currentTarget.name)
  }
  
  return (
    <div className="lg:hidden max-w-fit mx-auto space-x-4 mb-3">
      <button 
        className="border border-gray-300 bg-white hover:bg-gray-50 hover:border-[#ff485a] active:bg-gray-100 rounded-3xl px-4 py-1" 
        onClick={handleSelect}
        role="button"
        name="discover">
        <img 
          className="h-6 to-white"
          src={magnifyingGlassIcon} 
        />
      </button>
      <button 
        className="border border-gray-300 bg-white hover:bg-gray-50 hover:border-[#ff485a] active:bg-gray-100 rounded-3xl px-4 py-1" 
        onClick={handleSelect}
        role="button"
        name="chat">
        <img 
          className="h-6"
          src={chatIcon} 
        />
      </button>
    </div>
  )
}

export default ToggleViewButtons