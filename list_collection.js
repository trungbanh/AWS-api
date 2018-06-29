const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var rekognition = new AWS.Rekognition();
var params = {
};
rekognition.listCollections(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
  /*
  data = {
   CollectionIds: [
      "myphotos"
   ]
  }
  */
});