const express = require("express");

const router = express.Router();

const {
  createProduct,
} = require("../../../../controllers/Product/createProduct");

router.post("/", async (req, res) => {
  const {
    producerId,
    name,
    description,
    category,
    attributes,
    productionDate,
    productImage,
    price,
  } = req.body;

  const attributesObj = JSON.parse(attributes);

  const product = await createProduct(
    producerId,
    name,
    description,
    category,
    attributesObj,
    productionDate,
    productImage,
    price
  );
  res.status(200).send(product);
});

module.exports = router;
