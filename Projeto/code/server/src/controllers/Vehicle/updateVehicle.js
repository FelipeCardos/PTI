const { Vehicle } = require("../../database/models");

async function UpdateVehicle(
  id,
  productionUnitId,
  producerId,
  license_plate,
  capacity
) {
  const vehicle = await Vehicle.findOne({
    where: { id: id },
  });
  if (productionUnitId) vehicle.production_unit_id = productionUnitId;
  if (producerId) vehicle.producer_id = producerId;
  if (license_plate) vehicle.license_plate = license_plate;
  if (capacity) vehicle.capacity = capacity;
  await vehicle.save();
  return vehicle;
}

async function UpdateVehicleProductionUnitIdWithId(id, productionUnitId) {
  const vehicle = await Vehicle.findOne({
    where: { id: id },
  });
  vehicle.production_unit_id = productionUnitId;
  await vehicle.save();
  return vehicle;
}

async function UpdateVehicleLicensePlateWithId(id, license_plate) {
  const vehicle = await Vehicle.findOne({
    where: { id: id },
  });
  vehicle.license_plate = license_plate;
  await vehicle.save();
  return vehicle;
}

async function UpdateVehicleCapacityWithId(id, capacity) {
  const vehicle = await Vehicle.findOne({
    where: { id: id },
  });
  vehicle.capacity = capacity;
  await vehicle.save();
  return vehicle;
}

module.exports = {
  UpdateVehicle,
  UpdateVehicleProductionUnitIdWithId,
  UpdateVehicleLicensePlateWithId,
  UpdateVehicleCapacityWithId,
};
