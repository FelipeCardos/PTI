const express = require("express");

const {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
} = require("../../../../../controllers/CartLine/findCartLines");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const cartId = req.params.id;
  const cartLines = await FindAllCartLinesWithCartId(cartId);
  res.status(200).json(cartLines);
});

module.exports = router;
