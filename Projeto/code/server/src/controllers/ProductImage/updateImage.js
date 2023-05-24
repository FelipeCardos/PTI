const { ProductImage } = require("../../database/models");

async function UpdateProductImage(id, productId, uri) {
  const productImage = await ProductImage.findOne({
    where: { id: id },
  });
  productImage.product_id = productId;
  productImage.uri = uri;
  await productImage.save();
  return productImage;
}

async function UpdateProductImageUriWithId(id, uri) {
  const productImage = await ProductImage.findOne({
    where: { id: id },
  });
  productImage.uri = uri;
  await productImage.save();
  return productImage;
}

module.exports = { UpdateProductImage, UpdateProductImageUriWithId };
