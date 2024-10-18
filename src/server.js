import express from "express";
import { Server } from "socket.io";
import http from "http";
import "dotenv/config";
import { databaseConnection } from "./db/databaseConnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";

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

const io = new Server(httpServer, {
   // pingTimeout: 60000,
   cors: {
      origin: process.env.ORIGIN,
      credentials: true,
   },
});

io.on("connection", (socket) => {
   console.log("a user connected");
   socket.on("setup", (userDetails) => {
      socket.join(userDetails._id);
      console.log(userDetails._id);
      socket.emit("connected");
   });

   //join to chat
   socket.on("join chat",(room)=>{
      socket.join(room)
      console.log("User Room id: ",room)
   })

   socket.on("new message",(newMessageReceived)=>{
      var chat = newMessageReceived.chat;

      if(!chat.user) return console.error('chat.user not defined');

      chat.user.forEach(user => {
         if(user._id === newMessageReceived.sendedBy._id) return;
         socket.in(user._id).emit("message received", newMessageReceived)
      });
   }) 
});

httpServer.listen(port, console.log("server is start in ..", port));
