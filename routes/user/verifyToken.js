var fs = require('fs');
var jwt = require('jsonwebtoken');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

exports.verifyToken = function(req){
    let token = req;

    let res;

    var cert = fs.readFileSync('public.pem'); // get public key
    jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
        // if token alg != RS256,  err == invalid signature
        if (err){
            res = err;
            return;
        }
        //console.log(payload.email);
        res = payload
    });
    //send 
    //console.log(res)
    return res

};