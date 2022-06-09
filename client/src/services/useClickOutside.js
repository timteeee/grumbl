import { useRef, useEffect } from "react"

export const useClickOutside = (callback) => {
  const nodeRef = useRef()

  useEffect(() => {
    const handler = (event) => {
      if (!nodeRef.current?.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener("click", handler)

    return () => document.removeEventListener("click", handler)
  }, [])

  return nodeRef
}