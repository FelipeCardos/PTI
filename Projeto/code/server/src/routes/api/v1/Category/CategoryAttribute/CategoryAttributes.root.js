const express = require("express");

// const deleteRoute = require("./CategoryAttributes/CategoryAttributes.delete");
const getRoute = require("./CategoryAttributes/CategoryAttributes.get");
// const postRoute = require("./CategoryAttributes/CategoryAttributes.post");
// const putRoute = require("./CategoryAttributes/CategoryAttributes.put");

const router = express.Router({ mergeParams: true });

// import routes
// router.use("/", deleteRoute);
router.use("/", getRoute);
// router.use("/", postRoute);
// router.use("/", putRoute);

module.exports = router;
