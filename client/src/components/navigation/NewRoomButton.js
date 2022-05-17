import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const NewRoomButton = (props) => {
  const [newRoomId, setNewRoomId] = useState(null)

  const createRoom = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/rooms/new", { method: "POST" })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const { roomId } = await response.json()
      setNewRoomId(roomId)
    } catch(error) {
      console.error(error)
    }
  }

  if (newRoomId) {
    return <Redirect to={`/rooms/${newRoomId}`} />
  }

  return (
    <button role="button" onClick={createRoom}>
      Create Room
    </button>
  )
}

export default NewRoomButton