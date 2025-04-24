const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const { pool }= require("../../db");




// const signin = async (req,res) => {

//     const { id, email, password } = req.body;
    
//   if (!id || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   try {
    // Optional: Hash the password before inserting
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const insert_query = `
//       INSERT INTO users (id, email, password)
//       VALUES ($1, $2, $3)
//       RETURNING *;
//     `;

//     const result = await pool.query(insert_query, [id, email, hashedPassword]);

//     console.log("User inserted:", result.rows[0]);

//     res.status(201).json({ message: "User created", user: result.rows[0] });
//   } catch (err) {
//     console.error("Insert error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
    // pool.query(`Select * from users` , (req,res,err) => {
    //     if(!err){
    //         console.log("Heres the dat a");
    //         console.log(res.rows);
    //     }else{
    //         console.log(`${err.message} , HERE IS ERROR`)
    //     }
    //     pool.end
    // })
    
    // // const {id,email,password} = req.body

    // const insert_query='INSERT INTO User (id,email,password) VALUES ($1,$2,$3)'
    // pool.query(insert_query,[id,email,password],(err,result) =>{
    //     if(err){
    //         res.send(err)
    //     }else{
    //         console.log("BHAYO BHAGWAN")
    //         res.send("Posted Data")
    //     }
    // })
    
// }


const signup = async (req, res) => {
  try {
    const { id, email, password } = req.body;

    if (!id || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const insert_query = `INSERT INTO users (id, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await pool.query(insert_query, [id, email, password]);

    console.log("✅ User inserted:", result.rows[0]);
    res.status(201).json({ message: "User created", user: result.rows[0] });

  } catch (err) {
    console.error("❌ DB INSERT ERROR:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check for missing credentials
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Check if user exists
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Compare password
    //   const isMatch = await bcrypt.compare(password, user.password);
  
    //   if (!isMatch) {
    //     return res.status(401).json({ message: "Invalid credentials 2" });
    //   }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Send token in response
      res.status(200).json({ message: "Login successful", token });
  
    } catch (err) {
      console.error("❌ Login error:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  

module.exports = { signup , signin};

