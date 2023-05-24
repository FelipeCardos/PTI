const { Product } = require("../../database/models");

async function DeleteProductWithId(id) {
  const product = await Product.findOne({
    where: {
      id: id,
    },
  });
  await product.destroy();
  return product;
}

module.exports = { DeleteProductWithId };
