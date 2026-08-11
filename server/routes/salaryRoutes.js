const express = require('express');
const router = express.Router();

router.post("/calculate-net-salary", async (req, res) => {
  try {
      const { 
        grossSalary, 
        otherAllowances, 
        deductSHIF, 
        deductHousingLevy, 
        deductNSSF 
      } = req.body;
  
      // Convert inputs to numbers safely
      const result = await payeCalculator.calculateNetSalary({
        grossSalary: Number(grossSalary) || 0,
        otherAllowances: Number(otherAllowances) || 0,
        deductSHIF: Boolean(deductSHIF),
        deductHousingLevy: Boolean(deductHousingLevy),
        deductNSSF: Boolean(deductNSSF),
      });
  
      res.json(result);
    } catch (error) {
      console.error("Detailed Backend Error:", error); 
      res.status(500).json({ error: "Failed to calculate net salary" });
    }
});

module.exports = router;