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

// Post income entry for logged-in user
router.post('/income', authMiddleware, async(req,res) =>{
    try {
        const { source, amount, date_received } = req.body;

        const newIncome = await pool.query(
            'INSERT INTO income(user_id, source, amount, date_received) VALUES ($1, $2,$3,$4) RETURNING *', 
            [ req.userId, source, amount, date_received || new Date() ]
        );

        res.status(201).json(newIncome.rows[0]);
    } catch (error) {
        console.error('Add income error:' , error);
        res.status(500).json({ message: 'Server error' });
    }
})


// Delete income entry for logged-in user
router.delete('/income/:id', authMiddleware, async(req,res) =>{
    try {
       
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM income WHERE id = $1 and user_id = $2 RETURNING *', [id, req.userId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({ message: 'Income entry not found!'})
        }

        res.json({message: 'Income entry deleted'})
    } catch (error) {
        console.error('Delete income error:' , error);
        res.status(500).json({ message: 'Server error' });
    }
})


module.exports = router;