const express = require('express');

const deleteRoute = require('./CartLines/CartLines.delete');
const getRoute = require('./CartLines/CartLines.get');
const postRoute = require('./CartLines/CartLines.post');
const putRoute = require('./CartLines/CartLines.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;