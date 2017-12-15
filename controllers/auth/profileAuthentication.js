// Authenticate user/admin/architect
var jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
//var con = require('../../db/db');
var fs = require('fs');
var mysql = require('mysql');
const bcrypt = require('bcrypt');

const con = require('../../configs/db');

exports.checkCredentials = function (req, res){
    console.log('login is called');
    var date = new Date();
    var email = req.body.email;
    console.log(req.body.role);
    var role = req.body.role;
    let id;
    var user;
    var sql;
    console.log(req.body);
    if (role == undefined || role == null){
        return res.status(400).send({ error:true, message: 'Please provide user role' });
    }
    else if( role =="admin" || role == "client" || role == "architect"){
        user = {
            email : req.body.email
        }
        sql = "SELECT * FROM " + role + " WHERE `email` = ?";
    }
    else{
        return res.status(400).send({ error:true, message: 'Please provide appropriate user role' });
    }
    con.query(sql, email, function (error, results, rows) {
        if (error) {
            console.log(error);
            return res.send(error);
        };
        var cert = fs.readFileSync('./configs/private_key.pem');
        var user_data = {
            email: email,
            role: role
        };
        var token = jwt.sign(user_data, cert, { algorithm: 'RS256'});
        var hash;
        //console.log(results[0].password);
        //console.log(req.body.password);
        
        if(typeof(results) == typeof([]) && typeof(results[0]) == typeof({}) && "password" in results[0]) {
            bcrypt.compareSync(req.body.password, results[0].password);
          hash = bcrypt.compareSync(req.body.password, results[0].password);
          console.log(hash);
        }
        else{
          return res.send({error: true, message: "User not found"});
        }
        if (hash){
            return res.send({ error: false, token: token, message: 'Login successful' });
        }
        else{
            return res.send({ error: true, message: 'Login failed' });
        }
    });
}
