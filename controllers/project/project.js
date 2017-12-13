//importing db config
const con = require('../../configs/db');

//token verification module import
const verifyToken = require('../auth/verifyToken');

const mysql = require('mysql');

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

    //view all project when the token has role == admin. Ergo the requester is ADMIN
    if (val.role == "admin"){
        let sql_admin = "SELECT * FROM project";
        con.query(sql_admin, function(err, results, fields){
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

    else{
        //In case of correct token
            //below is for architect
        /*
        Need to add for Client & Admin OR separate api's for them
        */
        let sql_arch = "SELECT * FROM project WHERE email = ?";
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
}


// view a single project along with it all the details from related tables
exports.viewProject = function (req, res){
    
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

//add project
exports.addProject = function (req, res){
    
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
    if(val.role !== "architect"){
        console.log(val);
        return res.send({
            message: "You're not authorized to add/create project",
            error: true
        })
    }

    //In case of correct token
        //below is for architect
    let sql = "INSERT INTO project SET ?";
    //data to add to project table
    let project = {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        time_created: new Date(),   //current datetime on the server
        email: val.email
    }

    con.query(sql, project, function(err, results, fields){
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


//Update project
exports.updateProject = function (req, res){
    console.log("Update PROJECT")
    console.log(req.body);
    //token isn't present in request
    if (!("token" in req.body)){
        return res.send({
            message: "Please provide token",
            error: true
        });
    }
    let val = verifyToken.verifyToken(req.body.token);
    //In case of incorrect token, payload won't be present in token
    console.log(val.email);
    console.log(val);
    if(!("email" in val)){
        return res.send({
            message: "Unauthorized token!",
            error: true
        })
    }
    if(val.role !== "architect"){
        console.log(val);
        return res.send({
            message: "You're not authorized to add/create project",
            error: true
        })
    }

    //In case of correct token
        //below is for architect
    let sql = "UPDATE project SET ? WHERE pid = ?";
    //data to add to project table
    let project = {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,  //current datetime on the server
    }
    console.log(project);
    con.query(sql, [project, req.body.pid], function(err, results, fields){
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


//add client to project
/*
Complete it as soon as add client is active
AS of now only architect can be added through the new API
*/
exports.addClient = function(req, res){
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
    if(val.role !== "architect"){
        console.log(val);
        return res.send({
            message: "You're not authorized to add client",
            error: true
        })
    }
    let sql = "INSERT INTO enroll SET ?";
    if(val.email != undefined){
        let enroll_client = {
          pid: req.body.pid,
          email: req.body.email
        }
        con.query("INSERT INTO enroll SET ?", enroll_client,function (error, results, fields) {
            if (error) console.log(error);
            console.log(results);
        });
    }
}


exports.deleteProject = function (req, res){
    
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
    if(val.role !== "architect"){
        console.log(val);
        return res.send({
            message: "You're not authorized to add/create project",
            error: true
        })
    }

    //In case of correct token
        //below is for architect
    let sql = "UPDATE project SET `email` = ? WHERE `pid` = ?";

    let project = [
        "",
        req.body.pid
    ]

    con.query(sql, project, function(err, results, fields){
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


//fetch metadata, if any
exports.viewProjectMetaData = (req, res) => {

    //token isn't present in request
    if (!("token" in req.body)){
        return res.send({
            message: "Please provide token",
            error: true
        });
    }

    const val = verifyToken.verifyToken(req.body.token);
    if(!("email" in val)){
        return res.send({
            error: true,
            message: "Invalid token!"
        })
    }
    else{
        let sql = "SELECT * FROM project_metadata WHERE pid = " + mysql.escape(req.body.pid);

        con.query(sql, (err, results, fields) => {
            
            if (err){
                return  res.send({
                    error: true,
                    message: err.sqlMessage
                })
            }
            else if (results.length < 1){
                return res.send({
                    error: true,
                    message: "No uploads/updates yet! Check back later!"
                })
            }
            else{
                console.log(results);
                if (val.role != "client"){
                    return  res.send({
                        error: false,
                        result: results
                    })
                }
                else if(val.role == "client" && results[0].approve == "1"){
                    return  res.send({
                        error: false,
                        result: results
                    })
                }
                else{
                    return  res.send({
                        error: true,
                        message: "No update yet!"
                    })
                }
            }
        })
    }
}


//Architect Disapproving OR Approving the files for client
exports.approveFile = (req, res) => {
    //token isn't present in request
    if (!("token" in req.body)){
        return res.send({
            message: "Please provide token",
            error: true
        });
    }

    const val = verifyToken.verifyToken(req.body.token);
    if(!("email" in val)){
        return res.send({
            error: true,
            message: "Invalid token!"
        })
    }

    if(val.role != "architect"){
        return res.send({
            error: true,
            message: "You aren't allowed to allow/disallow files!"
        })
    }
    else{
        let sql = "UPDATE project_metadata SET `approve` = ? WHERE `pid` = ? AND `version` = ?";
        
        let metadata = [
            req.body.approve,
            req.body.pid,
            req.body.version
        ];

        con.query(sql, metadata, (err, results, fields) => {
            if (err){
                return res.send({
                    error: true,
                    message: err.sqlMessage
                })
            }
            else{
                return res.send({
                    error: false,
                    message: "successful",
                    result: results
                })
            }
        })
    }
}