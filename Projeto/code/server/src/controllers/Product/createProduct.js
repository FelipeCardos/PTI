const { Product } = require("../../database/models");

//     name: "",
//     description: "",
//     category: "",
//     attributes: [],
//     productionDate: "",
//     productImages: [],
//     price: "",
//     FALTA FAZER UMA ALTERAÇÃO NA BASE DE DADOS - Tabela ProductAttribute guardar o conteudo em vez da CategoryAttribute, ou seja, a CategoryAttribute vai guardar apenas o header como por exemplo "Cor" e o ProductAttribute vai guardar o conteudo como por exemplo "Azul" em conjunto com o product_id e o attribute_id

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
}

module.exports = { createProduct };
