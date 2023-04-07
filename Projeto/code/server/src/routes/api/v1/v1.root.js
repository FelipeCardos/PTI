const express = require('express');
const User = require('./User/Users.root');
const Auth = require('./Auth/Auth.root');

const router = express.Router();

router.use('/users', User);
router.use('/auth', Auth)

module.exports = router;