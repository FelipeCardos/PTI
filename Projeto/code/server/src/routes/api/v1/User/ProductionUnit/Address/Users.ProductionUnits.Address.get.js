const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  FindAddressById,
} = require("../../../../../controllers/Address/findAddress");
const {
  FindProductionUnitWithId,
} = require("../../../../../controllers/ProductionUnit/findProductionUnit");
const {
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
} = require("../../../../../middleware/UserAuth");

router.get(
  "/",
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
  async (req, res) => {
    const id = req.params.id;
    FindProductionUnitWithId(id).then((productionUnit) => {
      if (productionUnit === null) {
        res.status(404).send("Not Found");
      } else {
        FindAddressById(productionUnit.address_id).then((address) => {
          if (address === null) {
            res.status(404).send("Not Found");
          } else {
            res.status(200).json({ address: address });
          }
        });
      }
    });
  }
);

module.exports = router;
