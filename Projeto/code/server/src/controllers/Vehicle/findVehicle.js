const { Vehicle } = require("../../database/models");

async function FindVehicleById(id) {
  const vehicle = await Vehicle.findOne({
    where: { id: id },
  });
  return vehicle;
}

async function FindAllVehicles() {
  const vehicles = await Vehicle.findAll();
  return vehicles;
}

async function FindAllVehiclesFromProductionUnit(id) {
  const vehicles = await Vehicle.findAll({
    where: { production_unit_id: id },
  });
  return vehicles;
}

async function FindAllVehiclesFromProducer(id) {
  const vehicles = await Vehicle.findAll({
    where: { producer_id: id },
  });
  return vehicles;
}

module.exports = {
  FindVehicleById,
  FindAllVehicles,
  FindAllVehiclesFromProductionUnit,
  FindAllVehiclesFromProducer,
};
