const express = require("express");

const CartLines = require("./CartLine/CartLines.put");

const {
  UpdateCart,
  UpdateCartOrderDateWithId,
  UpdateCartDeliveryDateWithId,
  UpdateCartStatusWithId,
} = require("../../../../controllers/Cart/updateCart");

const {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
} = require("../../../../controllers/CartLine/findCartLines");

const {
  UpdateCartLine,
  UpdateCartLineStatusWithCartIdAndProductId,
  UpdateCartLineVehicleIdWithCartIdAndProductId,
  UpdateCartLineAmountWithCartIdAndProductId,
  UpdateCartLineDeliveryDateWithCartIdAndProductId,
  UpdateAllCartLinesStatusWithCartId,
  UpdateAllCartLinesDeliveryDateWithCartId,
} = require("../../../../controllers/CartLine/updateCartLine");

const {
  FindAllProductProductionUnit,
  FindAllProductionUnitsIdsWithProductId,
  FindAllProductsIdsWithProductionUnitId,
  FindProductIdAndProductionUnitId,
} = require("../../../../controllers/ProductProductionUnit/findProductProductionUnit");

const {
  UpdateProductProductionUnitProductionUnitIdWithProductIdAndProductionUnitId,
  UpdateProductProductionUnitAmountWithProductIdProductionUnitId,
} = require("../../../../controllers/ProductProductionUnit/updateProductProductionUnit.js");

const router = express.Router();

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const consumerId = req.body.consumerId || null;
  const orderDate = req.body.orderDate || null;
  const deliveryDate = req.body.deliveryDate || null;
  const status = req.body.status || null;
  const cart = await UpdateCart(
    id,
    consumerId,
    orderDate,
    deliveryDate,
    status
  );

  if (status === "CANCELLED") {
    const cartlines = await FindAllCartLinesWithCartId(id);
    let transportationStatus = [
      "PROCESSING",
      "AWAITING_TRANSPORT",
      "TRANSPORT_IMMINENT",
      "IN_TRANSIT",
      "LAST_KM",
    ];
    for (let cartline of cartlines) {
      if (transportationStatus.includes(cartline.status)) {
        let cartlineUpdated = await UpdateCartLineStatusWithCartIdAndProductId(
          id,
          cartline.product_id,
          status
        );
        const amountBeforeCancelation = await FindProductIdAndProductionUnitId(
          cartline.product_id,
          cartline.production_unit_id
        );
        await UpdateProductProductionUnitAmountWithProductIdProductionUnitId(
          cartline.product_id,
          cartline.production_unit_id,
          amountBeforeCancelation.dataValues.amount + cartline.amount
        );
        if (cartline.vehicle_id !== null) {
          cartlineUpdated = await UpdateCartLineVehicleIdWithCartIdAndProductId(
            id,
            cartline.product_id,
            null
          );
        }
      }
    }
  }
  return res.json(cart);
});
router.use("/:id/cartlines", CartLines);

module.exports = router;
