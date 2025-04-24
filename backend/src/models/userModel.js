const { pool } = require("../db.js"); // path depends on your structure

const insertUser = async ({ email, password, fullname, phoneno, photo }) => {
  const query = `
    INSERT INTO users (email, password, fullname, phoneno, photo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [email, password, fullname, phoneno, photo]);
    return result.rows[0];
  } catch (err) {
    console.error("Error inserting user:", err);
    throw err;
  }
};

module.exports = { insertUser };
