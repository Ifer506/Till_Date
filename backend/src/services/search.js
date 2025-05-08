import { pool } from "../../db.js";

const allowedTables = {
    //the given below are type and query 
    // if type=users&query=asd , the fullname with asd will be provided
  products: ["items_name", "description", "location"],
  users: ["phone", "email", "fullname"],
};

const searchFunction = async (req, res) => {
  const { query, type } = req.query;

  // Validate input
  if (!query || !type || !allowedTables[type]) {
    return res.status(400).json({
      success: false,
      message: "Invalid search parameters",
    });
  }

  // Construct WHERE clause
  const columns = allowedTables[type];
  const whereClause = columns.map(col => `${col} ILIKE $1`).join(" OR ");

  try {
    const result = await pool.query(
      `SELECT * FROM ${type} WHERE ${whereClause}`,
      [`%${query}%`]
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default { searchFunction };
