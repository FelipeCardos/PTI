const express = require("express");

// const deleteRoute = require('./Products/Products.delete');
const getRoute = require("./Products.get");
const postRoute = require("./Products.post");
// const putRoute = require('./Products/Products.put');

const router = express.Router();

// import routes
// router.use('/', deleteRoute);
router.use("/", getRoute);
router.use("/", postRoute);
// router.use('/', putRoute);

module.exports = router;
