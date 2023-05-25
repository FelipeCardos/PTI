const express = require("express");

const {
  FindAllProductAttributes,
  FindAllProductAttributesWithProductId,
  FindAllProductAttributesWithAttributeId,
} = require("../../../../../controllers/ProductAttribute/findProductAttribute");

const {
  FindAllProductCategories,
  FindAllCategoriesIdsWithProductId,
  FindAllProductsIdsWithCategoryId,
} = require("../../../../../controllers/ProductCategory/findProductCategory");

const {
  FindAllCategoryAttributesWithCategoryId,
  FindCategoryAttributeWithId,
} = require("../../../../../controllers/CategoryAttribute/findCategoryAttribute");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const productId = req.params.id;
  const productAttributes = await FindAllProductAttributesWithProductId(
    productId
  );
  for (let productAttribute of productAttributes) {
    const attributeId = productAttribute.attribute_id;
    const categoryAttribute = await FindCategoryAttributeWithId(attributeId);
    productAttribute.dataValues.title = categoryAttribute.title;
  }
  res.send(productAttributes);
});

module.exports = router;
