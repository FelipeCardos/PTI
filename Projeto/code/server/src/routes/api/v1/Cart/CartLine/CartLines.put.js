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
  UpdateCart,
  UpdateCartOrderDateWithId,
  UpdateCartDeliveryDateWithId,
  UpdateCartStatusWithId,
} = require("../../../../../controllers/Cart/updateCart");

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
  const status = req.body.status || null;
  const vehicleId = req.body.vehicleId || null;
  const amount = req.body.amount || null;
  const deliveryDate = req.body.deliveryDate || null;
  const cartline = await UpdateCartLine(
    cartId,
    productId,
    status,
    vehicleId,
    amount,
    deliveryDate
  );
  let edgeCaseStatus = ["COMPLETE", "FAILURE", "CANCELLED"];
  if (edgeCaseStatus.includes(status)) {
    const cartlines = await FindAllCartLinesWithCartId(cartId);
    let statusAllEqual = true;
    for (const cartline of cartlines) {
      if (cartline.status !== status) {
        statusAllEqual = false;
        break;
      }
    }
    if (statusAllEqual) await UpdateCartStatusWithId(cartId, status);
  }
  // edge case
  if (status === "COMPLETE") {
    const cartlines = await FindAllCartLinesWithCartId(cartId);
    let edgeCaseStatusBool = true;
    for (const cartline of cartlines) {
      if (!edgeCaseStatus.includes(cartline.status)) {
        edgeCaseStatusBool = false;
        break;
      }
    }
    if (edgeCaseStatusBool) await UpdateCartStatusWithId(cartId, status);
  }

  return res.send(cartline);
});

module.exports = router;
