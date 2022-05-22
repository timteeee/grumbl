import React from "react"

const YelpLogoLink = ({name, yelpUrl}) => {
  return (
    <a 
      href={yelpUrl} 
      target="_blank" 
      rel="noreferrer noopener" 
    >
      <img 
        src="../../assets/images/yelp_burst.png" 
        alt={`Yelp Logo link to ${name}`}
      />
    </a>
  )
}

export default YelpLogoLink