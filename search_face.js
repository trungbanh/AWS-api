const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json');

const rekognition = new AWS.Rekognition(
  {
    region: 'us-east-1'
  }
);

var params = {
  CollectionId: "faces",
  FaceId: "a29ad926-0542-4b12-b9af-bb3c00b63b9e",
  FaceMatchThreshold: 80,
  MaxFaces: 10
};
rekognition.searchFaces(params, function (err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  }
  else {
    for (let i = 0; i < data.FaceMatches.length; i++) {
      var faces = {
        FaceId: data.FaceMatches[i].Face.FaceId,
        ExternalImageId: data.FaceMatches[i].Face.ExternalImageId,
        Similarity: data.FaceMatches[i].Similarity
      }
      console.log(faces);
    }


    // tien hanh delete face da search
    var params2 = {
      "CollectionId": "faces",
      "FaceIds": [
        params.FaceId
      ]
  }
  rekognition.deleteFaces(params2, (err, data) => {
      if(err) {
          console.log(err.toString())
      }
      else {
          console.log(data)
      }
  })
  }
});