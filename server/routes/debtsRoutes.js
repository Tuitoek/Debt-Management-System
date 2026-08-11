const express = require('express');
const router = express.Router();

// GET /api/debts route
router.get('/', (req, res) => {
    // Sample data for debts
    const debts = [ 
        { id: 1, name: 'Loan A', amount: 13000, dueDate: '2026-08-12', repaymentSchedule: 'Once a month' },
                { id: 2, name: 'Loan B', amount: 25000, dueDate: '2026-12-31', repaymentSchedule: 'Monthly' }
    ];
    res.json(debts);
});

module.exports = router;