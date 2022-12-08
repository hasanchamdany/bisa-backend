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

const dbConnection = process.env.DB_CONNECTION


//connection to DB
mongoose
  .connect(dbConnection)
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => {
    console.error(`Can't connect to mongodb`);
    console.error(err);
    process.exit(1);
  });


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
  // connect();
  console.log("connected to backend");
  console.log(process.env.PORT);
});
