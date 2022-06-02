import React, { createContext, useContext, useState, useEffect } from "react"
import getCurrentUser from "./getCurrentUser"

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }
  
  useEffect(() => {
    fetchCurrentUser()
  }, [])
  
  return (
    <UserContext.Provider value={currentUser}>
      { children }
    </UserContext.Provider>
  )
}