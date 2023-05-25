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

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const userId = req.params.id;
  const shoppingCart = await FindShoppingCartWithConsumerId(userId);
  res.send(shoppingCart);
});

module.exports = router;
