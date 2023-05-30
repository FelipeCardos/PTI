const express = require("express");

const {
  DeleteCartLineWithCartIdAndProductId,
} = require("../../../../../controllers/CartLine/deleteCartline");

const router = express.Router({ mergeParams: true });

router.delete("/", async (req, res) => {
  const cartId = req.params.id;
  const productId = req.body.productId;
  const cartLine = await DeleteCartLineWithCartIdAndProductId(
    cartId,
    productId
  );
  return res.send(cartLine);
});

module.exports = router;
