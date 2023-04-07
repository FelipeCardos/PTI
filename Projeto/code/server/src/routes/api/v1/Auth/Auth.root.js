const express = require('express');
const registerUser = require('./Auth.register');
const loginJWTUser = require('./Auth.login.jwt');
const loginGoogleUser = require('./Auth.login.google');

const router = express.Router();


// import routes
router.use('/local', loginJWTUser);
router.use('/register', registerUser);
router.use('/google', loginGoogleUser);



module.exports = router;