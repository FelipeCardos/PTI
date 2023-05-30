const express = require("express");

const {
  FindAllCarts,
  FindCartWithId,
  FindShoppingCartWithConsumerId,
  FindAllCartsWithUserId,
  FindAllCartsWithStatus,
  FindCartWithUserIdAndCartId,
  FindAllCartsWithUserIdAndStatus,
} = require("../../../../../controllers/Cart/findCarts");

const { GetCartCost } = require("../../../../../controllers/Cart/getCartCost");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const userId = req.params.id;
  let shoppingCart = await FindShoppingCartWithConsumerId(userId);
  shoppingCart.dataValues.price = await GetCartCost(shoppingCart.id);
  res.status(200).json(shoppingCart);
});

module.exports = router;
