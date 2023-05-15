const express = require("express");
const router = express.Router({ mergeParams: true });

const { FindUserById } = require("../../../../../controllers/User/findUsers");
const {
  CreateVehicle,
} = require("../../../../../controllers/Vehicle/createVehicle");

router.post("/", (req, res) => {
  const producer_id = req.params.id;
  const { license_plate, capacity, productionUnit } = req.body;

  if (license_plate == undefined || capacity == undefined) {
    res.status(400).send("Bad Request");
  } else {
    FindUserById(producer_id).then((user) => {
      if (user === null) {
        res.status(404).send("Not Found");
      } else {
        CreateVehicle(
          productionUnit,
          producer_id,
          license_plate,
          capacity
        ).then((vehicle) => {
          res.status(200).send(vehicle.dataValues);
        });
      }
    });
  }
});

module.exports = router;
