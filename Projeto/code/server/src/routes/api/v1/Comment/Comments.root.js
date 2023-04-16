const express = require('express');

const deleteRoute = require('./Comments/Comments.delete');
const getRoute = require('./Comments/Comments.get');
const postRoute = require('./Comments/Comments.post');
const putRoute = require('./Comments/Comments.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;