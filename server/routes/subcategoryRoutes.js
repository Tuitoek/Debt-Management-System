const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// Get all subcategories
router.get("/:budgetId", authMiddleware, async (req, res) => {
  try {
    const { budgetId } = req.params;
    const subcategories = await pool.query(
      "SELECT * FROM budget_subcategories WHERE budget_id = $1 AND user_id = $2 ORDER BY name ASC",
      [budgetId, req.userId],
    );
    res.json(subcategories.rows);
  } catch (error) {
    console.error("Get subcategories error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new subcategory
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { budgetId, name, amount } = req.body;

    // Confirm the parent's budget's limit is not exceeded by the sum of all subcategories
    const budgetResult = await pool.query(
      "SELECT monthly_limit FROM budgets WHERE id = $1 AND user_id = $2",
      [budgetId, req.userId],
    );
    if (budgetResult.rows.length === 0) {
      return res.status(404).json({ message: "Budget not found" });
    }
    const cap = Number(budgetResult.rows[0].monthly_limit);

    // Sum existing subcategories under this budget
    const existingSubcategoriesResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) as total FROM budget_subcategories WHERE budget_id = $1 AND user_id = $2",
      [budgetId, req.userId],
    );

    const currentTotal = Number(existingSubcategoriesResult.rows[0].total) || 0;
    const newTotal = currentTotal + Number(amount);

    // Reject if it would exceed the budget's monthly limit
    if (newTotal > cap) {
      return res
        .status(400)
        .json({ message: "Adding this subcategory exceeds the budget limit" });
    }

    // Insert the new subcategory if it doesn't exceed the limit
    const newSubcategory = await pool.query(
      "INSERT INTO budget_subcategories (budget_id, user_id,name, amount) VALUES ($1, $2, $3, $4) RETURNING *",
      [budgetId, req.userId, name, amount],
    );

    res.status(201).json(newSubcategory.rows[0]);
  } catch (error) {
    console.error("Add subcategory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a subcategory with the same cap check as above
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount } = req.body;

    // Get the budget_id for the subcategory being updated
    const subcategoryResult = await pool.query(
      "SELECT budget_id FROM budget_subcategories WHERE id = $1 AND user_id = $2",
      [id, req.userId],
    );
    if (subcategoryResult.rows.length === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    const sub = subcategoryResult.rows[0];

    const budgetId = subcategoryResult.rows[0].budget_id;

    // Confirm the parent's budget's limit is not exceeded by the sum of all subcategories
    const budgetResult = await pool.query(
      "SELECT monthly_limit FROM budgets WHERE id = $1 AND user_id = $2",
      [budgetId, req.userId],
    );

    if (budgetResult.rows.length === 0) {
      return res.status(404).json({ message: "Budget not found" });
    }
    const cap = Number(budgetResult.rows[0].monthly_limit);

    // Sum existing subcategories under this budget
    const existingSubcategoriesResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) as total FROM budget_subcategories WHERE budget_id = $1 AND user_id = $2",
      [budgetId, req.userId],
    );

    const otherSubcategoriesTotal = Number(
      existingSubcategoriesResult.rows[0].total,
    );
    const newTotal = otherSubcategoriesTotal + Number(amount);

    // Reject if it would exceed the budget's monthly limit
    if (newTotal > cap) {
      return res
        .status(400)
        .json({
          message: "Updating this subcategory exceeds the budget limit",
        });
    }

    // Update the subcategory if it doesn't exceed the limit
    const updatedSubcategory = await pool.query(
      "UPDATE budget_subcategories SET name = $1, amount = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [name, amount, id, req.userId],
    );

    res.json(updatedSubcategory.rows[0]);
  } catch (error) {
    console.error("Update subcategory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a subcategory
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM budget_subcategories WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Delete subcategory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
