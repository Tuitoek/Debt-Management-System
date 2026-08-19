//Server initialization
require('dotenv').config({ quiet: true });
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const pool = require("./db");
const authRoutes = require("./routes/auth.js");

// Importing routes
const debtsRoutes = require("./routes/debtsRoutes.js");
const salaryRoutes = require("./routes/salaryRoutes.js");

//Middleware
app.use(cors()); //allows requests from React frontend
app.use(express.json()); //Parse incoming JSON requests

//Routes
// First route to handle requests api/debts
app.use("/api/debts", debtsRoutes);

// Second route to handle requests api/calculate-net-salary
app.use("/api", salaryRoutes);

// Auth routes
app.use("/api", authRoutes);

// Setting Up Database
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Connection error:", err);
  } else {
    console.log("Connected to Postgres at:", res.rows[0].now);
  }
});

module.exports = app;
