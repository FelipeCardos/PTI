const { ProductProductionUnit } = require("../../database/models");

async function UpdateProductProductionUnitProductionUnitIdWithProductIdAndProductionUnitId(
  productId,
  productionUnitId,
  newProductionUnitId
) {
  const productProductionUnit = await ProductProductionUnit.findOne({
    where: { product_id: productId, production_unit_id: productionUnitId },
  });
  productProductionUnit.production_unit_id = newProductionUnitId;
  await productProductionUnit.save();
  return productProductionUnit;
}

async function UpdateProductProductionUnitAmountWithProductIdProductionUnitId(
  productId,
  productionUnitId,
  amount
) {
  const productProductionUnit = await ProductProductionUnit.findOne({
    where: { product_id: productId, production_unit_id: productionUnitId },
  });
  productProductionUnit.amount = amount;
  await productProductionUnit.save();
  return productProductionUnit;
}

module.exports = {
  UpdateProductProductionUnitProductionUnitIdWithProductIdAndProductionUnitId,
  UpdateProductProductionUnitAmountWithProductIdProductionUnitId,
};
