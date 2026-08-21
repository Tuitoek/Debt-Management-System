const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/debts route
router.get("/", authMiddleware,  async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM debts where user_id = $1 ORDER BY due_date ASC", [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Get debts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Post a new debt for the logged-in user
router.post("/", authMiddleware, async(req,res) =>{
  try {
    // Debt request from body
    const { name, total_amount, installment_amount, interest_rate, due_date } = req.body;

    const newDebt = await pool.query(
      `INSERT INTO debts(user_id, name, total_amount, installment_amount, interest_rate,due_date) VALUES ($1, $2,$3,$4, $5, $6) RETURNING *`,
      [req.userId, name, total_amount, installment_amount, interest_rate || 0, due_date, id , req.userId]
    );

    res.status(201).json(newDebt.rows[0]);
  } catch (error) {
    console.error(" Add debt error:", err);
    res.status(500).json({ message: "Server error" });
  }
})



module.exports = router;
