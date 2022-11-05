require('dotenv').config();
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3500;

// imported file
const connectDB = require('./config/dbConn');

// Connect to MongoDB
connectDB();

mongoose.connection.once('open',()=>{
  console.log('Connected to MongoDB');
  app.listen(PORT, () => { console.log(`Server running on port ${PORT} `) });
});

