const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

const Account = new AWS.DynamoDB.DocumentClient();

module.exports = Account

