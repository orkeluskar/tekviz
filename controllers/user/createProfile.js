'use strict';
// environment variables
require('dotenv').config();
var mysql = require('mysql');
var fs = require('fs');
const bcrypt = require('bcrypt');

const con = require('../../configs/db');

// Add a new user
exports.createProfile = function (req, res){
    console.log(req);
    console.log('Creating a new user...');
    console.log(req.body);
    const password_plaintext = generate();
    let hash = bcrypt.hashSync(password_plaintext, 10);
    let role = req.body.role;
    let user;
    if (role == undefined || role == null){
        return res.status(400).send({ error:true, message: 'Please provide user role' });
    }
    else if(role == 'admin' || role == 'architect' || role == 'client'){
        user = {
            email: req.body.email,
            password: hash,
            first_name: "",
            last_name: "",
            address: "",
            personal_website: "",
            // dob is updated to current time for temporary purposes
            dob: new Date().toISOString().replace('T',' ').replace('Z','').slice(0,10)
        }
    }
    else{
        return res.status(400).send({ error:true, message: 'Please provide appropriate user role' });
    }
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    con.query("INSERT INTO " + role + " SET ? ", user, function (error, results, fields) {
        if (error)
            return res.send(error);
        else{
            if(role == 'client'){
              const clientadd = require('../project/project');
              console.log(req);
              console.log(clientadd.addClient(req));
            }
            return res.send({ error: false, data: results, message: 'New ' + role + ' has been created successfully.' });
        }
    });
    sendMail(req.body.email, password_plaintext);
    return ({error: true, message: "Unknown error!"});
}

//nodemailer
const nodemailer = require('nodemailer');
//mailer function
const sendMail = (to, password_plaintext) => {
    console.log(to);
    // this is the email in html form that would be sent to the user
    let html = '<h4>Welcome to SpacedIO</h4>' +
    '<div>' +
        '<p><b>Below are your credentials:</b><br/><br/>'
            + 'Email: ' + to + '</p>' +
        '<p>Password: ' + password_plaintext + '</p>' +
    '</div>';

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.email_id,
            pass: process.env.email_pass
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"No-Reply @SpacedIO" <no-reply@spacedio.com>', // sender address
        to: to, // list of receivers
        subject: 'Welcome to SpacedIO', // Subject line
        text: 'Hi,', // plain text body
        html: html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}


// Random password generator
function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz_!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

function generate() {
    return randomPassword(10);
}
