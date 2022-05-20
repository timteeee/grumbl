import React from "react"
import { io } from "socket.io-client"
import getCurrentHost from "../../services/getCurrentHost"

const host = getCurrentHost()
debugger
const SocketGenerator = ({ Component, user, inheritedSocket, ...rest }) => {
  const socket = inheritedSocket ? inheritedSocket : io(host)

  return (
    <Component 
      user={user}
      socket={socket}
      {...rest}
    />
  )
}

export default SocketGenerator