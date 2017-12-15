//importing db config
const con = require('../../configs/db');

//token verification module import
const verifyToken = require('../auth/verifyToken');

const mysql = require('mysql');

// Add comment
exports.addComment = function(req, res){
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

    let sql = "INSERT INTO discussion SET ?";
    //data to add to project table
    let discussion = {
        pid: req.body.pid,
        comment: req.body.comment,
        time: new Date(),   //current datetime on the server
        email: val.email,
        profile_url: req.body.profile_url
    }

    con.query(sql, discussion, function(err, results, fields){
        if(err){
            console.log(err);
            return res.send({
                error: true,
                message: err
            });
        }
        //console.log(results, fields);
        return res.send({
            error: false,
            result: results,
            fields: fields
        })
    });
}


// View comments
exports.viewComment = function(req, res){
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
    let sql_arch = "SELECT * FROM discussion WHERE pid = ? ORDER BY time asc";
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
    })
}


exports.deleteComment = function(req, res){
    console.log(req.body)
    console.log(req.body.email);
    console.log(req.body.comment);
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

    let sql = "DELETE FROM discussion WHERE email = ? AND comment = ?";

    con.query(sql, [req.body.email, req.body.comment], function(err, results, fields){
        if(err){
            console.log(err);
            return res.send({
                error: true,
                message: err
            });
        }
        //console.log(results, fields);
        return res.send({
            error: false,
            result: results,
            fields: fields
        })
    });
}