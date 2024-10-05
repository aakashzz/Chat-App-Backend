import express from "express";
import { Server } from "socket.io";
import http from "http";
const app = express();
const httpServer = http.createServer(app);

app.get("/user", (req, res) => {
   res.send("Work Better");
});

httpServer.listen(2000, console.log("server is start in 2000 .."));
