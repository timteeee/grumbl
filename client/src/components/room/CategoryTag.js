import React from "react"

const CategoryTag = ({ category }) => {
  return (
    <p className="text-xs bg-gray-300 rounded-md max-w-min whitespace-nowrap px-1" >
      {category}
    </p>

  )
}

export default CategoryTag