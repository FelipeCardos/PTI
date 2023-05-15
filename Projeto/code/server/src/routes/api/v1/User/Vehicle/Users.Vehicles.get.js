const express = require("express");

const {
  FindAllVehiclesFromProducer,
} = require("../../../../../controllers/Vehicle/findVehicle");
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
          await FindAddressById(vehicles[i].address_id).then((address) => {
            vehicles[i].dataValues["address"] = address
              ? address
              : "Missing Address";
          });
        }
        res.status(200).json({ vehicles: vehicles });
      }
    });
  }
);

module.exports = router;
