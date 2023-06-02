const express = require('express');
const registerUser = require('./Auth.register');
const loginJWTUser = require('./Auth.login.jwt');
const loginGoogleUser = require('./Auth.login.google');
const logoutUser = require('./Auth.logout');
const User = require('./Auth.user');

const router = express.Router();


// import routes
router.use('/local', loginJWTUser);
router.use('/local', registerUser);
router.use('/google', loginGoogleUser);
router.use('/user', User);
router.use('/', logoutUser);




module.exports = router;