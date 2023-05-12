const { Product } = require("../../database/models");

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

module.exports = { FindProductWithId, FindAllProducts };
