const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// GET all savings goals for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM savings WHERE user_id = $1 ORDER BY target_date ASC",
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Get savings goals error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new savings goal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { goal_name, target_amount, target_date } = req.body;

    const newGoal = await pool.query(
      "INSERT INTO savings (user_id, goal_name, target_amount, saved_amount, target_date) VALUES ($1, $2, $3, 0, $4) RETURNING *",
      [req.userId, goal_name, target_amount, target_date]
    );

    res.status(201).json(newGoal.rows[0]);
  } catch (error) {
    console.error("Add savings goal error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a savings goal's details (name, target amount, target date)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { goal_name, target_amount, target_date } = req.body;

    const result = await pool.query(
      `UPDATE savings
       SET goal_name = $1, target_amount = $2, target_date = $3
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [goal_name, target_amount, target_date, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update savings goal error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH — add a contribution to a goal's saved_amount (doesn't replace it, adds to it)
router.patch("/:id/contribute", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const result = await pool.query(
      `UPDATE savings
       SET saved_amount = saved_amount + $1
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [amount, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Contribute to savings goal error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a savings goal
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM savings WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    res.json({ message: "Savings goal deleted" });
  } catch (error) {
    console.error("Delete savings goal error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;