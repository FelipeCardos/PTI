const express = require('express');

const deleteRoute = require('./Categories/Categories.delete');
const getRoute = require('./Categories/Categories.get');
const postRoute = require('./Categories/Categories.post');
const putRoute = require('./Categories/Categories.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;