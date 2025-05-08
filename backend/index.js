// index.js or server.js

import { config } from "dotenv";
import express from "express";
const { json, static: expressStatic } = express;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { join, dirname } from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Import routes (must be ES modules too)
import authRoutes from "./src/routes/authRoutes.js";
import productRoute from "./src/routes/productRoutes.js";
import enhancements from "./src/routes/enhancements.js";

// Import database connection
import { pool, connectDB } from "./db.js";
// Setup __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env variables
config();

// Express setup
const app = express();
const PORT = process.env.HOST || 1000;
const DB_Name = process.env.DB_Name;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", expressStatic(join(__dirname, "src/uploads")));

// Connect to DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Route usage
app.use("/user", authRoutes);
app.use("/product", productRoute);
app.use("/enhancement", enhancements);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
