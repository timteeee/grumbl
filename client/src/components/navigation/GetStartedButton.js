import React from "react"
import { Link } from "react-router-dom"

const GetStartedButton = () => {
  return (
    <div className="bg-[#ff485a] font-serif text-white text-2xl rounded-xl shadow-md py-1 px-3 max-w-fit">
      <Link role="button" to="/rooms/new">Get Started</Link>
    </div>
  )
}

export default GetStartedButton