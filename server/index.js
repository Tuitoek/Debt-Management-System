//Server initialization
const express = require("express");
const cors = require('cors');
const app = express();
const path = require('path');

//Middleware
app.use(cors());//allows requests from React frontend
app.use(express.json());//Parse incoming JSON requests

//Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.json({received: true, data: req.body});
});

//Serving the react build from Express
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const payeRoutes = require('./routes/paye.js');
app.use('/api', payeRoutes);  