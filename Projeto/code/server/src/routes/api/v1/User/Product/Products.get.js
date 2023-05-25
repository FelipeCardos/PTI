const express = require("express");

const {
  FindAllProducts,
  FindProductWithId,
  FindProductWithName,
  FindProductWithBarcode,
  FindAllProductsWithProducerId,
} = require("../../../../../controllers/Product/findProducts");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const producerId = req.params.id;
  const products = await FindAllProductsWithProducerId(producerId);
  res.send(products);
});

module.exports = router;
