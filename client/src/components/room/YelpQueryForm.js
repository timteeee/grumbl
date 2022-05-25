import React, { useState } from "react"

const YelpQueryForm = ({ getYelpData }) => {
  const [yelpQuery, setYelpQuery] = useState({
    categories: "food, All",
    term: "",
    location: ""
  })

  const handleChange = (event) => {
    setYelpQuery({
      ...yelpQuery,
      [event.currentTarget.name]: event.currentTarget.value 
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getYelpData(yelpQuery)
    setYelpQuery({
      categories: "food, All",
      term: "",
      location: ""
    })
  }

  return (
    <div className="h-full py-[18em] px-6">
      <form 
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit}>
        <label htmlFor="location" />
        <input 
          className="border border-gray-200 bg-white bg-opacity-50 backdrop-blur-md shadow-md rounded-lg px-3"
          onChange={handleChange}
          value={yelpQuery.location}
          name="location"
          id="location" 
          type="text"
          placeholder="Where are you meeting?"
        />
        <label htmlFor="term" />
        <input 
          className="border border-gray-200 bg-white bg-opacity-50 backdrop-blur-md shadow-md rounded-lg px-3"
          onChange={handleChange}
          value={yelpQuery.term}
          name="term"
          id="term" 
          type="text"
          placeholder="Search Terms"
        />
        <input className="bg-[#ff485a] text-white rounded-lg shadow-md mx-auto px-4 py-1 max-w-fit" type="submit" value="Let's Eat!" />
      </form>
    </div>
  )
}

export default YelpQueryForm