import React from "react"
import noVoteIcon from "../../assets/images/no-vote-icon.png"
import yesVoteIcon from "../../assets/images/yes-vote-icon.png"

const VoteSection = ({ sendVote }) => {
  const handleVote = (event) => {
    event.preventDefault()
    sendVote(event.currentTarget.value)
  }

  return (
    <div className="mx-auto space-x-24 my-4">
      <button 
      className="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-full shadow-md p-5"
        onClick={handleVote}
        value={false}>
          <img className="h-10" src={noVoteIcon} />
      </button>
      <button 
        className="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-full shadow-md p-5"
        onClick={handleVote}
        value={true}>
          <img className="h-10" src={yesVoteIcon} />
      </button>
    </div>
  )
}

export default VoteSection