import React from "react"
import { Link } from "react-router-dom"

const LogoHomeButton = () => {
  return (
    <Link 
    className="mx-auto text-5xl font-Lobster text-[#ff485a]"
    to="/">
        Grumbl
    </Link>
  )
}

export default LogoHomeButton