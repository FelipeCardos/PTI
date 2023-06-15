const express = require("express");

const {
  FindAllProductProductionUnit,
  FindAllProductionUnitsIdsWithProductId,
  FindAllProductsIdsWithProductionUnitId,
} = require("../../../../../controllers/ProductProductionUnit/findProductProductionUnit");

const {
  FindAllProductionUnits,
  FindProductionUnitWithId,
  FindAllProductionUnitsWithUserId,
  FindProductionUnitWithAddressId,
} = require("../../../../../controllers/ProductionUnit/findProductionUnit");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const productId = req.params.id;
  const productProductionUnitPairs =
    await FindAllProductionUnitsIdsWithProductId(productId);
  res.send(productProductionUnitPairs);
});

module.exports = router;
