const express = require('express');

const multer = require('multer');

const router = express.Router();

router.get("/", function (request, response, next) {

  response.render('fileupload', { title: 'File Upload' });

});

router.post("/", function (request, response, next) {

  const storage = multer.diskStorage({

    destination: function (request, file, callback) {
      callback(null, './upload');
    },
    filename: function (request, file, callback) {
      const temp_file_arr = file.originalname.split(".");

      const temp_file_name = temp_file_arr[0];

      const temp_file_extension = temp_file_arr[1];

      callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
    }

  });

  const upload = multer({ storage: storage }).single('sample_image');

  upload(request, response, function (error) {

    if (error) {
      return response.end('Error Uploading File');
    }
    else {
      return response.end('File is uploaded successfully');
    }

  });

});

module.exports = router;
