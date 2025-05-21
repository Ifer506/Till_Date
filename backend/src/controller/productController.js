import express from "express";
import { pool } from "../../db.js";
const app = express();

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

      supplierId,
      taxRate,
      discontInfo,
      isActive,
      recordLevel,
      createdDate,
      updatedDate,
    } = req.body;

    console.log("Extracted form fields:", {
      itemId,
      itemName,
      itemDesc,
      quantity,
      category,
      weight,
      purchasePrice,
      sellingPrice,
      supplierId,
      taxRate,
      discontInfo,
      isActive,
      recordLevel,
      createdDate,
      updatedDate,
    });

    if (!itemName) {
      return res.status(400).json({ message: "item names are required" });
    }

    const itemImage = req.file
      ? `/uploads/itemsImage/${req.file.filename}`
      : null;

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

const updateProduct = async (req, res) => {
  let itemImage = req.file ? `uploads/itemsImage/${req.file.filename}` : null;

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
      supplierId,
      taxRate,
      discontInfo,
      isActive,
      recordLevel,
      updatedDate,
    } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const query = `
      UPDATE products SET
        item_name = $2,
        item_desc = $3,
        quantity = $4,
        category = $5,
        weight = $6,
        purchase_price = $7,
        selling_price = $8,
        ${
          itemImage !== null ? "item_image = $9," : ""
        }  /* Include item_image only if it's not null */
        supplier_id = $${
          itemImage !== null ? "10" : "9"
        },  /* Adjust index for supplier_id based on item_image */
        tax_rate = $${
          itemImage !== null ? "11" : "10"
        },    /* Adjust index for tax_rate based on item_image */
        discont_info = $${
          itemImage !== null ? "12" : "11"
        }, /* Adjust index for discont_info based on item_image */
        is_active = $${
          itemImage !== null ? "13" : "12"
        },    /* Adjust index for is_active based on item_image */
        record_level = $${itemImage !== null ? "14" : "13"},
        updated_date = $${itemImage !== null ? "15" : "14"}
      WHERE item_id = $1
      RETURNING *;
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
      supplierId,
      taxRate,
      discontInfo,
      isActive,
      recordLevel,
      updatedDate,
    ];

    if (itemImage !== null) {
      values.splice(8, 0, itemImage); // Insert itemImage at index 8 in values array
    }
    const result = await pool.query(query, values);
    if (result.rowCount > 0) {
      res.json({
        success: true,
        message: "Product updated successfully",
        product: result.rows[0],
      });
    } else {
      res.json({
        success: false,
        message: "Product not found or update failed",
      });
    }
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

const oneProduct = async (req,res) => {
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

    res.json({ success: true, data:item});

  } catch (error) {
    console.error("Error in finding item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while getting product",
    });
  }
}

export default { addProduct, allProducts, deleteProduct, updateProduct , oneProduct};
