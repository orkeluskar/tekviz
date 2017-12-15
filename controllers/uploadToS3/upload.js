const AWS = require('aws-sdk');
AWS.config.loadFromPath('./configs/aws-config.json');

const multer  = require('multer');
const multerS3 = require('multer-s3');

const verifyToken = require('../auth/verifyToken');
const con = require('../../configs/db');
const mysql = require('mysql');

var s3 = new AWS.S3();

const fs = require('fs');

exports.uploadtoS3 = function(req, res, next){
    console.log(req.body);
    const val = verifyToken.verifyToken(req.body.token);
    if(!("email" in val) || !("role" in val)){
        return  res.send({
                    error: true,
                    message: "Invalid token!"
                });
    }

    else if (val.role == "admin"){
        let sql = "INSERT INTO project_metadata SET ?";
        // file url is set below for WebGL files Admin will upload
        /*
            In future will need to update the API to add exe files.
            Just need to change the URL to `URL` + `exe_filename.exe` -- something like this :-)
        */
        let file_url = process.env.s3_bucket_url //from env variables
                        + req.body.pid
                        + '/'
                        + req.body.version
                        + '/index.html';

        let field_data = {
            pid: req.body.pid,
            version: req.body.version,
            file_url: file_url,
            title: req.body.title,
            description: req.body.description,
            time_created: new Date(),
            approve: 0 // setting to 0, by default. If the value is 1, client can see the file
        }
        con.query(sql, field_data, function(err, results, fields){
            if (err){
                console.log(err);
                return  res.send({
                            error: true,
                            message: err.sqlMessage
                        });
            }
            return  res.send({
                        error: false,
                        message: "Upload successful!"
                    })
        })
    }
}