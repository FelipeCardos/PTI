const { ProductionUnit } = require("../../database/models");

async function UpdateProductionUnit(id, producer_id, capacity, address_id) {
  const productionUnit = await ProductionUnit.findOne({
    where: {
      id: id,
    },
  });
  if (producer_id) productionUnit.producer_id = producer_id;
  if (capacity) productionUnit.capacity = capacity;
  if (address_id) productionUnit.address_id = address_id;
  await productionUnit.save();
  return productionUnit;
}

async function UpdateProductionUnitCapacityWithId(id, capacity) {
  const productionUnit = await ProductionUnit.findOne({
    where: {
      id: id,
    },
  });
  productionUnit.capacity = capacity;
  await productionUnit.save();
  return productionUnit;
}

async function UpdateProductionUnitAddressIdWithId(id, address_id) {
  const productionUnit = await ProductionUnit.findOne({
    where: {
      id: id,
    },
  });
  productionUnit.address_id = address_id;
  await productionUnit.save();
  return productionUnit;
}

module.exports = {
  UpdateProductionUnit,
  UpdateProductionUnitCapacityWithId,
  UpdateProductionUnitAddressIdWithId,
};
