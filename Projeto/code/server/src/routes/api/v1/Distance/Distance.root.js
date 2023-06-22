const express = require("express");
const get = require("./Distance.get");
const router = express.Router();

// import routes
router.use("/", get);

module.exports = router;
