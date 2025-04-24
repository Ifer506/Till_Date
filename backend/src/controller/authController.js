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


const signin = async (req, res) => {
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

module.exports = { signin };

