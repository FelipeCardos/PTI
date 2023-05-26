const express = require("express");

const CartLines = require("./CartLine/CartLines.put");

const router = express.Router();

router.use("/:id/cartlines", CartLines);

module.exports = router;
