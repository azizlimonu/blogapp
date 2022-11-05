// step 1
require('dotenv').config();
const express = require('express');
const app = express();
const dotenv = require('dotenv');
// const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3500;

// imported file | step 2.1
const connectDB = require('./config/dbConn');
// const corsOptions = require('./config/corsOptions');

// Connect to MongoDB | step 2
connectDB();


// built in middleware | step 3
app.use(express.json());

// routes | step 3.1
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/posts', require('./routes/posts'));
// app.use('/category', require('./routes/categories'));

// step 2.2
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => { console.log(`Server running on port ${PORT} `) });
});

