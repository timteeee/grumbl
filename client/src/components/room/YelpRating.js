import React from "react"

const YelpRating = ({ rating }) => {
  let imageFileName
  switch(rating) {
    case 5.0: 
      imageFileName = "regular_5@3x"
      break
    case 4.5: 
      imageFileName = "regular_4_half@3x"
      break
    case 4.0: 
      imageFileName = "regular_4@3x"
      break
    case 3.5: 
      imageFileName = "regular_3_half@3x"
      break
    case 3.0: 
      imageFileName = "regular_3@3x"
      break
    case 2.5: 
      imageFileName = "regular_2_half@3x"
      break
    case 2.0:
      imageFileName = "regular_2@3x"
      break
    case 1.5:
      imageFileName = "regular_1_half@3x"
      break
    case 1.0:
      imageFileName = "regular_1@3x"
    default:
      imageFileName = "regular_0@3x"
  }

  const ratingLogo = require(`../../assets/images/yelp_stars/${imageFileName}.png`).default

  return (
    <img
      src={ratingLogo}
    />
  )
}

export default YelpRating