import express from "express";
// import { Server } from "socket.io";
import http from "http";
import "dotenv/config";
import { databaseConnection } from "./db/databaseConnection.js";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 8000;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cors({
   origin: process.env.ORIGIN,
   credentials:true,
}))
app.use(cookieParser());







//routes imported
import usersRouter from "./routes/user.routes.js";

//routes
app.use("/api/v1/users",usersRouter);

//dbConnection stablish
databaseConnection()
   .then(() => {
      console.log("DB connect SuccessFully");
      
   })
   .catch((error) => console.error(error));

httpServer.listen(port, console.log("server is start in ..", port));
