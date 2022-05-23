import React from "react"
import VoteSection from "./VoteSection"
import YelpLogoLink from "./YelpLogoLink"
import YelpRating from "./YelpRating"

const RestaurantCard = ({
  id, name, imageUrl, yelpUrl, reviewCount, 
  rating, streetAddress, city, vote 
}) => {
  return (
    <div>
      <img src={imageUrl} alt={`${name} Yelp Photo`} />
      <div>
        <h4>
          <a href={yelpUrl} target="_blank" rel="noreferrer noopener" >
            {name}
          </a>
        </h4>
        <div>
          <p>{streetAddress}</p>
          <p>{city}</p>
        </div>
        <div>
          <div>
            <YelpRating rating={rating} />
            <p>Based on {reviewCount} reviews</p>
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