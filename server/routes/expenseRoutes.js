const express = require("express");
const router = express.Router();
const pool = reqire("../");
const authMiddleware = require("../middleware/authMiddleware");

// Get all expenses for a specific subcategory
router.get("/:subcategoryId", authMiddleware, async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT * FROM expenses WHERE subcategory_id = $1 AND user_id = $2",
      [subcategoryId, userId],
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
