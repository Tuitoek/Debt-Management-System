//Server initialization
const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path');

const payeCalculator = require('./utils/payeCalculator.js');


//Middleware
app.use(cors());//allows requests from React frontend
app.use(express.json());//Parse incoming JSON requests

//Routes
// First route to handle requests api/debts
app.get('/api/debts', (req, res) => {
    // Sample data for debts
    const debts = [
        { id: 1, name: 'Loan A', amount: 13000, dueDate: '2026-08-12', repaymentSchedule: 'Once a month' },
        { id: 2, name: 'Loan B', amount: 25000, dueDate: '2026-12-31', repaymentSchedule: 'Monthly' }
    ];
    res.json(debts);
});

//Second route to calculate net salary
app.post("/api/calculate-net-salary", async (req, res) => {
  try {
    const { grossSalary, otherAllowances, deductSHIF, deductHousingLevy, deductNSSF } = req.body;
    
    // Supports both Async Promises and Sync functions cleanly
    const result = await payeCalculator.calculateNetSalary({
      grossSalary,
      otherAllowances,   
      deductSHIF, 
      deductHousingLevy, 
      deductNSSF
    });
    
    res.json(result);
  } catch (error) {
    console.error("Error calculating net salary:", error);
    res.status(500).json({ error: "Failed to calculate net salary" });
  }
});


app.listen(5000, () =>{
  console.log("Server is running on port 5000")
})


