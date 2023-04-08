const express = require('express');

const deleteRoute = require('./Carts/Carts.delete');
const getRoute = require('./Carts/Carts.get');
const postRoute = require('./Carts/Carts.post');
const putRoute = require('./Carts/Carts.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;