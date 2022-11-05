// step 1
require('dotenv').config();
const express = require('express');
const app = express();
// const dotenv = require('dotenv');
// const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const PORT = process.env.PORT || 3500;

// imported file | step 2.1
const connectDB = require('./config/dbConn');
// const corsOptions = require('./config/corsOptions');

// Connect to MongoDB | step 2
connectDB();

// built in middleware | step 3
app.use(express.json());

// step 4 the image 
app.use("/images", express.static(path.join(__dirname, "/images")));

// step 2.2
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => { console.log(`Server running on port ${PORT} `) });
});

// step 4.1 upload multer images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    //callb(null, "file.png")
    cb(null, req.body.name)
  },
})
// step 4.2 upload image
const upload = multer({ storage: storage })
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded")
})

// routes | step 3.1 make all the controllers in routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/posts', require('./routes/posts'));
app.use('/category', require('./routes/categories'));

