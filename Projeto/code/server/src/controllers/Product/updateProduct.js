const { Product } = require("../../database/models");

/**
 * Updates a product with the specified details.
 *
 * @param {number} id - The ID of the product to update.
 * @param {string} name - The new name of the product.
 * @param {string} description - The new description of the product.
 * @param {string}} barcodeId - The new barcode ID of the product.
 * @param {number} producerId - The new producer ID of the product.
 * @param {number} price - The new price of the product.
 * @param {Date} productionDate - The new production date of the product.
 * @returns {Promise<object>} The updated product object.
 */
async function UpdateProduct(
  id,
  name,
  description,
  barcodeId,
  producerId,
  price,
  productionDate
) {
  const product = await Product.findOnde({
    where: {
      id: id,
    },
  });
  if (name) product.name = name;
  if (description) product.description = description;
  if (barcodeId) product.barcode_id = barcodeId;
  if (producerId) product.producer_id = producerId;
  if (price) product.price = price;
  if (productionDate) product.production_date = productionDate;
  await product.save();
  return product;
}

async function UpdateProductNameWithId(id, name) {
  const product = await Product.findOne({
    where: {
      id: id,
    },
  });
  product.name = name;
  await product.save();
  return product;
}

async function UpdateProductDescriptionWithId(id, description) {
  const product = await Product.findOne({
    where: {
      id: id,
    },
  });
  product.description = description;
  await product.save();
  return product;
}

async function UpdateProductBarcodeIdWithId(id, barcodeId) {
  const product = await Product.findOne({
    where: {
      id: id,
    },
  });
  product.barcode_id = barcodeId;
  await product.save();
  return product;
}

async function UpdateProductPriceWithId(id, price) {
  const product = await Product.findOne({
    where: {
      id: id,
    },
  });
  product.price = price;
  await product.save();
  return product;
}

async function UpdateProductProductionDateWithId(id, productionDate) {
  const product = await Product.findOne({
    where: {
      id: id,
    },
  });
  product.production_date = productionDate;
  await product.save();
  return product;
}

module.exports = {
  UpdateProduct,
  UpdateProductNameWithId,
  UpdateProductDescriptionWithId,
  UpdateProductBarcodeIdWithId,
  UpdateProductPriceWithId,
  UpdateProductProductionDateWithId,
};
