const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/debts route
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM debts where user_id = $1 ORDER BY due_date ASC",
      [req.userId],
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Get debts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Post a new debt for the logged-in user
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Debt request from body
    const { name, total_amount, installment_amount, interest_rate, due_date } =
      req.body;

    const newDebt = await pool.query(
      `INSERT INTO debts(user_id, name, total_amount, installment_amount, interest_rate,due_date) VALUES ($1, $2,$3,$4, $5, $6) RETURNING *`,
      [
        req.userId,
        name,
        total_amount,
        installment_amount,
        interest_rate || 0,
        due_date,
        id,
        req.userId,
      ],
    );

    res.status(201).json(newDebt.rows[0]);
  } catch (error) {
    console.error(" Add debt error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a debt
router.put("./:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, total_amount, installment_amount, interest_rate, due_date } =
      req.body;
    const result = await pool.query(
      `UPDATE debts 
      SET name = $1, total_amount = $2, installment_amount = $3, interest_rate = $4, due_date = $5 WHERE id= $6 and user_id = $7
      RETURNINg *`,
      [
        name,
        total_amount,
        installment_amount,
        interest_rate,
        due_date,
        id,
        req.userId,
      ],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Debt not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update debt error:", err);
    res.status(500).json({ message: "Debt not found" });
  }
});

// DELETE a debt
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM debts WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Debt not found" });
    }

    res.json({ message: "Debt deleted" });
  } catch (err) {
    console.error("❌ Delete debt error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
