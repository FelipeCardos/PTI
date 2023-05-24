const express = require("express");

const {
  FindAllVehiclesFromProducer,
  FindVehicleById,
} = require("../../../../../controllers/Vehicle/findVehicle");
const {
  FindAllCartLinesWithVehicleId,
} = require("../../../../../controllers/CartLine/findCartLines");
const {
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
  checkIfUserIsOwnerOfTheResource,
} = require("../../../../../middleware/UserAuth");

const router = express.Router({ mergeParams: true });

router.put("/:vehicle_id", async (req, res) => {
  const id = req.params.vehicle_id;
  const productionUnitId = req.body.productionUnit;
  console.log(id, productionUnitId);
  // find the vehicle by id and update the production unit
  await FindVehicleById(id).then(async (vehicle) => {
    if (vehicle === null) {
      res.status(404).send("Not Found");
    } else {
      await vehicle.update({
        production_unit_id: productionUnitId,
      });
      res.status(200).send("Updated");
    }
  });
});

module.exports = router;
