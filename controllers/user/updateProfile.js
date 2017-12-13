'use strict';
// environment variables
require('dotenv').config();

var mysql = require('mysql');

//db configs
const con = require('../../configs/db');

const verifyToken = require('../auth/verifyToken');

//Update Profile
exports.updateProfile = function(req, res){

    let token = req.body.token;
    let val = verifyToken.verifyToken(token);
    console.log(token, val);
    if(val.name != undefined){
       return res.send(val);
    }
    if(val.email != undefined){
        let update_data = {
            address: req.body.address,
            contact: req.body.contact,
            dob: req.body.dob,
            first_name: req.body.first_name,
            gender: req.body.gender,
            last_name: req.body.last_name,
            last_login: req.body.last_login,
            profile_url: req.body.profile_url
        }
        console.log(val.email);
        con.query("UPDATE "+val.role+" SET ? WHERE email= ?", [update_data, val.email],function (error, results, fields) {
            if (error) console.log(error);
            console.log(results);
        });
    }
}
