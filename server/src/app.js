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

server.listen(configuration.web.port, configuration.web.host, () => {
  console.log(`Server is listening on port ${configuration.web.port}`)
})

io.on("connection", (socket) => {
  socket.on("room:join", (roomData) => {
    socket.join(roomData)
    socket.emit("joined", roomData)
  })

  // socket.on("restaurants:get", ({ yelpQueryData, roomId }) => {
  //   // Build out request to Yelp
  //   console.log(roomId)
  //   socket.to(roomId).emit("restaurants:show", { yelpQueryData, roomId })
  // })

  socket.on("message:send", ({ message, roomId }) => {
    // console.log(message.room)
    socket.broadcast.emit("message:receive", message)
  })
})

export default app;