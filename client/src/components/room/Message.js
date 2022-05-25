import React from "react"

const Message = ({ message }) => {
  if (!message.user) {
    return (
      <li className="flex items-baseline justify-center space-x-2 mt-1 mb-5">
        <p className=" max-w-md text-center whitespace-normal break-words text-sm">
          {message.text}
        </p>
      </li>
    )
  }

  if (message.belongsToCurrentUser) {
    return (
      <li className="flex items-baseline justify-end space-x-2 mt-1">
        <p className="bg-[#ff485a] text-white rounded-lg px-4 py-1 max-w-md whitespace-normal break-words">
          {message.text}
        </p>
      </li>
    )
  } else {
    return (
      <li className="flex items-baseline justify-start space-x-2 mt-1">
        <p className="min-w-[10px] bg-gray-500 rounded-full text-white py-1 px-2.5">
          {message.user.name[0]}
        </p>
        <p className="bg-slate-200 rounded-lg px-4 py-1 max-w-md whitespace-normal break-words">
          {message.text}
        </p>
      </li>
    )
  }
}

export default Message