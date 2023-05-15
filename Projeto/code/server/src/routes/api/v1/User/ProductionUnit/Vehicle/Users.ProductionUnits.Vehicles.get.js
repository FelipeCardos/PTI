const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  FindAllVehiclesFromProductionUnit,
} = require("../../../../../../controllers/Vehicle/findVehicle");

router.get("/", async (req, res) => {
  const id = req.params.productionUnitsId;
  FindAllVehiclesFromProductionUnit(id).then((vehicles) => {
    if (vehicles === null) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json({ vehicles: vehicles });
    }
  });
});

module.exports = router;
