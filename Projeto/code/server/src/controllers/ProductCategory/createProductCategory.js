const { ProductCategory } = require("../../database/models");

async function CreateProductCategory(product_id, category_id) {
  const productsCategory = await ProductCategory.create({
    product_id: product_id,
    category_id: category_id,
  });
  return productsCategory;
}

module.exports = { CreateProductCategory };
