const express = require("express");

const router = express.Router({ mergeParams: true });

const CartLine = require("./CartLine/Users.Carts.CartLines.post");

router.use("/:idCart/cartLines", CartLine);

module.exports = router;
