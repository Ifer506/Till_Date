const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const { pool } = require("../../db");

const addProduct = async (req, res) => {
  try {
    const {
      itemId,
      itemName,
      itemDesc,
      quantity,
      category,
      weight,
      purchasePrice,
      sellingPrice,
      itemImage,
      supplierId,
      taxRate,
      discontInfo,
      isActive,
      recordLevel,
      createdDate,
      updatedDate,
    } = req.body;

    if (!itemName) {
      return res.status(400).json({ message: "item names are required" });
    }

    const query = `
        INSERT INTO products (
          item_id,
          item_name,
          item_desc,
          quantity,
          category,
          weight,
          purchase_price,
          selling_price,
          item_image,
          supplier_id,
          tax_rate,
          discont_info,
          is_active,
          record_level,
          created_date,
          updated_date
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16
        ) RETURNING *;
      `;

    const values = [
      itemId,
      itemName,
      itemDesc,
      quantity,
      category,
      weight,
      purchasePrice,
      sellingPrice,
      itemImage,
      supplierId,
      taxRate,
      discontInfo,
      isActive,
      recordLevel,
      createdDate,
      updatedDate,
    ];

    const result = await pool.query(query, values);
    res
      .status(201)
      .json({ message: "Product added successfully", product: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      // 23505 = unique_violation in PostgreSQL
      res.status(409).json({ message: "Item ID or Item Name already exists" });
    } else {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Server error while adding product" });
    }
  }
};

const allProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY item_id ASC"
    );
    const items = result.rows;

    if (items.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.json({ success: true, data: items });
  } catch (error) {
    console.error("❌ Error getting all items", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while getting product",
    });
  }
};

const deleteProduct = async (req, res) => {
    try {
      const itemId = req.params.id;
  
      const itemFound = await pool.query(
        "SELECT * FROM products WHERE item_id = $1",
        [itemId]
      );
  
      const item = itemFound.rows[0];
  
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }
  
      await pool.query("DELETE FROM products WHERE item_id = $1", [itemId]);
  
      res.json({ success: true, message: "Item has been deleted" });
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while deleting product",
      });
    }
  };
  

const varProduct = (req, res) => {};

module.exports = { addProduct, allProducts, deleteProduct };
