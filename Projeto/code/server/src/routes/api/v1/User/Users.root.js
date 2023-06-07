const express = require("express");

const pay = require("./payment");
const get = require("./Users.get");
const post = require("./Users.post");
const put = require("./Users.put");
const del = require("./Users.delete");

const router = express.Router();

// import routes
router.use("/p", pay);
router.use("/", get);
router.use("/", post);
router.use("/", put);
router.use("/", del);

module.exports = router;
