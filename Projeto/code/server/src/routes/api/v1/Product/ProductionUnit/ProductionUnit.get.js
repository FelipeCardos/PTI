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
  let productionUnits = [];
  const productId = req.params.id;
  const productProductionUnitPairs =
    await FindAllProductionUnitsIdsWithProductId(productId);
  for (let productProductionUnit of productProductionUnitPairs) {
    const productionUnit = await FindProductionUnitWithId(
      productProductionUnit.dataValues.production_unit_id
    );
    productionUnits.push(productionUnit);
  }
  res.send(productionUnits);
});

module.exports = router;
