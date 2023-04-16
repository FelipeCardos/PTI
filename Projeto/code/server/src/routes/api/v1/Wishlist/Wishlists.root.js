const express = require('express');

const deleteRoute = require('./Wishlists/Wishlists.delete');
const getRoute = require('./Wishlists/Wishlists.get');
const postRoute = require('./Wishlists/Wishlists.post');
const putRoute = require('./Wishlists/Wishlists.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;