const express = require("express");

// const deleteRoute = require("./Vehicles.delete");
const getRoute = require("./Vehicles.get");
// const postRoute = require("./Cart/Vehicles.post");
// const putRoute = require("./Vehicles.put");

const router = express.Router();

// import routes
// router.use("/", deleteRoute);
router.use("/", getRoute);
// router.use("/", postRoute);
// router.use("/", putRoute);

module.exports = router;
