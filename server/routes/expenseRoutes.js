const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const authMiddleware = require("../middleware/authMiddleware");

// Get all expenses for a specific subcategor
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT expenses.*, subcategories.name AS subcategory_name, budgets.category AS budget_category
       FROM expenses
       JOIN subcategories ON expenses.subcategory_id = subcategories.id
       JOIN budgets ON subcategories.budget_id = budgets.id
       WHERE expenses.user_id = $1
       ORDER BY expenses.expense_date DESC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all expenses for a specific subcategory
router.get("/:subcategoryId", authMiddleware, async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const result = await pool.query(
      "SELECT * FROM expenses WHERE subcategory_id = $1 AND user_id = $2 ORDER BY expense_date DESC",
      [subcategoryId, req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { subcategory_id, description, amount, expense_date } = req.body;

    // Confirm the subcategory belongs to the user, and get its parent budget category + name
    const subResult = await pool.query(
      `SELECT subcategories.*, budgets.category AS budget_category
       FROM subcategories
       JOIN budgets ON subcategories.budget_id = budgets.id
       WHERE subcategories.id = $1 AND subcategories.user_id = $2`,
      [subcategory_id, req.userId]
    );

    if (subResult.rows.length === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const sub = subResult.rows[0];

    // Insert the expense as usual
    const newExpense = await pool.query(
      "INSERT INTO expenses (subcategory_id, user_id, amount, description, expense_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [subcategory_id, req.userId, amount, description, expense_date || new Date()]
    );

    // If this subcategory is under "Savings", try to auto-contribute to a matching goal
    let matchedGoal = null;
    if (sub.budget_category.toLowerCase().includes("saving")) {
      const goalResult = await pool.query(
        "UPDATE savings SET saved_amount = saved_amount + $1 WHERE user_id = $2 AND LOWER(goal_name) = LOWER($3) RETURNING *",
        [amount, req.userId, sub.name]
      );
      if (goalResult.rows.length > 0) {
        matchedGoal = goalResult.rows[0];
      }
    }

    res.status(201).json({ ...newExpense.rows[0], matchedGoal });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// UPDATE an existing expense
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, expense_date } = req.body;

    const result = await pool.query(
      "UPDATE expenses SET description = $1, amount = $2, expense_date = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [description, amount, expense_date, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE an expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;