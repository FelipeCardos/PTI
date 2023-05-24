const { Vehicle } = require("../../database/models");

async function DeleteVehicleWithId(id) {
  const vehicle = await Vehicle.findOne({
    where: {
      id: id,
    },
  });
  await vehicle.destroy();
  return vehicle;
}

module.exports = { DeleteVehicleWithId };
