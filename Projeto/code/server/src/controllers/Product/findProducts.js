const { Product, ProductCategory } = require("../../database/models");

async function FindProductWithId(id) {
  const product = await Product.findOne({
    where: {
      id: id,
    },
  });
  return product;
}

async function FindAllProducts() {
  const products = await Product.findAll();
  return products;
}

async function FindProductsWithSubcategoryId(id){
  const products = await Product.findAll({
    include:[
      {
        model: ProductCategory,
        where: {category_id: id},
        required: true
      }
    ]
  });
  return products;
}
module.exports = { FindProductWithId, FindAllProducts ,FindProductsWithSubcategoryId}
