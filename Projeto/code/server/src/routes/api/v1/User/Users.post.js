const express = require("express");

const Address = require("./Address/Users.post.Address");

const router = express.Router();

router.use("/:id/address", Address);

module.exports = router;