const { Pool } = require('pg');

// function (Any)
require('dotenv').config();


const pool = new Pool({
    user: process.env.DB_USER,       // e.g., 'postgres'
    host: process.env.DB_HOST,       // e.g., 'localhost'
    database: process.env.DB_NAME,   // e.g., 'pos_system'
    password: process.env.DB_PASS,   // your DB password
    port: process.env.DB_PORT,       // usually 5432
});


const connectDB = async () => {
    try {
      await pool.connect();
      console.log("✅ Connected to PostgreSQL DB!");
    } catch (err) {
      console.error("❌ DB connection failed:", err.message);
      process.exit(1);
    }
};
  

module.exports = connectDB;

