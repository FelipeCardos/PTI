const express = require('express');

const deleteRoute = require('./ProductImages/ProductImages.delete');
const getRoute = require('./ProductImages/ProductImages.get');
const postRoute = require('./ProductImages/ProductImages.post');
const putRoute = require('./ProductImages/ProductImages.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;