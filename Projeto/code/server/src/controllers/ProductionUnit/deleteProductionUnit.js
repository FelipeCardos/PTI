const { ProductionUnit } = require("../../database/models");

async function DeleteProductionUnitWithId(id) {
  const productionUnit = await ProductionUnit.findOne({
    where: { id: id },
  });
  await productionUnit.destroy();
  return productionUnit;
}

module.exports = { DeleteProductionUnitWithId };
