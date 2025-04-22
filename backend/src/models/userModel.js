const { model } = require('mongoose');
const pool = require('./db'); // assuming you exported pg Pool

const insertUser = async (userData) => {
  const { email, password, fullname, phoneno, photo } = userData;

  const query = `
    INSERT INTO users (email, password, fullname, phoneno, photo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [email, password, fullname, phoneno, photo];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = insertUser;