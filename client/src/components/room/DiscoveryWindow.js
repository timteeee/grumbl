import React from "react"
import YelpQueryForm from "./YelpQueryForm"
import RestaurantCard from "./RestaurantCard"
import VoteSection from "./VoteSection"

const DiscoveryWindow = ({ searchSent, userIsHost, restaurant, matchedRestaurant, getYelpData, sendVote }) => {
  const yelpForm = userIsHost 
    ? <YelpQueryForm getYelpData={getYelpData} /> 
    : (
      <h3 className="text-center py-6">
        Waiting for host to enter a meetup location...
      </h3>
    )
  
  return (
    <div className="">
      {searchSent ? null : yelpForm}
      {
        restaurant 
        ? <div className="h-full mx-auto flex flex-col justify-between max-w-[380px] lg:min-w-[415px] lg:max-w-[55%]">
            <RestaurantCard {...restaurant} />
            <VoteSection sendVote={sendVote} />
          </div>
        : null
      }
      {
        matchedRestaurant
        ? <div className="h-full mx-auto flex flex-col justify-between max-w-[380px] lg:min-w-[415px] lg:max-w-[55%]">
            <h1 className="text-5xl text-center text-gray-700 font-serif font-bold">
              Match!
            </h1>
            <RestaurantCard {...matchedRestaurant} />
          </div>
        : null
      }
    </div>
  )
}

export default DiscoveryWindow