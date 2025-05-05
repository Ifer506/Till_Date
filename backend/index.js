const dotenv = require("dotenv");
const { connectDB } = require("./db");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");




//configuring dotenv , where all secrets passthrough
dotenv.config();

//defining port == suggestion  = dotenv.config(); needs to be in first
const PORT = process.env.HOST || 1000;

const DB_Name = process.env.DB_Name;

const app = express();

//middleware
app.use(express.json());

app.use(cors());

//connect to database
connectDB();

// Custom middleware
app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  // console.log(`Database name is ${DB_Name}`);
});

// this is the path files that are required for the api to connect
// const authController = require("./src/controller/authController");


app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));


const authRoutes = require("./src/routes/authRoutes");

app.use("/user", authRoutes);

module.exports = app;


//this is just for testing the image path
// const fs = require("fs");

// app.get("/test-image", (req, res) => {
//   const imgPath = path.join(__dirname, "src/uploads", "fire.jpeg");
//   if (fs.existsSync(imgPath)) {
//     res.sendFile(imgPath);
//   } else {
//     res.status(404).send("Image not found");
//   }
// });