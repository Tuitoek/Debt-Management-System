const express = require("express");
const router = express.Router();

// GET /api/debts route
router.get("/", (req, res) => {
  // Sample data for debts
  const debts = [
    {
      id: 1,
      name: "Loan A",
      amount: 13000,
      installmentAmount: 13000,
      outstandingAmount: 10000,
      dueDate: "2026-08-12",
      repaymentSchedule: 1,
    },
    {
      id: 2,
      name: "Loan B",
      amount: 25000,
      installmentAmount: 4278.50,
      outstandingAmount: 20000,
      dueDate: "2026-12-31",
      repaymentSchedule: 6,
    },
    {
      id: 3,
      name: "Loan C",
      amount: 3000,
      installmentAmount: 1,
      outstandingAmount: 3000,
      dueDate: "2027-10-31",
      repaymentSchedule: 1,
    },
  ];
  res.json(debts);
});

module.exports = router;
