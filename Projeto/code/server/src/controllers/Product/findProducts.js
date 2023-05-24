const { Product } = require("../../database/models");

async function FindAllProducts() {
  const products = await Product.findAll();
  return products;
}

async function FindProductWithId(id) {
  const product = await Product.findOne({
    where: {
      id: id,
    },
  });
  return product;
}

async function FindProductWithName(name) {
  const product = await Product.findOne({
    where: {
      name: name,
    },
  });
  return product;
}

async function FindProductWithBarcode(barcode) {
  const product = await Product.findOne({
    where: {
      barcode_id: barcode,
    },
  });
  return product;
}

async function FindAllProductsWithProducerId(producerId) {
  const products = await Product.findAll({
    where: {
      producer_id: producerId,
    },
  });
  return products;
}

module.exports = {
  FindAllProducts,
  FindProductWithId,
  FindProductWithName,
  FindProductWithBarcode,
  FindAllProductsWithProducerId,
};
