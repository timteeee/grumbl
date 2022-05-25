import React from "react"
import CategoryTag from "./CategoryTag"
import YelpLogoLink from "./YelpLogoLink"
import YelpRating from "./YelpRating"

const RestaurantCard = ({ name, imageUrl, yelpUrl, reviewCount, rating, streetAddress, city, categories }) => {

  const categoryTags = categories.map((category) => {
    return (
      <CategoryTag 
        key={category.alias}
        category={category.title}
      />
    )
  })

  return (
    <div className="border border-gray-200 bg-white rounded-lg shadow-md p-3 mx-auto">
      <div className="relative">
        <img 
          className="rounded-md"
          src={imageUrl} 
          alt={`${name} Yelp Photo`} />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="bg-gradient-to-t from-black to-transparent opacity-70 h-full relative">
            </div>
            <a
              href={yelpUrl} 
              target="_blank" 
              rel="noreferrer noopener" >
              <h4 className="text-4xl text-white font-semibold absolute bottom-1 left-2" >{name}</h4>
            </a>
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
          <div className="w-[87%]">
            <p className="text-sm mb-1" >{streetAddress}, {city}</p>
            <div className="flex space-x-1 overflow-x-scroll scrollbar-hide" >
              {categoryTags}
            </div>
          </div>
          <YelpLogoLink name={name} yelpUrl={yelpUrl} />
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard