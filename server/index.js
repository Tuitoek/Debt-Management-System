//Server initialization
const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path');

const payeCalculator = require('./utils/payeCalculator.js');
const debtsRoutes = require('./routes/debtsRoutes.js');
const salaryRoutes = require('./routes/salaryRoutes.js');


//Middleware
app.use(cors());//allows requests from React frontend
app.use(express.json());//Parse incoming JSON requests

//Routes
// First route to handle requests api/debts
app.use('/api/debts', debtsRoutes);

// Second route to handle requests api/calculate-net-salary
app.use('/api', salaryRoutes);

    
module.exports = app;