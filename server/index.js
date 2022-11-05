// step 1
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const multer = require("multer");
const path = require('path');

// const fileuploadRouter = require('./routes/fileUpload');

const PORT = process.env.PORT || 3500;

// connect DB step 2.1
const connectDB = require('./config/dbConn');
// const corsOptions = require('./config/corsOptions');

// Connect to MongoDB | step 2
connectDB();

// built in middleware | step 3
app.use(express.json())

// step 4 the image 
// app.use('/fileupload', fileuploadRouter);


// step 2.2
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => { console.log(`Server running on port ${PORT} `) });
});

// step 4.1 upload multer images folder and the name file saved
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})
const upload = multer({ storage: storage })

// upload image then store to the image folder so the image accessible on webpage
app.use(express.static(__dirname + '/images'));
app.use('/images', express.static('images'));

// Route to the upload single image
app.post("/upload", upload.single("file"), function(req, res){
  res.status(200).json("File has been uploaded")
})

// routes | step 3.1 make all the controllers in routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/posts', require('./routes/posts'));
app.use('/category', require('./routes/categories'));

