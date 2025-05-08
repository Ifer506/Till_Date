import { pool } from "../../db.js";

const searchFunction = async (req, res) => {
  const { query } = req.query;

  try {
    const result = await _query(
      `SELECT * FROM jobs 
         WHERE title ILIKE $1 OR description ILIKE $1 OR location ILIKE $1`,
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
