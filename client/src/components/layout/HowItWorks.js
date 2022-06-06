import React from "react"

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-left space-y-16 text-gray-700 bg-white bg-opacity-50 px-16 py-8" >
      <h2 className="text-5xl font-bold font-serif" >Here's how it works...</h2>
      <ul className="flex justify-around" >
        <li className="w-1/3 flex justify-center my-10">
          <div className="flex flex-col space-y-4 w-[55%]" >
            <div className="flex justify-center items-center text-3xl h-12 w-12 rounded-full bg-[#ff485a] text-white" >1</div>
            <h4 className="text-2xl font-bold" >Invite Your Friends</h4>
            <p>Get into a room and send the link on screen to everyone in your group.</p>
          </div>
        </li>
        <li className="w-1/3 flex justify-center my-10">
          <div className="flex flex-col space-y-4 w-[55%]">
            <div className="flex justify-center items-center text-3xl h-12 w-12 rounded-full bg-[#ff485a] text-white" >2</div>
            <h4 className="text-2xl font-bold" >Get Suggestions</h4>
            <p>Enter your meetup location, some basic search terms and get suggestions, powered by Yelp.</p>
          </div>
        </li>
        <li className="w-1/3 flex justify-center my-10">
          <div className="flex flex-col space-y-4 w-[55%]">
            <div className="flex justify-center items-center text-3xl h-12 w-12 rounded-full bg-[#ff485a] text-white" >3</div>
            <h4 className="text-2xl font-bold">Go With Your Gut</h4>
            <p>Pick the places you would be up for going to this time around.</p>
          </div>
        </li>
      </ul>
      <div className="flex flex-col items-center space-y-7">
        <h2 className="w-full text-5xl text-right font-bold font-serif">...And that's it!</h2>
        <ul className="flex w-full justify-around">
          <li>
            <h3 className="text-lg font-bold">For pairs, or smaller groups</h3>
            <p>We'll let you know when everyone has picked the same place!</p>
          </li>
          <li>
            <h3 className="text-lg font-bold">For larger groups</h3>
            <p>We'll alert you of a match when at least 80% of your group has agreed on a place</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HowItWorks