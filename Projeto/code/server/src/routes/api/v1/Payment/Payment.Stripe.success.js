const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
} = require("../../../../controllers/CartLine/findCartLines");

const {
  FindAllProductProductionUnit,
  FindAllProductionUnitsIdsWithProductId,
  FindAllProductsIdsWithProductionUnitId,
  FindProductIdAndProductionUnitId,
} = require("../../../../controllers/ProductProductionUnit/findProductProductionUnit");

const {
  UpdateProductProductionUnitProductionUnitIdWithProductIdAndProductionUnitId,
  UpdateProductProductionUnitAmountWithProductIdProductionUnitId,
} = require("../../../../controllers/ProductProductionUnit/updateProductProductionUnit");

const {
  UpdateCart,
  UpdateCartOrderDateWithId,
  UpdateCartDeliveryDateWithId,
  UpdateCartStatusWithId,
} = require("../../../../controllers/Cart/updateCart");

const {
  UpdateCartLine,
  UpdateCartLineStatusWithCartIdAndProductId,
  UpdateCartLineVehicleIdWithCartIdAndProductId,
  UpdateCartLineAmountWithCartIdAndProductId,
  UpdateCartLineDeliveryDateWithCartIdAndProductId,
  UpdateAllCartLinesStatusWithCartId,
  UpdateAllCartLinesDeliveryDateWithCartId,
} = require("../../../../controllers/CartLine/updateCartLine");

// import routes

router.get("/", async (req, res) => {
  const { cartId } = req.session;
  console.log("cartId", cartId);
  UpdateCartStatusWithId(cartId, "PROCESSING");
  UpdateCartDeliveryDateWithId(cartId, new Date());
  UpdateAllCartLinesStatusWithCartId(cartId, "AWAITING_TRANSPORT");
  UpdateAllCartLinesDeliveryDateWithCartId(cartId, new Date());

  const cartLines = await FindAllCartLinesWithCartId(cartId);
  for (let cartLine of cartLines) {
    const { product_id, production_unit_id, amount } = cartLine;
    const productProductionUnit = await FindProductIdAndProductionUnitId(
      product_id,
      production_unit_id
    );
    const prevAmount = productProductionUnit.amount;
    const newAmount = prevAmount - amount;
    await UpdateProductProductionUnitAmountWithProductIdProductionUnitId(
      product_id,
      production_unit_id,
      newAmount
    );
  }

  res.redirect("http://localhost:5173/");
});

module.exports = router;
