const express = require('express');

const deleteRoute = require('./Ratings/Ratings.delete');
const getRoute = require('./Ratings/Ratings.get');
const postRoute = require('./Ratings/Ratings.post');
const putRoute = require('./Ratings/Ratings.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;