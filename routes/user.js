var express = require('express');
var router = express.Router();

var checkCredentials = require('../controllers/auth/profileAuthentication');
var createProfile = require('../controllers/user/createProfile');
var updateProfile = require('../controllers/user/updateProfile');
var viewProfile = require('../controllers/user/viewProfile');
var changePassword = require('../controllers/auth/changePassword');

router.post('/checkCredentials', checkCredentials.checkCredentials);
router.post('/createProfile', createProfile.createProfile);
router.post('/updateprofile', updateProfile.updateProfile);
router.post('/viewprofile', viewProfile.viewProfile);
router.post('/changePassword', changePassword.changePassword);

module.exports = router;