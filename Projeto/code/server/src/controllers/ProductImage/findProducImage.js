const { ProductImage } = require("../../database/models");

async function FindAllProductsImages() {
  const productsImages = await ProductImage.findAll();
  return productsImages;
}

async function FindProductImageWithId(id) {
  const productImage = await ProductImage.findOne({
    where: {
      id: id,
    },
  });
  return productImage;
}

async function FindProductImageWithUri(uri) {
  const productImage = await ProductImage.findOne({
    where: {
      uri: uri,
    },
  });
  return productImage;
}

async function FindAllProductImagesWithProductId(productId) {
  const productsImages = await ProductImage.findAll({
    where: { product_id: productId },
  });
  return productsImages;
}

module.exports = {
  FindAllProductsImages,
  FindProductImageWithId,
  FindProductImageWithUri,
  FindAllProductImagesWithProductId,
};
