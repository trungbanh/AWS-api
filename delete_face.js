const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json');
const rekognition = new AWS.Rekognition(
  {
    region: 'us-east-1'
  }
);

var params = {
    "CollectionId": "faces",
    "FaceIds": [
        "f34e806c-34c6-44f0-b5d6-9fab4aecdee9"
    ]
}
rekognition.deleteFaces(params, (err, data) => {
    if(err) {
        console.log(err.toString())
    }
    else {
        console.log(data)
    }
})