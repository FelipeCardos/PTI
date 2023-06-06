const { Product } = require("../../database/models");

//     name: "",
//     description: "",
//     category: "",
//     attributes: [],
//     productionDate: "",
//     productImages: [],
//     price: "",

//     name: "",
//     description: "",
//     productImage: [],
//     category: [],
//     attributes: [],
//     productionDate: "",
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
  for (let i = 0; i < category.length; i++) {
    const productCategory = await ProductCategory.create({
      product_id: product.id,
      category_id: category[i],
    });
  }
  for (let i = 0; i < attributes.length; i++) {
    const productAttribute = await ProductAttribute.create({
      product_id: product.id,
      attribute_id: attributes[i],
    });
  }
  // utilizar api do imgur para fazer upload das imagens e guardar os links
}

module.exports = { createProduct };
