const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');

const face = require('./module-aws/get-face')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {

    res.send("hello")
})

// configure upload
var storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './upload');
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+file.originalname);
    }
})
var upload = multer({storage: storage});


app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    res.json(req.file)
});

app.listen(3000, (req, res) => {
    console.log("3000");
})