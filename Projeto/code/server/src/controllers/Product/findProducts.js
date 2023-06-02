const { Product } = require("../../database/models");
const { Op } = require('sequelize');

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
  const product = await Product.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        {
          description: {
            [Op.like]: `%${name}%`
          }
        }
      ]
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
