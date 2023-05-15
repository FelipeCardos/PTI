const { Vehicle } = require("../../database/models");

async function CreateVehicle(
  production_unit_id,
  producer_id,
  license_plate,
  capacity
) {
  if (capacity <= 0) {
    return null;
  }
  if (producer_id == null) {
    return null;
  }
  const vehicle = await Vehicle.create({
    production_unit_id: production_unit_id,
    producer_id: producer_id,
    license_plate: license_plate,
    capacity: capacity,
  });
  return vehicle;
}

module.exports = { CreateVehicle };
