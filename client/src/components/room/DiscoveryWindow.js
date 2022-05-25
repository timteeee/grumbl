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
        ? <div className="h-full mx-auto flex flex-col justify-between sm:max-w-[75%] md:max-w-[380px] lg:min-w-[415px] lg:max-w-[55%]">
            <RestaurantCard {...restaurant} />
            <VoteSection sendVote={sendVote} />
          </div>
        : null
      }
    </div>
  )
}

export default DiscoveryWindow