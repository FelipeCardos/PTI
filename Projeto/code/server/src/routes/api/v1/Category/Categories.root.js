const express = require('express');

//const deleteRoute = require('./Category/Categories.delete');
const getRoute = require('./Categories.get');
//const postRoute = require('./Category/Categories.post');
//const putRoute = require('./Category/Categories.put');

const router = express.Router();

// import routes
//router.use('/', deleteRoute);
router.use('/', getRoute);
//router.use('/', postRoute);
//router.use('/', putRoute);


module.exports = router;