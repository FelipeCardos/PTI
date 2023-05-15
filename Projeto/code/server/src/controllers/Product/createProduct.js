const { Product } = require("../../database/models");

//     name: "",
//     description: "",
//     category: "",
//     attributes: [],
//     productionDate: "",
//     productImages: [],
//     price: "",

async function createProduct(
  name,
  description,
  category,
  attributes,
  productionDate,
  productImages,
  price
) {
  const product = await Product.create({
    name: name,
    description: description,
    price: price,
    productionDate: productionDate,
  });
  for (let i = 0; i < category.length; i++) {}
}

module.exports = { createProduct };
