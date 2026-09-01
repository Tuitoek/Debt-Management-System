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

// POST a new subcategory
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { budgetId, name, amount } = req.params;

    // Confirm the parent's budget's limit is not exceeded by the sum of all subcategories
    const budgetResult = await pool.query(
      "SELECT monthly_limit FROM budgets WHERE id = $1 AND user_id = $2",
      [budgetId, req.userId]
    );
    if(budgetResult.rows.length === 0) {
      return res.status(404).json({ message: "Budget not found" });
    }
    const cap = Number(budgetResult.rows[0].monthly_limit);

    // Sum existing subcategories under this budget
    const existingSubcategoriesResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) as total FROM subcategories WHERE budget_id = $1 AND user_id = $2",
      [budgetId, req.userId]
    );

    const currentTotal = Number(existingSubcategoriesResult.rows[0].total) || 0;   
    const newTotal = currentTotal + Number(amount);

    // Reject if it would exceed the budget's monthly limit
    if (newTotal > cap) {
      return res.status(400).json({ message: "Adding this subcategory exceeds the budget limit" });
    }

    // Insert the new subcategory if it doesn't exceed the limit
    const newSUb = await pool.query(
      "INSERT INTO subcategories (budget_id, user_id,name, amount) VALUES ($1, $2, $3, $4) RETURNING *",
      [budgetId, req.userId, name, amount]
    );
    
    res.status(201).json(newSUb.rows[0])
    
 }catch(error) {
    console.error("Add subcategory error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
