'use strict';
// environment variables
require('dotenv').config();

var mysql = require('mysql');

var fs = require('fs');

//db configs
const con = require('../../configs/db');

const verifyToken = require('../auth/verifyToken');

//View Profile
exports.viewProfile = function (req, res){
    let token = req.body.token;
    let val = verifyToken.verifyToken(token);
    let resp;
    console.log(val);
    if (val.email != undefined){
        let role = val.role;
        let sql = 'SELECT * FROM ' + role + ' WHERE email=' + mysql.escape(val.email);
        con.query(sql, function (error, results, fields) {
            if (error)
                return res.send(error);
            resp = {
                    error: false,
                    address: results[0].address,
                    contact: results[0].contact,
                    dob: results[0].dob,
                    first_name: results[0].first_name,
                    gender: results[0].gender,
                    last_name: results[0].last_name,
                    last_login: results[0].last_login,
                    last_name: results[0].last_name,
                    password: results[0].password,
                    profile_url: results[0].profile_url,
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
