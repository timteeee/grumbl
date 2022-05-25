import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import "./boot.js";
import configuration from "./config.js";
import addMiddlewares from "./middlewares/addMiddlewares.js";
import { createServer } from "http"
import { Server } from "socket.io"
import rootRouter from "./routes/rootRouter.js";
import { Room, Vote } from "./models/index.js";
import RoomSerializer from "./serializers/RoomSerializer.js"
import { ValidationError } from "objection";
import YelpClient from "./services/YelpClient.js";
import matchExists from "./services/matchExists.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
addMiddlewares(app);
app.use(rootRouter);

const server = createServer(app)
const io = new Server(server, {
  pingInterval: 120000,
  pingTimeout: 30000
})

io.on("connection", (socket) => {
  socket.on("room:create", async (user) => {
    try {
      const openRoom = await Room.query().findOne({ hostId: user.id, open: true })
      if (!openRoom) {
        const newRoom = await Room.query().insertAndFetch({ hostId: user.id })
        const serializedRoom = RoomSerializer.getDetails(newRoom)
        io.to(socket.id).emit("room:create success", serializedRoom.id)
      } else {
        const serializedOpenRoom = RoomSerializer.getDetails(openRoom)
        io.to(socket.id).emit("room:create open-room-exists", serializedOpenRoom.id)
      }
    } catch(errors) {
      if (errors instanceof ValidationError) {
        console.log(errors.data)
      } else {
        console.log(errors)
      }
    }
  })

  socket.on("room:join", async ({ user, roomId }) => {
    socket.user = user
    try{
      const room = await Room.query().findOne({ id: roomId })
      const serializedRoom = RoomSerializer.getDetails(room)
      socket.join(roomId)
      io.to(socket.id).emit("room:join success", serializedRoom)
      socket.to(roomId).emit("user:joined", socket.user)
    } catch(error) {
      console.log(error)
    }
  })

  socket.on("disconnecting", () => {
    const [socketId, roomId] = socket.rooms
    io.in(roomId).emit("user:left", socket.user)
  })

  socket.on("message:send", ({ message, roomId }) => {
    socket.to(roomId).emit("message:recieve", message)
  })

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

  socket.on("vote:send", async ({ value, userId, roomId, restaurantId }) => {
    console.log("vote sent")
    try {
      await Vote.query().insert({ value, userId, roomId, restaurantId })
      const allYesVotesForRestaurant = await Vote.query()
        .where("roomId", "=", roomId)
        .where("restaurantId", "=", restaurantId)
        .where("value", "=", true)
      const numActiveUsers = io.sockets.adapter.rooms.get(roomId).size
      if (matchExists(numActiveUsers, allYesVotesForRestaurant)) {
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
})

server.listen(configuration.web.port, configuration.web.host, () => {
  console.log(`Server is listening on port ${configuration.web.port}`)
})

export default app;