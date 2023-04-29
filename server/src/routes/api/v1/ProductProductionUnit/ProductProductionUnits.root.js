const express = require('express');

const deleteRoute = require('./ProductProductionUnits/ProductProductionUnits.delete');
const getRoute = require('./ProductProductionUnits/ProductProductionUnits.get');
const postRoute = require('./ProductProductionUnits/ProductProductionUnits.post');
const putRoute = require('./ProductProductionUnits/ProductProductionUnits.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;