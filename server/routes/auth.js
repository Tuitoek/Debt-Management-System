require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

// SIGNUP
app.post('/api/signup'), async (req,res) => {
    try {
        const {name, email, password, phone} = req.body;

        // Check if user Exists
        const existinguser = await pool.query('SELECT *users where email = $1', [email]);
        if(existinguser.rows.lengh > 0){
            return res.status(400).json({message: 'Email already registered'})
        }

        // Hash the password(scramble it, 10 times)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save newUser
        const newUser = await pool.query(
            'INSERT INTO users(name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING id,name,email', [name, email, hashedPassword, phone]
        );

        res.status(201).json({ message: 'User created', user: newUser.rows[0] });
       
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'})
    }
}

