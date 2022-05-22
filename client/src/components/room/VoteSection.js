import React from "react"

const VoteSection = ({ restaurantId, vote }) => {
  const handleVote = (event) => {
    event.preventDefault()
    vote({
      value: event.currentTarget.value,
      restaurant: restaurantId
    })
  }

  return (
    <div>
      <button 
        onClick={handleVote}
        value={false}>
          <i>N</i>
      </button>
      <button 
        onClick={handleVote}
        value={true}>
          <i>Y</i>
      </button>
    </div>
  )
}

export default VoteSection