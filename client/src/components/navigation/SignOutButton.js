import React from "react";

const SignOutButton = ({ setUserSignedOut }) => {
  const signOut = async (event) => {
    event.preventDefault()
    try {
        const response = await fetch("/api/v1/user-sessions", {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const { message } = await response.json()
      if (message === "User signed out") {
        setUserSignedOut(true)
      }
      return { status: "ok" }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  return (
    <button type="button" role="button" onClick={signOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
