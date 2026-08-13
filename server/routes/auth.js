require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

// SIGNUP
app.post('/api/signup'), async (req,res) => {
    try {
        const {name, email, password, phone} = req.body;

        // Check if user Exists
       
    } catch () {
        
    }
}