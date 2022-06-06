import React from "react"
import { Link } from "react-router-dom"

const SignInButton = () => {
  return (
    <Link to="/user-sessions/new">Sign In</Link>
  )
}

export default SignInButton