const { ProductImage } = require("../../database/models");

async function DeleteProductImageWithId(id) {
  const productImage = await ProductImage.findOne({
    where: {
      id: id,
    },
  });
  await productImage.destroy();
  return productImage;
}

module.exports = { DeleteProductImageWithId };
