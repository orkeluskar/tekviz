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
var con = require('../db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

con.connect();

const verifyToken = require('./verifyToken');

// view profile
exports.viewProfile = function (req, res){
    let token = req.body.token;
    let val = verifyToken.verifyToken(token);
    //console.log(val);

    let resp ;
    if (val.email != undefined){
        let sql = 'SELECT * FROM User WHERE ur_emailID=' + mysql.escape(val.email);
        con.query(sql, function (error, results, fields) {
            if (error) 
                return res.send(error);
            resp = {
                    error: false,
                    firstName: results[0].First_Name,
                    lastName: results[0].Last_Name,
                    ur_emailID: results[0].ur_emailID,
                    message: "Successfully retrieved profile data"
            }
            console.log(resp);
            return res.send(resp);    
        }); 
    }
    return {
        error: "true",
        message: "Something went wrong"
    }
}

//update profile
exports.updateProfile = function(req, res){
    let token = req.body.token;
    let val = verifyToken.verifyToken(token);
    //console.log(val);

    if(val.name != undefined){
        return res.send(val);
    }

    if(val.email != undefined){

        let update_data = {
            First_Name: req.body.firstName,
            Last_Name: req.body.lastName
        }

        let sql = 'UPDATE User SET ? WHERE ur_emailID=' + mysql.escape(val.email);
        con.query(sql, update_data, function(error, results, fields){
            if (error)
                return res.send(error)
            
            return res.send({
                error: false,
                message: "Profile updated successfully",
                resp: results
            });
        });
    }
    return {
        error: "true",
        message: "Something went wrong"
    }
}