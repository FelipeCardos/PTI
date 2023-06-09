const { Product } = require("../../database/models");
const { ProductCategory } = require("../../database/models");
const { ProductAttribute } = require("../../database/models");
const { ProductImage } = require("../../database/models");

//     name: "",
//     description: "",
//     productImage: [],
//     category: [],
//     attributes: [],
//     productionDate: "",
//     price: "",

async function createProduct(
  producerId,
  name,
  description,
  category,
  attributes,
  productionDate,
  productImageUri,
  price
) {
  const product = await Product.create({
    producer_id: producerId,
    name: name,
    description: description,
    price: price * 100,
    production_date: productionDate,
  });
  const productImage = await ProductImage.create({
    product_id: product.id,
    uri: productImageUri,
  });
  for (let i = 0; i < category.length; i++) {
    console.log(product.id, category[i]);
    const productCategory = await ProductCategory.create({
      product_id: product.id,
      category_id: category[i],
    });
  }
  for (const attributeKey of Object.keys(attributes)) {
    const attributeContent = attributes[attributeKey];
    const productAttribute = await ProductAttribute.create({
      product_id: product.id,
      attribute_id: attributeKey,
      content: attributeContent,
    });
  }
  return product;
}

module.exports = { createProduct };
