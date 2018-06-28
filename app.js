const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const account = require("./module-dynamo/account")

const app = express()

app.use(bodyParser.json())

// configure upload
let storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './upload');
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+file.originalname);
    }
})
let upload = multer({storage: storage});

//account
app.get('/account/:uid',(req,res)=> {

    //res.json()
    params = {
        TableName: "ten bang",
        Key:{
            uid: req.param.uid
        }
    }

    account.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.JSON(data)
        }
    });
})

app.post('/signin',(req,res)=>{

    let params = {
        TableName: "ten bang",
        KeyConditionExpression: "#pn = :phone",
        ExpressionAttributeNames:{
            "#pn": "phoneNumber"
        },
        ExpressionAttributeValues: {
            ":phone": res.body.phonenumber
        }
    }

    account.query(params,(err,data)=>{
        if (err) {
            res.json({
                "message": err
            })
        } else {
            res.json({
                "message" : data.udi 
            })
        }
    })
})


//recharge
app.put('/recharge/:uid',(req,res)=> {

    let params = {
        TableName: "ten bang",
        Key:{
            "uid": "uid",
        },
        UpdateExpression: "set recharge = list_append(#ri, :vals)",
        ExpressionAttributeValues:{
            "#ri": req.body
        },
        ReturnValues: "UPDATED_NEW"
    };

    account.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.json(data)
        }
    });
})

app.get('/recharge/:uid', (req,res)=> {

    let params = {
        TableName: "ten bang",
        KeyConditionExpression: "#id = :uid",
        ExpressionAttributeNames:{
            "#id": "uid"
        },
        ExpressionAttributeValues: {
            ":uid": res.param.uid
        }
    }

    account.query(params,(err,data)=>{
        if (err) {
            res.json({
                "message": err
            })
        } else {
            res.json({
                "data" : data.recharge
            })
        }
    })
})

//buying
app.put('/bought/:uid',(req,res)=>{
    let params = {
        TableName: "ten bang",
        Key:{
            "uid": "uid",
        },      
        //them san pham vao history va tru tien
        UpdateExpression: "set history = list_append(#ri, :vals) , money = money - #mo",
        ExpressionAttributeValues:{
            "#ri": req.body.item,
            "#mo": req.body.price
        },
        ReturnValues: "UPDATED_NEW"
    };

    account.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.json({
                "message":"okey"
            })
        }
    });
})

//bought
app.get('/bought/:uid',(req,res)=>{
    let params = {
        TableName: "ten bang",
        KeyConditionExpression: "#id = :uid",
        ExpressionAttributeNames:{
            "#id": "uid"
        },
        ExpressionAttributeValues: {
            ":uid": res.param.uid
        }
    }

    account.query(params,(err,data)=>{
        if (err) {
            res.json({
                "message": err
            })
        } else {
            res.json({
                "data" : data.history
            })
        }
    })
})

app.listen(3000, (req, res) => {
    console.log("listen at port 3000");
})