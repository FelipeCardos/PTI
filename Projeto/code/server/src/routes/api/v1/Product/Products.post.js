const express = require("express");

const router = express.Router();

const {
  createProduct,
} = require("../../../../controllers/Product/createProduct");

router.post("/", async (req, res) => {
  const {
    name,
    description,
    category,
    attributes,
    productionDate,
    productImages,
    price,
  } = req.body;

  // const product = await createProduct(
  //   name,
  //   description,
  //   category,
  //   attributes,
  //   productionDate,
  //   productImages,
  //   price
  // );
  res.status(200).send(req.body);
});

module.exports = router;
