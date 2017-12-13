var fs = require('fs');
var jwt = require('jsonwebtoken');

exports.verifyToken = function(req){
    let token = req;

    let res;

    var cert = fs.readFileSync('./configs/public.pem'); // get public key
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