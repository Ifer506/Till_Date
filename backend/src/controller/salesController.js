import express from "express";
import { pool } from "../../db.js";
const app = express();

const sellProduct = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      items,
      total_amount,
      company_name = null,
      company_address = null,
      vat_number = null,
      pan_number = null,
      business_use = null,
      contact_name = null,
      contact_number = null,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // Start transaction
    await client.query("BEGIN");

    const processedItems = [];

    // Validate and update quantity
    for (const { item_id, quantity } of items) {
      // Check if product exists and get available quantity
      const productResult = await client.query(
        "SELECT item_name, quantity FROM products WHERE item_id = $1 FOR UPDATE",
        [item_id]
      );

      if (productResult.rowCount === 0) {
        throw new Error(`Product with ID ${item_id} not found`);
      }

      const product = productResult.rows[0]; // ✅ Add this line

      const availableQty = product.quantity;
      if (availableQty < quantity) {
        throw new Error(
          `Not enough stock for ${productResult.rows[0].item_name}. Available stock: ${availableQty}`
        );
      }

      // Decrement product quantity
      await client.query(
        "UPDATE products SET quantity = quantity - $1 WHERE item_id = $2",
        [quantity, item_id]
      );

      // Store item with name
      processedItems.push({
        item_id,
        item_name: product.item_name,
        quantity,
      });
    }

    // Insert into sales table
    await client.query(
      `INSERT INTO sales (items, total_amount, company_name, company_address, vat_number, pan_number, business_use, contact_name, contact_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        JSON.stringify(processedItems),
        total_amount,
        company_name,
        company_address,
        vat_number,
        pan_number,
        business_use,
        contact_name,
        contact_number,
      ]
    );

    // Commit transaction
    await client.query("COMMIT");

    res.status(200).json({ message: "Sale completed successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Sell product error:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to complete sale" });
  } finally {
    client.release();
  }
};

const salesDetail = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sales ORDER BY sale_id");
    const sales = result.rows;

    if (result.rows == 0) {
      return res
        .status(404)
        .json({ success: false, message: "sales report not found" });
    } else {
      console.log("sales found");
      res.status(201).json({ success: true, data: sales });
    }
  } catch (error) {
    console.log("something wrong in sales Controllerd");
    res.status(500).json({
      success: false,
      message: "Internal problems at sales department backend controller",
    });
  }
};

export default { sellProduct, salesDetail };
