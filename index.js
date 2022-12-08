import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import authRoutes from "./src/routes/auth.js";
import bikeRoutes from "./src/routes/bikes.js";
import adminRoutes from "./src/routes/admins.js";
import memberRoutes from "./src/routes/members.js"
import bookingRoutes from "./src/routes/bookings.js";
import cors from "cors"
import bodyParser from "body-parser";

// const express = require('express');
const app = express();
// const mongoose = require('mongoose');
// require('dotenv/config')
// const config = require('config')
// const dbConfig = config.get("campus-bike-rent.dbConfig.dbName");
const dbConnection = process.env.DB_CONNECTION

//import routes
// const bikeRoutes = require(`./src/routes/bike.js`)
// import bikeRoutes from "./src/routes/bike"

//connection to DB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => {
    console.error(`Can't connect to mongodb`);
    console.error(err);
    process.exit(1);
  });
// const connect = async () => {
//   try {
//     await mongoose.connect(dbConnection);
//     console.log("Database Connected");
//   } catch (error) {
//     throw error;
//   }
// };

// mongoose.connection.on("disconnected", () => {
//   console.log("mongoDB disconnected!");
// });
// mongoose.connection.on("connected", () => {
//   console.log("mongoDB connected!");
// });
// mongoose.connect(dbConfig).then(() => {
//     console.log("Database Connected")
// }).catch(err => {
//     console.log("Database not Connected"+err)
// })

// let db = mongoose.connection
// db.on("disconnect", () => console.log("Database Disconnected"))
// db.on('error', console.error.bind(console, 'Database connection error'))
// db.once('open', () => {
//     console.log("Database is connected");
// })

app.get("/", (req, res) => {
  res.send("BISA backend is running");
});

//middleware
app.use(cors())
app.use(bodyParser.json())
// app.use(cookieParser())
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/bike", bikeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/booking", bookingRoutes);


app.get("/api/mongo", (req, res) => {
  res.json({status: mongoose.connection.readyState});
});

app.get("/api/dotenv", (req, res) => {
  res.json({status: process.env.DB_CONNECTION});
});


//listen
app.listen(process.env.PORT, () => {
  connect();
  console.log("connected to backend");
  console.log(process.env.PORT);
});
