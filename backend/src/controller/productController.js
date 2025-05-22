import { pool } from "../../db.js";

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
  try {
    const id = req.params.id;
    const {
      item_name,
      item_desc,
      quantity,
      category,
      weight,
      purchase_price,
      selling_price,
      supplier_id,
      tax_rate,
      discont_info,
      is_active,
      record_level,
      updated_date,
    } = req.body;

    const item_image = req.file
      ? `/uploads/itemsImage/${req.file.filename}`
      : null;

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    // Check if product exists
    const productRes = await pool.query(
      "SELECT * FROM products WHERE item_id = $1",
      [id]
    );

    if (productRes.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Build update fields dynamically
    const fields = [];
    const values = [];
    let index = 1;

    const addField = (fieldName, value) => {
      if (value !== undefined && value !== null) {
        fields.push(`${fieldName} = $${index++}`);
        values.push(value);
      }
    };

    let isActiveValue = is_active;
    if (typeof isActiveValue === "string") {
      if (isActiveValue.toLowerCase() === "true" || isActiveValue === "1") {
        isActiveValue = true;
      } else if (
        isActiveValue.toLowerCase() === "false" ||
        isActiveValue === "0"
      ) {
        isActiveValue = false;
      } else {
        // If it’s 'active' or other string, maybe throw error or default:
        isActiveValue = null; // or false
      }
    }

    addField("item_name", item_name);
    addField("item_desc", item_desc);
    addField("quantity", quantity);
    addField("category", category);
    addField("weight", weight);
    addField("purchase_price", purchase_price);
    addField("selling_price", selling_price);
    addField("supplier_id", supplier_id);
    addField("tax_rate", tax_rate);
    addField("discont_info", discont_info);
    addField("is_active", isActiveValue);
    addField("record_level", record_level);
    addField("updated_date", updated_date);

    if (item_image) {
      addField("item_image", item_image);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const query = `
      UPDATE products SET ${fields.join(", ")}
      WHERE item_id = $${index}
      RETURNING *;
    `;
    values.push(id);

    const result = await pool.query(query, values);

    const updatedProduct = result.rows[0];

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

const oneProduct = async (req, res) => {
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

    res.json({ success: true, data: item });
  } catch (error) {
    console.error("Error in finding item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while getting product",
    });
  }
};

export default {
  addProduct,
  allProducts,
  deleteProduct,
  updateProduct,
  oneProduct,
};
