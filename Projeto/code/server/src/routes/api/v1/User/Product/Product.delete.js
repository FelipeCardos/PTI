const express = require("express");

const {
  DeleteProductWithId,
} = require("../../../../../controllers/Product/deleteProduct");

const router = express.Router({ mergeParams: true });

router.delete("/:productId", async (req, res) => {
  const producerId = req.params.id;
  const productId = req.params.productId;
  const product = await DeleteProductWithId(productId);
  res.send(product);
});

module.exports = router;
