import React from "react"
import YelpQueryForm from "./YelpQueryForm"
import RestaurantCard from "./RestaurantCard"
import VoteSection from "./VoteSection"

const DiscoveryWindow = ({ searchSent, userIsHost, restaurant, getYelpData, sendVote }) => {
  const yelpForm = userIsHost 
    ? <YelpQueryForm getYelpData={getYelpData} /> 
    : <h3 className="text-center py-6">
        Waiting for host to enter a meetup location...
      </h3>
  

  return (
    <div>
      {searchSent ? null : yelpForm}
      {
        restaurant 
        ? <div className="">
            <RestaurantCard {...restaurant} />
            <VoteSection sendVote={sendVote} />
          </div>
        : null
      }
    </div>
  )
}

export default DiscoveryWindow