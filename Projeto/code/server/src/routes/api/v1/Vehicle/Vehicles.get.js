const express = require("express");

const {
  FindAllVehicles,
  FindVehicleWithId,
  FindVehicleWithLicensePlate,
  FindAllVehiclesFromProductionUnit,
  FindAllVehiclesFromProducer,
} = require("../../../../controllers/Vehicle/findVehicle");

const {
  FindAllCartLines,
  FindCartLineWithCartIdAndProductId,
  FindAllCartLinesWithCartId,
  FindAllCartLinesWithProductId,
  FindAllCartLinesWithStatus,
  FindAllCartLinesWithVehicleId,
} = require("../../../../controllers/CartLine/findCartLines");

const router = express.Router();

router.get("/", async (req, res) => {
  const vehicles = await FindAllVehicles();
  return res.send(vehicles);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const vehicle = await FindVehicleWithId(id);
  if (vehicle === null) return res.status(404).send("Not Found");
  return res.send(vehicle);
});

router.get("/:id/availability", async (req, res) => {
  const id = req.params.id;
  const vehicle = await FindVehicleWithId(id);
  if (vehicle === null) return res.status(404).send("Not Found");
  const cartLines = await FindAllCartLinesWithVehicleId(vehicle.id);
  if (cartLines === null) return res.send(true);
  for (let i = 0; i < cartLines.length; i++) {
    if (
      ["TRANSPORT_IMMINENT", "IN_TRANSIT", "LAST_KM"].includes(
        cartLines[i].status
      )
    )
      return res.send(false);
  }
  return res.send(true);
});

module.exports = router;
