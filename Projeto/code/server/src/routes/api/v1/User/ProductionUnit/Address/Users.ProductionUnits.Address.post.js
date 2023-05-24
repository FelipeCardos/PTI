const express = require("express");
const router = express.Router();

const {
  FindProductionUnitWithId,
} = require("../../../../../controllers/ProductionUnit/findProductionUnit");
const {
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
} = require("../../../../../middleware/UserAuth");
const {
  CreateAddress,
} = require("../../../../../controllers/Address/createAddress");

router.post(
  "/",
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
  async (req, res) => {
    const id = req.params.id;
    const { country, state, street, postal_code } = req.body;

    if (
      country == undefined ||
      state == undefined ||
      street == undefined ||
      postal_code == undefined
    ) {
      res.status(400).send("Bad Request");
    } else {
      FindProductionUnitWithId(id).then((productionUnit) => {
        if (productionUnit === null) {
          res.status(404).send("Not Found");
        } else {
          CreateAddress(country, state, street, postal_code).then((address) => {
            productionUnit.address_id = address.id;
            productionUnit.save().then(() => {
              res.status(200).send("Created");
            });
          });
        }
      });
    }
  }
);
