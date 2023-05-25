const express = require("express");

// const deleteRoute = require("./Carts.delete");
const getRoute = require("./Carts.get");
// const postRoute = require("./Cart/Carts.post");
// const putRoute = require("./Cart/Carts.put");

const router = express.Router();

// import routes
// router.use("/", deleteRoute);
router.use("/", getRoute);
// router.use("/", postRoute);
// router.use("/", putRoute);

module.exports = router;
