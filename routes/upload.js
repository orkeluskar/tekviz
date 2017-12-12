const router = require('express').Router();
const uploads = require('../controllers/uploadToS3/upload');


const AWS = require('aws-sdk');
AWS.config.loadFromPath('./configs/aws-config.json');

const multer  = require('multer');
const multerS3 = require('multer-s3');

var s3 = new AWS.S3();

//multer to parse multi-part form data
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket:function (req, file, cb) {
      //console.log(req.body);
      //setting dynamic bucket link for uploading files
      let bucketName = 'tweettrendsomkar/' + req.body.pid + '/' + req.body.version;
      cb(null, bucketName);
    }, 

    ACL: 'public-read',
    contentType: function (req, file, cb) {
      //console.log(file);
      cb(null, file.mimetype)
    },      
    metadata: function (req, file, cb) {
      //console.log(file);
      cb(null, {
        fieldName: file.originalname,
      });
    },
    key: function (req, file, cb) {
      //console.log(file);
      cb(null, file.originalname)
    }
  })
});

// multer takes the upload function first and then goes to the controller
router.route('/upload')
    .post(upload.array('file'), uploads.uploadtoS3);

module.exports = router;