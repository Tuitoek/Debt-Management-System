const express = require('express');
const router = express.Router();
const {calculateNetSalary} = require('../utils/payeCalculator.js');

router.post('/calculate-net-salary', (req, res) => {
  const result = calculateNetSalary(req.body);
  res.json(result);
}); 

module.exports = router;