const express = require("express");
const router = express.Router();
const pool = reqire("../");
const authMiddleware = require("../middleware/authMiddleware");

// Get all expenses for a specific subcategory
router.get("/:subcategoryId", authMiddleware, async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT * FROM expenses WHERE subcategory_id = $1 AND user_id = $2",
      [subcategoryId, userId],
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Post a new expense for a specific subcategory
router.post("/:subcategoryId", authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id;
    const { subcategoryId, description, amount, expense_date } = req.body;

    // Confirm the subcategory belongs to the user
    const subResult = await pool.query(
      "SELECT * FROM subcategories WHERE id = $1 AND user_id = $2",
      [subcategoryId, userId],
    );
    if (!subResult.rows.length === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Add new expense 
    const newExpense = await pool.query(
      "INSERT INTO expenses (subcategory_id, user_id, amount, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [subcategoryId, userId, amount, description, expense_date],
    );
    
    res.status(201).json(newExpense.rows[0]);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
