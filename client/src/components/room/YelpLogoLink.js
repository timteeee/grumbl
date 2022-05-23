import React from "react"
import logo from "../../assets/images/yelp_burst.png"

const YelpLogoLink = ({name, yelpUrl}) => {
  return (
    <a 
      href={yelpUrl} 
      target="_blank" 
      rel="noreferrer noopener" 
      className="shrink-0 justify-end"
    >
      <img 
        className="h-9"
        src={logo} 
        alt={`Yelp Logo link to ${name}`}
      />
    </a>
  )
}

export default YelpLogoLink