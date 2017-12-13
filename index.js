'use strict';
// environment variables
require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get("/", function(req, res){
    res.sendFile(__dirname +  '/static/login.html');
});
 
var userRoutes = require('./routes/user');
app.use('/api',userRoutes)

//Projects
const project = require('./routes/project');
app.use('/', project);

//static
app.get("/", function(req, res){
    res.sendFile(__dirname +  '/static/login.html');
});

//upload
const uploads = require('./routes/upload');
app.use('/',  uploads);


let port = process.env.PORT || 3001;
app.listen(port);