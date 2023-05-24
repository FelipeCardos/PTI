const { ProductAttribute } = require("../../database/models");

async function FindAllProductAttributes() {
  const productAttributes = await ProductAttribute.findAll();
  return productAttributes;
}

async function FindAllProductAttributesWithProductId(productId) {
  const productAttributes = await ProductAttribute.findAll({
    where: { product_id: productId },
  });
  return productAttributes;
}

async function FindAllProductAttributesWithAttributeId(attributeId) {
  const productAttributes = await ProductAttribute.findAll({
    where: { attribute_id: attributeId },
  });
  return productAttributes;
}

module.exports = {
  FindAllProductAttributes,
  FindAllProductAttributesWithProductId,
  FindAllProductAttributesWithAttributeId,
};
