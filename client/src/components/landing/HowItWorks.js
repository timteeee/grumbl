import React from "react"

const HowItWorks = () => {
  const steps = [
    {
      header: "Invite Your Friends",
      text: "Get into a room and send the link on screen to everyone in your group. You can chat with everyone in real time once they join."
    },
    {
      header: "Get Suggestions",
      text: "Enter your meetup location, some basic search terms with natural language, and get restaurant suggestions powered by Yelp."
    },
    {
      header: "Go With Your Gut",
      text: "Pick the places you would be up for going to this time around. Your choices are completely anonymous until there is a match!"
    }
  ]

  const stepTiles = steps.map(({ header, text }, index) => {
    return (
      <li key={index} className="bg-white bg-opacity-50 rounded-xl shadow-md grid grid-rows-[autofit_minmax(0,_1fr)] grid-cols-[autofit_minmax(0,_1fr)] max-w-[450px] pr-6 pb-6">
        <div className="flex justify-center items-center text-3xl w-12 circle rounded-full bg-[#ff485a] text-white m-4" >{index + 1}</div>
        <h4 className="text-2xl bp:text-3xl font-semibold col-start-2 self-center" >{ header }</h4>
        <p className="text-md bp:text-lg col-start-2 row-span-2">{ text }</p>
      </li>
    )
  })

  return (
    <div className="grid grid-rows-[autofit_minmax(0,_1fr)] gap-y-12" >
      <h2 className="text-4xl bp:text-5xl font-serif font-bold" >Here's how it works...</h2>
      <ul className="flex justify-center flex-wrap gap-4" >
        { stepTiles }
      </ul>
      <h2 className="text-4xl bp:text-5xl font-serif font-bold place-self-end">...And that's it!</h2>
      <ul className="flex justify-around flex-wrap gap-4">
        <li className="max-w-[500px]">
          <h3 className="text-xl font-semibold">For smaller groups (4 people or less)</h3>
          <p>We'll let you know when everyone has picked the same place!</p>
        </li>
        <li className="max-w-[500px]">
          <h3 className="text-xl font-semibold">For larger groups (5+ people)</h3>
          <p>We'll alert you of a match when at least 80% of your group has agreed on a place</p>
        </li>
      </ul>
    </div>
  )
}

export default HowItWorks