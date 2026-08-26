const express = require("express");
const router = express.Router();
const pool = require("../db");
const authRoutes = require("../middleware/authMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// Get all budget categories for the logged in user
router.get("/", authMiddleware, async(req,res) =>{
    try {
        const result = await pool.query(
            "SELECT * FROM budgets WHERE user_id = $1 ORDER BY category ASC", [req.userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Get bugdets error:", error);
        res.status(500).json({ message: "Server error" });
    }
})
