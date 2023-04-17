const express = require('express');

const deleteRoute = require('./ProductCategories/ProductCategories.delete');
const getRoute = require('./ProductCategories/ProductCategories.get');
const postRoute = require('./ProductCategories/ProductCategories.post');
const putRoute = require('./ProductCategories/ProductCategories.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;