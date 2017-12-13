'use strict';
// environment variables
require('dotenv').config();

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var app = express();

//db configs
const con = require('../../configs/db');

const verifyToken = require('../auth/verifyToken');
//Update Profile
exports.changePassword = function(req, res){
    console.log(req.body);
    let token = req.body.token;
    let val = verifyToken.verifyToken(token);
    console.log(token);
    if(val.name != undefined){
       return res.send(val);
    }
    if(val.email != undefined){
        let update_data = {
          password: bcrypt.hashSync(req.body.password, 10)
        }
        console.log(update_data);
        con.query("UPDATE "+val.role+" SET ? WHERE email= ?", [update_data, val.email],function (error, results, fields) {
            if (error) console.log(error);
            console.log(results);
        });
    }
}
