import React from "react"
import { Link } from "react-router-dom"

const LogoHomeButton = () => {
  return (
    <Link 
      className="justify-self-start text-4xl sm:text-5xl font-Lobster text-[#ff485a]"
      to="/">
      Grumbl
    </Link>
  )
}

export default LogoHomeButton