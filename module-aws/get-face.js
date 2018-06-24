const AWS = require('aws-sdk')

// var params = {
//     CollectionId: "myphoto", 
//     DetectionAttributes: ['ALL'], 
//     ExternalImageId: "nodocter.jpeg", 
//     Image: {
//      S3Object: {
//       Bucket: "trungbanh", 
//       Name: "captan1.jpeg"
//      }
//     }
// };

const rekognition = new AWS.Rekognition({
    region: 'us-east-2'
})

let face = (params) => {
    
    rekognition.indexFaces(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data); 
    })
} 

module.exports = face 