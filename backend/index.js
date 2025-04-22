const dotenv = require("dotenv");
const { router } = require("express");
const connectDB = require("./db");
const express = require("express");

//configuring dotenv , where all secrets passthrough
dotenv.config();

//defining port == suggestion  = dotenv.config(); needs to be in first
const PORT = process.env.DB_PORT || 1000;

const DB_Name = process.env.DB_Name;


const app = express();

//middleware
app.use(express.json());

//connect to database
connectDB();

// Custom middleware
app.get("/", (req, res) => {
    res.send("API is working");
});
  
app.listen(PORT,DB_Name, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    // console.log(`Database name is ${DB_Name}`);
});


module.exports = app;
