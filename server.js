const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');

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

const port = process.env.PORT || 3001;
// upload
let aPromise = new Promise((resolve, reject) => {
  resolve(f1());
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'awsrek',
    metadata: function (req, file, cb) {
      console.log(req.body)
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log(req);
      console.log(file);
      const keyFile = file.originalname;
      cb(null, `${Date.now().toString()}-${keyFile}`)
    }
  })
});
let f1 = () => {
  app.post('/upload', upload.single('iamge'), (req, res) => {
    console.log(req.file)
    res.json({
      message: 'upload sucess'
    })
  })
}
aPromise.then((result) => {
  console.log('thanh cong ye ye');
}).catch((err) => {
  
});
app.listen(port, () => console.log(`server running on port ${port}`));