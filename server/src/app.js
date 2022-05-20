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

io.on("connection", (socket) => {
  socket.emit("connected")

  socket.on("room:create", (user) => {
    // Create a Room record in database
    io.to(socket.id).emit("room:create success", "room1")
  })

  socket.on("room:join", ({ user, roomId }) => {
    // Create a connection record in the database
    // Query for all connected users
    socket.join(roomId)
    console.log("JOINED ROOM")
    io.to(socket.id).emit("room:join success", roomId)
  })

  socket.on("room:landed", ({ user, roomId }) => {
    console.log(`${user} landed in ${roomId}`)
  })

  socket.on("message:send", ({ message, roomId }) => {
    socket.broadcast.to(roomId).emit("message:recieve", message)
  })
})

server.listen(configuration.web.port, configuration.web.host, () => {
  console.log(`Server is listening on port ${configuration.web.port}`)
})

export default app;