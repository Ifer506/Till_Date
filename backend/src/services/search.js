import { pool } from "../../db.js";

const allowedTables = {
  //the given below are type and query
  // if type=users&query=asd , the fullname with asd will be provided
  products: ["item_name", "supplier_id"],
  users: ["phone", "email", "fullname"],
  sales: [
    "company_name",
    "vat_number",
    "contact_name",
    "contact_number",
    "total_amount",
  ],
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
  const whereClause = columns
    .map((col) => `CAST(${col} AS TEXT) ILIKE $1`)
    .join(" OR ");

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
