const express = require('express');
const router = express.Router();

const profile = require('../controllers/user/profile');

router.post('/profile', profile.viewProfile);
router.post('/updateprofile', profile.updateProfile);

module.exports = router;