// index.js or server.js

import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const { json, static: expressStatic } = express;

// Import routes (must be ES modules too)
import authRoutes from "./src/routes/authRoutes.js";
import enhancements from "./src/routes/enhancements.js";
import productRoute from "./src/routes/productRoutes.js";
import salesRoute from "./src/routes/salesRoutes.js";

import { errorHandler, middleware } from "supertokens-node/framework/express";
import { configureSupertokens } from "./src/auth/supertokenConfig.js";

// below import is required to verify user before they post,put,get
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";

// Import database connection
import { connectDB } from "./db.js";

// Setup __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env variables
config();

// loading supertokens
configureSupertokens();

// Express setup
const app = express();
const PORT = process.env.HOST || 1000;
const DB_Name = process.env.DB_Name;

// Middleware
app.use(express.json());

//Changed as we are using supertoken
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
  })
);

app.use(middleware());

app.use("/uploads", expressStatic(join(__dirname, "src/uploads")));

// Connect to DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});



// Route usage
app.use("/user", authRoutes);
app.use("/product", verifySession(), productRoute);
app.use("/enhancement", verifySession(), enhancements);
app.use("/sales", verifySession(), salesRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.use(errorHandler());

export default app;
