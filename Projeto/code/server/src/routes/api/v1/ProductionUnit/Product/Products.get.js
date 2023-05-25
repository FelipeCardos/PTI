const express = require("express");

const {
  FindAllProducts,
  FindProductWithId,
  FindProductWithName,
  FindProductWithBarcode,
  FindAllProductsWithProducerId,
} = require("../../../../../controllers/Product/findProducts");

const {
  FindAllProductProductionUnit,
  FindAllProductionUnitsIdsWithProductId,
  FindAllProductsIdsWithProductionUnitId,
} = require("../../../../../controllers/ProductProductionUnit/findProductProductionUnit");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  let products = [];
  const productionUnitId = req.params.id;
  const productProductionUnitPairs =
    await FindAllProductsIdsWithProductionUnitId(productionUnitId);
  for (const productProductionUnitPair of productProductionUnitPairs) {
    const product = await FindProductWithId(
      productProductionUnitPair.product_id
    );
    products.push({
      ...product.dataValues,
      amount: productProductionUnitPair.amount,
    });
  }
  res.send(products);
});

module.exports = router;
