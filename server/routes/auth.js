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

//LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Find the user
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(result.rows.length === 0){
            return res.status(400).json({ message: 'Invalid email. Enter correct Email'})
        }

        const user = result.rows[0];
        // Compare entered password and hashed one in db
        const validpassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({message: 'Invalid Password! Please enter the correct password'});
        }

        // Create token proving this user is logged in
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );

        res.json({
            message: 'Login Successful',
            token,
            user: { id: user.id, name: user.name, email: user.email}
        })

    } catch (error) {
        
    }
})