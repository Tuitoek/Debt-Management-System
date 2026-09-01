const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const authMiddleware = require('../middleware/authMiddleware');

// Get all subcategories
router.get('/:budgetId', authMiddleware, async (req, res) => {
  try {
    const { budgetId } = req.params;
    const subcategories = await pool.query(
      "SELECT * FROM subcategories WHERE budget_id = $1 ORDER BY category ASC",
      [budgetId]
    );
    res.json(subcategories.rows);
  } catch (error) {
    console.error("Get subcategories error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
