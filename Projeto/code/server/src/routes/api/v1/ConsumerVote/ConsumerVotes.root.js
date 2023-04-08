const express = require('express');

const deleteRoute = require('./ConsumerVotes/ConsumerVotes.delete');
const getRoute = require('./ConsumerVotes/ConsumerVotes.get');
const postRoute = require('./ConsumerVotes/ConsumerVotes.post');
const putRoute = require('./ConsumerVotes/ConsumerVotes.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;