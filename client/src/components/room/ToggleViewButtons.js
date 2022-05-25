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
        className="bg-opacity-50 hover:bg-opacity-50 active:bg-opacity-50 backdrop-blur-md bg-white hover:bg-[hsl(354,100%,64%)] active:bg-[hsl(354,90%,54%)] rounded-3xl px-4 py-1" 
        onClick={handleSelect}
        role="button"
        name="discover">
        <img 
          className="h-6 to-white"
          src={magnifyingGlassIcon} 
        />
      </button>
      <button 
        className="bg-opacity-50 hover:bg-opacity-50 active:bg-opacity-50 backdrop-blur-md bg-white hover:bg-[hsl(354,100%,64%)] active:bg-[hsl(354,90%,54%)] rounded-3xl px-4 py-1" 
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