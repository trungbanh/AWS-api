const fs = require('fs')
const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json');

const rekognition = new AWS.Rekognition(
  {
    region: 'us-east-1'
  }
);

var params = {
  CollectionId: "search",
};
rekognition.createCollection(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
});
