const express = require("express");

const {
  FindAllProducts,
  FindProductWithId,
  FindProductWithName,
  FindProductWithBarcode,
  FindAllProductsWithProducerId,
} = require("../../../../../controllers/Product/findProducts");

const {
  FindAllProductCategories,
  FindAllCategoriesIdsWithProductId,
  FindAllProductsIdsWithCategoryId,
} = require("../../../../../controllers/ProductCategory/findProductCategory");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  let products = [];
  const categoryId = req.params.id;
  const productCategoryPairs = await FindAllProductsIdsWithCategoryId(
    categoryId
  );
  for (let productCategory of productCategoryPairs) {
    const product = await FindProductWithId(
      productCategory.dataValues.product_id
    );
    products.push(product);
  }
  res.send(products);
});

module.exports = router;
