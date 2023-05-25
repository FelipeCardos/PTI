const express = require("express");

const {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
} = require("../../../../../controllers/CartLine/findCartLines");

const {
  FindAllProducts,
  FindProductWithId,
  FindProductWithName,
  FindProductWithBarcode,
  FindAllProductsWithProducerId,
} = require("../../../../../controllers/Product/findProducts");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const productId = req.params.id;
  const cartLines = await FindAllCartLinesWithProductId(productId);
  res.send(cartLines);
});

module.exports = router;
