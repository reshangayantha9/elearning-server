import {app} from "./app";
import express, { NextFunction, Request, Response } from "express";
import { initSocketServer } from "./socketServer";
import connectDB from "./utils/db";
import {v2 as cloudinary} from 'cloudinary';
import socketio from "socket.io";
import http from "http";
require("dotenv").config();
// Create an HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.IO on the server
initSocketServer(server);


//cloudinary config
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_SECRET_KEY,
  secure: true
})




//create server
const port = 8000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
  });