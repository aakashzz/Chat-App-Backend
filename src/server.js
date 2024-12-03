import express from "express";
import { Server } from "socket.io";
import http from "http";
import "dotenv/config";
import { databaseConnection } from "./db/databaseConnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WebSocketServer } from "ws";

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 8000;

app.set("trust proxy", 1);
//middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
   cors({
      origin: process.env.ORIGIN,
      credentials: true,
   })
);

//routes imported
import usersRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";
import requestRouter from "./routes/request.routes.js";
import messageRouter from "./routes/message.routes.js";
import chatRouter from "./routes/chat.routes.js";

//routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/chat", chatRouter);

//dbConnection stablish
databaseConnection()
   .then(() => {
      console.log("DB connect SuccessFully");
   })
   .catch((error) => console.error(error));

const wss = new WebSocketServer({ server: httpServer });
const rooms = {};

wss.on("connection", (ws, req) => {
   ws.send(JSON.stringify("Connected Server"));

   ws.on("message", (data) => {
      const parseData = JSON.parse(data);
      console.log(parseData);
      switch (parseData.action) {
         case "join":
            joinRoom(ws, parseData.room);
            break;
         case "sendMessage":
            sendMessageToRoom(ws, parseData.room, parseData.data);
            break;

      }
   });
});

function joinRoom(ws, room) {
   if (!rooms[room]) {
      rooms[room] = [];
   }
   rooms[room].push(ws);
   ws.send(JSON.stringify({ action: "join", room }));
}

function sendMessageToRoom(ws, room, message) {
   if (rooms[room]) {
      rooms[room].forEach((client) => {
         if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify({ action: "sendMessage", message }));
         }
      });
   }
}



httpServer.listen(port, console.log("server is start in ..", port));
