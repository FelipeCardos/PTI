const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  CreateCartLine,
} = require("../../../../../../controllers/CartLine/createCartLine");

const {
  FindAllCarts,
  FindCartWithId,
  FindShoppingCartWithConsumerId,
  FindAllCartsWithUserId,
  FindAllCartsWithStatus,
  FindCartWithUserIdAndCartId,
  FindAllCartsWithUserIdAndStatus,
} = require("../../../../../../controllers/Cart/findCarts");

router.post("/", async (req, res) => {
  // http://localhost:3000/api/v1/users/:user_id/carts/:cart_id/cartLines example
  const cartId = req.params.idCart;
  const productId = req.body.product_id;
  const productionUnitId = req.body.production_unit_id;
  const amount = req.body.amount;
  const cartLine = await CreateCartLine(
    cartId,
    productId,
    productionUnitId,
    amount
  );
  return res.status(201).json(cartLine);
});

module.exports = router;
