// server.js
require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');  // Database connection
const userRoutes = require('./routes/userRoutes');  // User routes
const doctorRoutes = require('./routes/doctorRoutes');  // Doctor routes
const cookieParser=require('cookie-parser')


const app = express();

// Middleware
app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
