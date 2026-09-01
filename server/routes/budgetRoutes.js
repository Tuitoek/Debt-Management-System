const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// GET all budget categories for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM budgets WHERE user_id = $1 ORDER BY category ASC",
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Get budgets error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new budget category for the logged-in user
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { category, monthly_limit } = req.body;

    const newBudget = await pool.query(
      "INSERT INTO budgets (user_id, category, monthly_limit) VALUES ($1, $2, $3) RETURNING *",
      [req.userId, category, monthly_limit]
    );

    res.status(201).json(newBudget.rows[0]);
  } catch (error) {
    console.error("Add budget error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a budget category for the logged-in user
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { category, monthly_limit } = req.body;

    const result = await pool.query(
      `UPDATE budgets
       SET category = $1, monthly_limit = $2
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [category, monthly_limit, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update budget error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a budget category (only if it belongs to the logged-in user)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM budgets WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json({ message: "Budget deleted" });
  } catch (error) {
    console.error("Delete budget error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;