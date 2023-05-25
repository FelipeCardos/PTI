const { ProductionUnit } = require("../../database/models");

async function FindAllProductionUnits() {
  const productionUnits = await ProductionUnit.findAll();
  return productionUnits;
}

async function FindProductionUnitWithId(id) {
  const productionUnit = await ProductionUnit.findOne({
    where: {
      id: id,
    },
  });
  return productionUnit;
}

async function FindAllProductionUnitsWithUserId(id) {
  const productionUnits = await ProductionUnit.findAll({
    where: {
      producer_id: id,
    },
  });
  return productionUnits;
}

async function FindProductionUnitWithAddressId(id) {
  const productionUnit = await ProductionUnit.findAll({
    where: {
      address_id: id,
    },
  });
  return productionUnit;
}

module.exports = {
  FindAllProductionUnits,
  FindProductionUnitWithId,
  FindAllProductionUnitsWithUserId,
  FindProductionUnitWithAddressId,
};
