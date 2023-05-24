const { ProductCategory } = require("../../database/models");

async function FindAllProductCategories() {
  const productsCategory = await ProductCategory.findAll();
  return productsCategory;
}

async function FindAllCategoriesIdsWithProductId(productId) {
  const productsCategory = await ProductCategory.findAll({
    where: {
      product_id: productId,
    },
  });
  return productsCategory;
}

async function FindAllProductsIdsWithCategoryId(id) {
  const productsCategory = await ProductCategory.findAll({
    where: {
      category_id: id,
    },
    attributes: { exclude: ["id"] },
  });
  return productsCategory;
}

module.exports = {
  FindAllProductCategories,
  FindAllCategoriesIdsWithProductId,
  FindAllProductsIdsWithCategoryId,
};
