const { ProductImage } = require("../../database/models");

async function CreateProductImage(product_id, uri) {
  const productImage = await ProductImage.create({
    product_id: product_id,
    uri: uri,
  });
  return productImage;
}

module.exports = { CreateProductImage };
