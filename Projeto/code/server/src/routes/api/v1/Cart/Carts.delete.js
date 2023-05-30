const express = require("express");

const CartLines = require("./CartLine/CartLines.delete");

const { DeleteCartWithId } = require("../../../../controllers/Cart/deleteCart");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  const cartId = req.params.id;
  const cart = await DeleteCartWithId(cartId);
  return res.send(cart);
});

router.use("/:id/cartLines", CartLines);

module.exports = router;
