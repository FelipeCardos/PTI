const express = require("express");

const {
  FindAllVehiclesFromProducer,
} = require("../../../../../controllers/Vehicle/findVehicle");
const {
  FindCartLinesWithVehicleId,
} = require("../../../../../controllers/CartLine/findCartLines");
const {
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
  checkIfUserIsOwnerOfTheResource,
} = require("../../../../../middleware/UserAuth");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
  checkIfUserIsOwnerOfTheResource,
  async (req, res) => {
    const id = req.params.id;
    FindAllVehiclesFromProducer(id).then(async (vehicles) => {
      if (vehicles === null) {
        res.status(404).send("Not Found");
      } else {
        for (let i = 0; i < vehicles.length; i++) {
          let isVehicleAvailable = true;
          await FindCartLinesWithVehicleId(vehicles[i].id).then((cartLines) => {
            if (cartLines) {
              let possibleCartLinesStatus = [
                "TRANSPORT_IMMINENT",
                "IN_TRANSIT",
                "LAST_KM",
              ];
              for (let j = 0; j < cartLines.length; j++) {
                if (possibleCartLinesStatus.includes(cartLines[j].status)) {
                  isVehicleAvailable = false;
                }
              }
              isVehicleAvailable
                ? (vehicles[i].dataValues["available"] = true)
                : (vehicles[i].dataValues["available"] = false);
            }
          });
        }
        res.status(200).json({ vehicles: vehicles });
      }
    });
  }
);

module.exports = router;
