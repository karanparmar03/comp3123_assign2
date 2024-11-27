const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes'); // Ensure this file exists
const employeeRoutes = require('./routes/employeeRoutes'); // Ensure this file exists

// MongoDB Connection String
const MONGO_URI = "mongodb+srv://KaranParmar:9Z7YXkPgCEa66zah@cluster0.hr7uu.mongodb.net/employees?retryWrites=true&w=majority";

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the Server
const PORT = 5000; // You can change this if needed
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  app.get('/', (req, res) => {
    res.status(200).send('Server is running!');
  });

  
});
