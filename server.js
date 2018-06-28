const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');
const port = process.env.PORT || 3001;

//config aws
AWS.config.loadFromPath('./config.json');

// create express app
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    message: 'hello world'
  });
})
const s3 = new AWS.S3();
var rekognition = new AWS.Rekognition({});
// upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'awsrek',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const keyFile = file.originalname;
      //   cb(null, `${Date.now().toString()}-${keyFile}`)
      cb(null, `${keyFile}`)
    }
  })
});

app.post('/upload', upload.single('image'), (req, res) => {
  // params add faces 
  var params = {
    "CollectionId": "faces",
    "Image": {
      "S3Object": {
        "Bucket": "awsrek",
        "Name": req.file.originalname
      }
    },
    "ExternalImageId": req.file.originalname,
    "DetectionAttributes": [
      "ALL"
    ]
  }
  rekognition.indexFaces(params, (err, data) => {
    if (err) {
      console.log(err.toString());
    } else {
      if (data.FaceRecords.length === 0) {
        res.json({
          message: 'Faces not found. Please try again'
        })
      }
      else if (data.FaceRecords.length > 1) {
        res.json({
          message: 'Please Take only face. Please try again',
          FaceId: data.FaceRecords
        })
      } else {
        res.json({
          Message: 'upload sucess',
          File: req.file.originalname,
          FaceId: data.FaceRecords[0].Face.FaceId,
          ImageId: data.FaceRecords[0].Face.ImageId,
          ExternalImageId: data.FaceRecords[0].Face.ExternalImageId
        });
        console.log(data);
      }
    }
  })
})
app.listen(port, () => console.log(`server running on port ${port}`));