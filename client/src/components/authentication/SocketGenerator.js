import React from "react"
import { io } from "socket.io-client"
import getCurrentHost from "../../services/getCurrentHost"

const host = getCurrentHost()

const SocketGenerator = ({ Component, inheritedSocket, ...rest }) => {
  const socket = inheritedSocket ? inheritedSocket : io(host)

  return (
    <Component 
      socket={socket}
      {...rest}
    />
  )
}

export default SocketGenerator