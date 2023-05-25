const express = require("express");

const {
  FindAllProductsImages,
  FindProductImageWithId,
  FindProductImageWithUri,
  FindAllProductImagesWithProductId,
} = require("../../../../../controllers/ProductImage/findProductImage");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const productId = req.params.id;
  const productImages = await FindAllProductImagesWithProductId(productId);
  res.send(productImages);
});

module.exports = router;
