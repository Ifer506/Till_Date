import { compare, hash } from "bcrypt";
import express from "express";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from 'url';
import { dirname,extname, join } from "path";
import {  pool } from "../../db.js";
import pkg from 'jsonwebtoken';  // Default import of the CommonJS module
const { sign } = pkg;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import multer, { diskStorage } from "multer";
const profileImage = join(__dirname, "uploads", "png");

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
    const { email, password, fullName, phone, profilePic, bio } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the email already exists
    const checkEmailQuery = "SELECT id FROM users WHERE email = $1";
    const emailResult = await pool.query(checkEmailQuery, [email]);

    if (emailResult.rows.length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await hash(password, saltRounds);

    // Insert the user
    const insertQuery = `
      INSERT INTO users (email, password, fullname, phone, profilepic, bio)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [
      email,
      hashedPassword,
      fullName,
      phone,
      profilePic,
      bio,
    ]);

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
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials for email" });
    }

    // Compare password
    const isMatch = await compare(password, user.password);
    console.log(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials 2" });
    }
    // Generate JWT
    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token in response
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const userDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal error canst send user data" });
  }
};

const allUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC"); // You can customize sorting
    const users = result.rows;

    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.json({ success: true, data: users });
  } catch (error) {
    console.error("❌ Fetch all users error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error while retrieving users",
    });
  }
};

const userUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password, fullName, phone, bio } = req.body;
    let profilePicPath = req.file
      ? `uploads/userProfile/${req.file.filename}`
      : null;

    const existingUserRes = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );
    if (existingUserRes.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingUser = existingUserRes.rows[0];

    // Prepare fields to update
    const fields = [];
    const values = [];
    let index = 1;

    if (email) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }

    if (password) {
      const saltRounds = 12;
      const hashedPassword = await hash(password, saltRounds);
      fields.push(`password = $${index++}`);
      values.push(hashedPassword);
    }

    if (fullName) {
      fields.push(`fullName = $${index++}`);
      values.push(fullName);
    }

    if (phone) {
      fields.push(`phone = $${index++}`);
      values.push(phone);
    }

    if (profilePicPath) {
      fields.push(`profilepic = $${index++}`);
      values.push(profilePicPath);
    }

    if (bio) {
      fields.push(`bio = $${index++}`);
      values.push(bio);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields provided to update" });
    }

    const updateQuery = `
      UPDATE users SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING *;
    `;
    values.push(userId);

    const result = await pool.query(updateQuery, values);

    res.json({
      success: true,
      message: "User updated",
      user: result.rows[0], // Now the user will have the relative path in profile_picture
    });
  } catch (err) {
    console.error("❌ User update error:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const storage = diskStorage({
  destination: (req, file, cb) => {
    const dir = join(__dirname, "../uploads/userProfile");

    // Auto-create the folder if it doesn't exist
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});

const upload = multer({ storage });

// const getImage = async (req,res) => {

//   try {
//     const imageName = req.params.imageName;

//     // Construct the path to the images folder inside the current working directory
//     const logosFolderPath = path.join(__dirname, "uploads", "logos");
//     const imagesFolderPath = path.join(__dirname, "uploads", "userData");

//     const logoImagePath = path.join(logosFolderPath, imageName);
//     const generalImagePath = path.join(imagesFolderPath, imageName);

//     // Check if the image exists in "uploads/logos"
//     if (fs.existsSync(logoImagePath)) {
//       // Send the image file as a response
//       res.sendFile(logoImagePath);
//     }
//     // Check if the image exists in "uploads"
//     else if (fs.existsSync(generalImagePath)) {
//       // Send the image file as a response
//       res.sendFile(generalImagePath);
//     } else {
//       // If the image does not exist, return a 404 error
//       res.status(404).json({ error: "Image not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }

// }

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // First, find the user to ensure they exist
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    const user = userResult.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Now, delete the user from the database
    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    // Return success response
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  signup,
  signin,
  userDetail,
  userUpdate,
  allUsers,
  deleteUser,
  upload,
};
