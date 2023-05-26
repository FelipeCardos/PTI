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

const {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
} = require("../../../../../controllers/CartLine/findCartLines");

const {
  UpdateCartLine,
  UpdateCartLineStatusWithCartIdAndProductId,
  UpdateCartLineVehicleIdWithCartIdAndProductId,
  UpdateCartLineAmountWithCartIdAndProductId,
  UpdateCartLineDeliveryDateWithCartIdAndProductId,
} = require("../../../../../controllers/CartLine/updateCartLine");

const router = express.Router({ mergeParams: true });

router.put("/", async (req, res) => {
  const cartId = req.params.id;
  const productId = req.body.productId;
  const amount = req.body.amount;
  const cartline = await UpdateCartLineAmountWithCartIdAndProductId(
    cartId,
    productId,
    amount
  );
  return res.send(cartline);
});

module.exports = router;
