const express = require("express");

const {
  FindAllCategories,
  FindCategoryWithId,
  FindCategoryWithName,
  FindAllCategoriesWithParentCategoryId,
  FindAllCategoriesWithoutParentCategory,
} = require("../../../../../controllers/Category/findCategory");

const {
  FindAllProductCategories,
  FindAllCategoriesIdsWithProductId,
  FindAllProductsIdsWithCategoryId,
} = require("../../../../../controllers/ProductCategory/findProductCategory");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const productId = req.params.id;
  const productCategories = await FindAllCategoriesIdsWithProductId(productId);
  const categories = [];
  for (let productCategory of productCategories) {
    const categoryId = productCategory.category_id;
    const category = await FindCategoryWithId(categoryId);
    categories.push(category);
  }
  return res.send(categories);
});

module.exports = router;
