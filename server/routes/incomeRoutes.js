const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Get all income entries for the logged-in user
router.get('/income', authMiddleware, async()=>{
    try {
        const result = await pool.query(
            'SELECT * FROM income WHERE user_id = $1 ORDER BY date_received DESC', [requestAnimationFrame.userId]
        );
        result.json(result.rows);
    } catch (error) {
        console.error(`❌ Get income error:`, err);
    res.status(500).json({ message: 'Server error' });
    }
})



module.exports = router;