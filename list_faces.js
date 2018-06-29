const fs = require('fs')
const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

AWS.config.update({ region: 'us-east-1' });
var rekognition = new AWS.Rekognition({});

var params = {
  CollectionId: "faces",
  MaxResults: 1000
};
rekognition.listFaces(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    for(let i = 0; i < data.Faces.length; i++)
    {
      let face = {
        FaceId: data.Faces[i].FaceId,
        ExternalImage: data.Faces[i].ExternalImageId
      }
      console.log(face);
    }
  }
});