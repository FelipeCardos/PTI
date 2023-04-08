const express = require('express');

const deleteRoute = require('./Vehicles/Vehicles.delete');
const getRoute = require('./Vehicles/Vehicles.get');
const postRoute = require('./Vehicles/Vehicles.post');
const putRoute = require('./Vehicles/Vehicles.put');

const router = express.Router();

// import routes
router.use('/', deleteRoute);
router.use('/', getRoute);
router.use('/', postRoute);
router.use('/', putRoute);


module.exports = router;