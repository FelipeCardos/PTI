const { ProductAttribute } = require("../../database/models");

async function UpdateProductAttributeContentWithProductIdAndAttributeId(
  productId,
  attributeId,
  content
) {
  const productAttribute = await ProductAttribute.findOne({
    where: { product_id: productId, attribute_id: attributeId },
  });
  productAttribute.content = content;
  await productAttribute.save();
  return productAttribute;
}

module.exports = { UpdateProductAttributeContentWithProductIdAndAttributeId };
