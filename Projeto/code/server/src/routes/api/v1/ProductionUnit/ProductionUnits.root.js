const express = require('express');

// const deleteRoute = require('./ProductionUnits/ProductionUnits.delete');
const getRoute = require('./ProductionUnits/ProductionUnits.get');
const postRoute = require('./ProductionUnits/ProductionUnits.post');
// const putRoute = require('./ProductionUnits/ProductionUnits.put');

const router = express.Router();

// import routes
// router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
// router.use('/', putRoute);


module.exports = router;                  