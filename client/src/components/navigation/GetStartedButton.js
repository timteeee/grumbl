import React from "react"

const GetStartedButton = ({ setRoomId }) => {
  const getRoom = async () => {
    try {
      const response = await fetch("/api/v1/rooms/new")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const { roomId } = await response.json()
      setRoomId(roomId)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <button 
      className="bg-[#ff485a] font-serif text-white text-2xl rounded-xl shadow-md py-1 px-3"
      role="button"
      onClick={getRoom}>
      Get Started
    </button>
  )
}

export default GetStartedButton