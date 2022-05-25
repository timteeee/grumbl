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
    <div className="h-full flex flex-col justify-center">
      <form 
        className="flex flex-col items-center space-y-2"
        onSubmit={handleSubmit}>
        <label htmlFor="location" />
        <input 
          className="border border-gray-200 rounded-lg w-4/5 px-3"
          onChange={handleChange}
          value={yelpQuery.location}
          name="location"
          id="location" 
          type="text"
          placeholder="Where are you meeting?"
        />
        <label htmlFor="term" />
        <input 
          className="border border-gray-200 rounded-lg w-4/5 px-3"
          onChange={handleChange}
          value={yelpQuery.term}
          name="term"
          id="term" 
          type="text"
          placeholder="Search Terms"
        />
        <input className="bg-[#ff485a] text-white rounded-lg px-4 py-1" type="submit" value="Let's Eat!" />
      </form>
    </div>
  )
}

export default YelpQueryForm