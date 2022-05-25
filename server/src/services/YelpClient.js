import got from "got"
import dotenv from "dotenv"
dotenv.config()

const baseUrl = "https://api.yelp.com/v3/businesses"
const yelpKey = process.env.YELP_API_KEY

class YelpClient {
  static async getRestaurants(term, location, pageNum) {
    const limit = 20
    const categories = "food, All"
    const offset = (pageNum - 1) * limit
    const termField = term === "" ? "" : `term=${term}&`

    try {
      const response = await got(
        `${baseUrl}/search?${termField}location=${location}&categories=${categories}&limit=${limit}&offset=${offset}`,
        {
          headers: {
            "Authorization": `Bearer ${yelpKey}`
          }
        }
      )
      if (!response.statusMessage === "OK") {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const { businesses } = JSON.parse(response.body)
      return businesses
    } catch(error) {
      return error
    }
  }

  static async getOneRestaurant(restaurantId) {
    try {
      const response = await got(
        `${baseUrl}/${restaurantId}`, 
        { 
          headers: {
            "Authorization": `Bearer ${yelpKey}`
          }
        })
      if (!response.statusMessage === "OK") {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const business = JSON.parse(response.body)
      console.log(business)
      return business
    } catch(error) {
      return error
    }
  }
}

export default YelpClient