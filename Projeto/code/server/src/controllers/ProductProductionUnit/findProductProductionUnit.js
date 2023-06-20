const { ProductProductionUnit } = require("../../database/models");

async function FindAllProductProductionUnit() {
  const productProductionUnit = await ProductProductionUnit.findAll();
  return productProductionUnit;
}

async function FindAllProductionUnitsIdsWithProductId(productId) {
  const productProductionUnit = await ProductProductionUnit.findAll({
    where: { product_id: productId },
  });
  return productProductionUnit;
}

async function FindAllProductsIdsWithProductionUnitId(productionUnitId) {
  const productProductionUnit = await ProductProductionUnit.findAll({
    where: { production_unit_id: productionUnitId },
  });
  return productProductionUnit;
}

async function FindProductIdAndProductionUnitId(productId, productionUnitId) {
  const productProductionUnit = await ProductProductionUnit.findOne({
    where: { product_id: productId, production_unit_id: productionUnitId },
  });
  return productProductionUnit;
}

module.exports = {
  FindAllProductProductionUnit,
  FindAllProductionUnitsIdsWithProductId,
  FindAllProductsIdsWithProductionUnitId,
  FindProductIdAndProductionUnitId,
};
