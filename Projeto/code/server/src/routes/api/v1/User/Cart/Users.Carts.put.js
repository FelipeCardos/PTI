const express = require("express");

const CartLine = require("./CartLine/CartLines.put");

const router = express.Router();

router.use("/:idCart/cartLines", CartLine);
module.exports = router;
