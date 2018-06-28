const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-west-2',
    endpoin: 'http://localhost:8000'
})

const dynamo = new AWS.DynamoDB() 

let schema = {
    TableName: "Account",
    KeySchema: [
        { AttributeName: "uid",  KeyType: "HASH"},
        { AttributeName: "phone",  KeyType: "RANGE"},
    ],
    AttributeDefinitions: [       
        { AttributeName: "uid", AttributeType: "S" },
        { AttributeName: "phone", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
}

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

/*
Table-name: "Account"
{
    uid :
    phone:
    name:
    money:
    rechange [
        {
            time:
            session:
            money:
        },
    ]
    history :[
        {
            time:
            session:
            quantity:
            price:
        },
    ]
}  
*/