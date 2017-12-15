//importing db config
//const con = require('../../configs/db');

//token verification module import
const verifyToken = require('../auth/verifyToken');

const mysql = require('mysql');

const con = require('../../configs/db');

//view all projects for that email (architect / client)
exports.viewProjects = function (req, res){

    //token isn't present in request
    if (!("token" in req.body)){
        return res.send({
            message: "Please provide token",
            error: true
        });
    }
    let val = verifyToken.verifyToken(req.body.token);
    //In case of incorrect token, payload won't be present in token
    if(!("email" in val)){
        return res.send({
            message: "Unauthorized token!",
            error: true
        })
    }
    //In case of correct token
        //below is for architect
    /*
    Need to add for Client & Admin OR separate api's for them
    */
    //console.log("eedar tak aaraha hai");
    let sql_arch = "SELECT * FROM project WHERE pid IN (SELECT pid FROM enroll WHERE email = ?)";
    con.query(sql_arch, [val.email], function(err, results, fields){
        if(err){
            console.log(err);
            return res.send({
                error: true,
                message: err
            });
        }
        return res.send({
            error: false,
            result: results
        })
    });
}

// view a single project along with it all the details from related tables
exports.viewProject = function (req, res){
        console.log("eedar tak pakka raaha hai.");
        //token isn't present in request
        if (!("token" in req.body)){
            return res.send({
                message: "Please provide token",
                error: true
            });
        }
        let val = verifyToken.verifyToken(req.body.token);
        //In case of incorrect token, payload won't be present in token
        if(!("email" in val)){
            return res.send({
                message: "Unauthorized token!",
                error: true
            })
        }
        //In case of correct token
            //below is for architect
        /*
        Need to add for Client & Admin OR separate api's for them
        */
        let sql_arch = "SELECT * FROM project WHERE pid = ?";
        con.query(sql_arch, [req.body.pid], function(err, results, fields){
            if(err){
                console.log(err);
                return res.send({
                    error: true,
                    message: err
                });
            }
            return res.send({
                error: false,
                result: results
            })
        });
    }


// view a single project along with it all the details from related tables
exports.viewprojectusers = function (req, res){
        //token isn't present in request
        if (!("token" in req.body)){
            return res.send({
                message: "Please provide token",
                error: true
            });
        }
        let val = verifyToken.verifyToken(req.body.token);
        //In case of incorrect token, payload won't be present in token
        if(!("email" in val)){
            return res.send({
                message: "Unauthorized token!",
                error: true
            })
        }

        let sql_arch = "SELECT * FROM client WHERE email IN (SELECT email FROM enroll where pid = ?)";
        con.query(sql_arch, [req.body.pid], function(err, results, fields){
            if(err){
                console.log(err);
                return res.send({
                    error: true,
                    message: err
                });
            }
            return res.send({
                error: false,
                result: results
            })
        });
    }
