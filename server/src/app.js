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
import Room from "./models/Room.js";
import RoomSerializer from "./serializers/RoomSerializer.js"
import { ValidationError } from "objection";
import RoomManager from "./services/RoomManager.js";
import YelpClient from "./services/YelpClient.js";

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
const io = new Server(server)

const rm = new RoomManager

io.on("connection", (socket) => {
  socket.on("room:create", async (user) => {
    const openRoom = await Room.query().findOne({ hostId: user.id, open: true })
    console.log(openRoom)
    try {
      if (!openRoom) {
        const newRoom = await Room.query().insertAndFetch({ hostId: user.id })
        const serializedRoom = RoomSerializer.getDetails(newRoom)
        rm.openRoom(serializedRoom)
        io.to(socket.id).emit("room:create success", serializedRoom.id)
      } else {
        const serializedOpenRoom = RoomSerializer.getDetails(openRoom)
        rm.openRoom(serializedOpenRoom)
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
    const userJoiningRoom = { ...user, socket: socket.id }
    const room = await Room.query().findOne({ id: roomId })
    if (!rm.roomHasUser(user.id, room)) {
      rm.addUserToRoom(userJoiningRoom, room)
      console.log(rm.getUsersInRoom(room))
    }
    socket.join(roomId)
    io.to(socket.id).emit("room:join success", rm.getRoomInfo(room))
  })

  socket.on("disconnecting", async () => {
    const [socketId, roomId] = socket.rooms
    rm.removeUserFromRoom(socketId, roomId)
  })

  socket.on("message:send", ({ message, roomId }) => {
    socket.to(roomId).emit("message:recieve", message)
  })

  socket.on("restaurants:get", async ({ term, location, pageNum, roomId }) => {
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
          city: restaurant.location.city
        }
      })
      io.in(roomId).emit("restaurants:receive", JSON.stringify({ restaurants }))
    }
  })
})

server.listen(configuration.web.port, configuration.web.host, () => {
  console.log(`Server is listening on port ${configuration.web.port}`)
})

export default app;