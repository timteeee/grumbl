import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { useUser } from "../services/UserContext"
import GetStartedButton from "./navigation/GetStartedButton"

const LandingPage = () => {
  const [roomId, setRoomId] = useState(null)

  if (roomId) {
    return <Redirect to={`/rooms/${roomId}`} />
  }
  
  const user = useUser()

  const greetingHeader = user ? `Welcome, ${user.firstName}!` : "Welcome to Grumbl!"

  const unauthenticatedButtons = [
    <li 
      key="sign-in"
      className="bg-[#ff485a] font-serif text-white text-2xl rounded-xl shadow-md py-1 px-3 max-w-fit">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li 
      key="sign-up"
      className="bg-[#ff485a] font-serif text-white text-2xl rounded-xl shadow-md py-1 px-3 max-w-fit">
      <Link to="/users/new">Sign Up</Link>
    </li>,
  ];

  return (
    <div className="mt-48 flex flex-col items-center space-y-6 bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-md max-w-fit mx-auto p-6">
      <h1 className="text-5xl text-gray-700 font-serif font-bold">
        {greetingHeader}
      </h1>
      <p className="text-gray-700">
        If you have dinner plans, but can't figure out where to go, <span className="text-2xl text-[#ff485a] font-Lobster">Grumbl</span> is the place to be
      </p>
      {
        user
          ? <GetStartedButton setRoomId={setRoomId} />
          : (
            <ul className="flex w-full justify-center space-x-3">
              {unauthenticatedButtons}
            </ul>
          )
      }
    </div>
  )
}

export default LandingPage