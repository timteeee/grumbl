import { Vote, Room } from "../models/index.js"
import matchExists from "../services/matchExists.js"
import YelpClient from "../services/YelpClient.js"

export const registerVoteEvents = (io, socket) => {
  socket.on("vote:send", async ({ value, userId, roomId, restaurantId }) => {
    try {
      await Vote.query().insert({ value, userId, roomId, restaurantId })
      const allYesVotesForRestaurant = await Vote.query()
        .where("roomId", "=", roomId)
        .where("restaurantId", "=", restaurantId)
        .where("value", "=", true)
      const socketsInRoom = await io.in(roomId).fetchSockets()
      const usersInRoom = socketsInRoom.map(socket => socket.data.userId)
      if (matchExists(usersInRoom, allYesVotesForRestaurant)) {
        const restaurant = await YelpClient.getOneRestaurant(restaurantId)
        io.in(roomId).emit("vote:match", JSON.stringify({
          id: restaurant.id,
          name: restaurant.name,
          imageUrl: restaurant.image_url,
          yelpUrl: restaurant.url,
          reviewCount: restaurant.review_count,
          rating: restaurant.rating,
          streetAddress: restaurant.location.address1,
          city: restaurant.location.city,
          categories: restaurant.categories
        }))
        await Room.query().patch({ open: false }).findById(roomId)
      }
    } catch(error) {
      console.log(error)
    }
  })
}