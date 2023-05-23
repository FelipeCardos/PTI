const { ProductAttribute } = require("../../database/models");

async function CreateProductAttribute(productId, attribute_id, content) {
  const productAttribute = await ProductAttribute.create({
    product_id: productId,
    attribute_id: attribute_id,
    content: content,
  });
  return productAttribute;
}

module.exports = { CreateProductAttribute };
