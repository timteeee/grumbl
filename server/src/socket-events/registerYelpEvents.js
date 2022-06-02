import YelpClient from "../services/YelpClient.js";

export const registerYelpEvents = (io, socket) => {
  socket.on("restaurants:get", async ({ term, location, pageNum, roomId }) => {
    try {
    socket.to(roomId).emit("restaurants:searched")
      const response = await YelpClient.getRestaurants(term, location, pageNum)
      if (response instanceof Error) {
        io.in(roomId).emit("restaurants:error", response)
      } else {
        const restaurants = response.map((restaurant) => {
          return {
            id: restaurant.id,
            name: restaurant.name,
            imageUrl: restaurant.image_url,
            yelpUrl: restaurant.url,
            reviewCount: restaurant.review_count,
            rating: restaurant.rating,
            streetAddress: restaurant.location.address1,
            city: restaurant.location.city,
            categories: restaurant.categories
          }
        })
        io.in(roomId).emit("restaurants:receive", JSON.stringify({ restaurants }))
      }
    } catch(error) {
      console.log(error)
    }
  })
}