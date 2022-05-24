import React from "react"
import noVoteIcon from "../../assets/images/icons/no-vote-icon.png"
import yesVoteIcon from "../../assets/images/icons/yes-vote-icon.png"

const VoteSection = ({ restaurantId, vote }) => {
  const handleVote = (event) => {
    event.preventDefault()
    vote({
      value: event.currentTarget.value,
      restaurant: restaurantId
    })
  }

  return (
    <div className="pb-6 absolute left-0 right-0 bottom-0 flex justify-around">
      <button 
      className="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-full shadow-sm p-5"
        onClick={handleVote}
        value={false}>
          <img className="h-10" src={noVoteIcon} />
      </button>
      <button 
        className="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-full shadow-sm p-5"
        onClick={handleVote}
        value={true}>
          <img className="h-10" src={yesVoteIcon} />
      </button>
    </div>
  )
}

//absolute left-0 right-0 bottom-5

export default VoteSection