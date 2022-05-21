import React from "react"
import { Link } from "react-router-dom"

const NewRoomButton = (props) => {
  return (
    <Link role="button" to="/rooms/new">Create Room</Link>
  )
}

export default NewRoomButton