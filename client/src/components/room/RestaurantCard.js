import React from "react"
import VoteSection from "./VoteSection"
import YelpLogoLink from "./YelpLogoLink"
import YelpRating from "./YelpRating"

const RestaurantCard = ({
  id, name, imageUrl, yelpUrl, reviewCount, 
  rating, streetAddress, city, vote
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-3 max-w-[80%] mx-auto">
      <div className="relative">
        <img 
          className="rounded-md"
          src={imageUrl} 
          alt={`${name} Yelp Photo`} />
          <div className="absolute bottom-0 left-0 right-0 h-[50%]">
            <div className="bg-gradient-to-t from-black to-transparent opacity-70 h-full relative">
            </div>
            <h4 className="text-4xl text-white font-semibold absolute bottom-1 left-2" >{name}</h4>
          </div>
      </div>
      <div className="" >
        <div className="flex space-x-2 mt-2 mb-1" >
          <YelpRating rating={rating} />
          <p className="text-gray-400 text-xs" >
            Based on {reviewCount} reviews
          </p>
        </div>
        <div className="flex justify-between" >
          <div>
            <p className="text-sm mb-1" >{streetAddress}, {city}</p>
            <div className="flex space-x-1">
              <p className="text-xs bg-gray-300 rounded-md max-w-min whitespace-nowrap px-1">{"Coffee & Tea"}</p>
            </div>
          </div>
          <YelpLogoLink name={name} yelpUrl={yelpUrl} />
        </div>
      </div>
      <VoteSection 
      restaurantId={id}
      vote={vote}
      />
    </div>
  )
}

export default RestaurantCard