const express = require("express");

const {
  FindAllProductionUnitsWithUserId,
} = require("../../../../../controllers/ProductionUnit/findProductionUnit");

const Vehicle = require("./Vehicle/Users.ProductionUnits.Vehicles.get");
const Address = require("./Address/Users.ProductionUnits.Address.get");

const {
  checkAuthenticated,
  checkUsersIsAdminOrProducer,
  checkIfUserIsOwnerOfTheResource,
} = require("../../../../../middleware/UserAuth");
const {
  FindAddressById,
} = require("../../../../../controllers/Address/findAddress");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  checkAuthenticated,
  async (req, res) => {
    const id = req.params.id;
    FindAllProductionUnitsWithUserId(id).then(async (productionUnits) => {
      if (productionUnits === null) {
        res.status(404).send("Not Found");
      } else {
        for (let i = 0; i < productionUnits.length; i++) {
          await FindAddressById(productionUnits[i].address_id).then(
            (address) => {
              productionUnits[i].dataValues["address"] = address
                ? address
                : "Missing Address";
            }
          );
        }
        res.status(200).json({ productionUnits: productionUnits });
      }
    });
  }
);

router.use("/:productionUnitsId/vehicles", Vehicle);
router.use("/:productionUnitsId/address", Address);

module.exports = router;
