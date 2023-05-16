const express = require("express");

const {
  CreateAddress,
} = require("../../../../../controllers/Address/createAddress");

const {
  CreateProductionUnit,
} = require("../../../../../controllers/ProductionUnit/createProductionUnit");
const {
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
  checkIfUserIsOwnerOfTheResource,
} = require("../../../../../middleware/UserAuth");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
  checkIfUserIsOwnerOfTheResource,
  async (req, res) => {
    const producer_id = req.params.id;
    const capacity = req.body.capacity;
    const country = req.body.country;
    const state = req.body.state;
    const street = req.body.street;
    const postal_code = req.body.postal_code;

    CreateAddress(country, state, street, postal_code).then((address) => {
      if (address) {
        const address_id = address.id;
        CreateProductionUnit(producer_id, capacity, address_id).then(
          (productionUnit) => {
            if (productionUnit) {
              res.status(200).send("Created");
            } else {
              res.status(400).send("Bad Request");
            }
          }
        );
      } else {
        res.status(400).send("Bad Request");
      }
    });
  }
);

module.exports = router;
