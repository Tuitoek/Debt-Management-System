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

// Update budget for logged in user
router.put("/:id", authMiddleware, async(req,res) => {
    try {
        const { id } = req.params;
        const { category, monthly_limit } = req.body;

        const result = await populate.query(
            `UPDATE budgets  SET category = $1, monthly_limit = $2 WHERE id = $3 and user_if = $4 RETURNING *, [category, monthly_limit, id, req.userId]`
        );

        if( result.rows.length === 0){
            return res.status(404). json({ message: "Budget not found"});
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Update Budget Error");
        res.status(500).json({ message: "Server Error"});
    }
})

// DELETE a budget category(only if it belongs to the logged-in user)
router.delete("/:id", authMiddleware, async (req, res) => {
        try {
            const {iid } = req.params;
            const result = await pool.query(
                "DELETE FROM budgets WHERE id = $1 AND user-id = $2 RETURING *", [id, req.userId]
            );

            if(result.rows.length === 0){
                return res.status(404).json({ message: "Budget not found" });
            }
            res.json({ message: "Budget deleted" })

        } catch ( error) {
            console.error("Delete budget error:", error);
            res.status(500).json({ message: "Server error" })
        }
})

module.exports = router;